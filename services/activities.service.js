const db = require('../schemas')
const { Activities } = db.sequelize.models

class ActivitiesService {
  static async findActivityById(id) {
    const activity = await Activities.findByPk(id)
    return activity
  }
  static async updateActivity(id, activity) {
    const activityUpdated = await Activities.update(activity, {
      where: {
        id
      }
    })
    return activityUpdated
  }
}

module.exports = ActivitiesService
