const { userRegister } = require('../services/auth')
const service = require('../services/auth')
let dto = {
  message: 'Is ok',
  status: 200,
  data: [],
  error: []
}

async function userRegistro(firstName, password, email, lastName, image, req) {
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
    dto.error = error
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
