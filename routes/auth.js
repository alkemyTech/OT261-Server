const { check } = require('express-validator');
const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth');


router.post('/register',[
    check('firstName','Name is required').not().isEmpty(),
    check('lastName','LastName is required').not().isEmpty(),
    check('password','Password min 6 characters').isLength({min:6,
    max:20}),
    check('email','Invalid email, please enter again').isEmail()
], async (req, res, next) => {
  try {
    const { firstName, password, email, lastName, image  } = req.body
    const response = await controller.userRegistro(firstName, password, email, lastName, image,req )

    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
});

module.exports = router;