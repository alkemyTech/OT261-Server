const { request, response } = require('express')
const ActivitiesService = require('../services/activities.service')
const service = require('../services/activity')

const updateActivity = async (req = request, res = response, next) => {
  const { name, content } = req.body
  const { id } = req.params
  const existsActivity = await ActivitiesService.findActivityById(id)
  if (!existsActivity) {
    return res
      .status(400)
      .json({ ok: false, msg: `No existe una actividad con el id ${id}` })
  }
  const activityUpdated = await ActivitiesService.updateActivity(id, {
    name,
    content,
  })

  return res.json(activityUpdated)
}

async function controllerCreateActivity(name, content, image) {
  let dto = {
    message: '',
    status: 200,
    data: [],
    error: [],
  }

  const allowedExtensions = ['jpeg', 'png', 'webp']
  const maxFileSizeMB = 5
  try {
    if (!name || !content || !image) {
      throw new Error('Please fill all the required fields')
    } else if (!allowedExtensions.includes(image.mimetype.split('/')[1])) {
      throw new Error('Image extension not allowed')
    } else if (image.size / (1024 * 1024) > maxFileSizeMB) {
      throw new Error('Image size too large, must be less than 5MB')
    }
    const responseService = await service.serviceCreateActivity(
      name,
      content,
      image
    )
    dto.data = responseService

    return dto
  } catch (error) {
    dto.error = error
    dto.status = 400
    dto.message = error.message
    dto.data = []
    return dto
  }
}

module.exports = {
  controllerCreateActivity,
  updateActivity,
}
