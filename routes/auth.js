const { request, response } = require('express');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

/* ======================
   Endpoint: /auth/login
   ====================== */

router.post('/login', (req = request, res = response, next) => {
  const { email, password } = req.body;

  res.send('respond with a resource');
});

module.exports = router;
