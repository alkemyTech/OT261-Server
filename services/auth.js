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

module.exports = AuthService
