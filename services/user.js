const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwtConfig')
const db = require('../schemas')
const { User } = db.sequelize.models

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

    return token
  } catch (error) {
    return error
  }
}

const deleteUserById = async id => {
  const dto = {
    message: '',
    status: 200,
    data: [],
    errors: []
  }
  try {
    const userDeleted = await User.update(
      { status: false },
      {
        where: {
          id
        }
      }
    )
    if (userDeleted > 0) {
      dto.message = `Se ha eliminado ${userDeleted} usuario`
      return dto
    }
    throw new Error(`No se encontro un usuario con el id ${id}`)
  } catch (error) {
    const dto = {
      error,
      status: 400,
      message: error.message,
      data: []
    }
    return dto
  }
}

module.exports = {
  serviceGetUser,
  serviceGenerateJWT,
  deleteUserById
}
