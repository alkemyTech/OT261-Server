const { request, response } = require('express');
const bcrypt = require('bcryptjs');

/* ======================
   Endpoint: /auth/login
   ====================== */

const login = (req = request, res = response, next) => {
  const { email, password } = req.body;

  console.log(email);

  res.send('respond with a resource');
};

module.exports = { login };
