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
            req.body.username
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
router.get('/info',
    Authentication,
    ControllerHandler(
        UserController.getUser,
        (req, res, next) => [
            res.locals.auth.sub
        ]
    )
)

router.put('/rate',
    Authentication,
    ControllerHandler(
        UserController.rateOutfit,
        (req, res, next) => [
            req.body.outfitId,
            req.body.owner,
            req.body.rating
        ]
    )
)

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

router.get('/garments/generateOutfits',
    Authentication, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.getOutfitRecommendations,
        (req, res, next) => [
            res.locals.auth.sub,
            req.body,
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined,
        ]
    )
);

// api/users/outfits ------------------------------------------------------------

router.post('/outfits',
    Authentication,
    ControllerHandler(
        UserController.addOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.body
        ]
    )
)

router.put('/outfits/:id',
    Authentication,
    ControllerHandler(
        UserController.updateOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
            req.body
        ]
    )
)

router.delete('/outfits/:id',
    Authentication,
    ControllerHandler(
        UserController.deleteOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id
        ]
    )
)

router.post('/outfits/wear/:id',
    Authentication,
    ControllerHandler(
        UserController.wearOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id
        ]
    )
)

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

router.delete('/history/all',
    Authentication,
    ControllerHandler(
        UserController.clearHistory,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
)

router.delete('/history/:id',
    Authentication,
    ControllerHandler(
        UserController.deleteHistoryItem,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id
        ]
    )
)

// api/users/recommendations ----------------------------------------------------

/**
 * Returns outfit recommendations to the user.
 */
router.get('/recommendations',
    Authentication, [
        check.query('temperature').isInt().exists(),
        check.query('weather').isInt().exists(),
        check.query('formality').isInt().exists(),
        check.query('season').isInt().exists(),
        check.query('limit').isInt().optional()
    ],
    ControllerHandler(
        UserController.getOutfitRecommendations,
        (req, res, next) => [
            res.locals.auth.sub,
            {
                temperature: parseInt(req.query.temperature),
                weather: parseInt(req.query.weather),
                formality: parseInt(req.query.formality),
                season: parseInt(req.query.season)
            },
            parseOptionalInt(req.query.limit)
        ]
    )
);

// api/users/feed ----------------------------------------------------------------

router.get('/feed',
    Authentication,
    ControllerHandler(
        UserController.getSharedOutfits,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);
module.exports = router;
