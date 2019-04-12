const express = require('express');
const check = require('express-validator/check');
const Authorization = require('../../middlewares/authorization');
const ControllerHandler = require('../../middlewares/controller.handler');
const GarmentController = require('../../controllers/garments.controller');

var router = express.Router();

// api/garments --------------------------------------------------------------------

router.get('/', 
    Authorization, [
        check.query('limit').isInt({min: 0}).optional(), 
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        GarmentController.getGarments, 
        (req, res, next) => [
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined,
            req.query.category ? req.query.category : null
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
