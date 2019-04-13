const express = require('express');
const check = require('express-validator/check');
const Authorization = require('../../middlewares/authorization');
const ControllerHandler = require('../../middlewares/controller.handler');
const {parseOptionalInt} = require('./utils/arguments');
const UserController = require('../../controllers/users.controller');

var router = express.Router();

// api/users ---------------------------------------------------------------------

router.get('/',
    Authorization, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.getUsers,
        (req, res, next) => [
            res.locals.auth.sub,
            parseOptionalInt(req.query.limit),
            parseOptionalInt(req.query.offset)
        ]
    )
);
router.post('/',
    Authorization,
    ControllerHandler(
        UserController.newUser,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);
router.delete('/',
    Authorization,
    ControllerHandler(
        UserController.deleteUser,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);

// api/users/garments ------------------------------------------------------------

router.get('/garments',
    Authorization, [
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
router.post('/garments',
    Authorization,
    ControllerHandler(
        UserController.addUserGarment,
        (req, res, next) => [
            res.locals.auth.sub,
            req.body
        ]
    )
);
router.put('/garments/:id',
    Authorization,
    ControllerHandler(
        UserController.updateUserGarmentTags,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
            req.body
        ]
    )
);
router.delete('/garments/:id',
    Authorization,
    ControllerHandler(
        UserController.deleteUserGarment,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
        ]
    )
);

// api/users/history ------------------------------------------------------------

router.get('/history',
    Authorization,
    ControllerHandler(
        UserController.getUserHistory,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);

// ------------------------------------------------------------------------------

module.exports = router;
