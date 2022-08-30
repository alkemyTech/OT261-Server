const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

exports.generateJWT = () => {
  const exampleObject = {
    name: 'Example Object',
    email: 'example@example.com',
  };

  const token = jwt.sign(exampleObject, jwtConfig.secret, {
    expiresIn: jwtConfig.expiration_time,
  });

  return {user: exampleObject, token};
};