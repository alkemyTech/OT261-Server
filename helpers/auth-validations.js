const db = require('../schemas');
const { User } = db.sequelize.models;

const existsUserWithThisEmail = async (email) => {
  const existsUser = await User.findOne({ where: { email } });
  if (!existsUser) {
    throw new Error(`El correo o la contraseña no son válidos`);
  }
};

module.exports = { existsUserWithThisEmail };
