const express = require('express');
const check = require('express-validator/check');
const Admin = require('../../middlewares/admin');
const Authentication = require('../../middlewares/authentication');
const ControllerHandler = require('../../middlewares/controller.handler');
const GarmentController = require('../../controllers/garments.controller');
const {parseOptionalInt} = require('./utils/arguments');

var router = express.Router();

// api/garment --------------------------------------------------------------------

/**
 * Returns all garments stored in the garment catalog.
 * Note: Pagination options are available.
 */
router.get('/', 
    Authentication, [
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

/**
 * Adds a single garment to the garment catalog.
 * Note: This route is available to admins only.
 */
router.post('/', 
    Authentication, 
    Admin,
    ControllerHandler(
        GarmentController.addGarment, 
        (req, res, next) => [
            req.body
        ]
    )
);

/**
 * Returns a single garment from the garment catalog.
 */
router.get('/:id', 
    Authentication,
    ControllerHandler(
        GarmentController.getGarment, 
        (req, res, next) => [
            req.params.id
        ]
    )
);

/**
 * Deletes a single garment from the garment catalog.
 * Note: This route is available to admins only.
 */
router.delete('/:id', 
    Authentication, 
    Admin,
    ControllerHandler(
        GarmentController.deleteGarment, 
        (req, res, next) => [
            req.params.id
        ]
    )
);

// --------------------------------------------------------------------------------

module.exports = router;
