const { Router } = require('express')
const router = Router()
const { body, check, validationResult } = require('express-validator')
const activitiesController = require('../controllers/activities')

router.put(
  '/:id',
  [
    check('id').not().isEmpty().withMessage('El id es requerido'),
    body('title').not().isEmpty().withMessage('El titulo es requerido'),
    body('description')
      .not()
      .isEmpty()
      .withMessage('La description es requerida')
  ],
  activitiesController.updateActivity
)

module.exports = router
