const Sequelize = require("sequelize");
const sequelize = require("../schemas").sequelize;
const User = require("../schemas/user")(
  sequelize,
  Sequelize.DataTypes,
  Sequelize.Model
);
var bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function userRegister(firstName, password, email, lastName, image,req ) {
  console.log('llegue acaa')

  image = image? image : "https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) return errors;

  try {
    const user = new User({ firstName, password, email, lastName, image });

    const existsUser = await User.findOne({ where: { email: email } });

    if (existsUser) {
      return { msg: "This email is already associated with an account" };
    }

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return user;
  } catch (error) {
    
    return { msg: error };
  }
}

module.exports = { userRegister };
