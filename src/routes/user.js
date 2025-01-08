const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")
const userRouter = express.Router();

const USER_SAFE_DATA ="firstName lastName photoUrl age gender about skills"
userRouter.get("/user/requests/recived", userAuth,async (req,res)=>{

try{
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find(
      {
        toUserId:loggedInUser._id,
        status:"interested",

      }
    // ).populate("fromUserId","firstName lastName photoUrl gender age")
    // i can also pass it as an arrray
).populate("fromUserId",["firstName","lastName"])
    res.json({message:"data fatched successFully..",data:connectionRequest})

}
catch (err){
    res.status(400).send("Error: "+err.message)
}
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" }
      ]
    }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

    const data = connectionRequest.map((row)=>{
      if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    }
      
    ); // Corrected mapping
    res.send({ data });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});




module.exports=userRouter;
