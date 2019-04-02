var express = require('express');
var OutfitsController = require('../../controllers/outfits.controller');
var Authorization = require('../../auth/authorization');

var router = express.Router();

router.get('/recommendations', Authorization, OutfitsController.getRecommendations);

module.exports = router;