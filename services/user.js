const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig')

async function serviceGetUser(name) {
  try {
    const algo = ['pedro', 'enrique', 'julian', 'sofia']

    if (algo.includes(name)) return 'Exist in db'

    return 'Not exist in db'
  } catch (error) {
    return error
  }
}

async function serviceGenerateJWT(userWithoutPassword) {
  try {
    // const exampleObject = {
    //   name: 'Example Object',
    //   email: 'example@example.com',
    // };

    const token = jwt.sign(userWithoutPassword, jwtConfig.secret, {
      expiresIn: jwtConfig.expiration_time
    })

    return { user: userWithoutPassword, token }
  } catch (error) {
    return error
  }
}

module.exports = {
  serviceGetUser,
  serviceGenerateJWT
}
