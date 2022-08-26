var express = require('express');
var router = express.Router();
const { validateFields } = require('../middlewares');
const { login } = require('../controllers/auth');
const { body, check } = require('express-validator');
const { existsUserWithThisEmail } = require('../helpers/auth-validations');

/* ======================
   Endpoint: /auth/login
   ====================== */

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('El email no es válido'),
    body('password')
      .isLength({ min: 5 })
      .withMessage('La contraseña debe tener al menos 5 caracteres'),
    check('email').custom(existsUserWithThisEmail),
    validateFields,
  ],
  login
);

module.exports = router;
