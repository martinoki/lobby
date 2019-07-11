const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const middleware = require("../middleware/authentication");

router.get("/", function(req, res, next) {
  console.log("ENTRE ACA")
  res.send("respond with a resource");
});

//Devuelvo los datos de una sala, primero verifico que el usuario que se conectó pertenezca a la partida
router.get("/:id_room", async function(req, res, next) {
  const user = req.headers.authorization;
  const game = await Game.findById(req.params.id_room);
  if(!game){
    res.status(400).send({ error: "La sala no existe" }); //Bad Request
  }else{
    if(game.player1 != user && game.player2 != user){
      res.status(400).send({ error: "El usuario no se encuentra jugando en esta sala" }); //Bad Request
    }else{
      res.send(game);
    }
  }
});

//Si en id me llega un 0 estoy creando una partida, sino me estoy uniendo
router.post("/:id_room", middleware.isValidUser, async function(req, res, next) {
  if (req.params.id_room == 0) {
    const user = req.headers.authorization;
    const newGame = Game({ player1: user, createdBy: user });
    newGame.save();
    res.send(newGame);
  } else {
    const game = await Game.findById(req.params.id_room);
    res.send(game);
  }
});


//Actualizo la data de la partida
router.put("/:id_room", middleware.isValidUser, async function(req, res, next) {
  if (req.params.id_room == 0) {
    const user = req.headers.authorization;
    const newGame = Game({ player1: user, createdBy: user });
    newGame.save();
    res.send(newGame);
  } else {
    const game = await Game.findById(req.params.id_room);
    res.send(game);
  }
});

//Me voy de una sala.
router.delete("/:id_room", middleware.isValidUser, async function(req, res, next) {
  const user = req.headers.authorization;
  const game = await Game.findById(req.params.id_room);
  if (!game) {
    res.status(400).send({ error: "La sala no existe" }); //Bad Request
  } else {
    if (game.createdBy == user) {
      res.send(game.player1);
    } else {
      console.log(game.createdBy, user);
      res
        .status(401) //Unauthorized
        .send({ error: "No tiene permisos para eliminar la sala" });
    }
  }
});

module.exports = router;
