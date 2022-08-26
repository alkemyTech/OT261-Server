const db = require('../models');
const { User } = db.sequelize.models;

const existsEmail = async (email) => {
  const existsEmail = await User.findOne({ where: { email } });
  console.log(existsEmail);
  if (!existsEmail) {
    throw new Error(`El correo o la contraseña no son válidos`);
  }
};

module.exports = { existsEmail };
