const socket = require("socket.io")

const initialaizedSocketio = (server)=>{

    const io = socket(server,{
        cors:{
          origin:'http://localhost:5173',
        }
      })
      
      io.on("connection",(socket)=>{
      
        socket.on("joinChat",({firstName, userId, requestId })=>{
          const roomId = [userId,requestId].sort().join("_")

          console.log(firstName+" joined room :"+ roomId)

          socket.join(roomId)
        })
        socket.on("sendMessage",()=>{})
        socket.on("disconnect",()=>{})
      })
}

module.exports = initialaizedSocketio;