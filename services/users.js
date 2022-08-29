const jwt = require('jsonwebtoken');

exports.generateJWT = () => {
  const exampleObject = {
    name: 'Example Object',
    email: 'example@example.com',
  };

  const token = jwt.sign(exampleObject, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  return {user: exampleObject, token};
};