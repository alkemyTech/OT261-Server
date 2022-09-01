const { request, response } = require('express')
const AuthService = require('../services/auth')

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

module.exports = { login }
