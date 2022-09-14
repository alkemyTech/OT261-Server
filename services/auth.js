const db = require('../schemas')
const { User } = db.sequelize.models
const bcrypt = require('bcryptjs')

class AuthService {
  static async findUserByEmail(email) {
    const user = await User.findOne({ where: { email } })
    return user
  }
  static comparePasswords(password, passwordDB) {
    const validPassword = bcrypt.compareSync(password, passwordDB)
    return validPassword
  }
  static getUserWithoutPassword(user) {
    const { password, ...userWithoutPassword } = user.toJSON()
    return userWithoutPassword
  }
}

const Sequelize = require('sequelize')
const sequelize = require('../schemas').sequelize
// const User = require('../schemas/user')(
//   sequelize,
//   Sequelize.DataTypes,
//   Sequelize.Model
// )
const { validationResult } = require('express-validator')

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

module.exports = { userRegister, AuthService }
