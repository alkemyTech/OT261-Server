const db = require('../schemas')
const { User } = db.sequelize.models

const existsUserWithThisEmail = async email => {
  const existsUser = await User.findOne({ where: { email } })
  console.log('USEEER', existsUser)
  if (!existsUser && existsUser.status) {
    throw new Error(`El correo o la contraseña no son válidos`)
  }
  return true
}
module.exports = { existsUserWithThisEmail }
