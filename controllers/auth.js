const { request, response } = require('express')
const { AuthService } = require('../services/auth')

/* ======================
   Endpoint: /auth/login
   ====================== */

const login = async (req = request, res = response, next) => {
  const { email, password } = req.body

  const user = await AuthService.findUserByEmail(email)
  const validPassword = AuthService.comparePasswords(password, user.password)
  if (!validPassword) {
    return res
      .status(400)
      .json({ ok: false, msg: `El correo o la contraseña no son válidos` })
  }

  const userWithoutPassword = AuthService.getUserWithoutPassword(user)
  return res.json(userWithoutPassword)
}

const { userRegister } = require('../services/auth')
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

module.exports = { login, userRegistro }
