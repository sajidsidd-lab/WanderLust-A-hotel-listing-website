const User = require("../models/user.js");





module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");

  };

  module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.signup = async(req,res)=>{
  try{
     let{username,password,email}= req.body;
   const newUser=new User({email,username});
   const registeredUser= await User.register( newUser,password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
      next(err);
    }
     req.flash("success","Welcome To Wandelust");
       res.redirect("/listings");
   });
 
  } catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }


};

module.exports.login =   async(req,res)=>{
   req.flash("success","Welcome Back to Wanderlust You are Logged In");
    let redirectUrl= res.locals.redirectUrl || "/listings";
  
   res.redirect(redirectUrl);

};

module.exports.logout = (req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","you are successfully logout");
    res.redirect("/listings");
  });
 };
