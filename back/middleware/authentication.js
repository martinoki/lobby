const User = require("../models/user");

exports.isValidUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    res
      .status(401)
      .send({ error: "No posee permisos para realizar esta acción." });
  } else {
    const user = await User.findById(req.headers.authorization);
    if (!user) {
      res
        .status(401)
        .send({ error: "Usuario inválido." });
    } else {
      next();
    }
  }
};
