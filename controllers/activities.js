const service = require('../services/activity')

const controllerUpdateActivity = async (id, newValues) => {
  try {
    const dto = await service.serviceUpdateActivity(id, newValues)
    console.log(dto)
    return dto
  } catch (error) {
    return error
  }
}

async function controllerCreateActivity(name, content, image) {
  let dto = {
    message: '',
    status: 200,
    data: [],
    error: []
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
    console.log(error.message)
    dto.error = error
    dto.status = 400
    dto.message = error.message
    dto.data = []
    return dto
  }
}

module.exports = {
  controllerCreateActivity,
  controllerUpdateActivity
}
