const service = require('../services/user')
let dto = {
  message: 'Is ok',
  status: 200,
  data: [],
  error: []
}

async function controllerGetUser(name) {
  try {

    const responseService = await service.serviceGetUser(name)
    dto.data = responseService
    return dto
  } catch (error) {
    dto.error = error
    return dto
  }
}


module.exports = {
  controllerGetUser
}