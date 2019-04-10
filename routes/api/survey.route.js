const express = require('express');
const check = require('express-validator/check');
const ControllerHandler = require('../../middlewares/controller.handler');
const SurveyController = require('../../controllers/surveys.controller');

var router = express.Router();

// api/survey ---------------------------------------------------------------------

router.get('/', [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        SurveyController.getSurveys,
        (req, res, next) => [
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined
        ]
    )
);
router.post('/', [
        check.body('sex').isInt({min: 0, max: 1}),
        check.body('state').isInt({min: 0, max: 49}),
        check.body('formality').isInt({min: 0, max: 10}),
        check.body('season').isInt({min: 0, max: 3}),
        check.body('temperature').isInt({min: 0, max: 2}),
        check.body('weather').isInt({min: 0, max: 3}),
        check.body('createdOutfit.top').isURL(),
        check.body('createdOutfit.bottom').isURL(),
        check.body('createdOutfit.rating').isInt({min: 1, max: 5}),
        check.body('randomOutfit.top').isURL(),
        check.body('randomOutfit.bottom').isURL(),
        check.body('randomOutfit.rating').isInt({min: 1, max: 5})
    ],
    ControllerHandler(
        SurveyController.saveSurvey,
        (req, res, next) => [
            req.body
        ]
    )
);

// api/survey/generate ------------------------------------------------------------

router.get('/generate', [
        check.query('tops').isInt({min: 1, max: 10}),
        check.query('bottoms').isInt({min: 1, max: 10}),
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