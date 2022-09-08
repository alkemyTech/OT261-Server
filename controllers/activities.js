const { request, response } = require('express')
const ActivitiesService = require('../services/activities.service')

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

module.exports = { updateActivity }
