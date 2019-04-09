var express = require('express');
var garments = require('./api/garments.route');
var surveys = require('./api/surveys.route');
var users = require('./api/user.route');

var router = express.Router();

router.use('/garments', garments);
router.use('/survey', surveys);
router.use('/users', users);

module.exports = router;