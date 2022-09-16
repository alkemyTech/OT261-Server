const { userRegister } = require('../services/auth')
const service = require('../services/auth')

async function userRegistro(firstName, password, email, lastName, image, req) {
  let dto = {
    message: 'Is ok',
    status: 201,
    data: [],
    errors: []
  }
  try {
    const responseService = await userRegister(
      firstName,
      password,
      email,
      lastName,
      image,
      req
    )
    dto.data = responseService
    return dto
  } catch (error) {
    dto.errors = error
    return dto
  }
}

/* ======================
   Endpoint: /auth/login
   ====================== */

const login = async (email, password) => {
  try {
    const dto = await service.login(email, password)
    return dto
  } catch (error) {
    return error
  }
}

module.exports = { login, userRegistro }
