var express = require('express');
var Authorization = require('../auth/authorization');
var outfits = require('./api/outfit.route');

var router = express.Router();

router.use('/outfits', Authorization, outfits);

module.exports = router;