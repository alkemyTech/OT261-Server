const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');

router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query
    const response = await controller.controllerGetUser(name)

    res.status(201).send(response)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
