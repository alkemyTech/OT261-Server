const express = require("express")
const Sequelize = require('sequelize');
const sequelize = require('../models').sequelize;
const User = require('../models/user')(sequelize, Sequelize.DataTypes,Sequelize.Model)
var bcrypt = require('bcryptjs')
const { validationResult } = require("express-validator")

const userRegister = async (req, res) => {
  let { firstName, password, email,lastName,image } = req.body;

  image = image? image: 'https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

  const errors = validationResult(req);
  if (!errors.isEmpty())  return res.status(400).json(errors);



  try {
    const user = new User({ firstName, password, email,lastName,image });

    const existsUser = await User.findOne({ where: { email: email } });
    

    if (existsUser) {
      return res.status(400).json({ msg: "This email is already associated with an account" });
    }

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
   

    res.json({
      user,
      
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
  }
};

module.exports = { userRegister };
