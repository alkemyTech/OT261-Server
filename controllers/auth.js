const { request, response } = require('express');
const db = require('../schemas');
const { User } = db.sequelize.models;
const bcrypt = require('bcryptjs');

/* ======================
   Endpoint: /auth/login
   ====================== */

const login = async (req = request, res = response, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  /* ======================
     Compara las contraseñas
     ====================== */
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ ok: false, msg: `El correo o la contraseña no son válidos` });
  }

  const { password: pass, ...userWithoutPassword } = user.toJSON();
  return res.json(userWithoutPassword);
};

module.exports = { login };
