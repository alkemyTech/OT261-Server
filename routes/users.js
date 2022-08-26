var express = require('express');
const get = require('../controllers/users');
var router = express.Router();

/* GET users listing. */
router.get('/',get )

module.exports = router;
