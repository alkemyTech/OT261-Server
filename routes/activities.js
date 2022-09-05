const express = require('express');
const router = express.Router();
const {upload} = require('../S3-sdkConfig');

const controller = require('../controllers/activities');

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { name, content } = req.body;
    const image = req.file;
    const response = await controller.controllerCreateActivity(name, content, image);

    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
