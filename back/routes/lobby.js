const express = require("express");
const router = express.Router();
const User = require("../models/user");
// const ws = require("../webSocket");
/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function(req, res, next) {
  const username = req.body.username;
  if (!username) {
    res.status(400).send({ error: "Ingrese el nombre de usuario." });
  } else {
    const user = await User.findOne({ username });
    if (!user) {
      const newUser = User({ username });
      newUser.save();
      res.send(newUser);
    } else {
      res.send(user);
    }
  }
});

module.exports = router;
