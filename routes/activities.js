const { Router } = require('express')
const router = Router()
const { body, check } = require('express-validator')
const activitiesController = require('../controllers/activities')
const { validateFields } = require('../middlewares/validateFields')

const isRequired = prop => {
  return `${prop} is required`
}

/* ======================
   Update activity ↓↓
   ====================== */
router.put(
  '/:id',
  [
    check('id').not().isEmpty().withMessage(isRequired('id')),
    body('name').not().isEmpty().withMessage(isRequired('name')),
    body('content').not().isEmpty().withMessage(isRequired('content')),
    validateFields,
  ],
  activitiesController.updateActivity
)

module.exports = router
