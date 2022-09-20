const { Router, request, response } = require('express')
const router = Router()
const { body, check } = require('express-validator')
const activitiesController = require('../controllers/activities')
const { validateFields } = require('../middlewares/validateFields')
const { upload } = require('../S3-sdkConfig')
const controller = require('../controllers/activities')

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
  async (req = request, res = response, next) => {
    try {
      const { name, content } = req.body
      const { id } = req.params
      const newValues = { name, content }
      const response = await controller.controllerUpdateActivity(id, newValues)
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { name, content } = req.body
    const image = req.file
    const response = await controller.controllerCreateActivity(
      name,
      content,
      image
    )

    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router
