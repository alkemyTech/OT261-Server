const bcrypt = require('bcryptjs');

const db = require('./models');
const sequelize = db.sequelize;

const { User, Role } = db.sequelize.models;

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('DB connected');
  })
  .then(async () => {
    /* ======================
       Crea el rol standard ↓↓
       ====================== */
    const standardRole = await Role.create({
      name: 'Standard',
      description: 'Rol para los usuarios logeados',
    });
    return standardRole;
  })
  .then(async (rol) => {
    /* ======================
       Crea un usuario ↓↓
       ====================== */
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('123456', salt);
    const user = await User.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      image: 'test',
      password: hash,
    });
    console.log(`\nemail: ${user.email}\npassword: ${user.password}\n`);
    /* ======================
       Vincula el rol creado al usuario ↓↓
       ====================== */
    user.setRole(rol);
  });
