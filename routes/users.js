var express = require('express');
var router = express.Router();

const {userController} = require('../controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/jwt-test', userController.generateJWT);

module.exports = router;
