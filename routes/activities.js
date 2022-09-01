const { request, response } = require('express')
const express = require('express')
const router = express.Router()

router.put('/', (req = request, res = response, next) => {
  res.send('respond with a resource')
})

module.exports = router
