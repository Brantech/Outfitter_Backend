const express = require('express');
const check = require('express-validator/check');
const Admin = require('../../middlewares/admin');
const Authentication = require('../../middlewares/authentication');
const ControllerHandler = require('../../middlewares/controller.handler');
const {parseOptionalInt} = require('./utils/arguments');
const UserController = require('../../controllers/users.controller');

var router = express.Router();

// api/users ---------------------------------------------------------------------

/**
 * Returns all users.
 * Note: Pagination options are available.
 */
router.get('/',
    Authentication, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.getUsers,
        (req, res, next) => [
            parseOptionalInt(req.query.limit),
            parseOptionalInt(req.query.offset)
        ]
    )
);

/**
 * Creates a new user.
 */
router.post('/',
    Authentication,
    ControllerHandler(
        UserController.newUser,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);

/**
 * Deletes a user.
 */
router.delete('/',
    Authentication,
    ControllerHandler(
        UserController.deleteUser,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);

// api/users/garments ------------------------------------------------------------

/**
 * Returns a user's garments.
 * Note: Pagination options are available.
 */
router.get('/garments',
    Authentication, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.getUserGarments,
        (req, res, next) => [
            res.locals.auth.sub,
            parseOptionalInt(req.query.limit),
            parseOptionalInt(req.query.offset)
        ]
    )
);

/**
 * Adds a garment to the user's collection of garments.
 */
router.post('/garments',
    Authentication,
    ControllerHandler(
        UserController.addUserGarment,
        (req, res, next) => [
            res.locals.auth.sub,
            req.body
        ]
    )
);

/**
 * Updates a garments tags in the user's collection of garments.
 */
router.put('/garments/:id',
    Authentication,
    ControllerHandler(
        UserController.updateUserGarmentTags,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
            req.body
        ]
    )
);

/**
 * Deletes a garment from the user's collection of garments.
 */
router.delete('/garments/:id',
    Authentication,
    ControllerHandler(
        UserController.deleteUserGarment,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
        ]
    )
);

// api/users/history ------------------------------------------------------------

/**
 * Returns the user's history of worn outfits.
 */
router.get('/history',
    Authentication,
    ControllerHandler(
        UserController.getUserHistory,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);

// ------------------------------------------------------------------------------

module.exports = router;
