const {userService} = require('../services');

exports.generateJWT = (_req, res) => {
  const token = userService.generateJWT();
  return res.status(200).json(token);
};