var express = require('express');
var OutfitsController = require('../../controllers/outfits.controller');

var router = express.Router();

router.get('/recommendations', OutfitsController.getRecommendations);

module.exports = router;