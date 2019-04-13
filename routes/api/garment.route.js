const express = require('express');
const check = require('express-validator/check');
const Authorization = require('../../middlewares/authorization');
const ControllerHandler = require('../../middlewares/controller.handler');
const GarmentController = require('../../controllers/garments.controller');
const {parseOptionalInt} = require('./utils/arguments');

var router = express.Router();

// api/garment --------------------------------------------------------------------

router.get('/', 
    Authorization, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        GarmentController.getGarments, 
        (req, res, next) => [
            parseOptionalInt(req.query.limit),
            parseOptionalInt(req.query.offset)
        ]
    )
);
router.post('/', 
    Authorization,
    ControllerHandler(
        GarmentController.addGarment, 
        (req, res, next) => [
            req.body
        ]
    )
);
router.get('/:id', 
    Authorization, 
    ControllerHandler(
        GarmentController.getGarment, 
        (req, res, next) => [
            req.params.id
        ]
    )
);
router.delete('/:id', 
    Authorization,
    ControllerHandler(
        GarmentController.deleteGarment, 
        (req, res, next) => [
            req.params.id
        ]
    )
);

// --------------------------------------------------------------------------------

module.exports = router;
