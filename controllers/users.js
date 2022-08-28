const serviceJWT = require('../services/users');

const generateJWT = (_req, res) => {
  const token = serviceJWT();
  return res.status(200).json(token);
}

module.exports = generateJWT;