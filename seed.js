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
    const user = await User.create({
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      image: 'test',
      password: '123456',
    });
    console.log(`\nemail: ${user.email}\npassword: ${user.password}\n`);
    /* ======================
       Vincula el rol creado al usuario ↓↓
       ====================== */
    user.setRole(rol);
  });
