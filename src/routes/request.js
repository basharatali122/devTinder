const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestAuth = express.Router();
const User = require("../models/user")

requestAuth.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        res.status(400).send("Invalid status type " + status);
      }

      const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({message:"user not found! "})
      }
      const exsistingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if(exsistingConnectionRequest){
        res.status(400).send({message:"connection request already exist"})
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName+ " is "+ status+ " in "+toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(404).send("ERROR: " + err.message);
    }
  }
);

requestAuth.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const { requestId, status } = req.params; // Correctly destructuring params
    const loggedInUser = req.user;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "status not allowed" }); // Added return
    }

    // if (!mongoose.Types.ObjectId.isValid(requestId)) {
    //   return res.status(400).json({ message: "Invalid request ID" });
    // }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "connection request is not found" });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.json({ message: "connection request " + status, data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = requestAuth;
