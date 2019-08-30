const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server).listen(3001);
let rooms = [];
io.on("connection", socket => {
  console.log("new websocket connection");
  //   console.log("Socket: ", socket);
  //   socket.emit("respond", { hello: "Hey, Mr.ClientAAAA!" })

  socket.on("refreshGame", function(data) {
    socket.broadcast.emit("refreshGame");
    // console.log("NUEVO JUEGO")
  });

  socket.on("greet", function(data) {
    console.log(data);
    socket.emit("respond", { hello: "Hey, Mr.Client!" });
  });

  socket.on('joinRoom', function(room) {
    socket.join(room);
    socket.broadcast.to(room).emit('joinRoom', {});
    // console.log("Me uní a ", room)
    // console.log("Rooms: ", io.sockets.adapter.rooms)
  });

  socket.on('playerMovement', function(data) {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('playerMovement', {});
    // console.log("Me uní a ", room)
    // console.log("Rooms: ", io.sockets.adapter.rooms)
  });

  socket.on("disconnect", function() {
    console.log("Socket disconnected");
  });
});
