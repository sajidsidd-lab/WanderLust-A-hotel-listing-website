 const Listing =require("../models/listing");
 const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
 const mapToken = process.env.MAP_TOKEN;
 const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index= async(req,res)=>{
     const allListings = await  Listing.find({});
     res.render("listings/index",{allListings});
    };

 module.exports.renderNewForm = (req,res)=>{
   
      res.render("listings/new");

  };

  module.exports.showListing = async(req,res)=>{
       
       let {id} = req.params;
       const listing = await Listing.findById(id).populate({path:"reviews",
        populate:{
        path:"author",
  
       },
      })
      .populate("owner");
       if(!listing){
        req.flash("error","listing you requested for doesn't exist");
         return res.redirect("/listings");
       }
         res.render("listings/show",{listing});
  
  
    };

    module.exports.createListing = async (req, res,next) => {
      
     let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
       limit: 1,
             })
     .send();

      let url = req.file.path;
      let filename = req.file.filename;
      console.log(url,"..",filename);
      
       const newListing = new Listing(req.body.listing);
    
      newListing.owner= req.user._id;
      newListing.image = {url,filename};
      newListing.geometry = response.body.features[0].geometry ;
      let savedListing = await newListing.save();
   
        req.flash("success","new listing created");
      res.redirect("/listings");
        };


     module.exports.renderEditForm = async(req,res)=>{
             let {id} = req.params;
          const listing = await Listing.findById(id);
            if(!listing){
           req.flash("error"," listing you requested for doesn't exit");
            return res.redirect("/listings");
          }
           let originalImageUrl = listing.image.url;
           originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_250")
            res.render("listings/edit",{listing,originalImageUrl});
            };  

     
    //  module.exports.updateListing = async(req,res)=>{
    //      let {id} = req.params;
    //     let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing  });
     

    // //  if (req.body.listing.image && req.body.listing.image.trim() !== "") {
    // //   listing.image = req.body.listing.image;
    // //   }
      
    // // // Update other fields
    // //    listing.title = req.body.listing.title;
    // //    listing.description = req.body.listing.description;
    // //    listing.price = req.body.listing.price;
    // //    listing.location = req.body.listing.location;
    // //    listing.country = req.body.listing.country;

    //   // await listing.save();
    //   if(typeof req.file !=="undefined"){
    //   let url = req.file.path;
    //   let filename = req.file.filename;
    //     listing.image = {url,filename};
    //     await listing.save();
    //       }
    //  req.flash("success"," listing updated");
    //   res.redirect(`/listings/${id}`);

    //   };       



module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  // 🔍 Geocode the new location
  const geoResponse = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  }).send();

  // 🧠 Update listing with new data including geometry
  const listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
    geometry: geoResponse.body.features[0].geometry
  });

  // 🖼️ Handle new image upload if present
  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save(); // Save image changes
  }

  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};


      module.exports.destroyListing = async(req,res)=>{
           let {id} = req.params;
           let deletedListing = await Listing.findByIdAndDelete(id);
           console.log(deletedListing);
             req.flash("success"," listing  deleted");
           res.redirect("/listings");
       };

       //Search function


     

module.exports.searchListings = async (req, res) => {
  const { q, country, minPrice, maxPrice } = req.query;

  const query = {};

  // 🔍 Unified search on title OR location
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } }
    ];
  }

  // 🌍 Optional country filter
  if (country) {
    query.country = { $regex: country, $options: "i" };
  }

  // 💰 Price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  try {
    const listings = await Listing.find(query)
      .populate("owner")
      .populate("reviews");

    res.render("listings/searchResults", { listings });
  } catch (err) {
    console.error(err);
    res.status(500).send("Search failed");
  }
};