var express = require('express')
var router = express.Router()
const { validateFields } = require('../middlewares')
const { login } = require('../controllers/auth')
const { body, check } = require('express-validator')
const { existsUserWithThisEmail } = require('../helpers/auth-validations')

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
    validateFields
  ],
  login
)

const controller = require('../controllers/auth')

router.post(
  '/register',
  [
    check('firstName', 'Name is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('password', 'Password min 6 characters').isLength({
      min: 6,
      max: 20
    }),
    check('email', 'Invalid email, please enter again').isEmail()
  ],
  async (req, res, next) => {
    try {
      const { firstName, password, email, lastName, image } = req.body
      const response = await controller.userRegistro(
        firstName,
        password,
        email,
        lastName,
        image,
        req
      )

      res.status(201).send(response)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
