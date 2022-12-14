const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig')

const verifyJWT = (req, _res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['token']
  const token =
    authHeader && authHeader.startsWith('Bearer') && authHeader.split(' ')[1]

  if (token == null) return next(new Error('Invalid token'))

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) return next(new Error('Invalid token'))
    req.user = user
    next()
  })
}

module.exports = verifyJWT
