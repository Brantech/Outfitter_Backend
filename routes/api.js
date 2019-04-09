var express = require('express');
var garments = require('./api/garment.route');
var surveys = require('./api/survey.route');
var users = require('./api/user.route');

var router = express.Router();

router.use('/garments', garments);
router.use('/surveys', surveys);
router.use('/users', users);

module.exports = router;