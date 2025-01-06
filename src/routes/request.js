const express = require("express")
const { userAuth } = require("../middlewares/auth");

const requestAuth=express.Router();

requestAuth.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
      const user = req.user;
  
      console.log("connection request has been send");
  
      res.send(user.firstName + "  sent you connection request");
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

  module.exports=requestAuth;
