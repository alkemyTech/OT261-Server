const { userRegister } = require('../services/auth')
const service = require('../services/auth')

async function userRegistro(firstName, password, email, lastName, image, req) {
  const dto = await userRegister(
    firstName,
    password,
    email,
    lastName,
    image,
    req
  )
  return dto
}

/* ======================
   Endpoint: /auth/login
   ====================== */

const login = async (email, password) => {
  const dto = await service.login(email, password)
  return dto
}

module.exports = { login, userRegistro }
