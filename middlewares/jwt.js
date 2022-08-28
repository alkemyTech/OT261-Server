const jwt = require('jsonwebtoken')

const jwt = (req, _res, next) => {
  const authHeader = req.headers['authorization'];
  const token =
    authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1];

  if (token == null) return next(new Error('Invalid token'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new Error('Invalid token'));
    req.user = user;
    next();
  });
};

module.exports = jwt;
