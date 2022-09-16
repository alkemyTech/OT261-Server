const db = require('../schemas')
const { User } = db.sequelize.models
const bcrypt = require('bcryptjs')
const { serviceGenerateJWT } = require('./user')

async function userRegister(firstName, password, email, lastName, image, req) {
  const dto = {
    message: '',
    status: 201,
    data: [],
    errors: []
  }
  image = image
    ? image
    : 'https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

  try {
    const existsUser = await User.findOne({ where: { email: email } })
    if (existsUser) {
      throw new Error('This email is already associated with an account')
    }

    const user = new User({ firstName, password, email, lastName, image })

    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()
    const { password: pass, ...userWithoutPassword } = user.toJSON()

    dto.data = userWithoutPassword
    return dto
  } catch (error) {
    delete dto.data
    dto.message = error.message
    dto.status = 400
    dto.errors = [{ msg: error.message }]
    return dto
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
      throw new Error(`El correo o la contraseña no son válidos`)
    }

    const { password: pass, ...userWithoutPassword } = user.toJSON()
    const data = await serviceGenerateJWT(userWithoutPassword)
    dto.data = data
    return dto
  } catch (error) {
    delete dto.data
    dto.message = error.message
    dto.status = 400
    dto.errors = [{ msg: dto.message }]
    return dto
  }
}

module.exports = { userRegister, login }
