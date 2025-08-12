const express = require("express");
const router = express.Router({mergeParams :true});
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js")

       

 //REVIEW ROUTE
      //post  review route
      router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

   //delete route for reviews

    router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
        
     module.exports=router;