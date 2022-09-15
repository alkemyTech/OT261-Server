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

async function controllerGenerateJWT() {
  try {
    const responseService = await service.serviceGenerateJWT()
    dto.data = responseService
    return dto
  } catch (error) {
    dto.error = error
    return dto
  }
}

const controllerDeleteUser = async id => {
  try {
    const dto = await service.deleteUserById(id)
    return dto
  } catch (error) {
    return error
  }
}

module.exports = {
  controllerGetUser,
  controllerGenerateJWT,
  controllerDeleteUser
}
