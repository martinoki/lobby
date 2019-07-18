const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

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

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", usersRouter);
app.use("/api/lobby", lobbyRouter);
app.use("/api/games", gamesRouter);

module.exports = app;
