const bcrypt = require('bcryptjs')

const db = require('./schemas')
const sequelize = db.sequelize

const { User, Role } = db.sequelize.models

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('DB connected')
  })
  .then(async () => {
    /* ======================
       Crea el rol standard ↓↓
       ====================== */
    const standardRole = await Role.create({
      name: 'Standard',
      description: 'Rol para los usuarios logeados'
    })
    /* ======================
       Crea el rol admin ↓↓
       ====================== */
    const adminRole = await Role.create({
      name: 'Admin',
      description: 'Rol para los administradores'
    })
    return { standardRole, adminRole }
  })
  .then(async ({ standardRole, adminRole }) => {
    /* ======================
       Crea un usuario standard ↓↓
       ====================== */
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync('123456', salt)
    const user = await User.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      image: 'test',
      password: hash
    })
    console.log(`\nemail: ${user.email}\npassword: ${user.password}\n`)
    /* ======================
       Vincula el rol standard al usuario ↓↓
       ====================== */
    await user.setRole(standardRole)
    /* ======================
       Crea un usuario admin ↓↓
       ====================== */
    const admin = await User.create({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      image: 'image',
      password: hash
    })
    console.log(`\nemail: ${admin.email}\npassword: ${admin.password}\n`)
    /* ======================
      Vincula el rol admin al usuario ↓↓
      ====================== */
    await admin.setRole(adminRole)
    process.exit()
  })
