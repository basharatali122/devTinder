const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {  validateEditProfileData}=require("../utils/validation")


const profileRouter = express.Router();

//profile api
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
      const user = req.user;
  
      res.send(user);
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

  profileRouter.patch("/profile/edit",userAuth , async (req,res)=>{

    try{
      if(!validateEditProfileData(req)){
        throw new Error("invalid edit request")
      }
      const loggedInUser = req.user;
      console.log(loggedInUser)

     Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

     await loggedInUser.save();
      res.json({message:`${loggedInUser.firstName}, your profile updated successfuly`})
      console.log(loggedInUser);
    }

 
    catch (err){
      res.status(400).send("Error: "+err.message)
    }

  })
module.exports=profileRouter;