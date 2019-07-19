"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  player1: {
    type: Schema.ObjectId,
    ref: "User"
  },
  player2: {
    type: Schema.ObjectId,
    ref: "User"
  },
  data: {
    type: Array
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: "User"
  },
  turn: {
    type: Schema.ObjectId,
    ref: "User"
  },
  lastRow:  Number,
  lastCol: Number
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
