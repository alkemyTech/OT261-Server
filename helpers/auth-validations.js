const db = require('../schemas')
const { User } = db.sequelize.models

const existsUserWithThisEmail = async email => {
  const existsUser = await User.findOne({ where: { email } })
  console.log('USEEER', existsUser)
  if (!existsUser) {
    throw new Error(`El correo o la contraseña no son válidos`)
  }
  if (!existsUser.status) {
    throw new Error(`Usuario eliminado`)
  }
  return true
}
module.exports = { existsUserWithThisEmail }
