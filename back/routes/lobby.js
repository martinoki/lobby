const express = require("express");
const router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function(req, res, next) {
  const username = req.body.username;
  if (!username) {
    res.status(400).send({ error: "Ingrese el nombre de usuario." });
  } else {
    try {
      const user = await User.find({ username });
      if (!user.length) {
        const newUser = User({ username });
        newUser.save();
        res.send(newUser);
      } else {
        res.send(user);
      }
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }
});

module.exports = router;
