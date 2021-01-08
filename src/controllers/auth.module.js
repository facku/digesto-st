const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Response = require('../utils/responses');
const Database = require('../database');

const login = async (req, res) => {
  const name = req.body.username;
  const password = req.body.password;

  const user = await Database.user.findOne({ name });

  if (user === null) {
    Response.fail(res, {
      message: `El usuario "${name} no existe."`,
    });
  } else {
    if (bcrypt.compareSync(password, user.passwordHash)) {
      const token = jwt.sign(
        { name: user.name, id: user.id },
        process.env.JwT_SECRET,
        {
          expiresIn: process.env.JwT_EXPIRE,
        }
      );

      Response.ok(res, {
        message: `Bienvenido "${name}"`,
        token,
      });
    } else {
      Response.fail(res, {
        message: 'Clave incorrecta',
      });
    }
  }
};

module.exports = {
  login,
};
