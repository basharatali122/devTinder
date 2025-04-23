const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:requestId", userAuth, async (req, res) => {
  try {
    const {requestId }= req.params;

    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, requestId] },
    }).populate({path:"messages.senderId",
      select:"firstName lastName"
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, requestId],
        messages: [],
      });

      await chat.save();
    }

    res.json(chat);
  } catch (err) {
   console.log(err)
  }
});

module.exports = chatRouter;
