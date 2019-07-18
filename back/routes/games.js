const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const middleware = require("../middleware/authentication");

router.get("/", async function(req, res, next) {
  const games = await Game.find({});
  res.send(games);
});

//Devuelvo los datos de una sala, primero verifico que el usuario que se conectó pertenezca a la partida
router.get("/:id_room", async function(req, res, next) {
  const user = req.headers.authorization;
  const game = await Game.findById(req.params.id_room);
  if (!game) {
    res.status(400).send({ error: "La sala no existe" }); //Bad Request
  } else {
    if (game.player1 != user && game.player2 != user) {
      res
        .status(400)
        .send({ error: "El usuario no se encuentra jugando en esta sala" }); //Bad Request
    } else {
      res.send(game);
    }
  }
});

//Si en id me llega un 0 estoy creando una partida, sino me estoy uniendo
router.post("/:id_room", middleware.isValidUser, async function(
  req,
  res,
  next
) {
  const user = req.headers.authorization;
  if (req.params.id_room == 0) {
    const newGame = await Game({ player1: user, createdBy: user });
    newGame.save();
    res.send(newGame);
  } else {
    const game = await Game.findById(req.params.id_room);
    if (game) {
      const joinGame = await Game({ player2: user });
      res.send(joinGame);
    } else {
      res.status(400).send({ error: "La sala no existe" });
    }
  }
});

//Actualizo la data de la partida
router.put("/:id_room", middleware.isValidUser, async function(req, res, next) {
  const game = await Game.findById(req.params.id_room);
  const user = req.headers.authorization;

  if (!game) {
  } else {
  }

  if (req.params.id_room == 0) {
    const newGame = Game({ player1: user, createdBy: user });
    newGame.save();
    res.send(newGame);
  } else {
    const game = await Game.findById(req.params.id_room);
    res.send(game);
  }
});

//Me voy de una sala.
router.delete("/:id_room", middleware.isValidUser, async function(
  req,
  res,
  next
) {
  const user = req.headers.authorization;
  const game = await Game.findById(req.params.id_room);
  if (!game) {
    res.status(400).send({ error: "La sala no existe" }); //Bad Request
  } else {
    console.log("ACA");
    if (game.createdBy == user) {
      const deleted = await Game.findByIdAndDelete(req.params.id_room);
      res.send(deleted);
    } else {
      console.log(game.createdBy, user);
      res
        .status(401) //Unauthorized
        .send({ error: "No tiene permisos para eliminar la sala" });
    }
  }
});

module.exports = router;
