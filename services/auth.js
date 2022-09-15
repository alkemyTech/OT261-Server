const db = require('../schemas')
const { User } = db.sequelize.models
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const sequelize = require('../schemas').sequelize
// const User = require('../schemas/user')(
//   sequelize,
//   Sequelize.DataTypes,
//   Sequelize.Model
// )
const { validationResult } = require('express-validator')
const { serviceGenerateJWT } = require('./user')

async function userRegister(firstName, password, email, lastName, image, req) {
  image = image
    ? image
    : 'https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

  const errors = validationResult(req)

  if (!errors.isEmpty()) return errors

  try {
    const user = new User({ firstName, password, email, lastName, image })

    const existsUser = await User.findOne({ where: { email: email } })

    if (existsUser) {
      return { msg: 'This email is already associated with an account' }
    }

    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    return user
  } catch (error) {
    return { msg: error }
  }
}

const login = async (email, password) => {
  const dto = {
    message: '',
    status: 200,
    data: [],
    errors: []
  }
  try {
    const user = await User.findOne({ where: { email } })
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      dto.message = `El correo o la contraseña no son válidos`
      dto.status = 400
      dto.errors = [...dto.errors, { msg: dto.message }]
      return dto
    }

    const { password: pass, ...userWithoutPassword } = user.toJSON()
    const data = await serviceGenerateJWT(userWithoutPassword)
    dto.data = data
    return dto
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

module.exports = { userRegister, login }
