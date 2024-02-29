const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const { log, error } = require('console');
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001"
  }
});

let activeChatUsers = [];
let activeVideoCallUsers = [];

// Chat namespace
const chatNamespace = io.of('/chat');
chatNamespace.on("connection", (socket) => {
  // Adds New User to chat
  socket.on('new-user-add', (newUserId) => {
    if (!newUserId || newUserId != undefined) {
      if (!activeChatUsers.some((user) => user.userId === newUserId)) {
       
        activeChatUsers.push({
          userId: newUserId,
          socketId: socket.id
          
        })

      }
    }
    console.log("Connected chat users", activeChatUsers);
    chatNamespace.emit('get-users', activeChatUsers);
  });

  // User Disconnected from chat
  socket.on("disconnect", () => {
    activeChatUsers = activeChatUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected from chat " + socket.id);
    chatNamespace.emit('get-users', activeChatUsers);
  });

  // Send Message in chat
  socket.on("send-message", (data) => {
    const { reciverId } = data;
    const user = activeChatUsers.find((user) => user.userId == reciverId);
    if (user) {
      chatNamespace.to(user.socketId).emit("recive-message", data);
    }
    
  });

  // Set Typing Status in chat
  socket.on("set-typing", (data) => {
    const user = activeChatUsers.find((user) => user.userId == data.userId);
    console.log("this is the receiver", user);
    console.log("these are the active chat users", activeChatUsers);
    if (user && user.socketId !== socket.id) {
      chatNamespace.to(user.socketId).emit("set-typing-status", data.status);
    }
  });
});






// Video call namespace
const videoCallNamespace = io.of('/video-call');
videoCallNamespace.on("connection", (socket) => {
  console.log("User Connected ",socket.id);


  socket.on('join_room', (newUserId,RooomId) => {
      
    if (!newUserId || newUserId != undefined) {
      if (!activeVideoCallUsers.some((user) => user.userId === newUserId)) {
        //  console.log("This is the peer id",newUserId);
         
        activeVideoCallUsers.push({
          userId: newUserId,
          socketId: socket.id,
          RooomId:RooomId
        })


        socket.join(RooomId); // Join the room
        console.log("new user id "+newUserId);
        videoCallNamespace.to(RooomId).emit("user-connected",newUserId); // Emit event to room
       }
    }
    videoCallNamespace.emit('get-users', activeVideoCallUsers);

    socket.on('disconnect', () => {
      activeVideoCallUsers= activeVideoCallUsers.filter((user) => user.socketId !== socket.id);
      videoCallNamespace.to(RooomId).emit('user-disconnected',socket.id)
      console.warn("User Disconnected",socket.id);
    })

    socket.on("leaveCall",(userId)=>{
      socket.disconnect();
      videoCallNamespace.to(RooomId).emit('user-disconnected',userId)

    })
    socket.on("mute-me",(myPeerId,RooomId)=>{
      console.log("Mute this person "+RooomId);
      videoCallNamespace.to(RooomId).emit('mute-Reciver',socket.id)
    })


  })


  
});

server.listen(8800, () => {
  console.log('Server is running on port 8800');
});
