var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const { userRegister } = require('../controllers/auth');

router.post('/register',[
    check('firstName','Name is required').not().isEmpty(),
    check('lastName','LastName is required').not().isEmpty(),
    check('password','Password min 6 characters').isLength({min:6,
    max:20}),
    check('email','Invalid email, please enter again').isEmail()
],userRegister)

module.exports = router;
