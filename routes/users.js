var express = require('express');
var router = express.Router();

const generateJWT = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/jwt-test', generateJWT);

module.exports = router;
