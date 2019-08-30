const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
const webSocket = require("./webSocket");
// const http = require("http");
// const server = http.createServer(app);
// const socketio = require("socket.io");
// const io = socketio(server).listen(3001);
// // const webSocket;
// io.on("connection", socket => {
//   console.log("new websocket connection");
//   console.log("Socket: ", socket);

//   socket.on("greet", function(data) {
//     console.log(data);
//     socket.emit("respond", { hello: "Hey, Mr.Client!" });
//   });

//   socket.on("disconnect", function() {
//     console.log("Socket disconnected");
//   });
// });

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
// exports.io = webSocket;
