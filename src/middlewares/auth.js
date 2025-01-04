const jwt = require("jsonwebtoken");
const User = require("../models/user")
const userAuth = async (req, res, next) => {
 try{
    const {token} = req.cookies;
 if(!token){
    throw new Error("Invalid token");
 }
const decodeData = await jwt.verify(token,"DEV@Tinder790")
const {_id} = decodeData;
const user = await User.findById(_id)
if(!user){
    throw new Error("user not found");
}

req.user=user;
next();
 }
 catch (err){
    res.status(400).send("Error: "+err.message)
 }
};

module.exports = {
   
    userAuth,
};
