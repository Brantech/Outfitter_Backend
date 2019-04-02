var express = require('express');
var outfits = require('./api/outfit.route');

var router = express.Router();

router.use('/outfits', outfits);

module.exports = router;