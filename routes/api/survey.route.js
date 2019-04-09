var express = require('express');
var SurveyController = require('../../controllers/surveys.controller');

var router = express.Router();

router.get('/',
    SurveyController.getSurveys);
router.post('/',
    SurveyController.saveSurvey);

router.get('/generate',
    SurveyController.generateSurveyData);

module.exports = router;