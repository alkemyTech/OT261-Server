const { s3Upload } = require('../S3-sdkConfig')
const db = require('../schemas')
const { Activities } = db.sequelize.models

async function serviceCreateActivity(name, content, image) {
  try {
    const resImage = await s3Upload(image)
    const newActivity = await db['Activities'].create({
      name,
      content,
      image: resImage['$metadata'].extendedRequestId,
    })
    return newActivity
  } catch (error) {
    return error
  }
}

const serviceUpdateActivity = async (idActivity, newValues) => {
  const dto = {
    message: '',
    status: 200,
    data: [],
    error: [],
  }
  try {
    const existsActivity = await Activities.findByPk(idActivity)
    if (!existsActivity) {
      throw new Error(`No existe una actividad con el id ${idActivity}`)
    }
    const [activitiesUpdated] = await Activities.update(newValues, {
      where: {
        id: idActivity,
      },
    })
    if (!activitiesUpdated) {
      throw new Error(`No pudo actualizar la actividad con el id ${idActivity}`)
    }
    const activityUpdated = await Activities.findByPk(idActivity)
    const { id, name, image, content } = activityUpdated.toJSON()
    dto.data = { id, name, image, content }
    return dto
  } catch (error) {
    const dto = {
      error,
      status: 400,
      message: error.message,
      data: [],
    }
    return dto
  }
}

module.exports = {
  serviceCreateActivity,
  serviceUpdateActivity,
}
