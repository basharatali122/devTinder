const socket = require("socket.io");

const crypto = require("crypto");

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
      const roomId = getSecretRoomId(userId,requestId);
      console.log(firstName + " joined room :" + roomId);

      socket.join(roomId);
    });
    socket.on("sendMessage", ({ firstName, userId, requestId, text }) => {
      const roomId = getSecretRoomId(userId,requestId);

      console.log(firstName + " " + text);
      io.to(roomId).emit("messageReceived", { firstName, text });
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = initialaizedSocketio;
