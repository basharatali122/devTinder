const socket = require("socket.io");

const crypto = require("crypto");
const { Chat } = require("../models/chat");

const getSecretRoomId = (userId, requestId) => {
  return crypto
    .createHash("sha256")
    .update([userId, requestId].sort().join("_"))
    .digest("hex");
};
const initialaizedSocketio = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, requestId }) => {
      const roomId = getSecretRoomId(userId, requestId);
      console.log(firstName + " joined room :" + roomId);

      socket.join(roomId);
    });
    socket.on("sendMessage", async ({ firstName,lastName, userId, requestId, text }) => {
      try {
        const roomId = getSecretRoomId(userId, requestId);

        console.log(firstName + " " + text);

        let chat = await Chat.findOne({
          participants: { $all: [userId, requestId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [ userId, requestId ],
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();

        io.to(roomId).emit("messageReceived", { firstName, text,lastName });
      } catch (err) {
        console.log(err);
      }
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = initialaizedSocketio;
