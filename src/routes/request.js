const express = require ("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestAuth = express.Router();
const User = require("../models/user")

requestAuth.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id; // Authenticated user ID
      const { toUserId, status } = req.params;

      // 1. Validate status
      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: `Invalid status type: ${status}` });
      }

      // 2. Validate `toUserId`
      if (!toUserId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }

      // 3. Check if target user exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // 4. Check for existing connection requests
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }, // Bidirectional check
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({ message: "Connection request already exists" });
      }

      // 5. Create and save the connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      // 6. Respond with success message
      res.json({
        message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        data,
      });
    } catch (err) {
      // Handle unexpected errors
      res.status(500).json({ message: "Internal server error", error: err.message });
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
