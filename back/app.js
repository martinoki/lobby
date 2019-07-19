const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const socketio = require("socket.io");
var cors = require('cors');
app.use(cors());
// const io = socketio(server);
// io.on("connection", (socket) => {
//   console.log("new websocket connection")
//   // socket.emit('countUpdated')
//   socket.on('greet', function(data) {
//     console.log(data);
//     socket.emit('respond', { hello: 'Hey, Mr.Client!' });
//   });
//   socket.on('disconnect', function() {
//     console.log('Socket disconnected');
//   });
// });

// server.listen(3002, () => console.log(`Listening on port 3002`));


mongoose
  .connect("mongodb://mongo/games", { useNewUrlParser: true })
  .then(reponse => {
    console.log("CONECTADA!");
  })
  .catch(err => {
    console.log("Error al conectar con la db");
  });

const usersRouter = require("./routes/users");
const lobbyRouter = require("./routes/lobby");
const gamesRouter = require("./routes/games");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", usersRouter);
app.use("/api/lobby", lobbyRouter);
app.use("/api/games", gamesRouter);

module.exports = app;
