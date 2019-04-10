const express = require('express');
const check = require('express-validator/check');
const ControllerHandler = require('../../middlewares/controller.handler');
const SurveyController = require('../../controllers/surveys.controller');

var router = express.Router();

// api/survey ---------------------------------------------------------------------

router.get('/', [
        check.query('limit').isInt({$gt: 0}).optional(),
        check.query('offset').isInt({$gt: -1}).optional()
    ],
    ControllerHandler(
        SurveyController.getSurveys,
        (req, res, next) => [
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined
        ]
    )
);
router.post('/',
    ControllerHandler(
        SurveyController.saveSurvey,
        (req, res, next) => [
            req.body
        ]
    )
);

// api/survey/generate ------------------------------------------------------------

router.get('/generate', [
        check.query('tops').isInt({$gt: 0, $lt: 10}),
        check.query('bottoms').isInt({$gt: 0, $lt: 10}),
    ],
    ControllerHandler(
        SurveyController.generateSurveyData,
        (req, res, next) => [
            parseInt(req.query.tops),
            parseInt(req.query.bottoms)
        ]
    )
);

// --------------------------------------------------------------------------------

module.exports = router;