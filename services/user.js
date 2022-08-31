async function serviceGetUser(name) {
  try {
    const algo = ['pedro', 'enrique', 'julian', 'sofia']

    if (algo.includes(name)) return 'Exist in db'

    return 'Not exist in db'
  } catch (error) {
    return error
  }
}
module.exports = {
  serviceGetUser
}