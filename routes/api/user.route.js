const express = require('express');
const check = require('express-validator/check');
const Authorization = require('../../middlewares/authorization');
const ControllerHandler = require('../../middlewares/controller.handler');
const UserController = require('../../controllers/users.controller');

var router = express.Router();

// api/users ---------------------------------------------------------------------

router.get('/',
    Authorization, [
        check.query('limit').isInt({$gt: 0}).optional(),
        check.query('offset').isInt({$gt: -1}).optional()
    ],
    ControllerHandler(
        UserController.getUsers,
        (req, res, next) => [
            req.locals.auth.sub,
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined
        ]
    )
);

router.post('/',
    Authorization,
    ControllerHandler(
        UserController.newUser,
        (req, res, next) => [
            req.locals.auth.sub,
        ]
    )
);

router.delete('/',
    Authorization,
    ControllerHandler(
        UserController.deleteUser,
        (req, res, next) => [
            req.locals.auth.sub,
        ]
    )
);

// api/users/garments ------------------------------------------------------------

router.get('/garments',
    Authorization, [
        check.query('limit').optional().isInt({$gt: 0}),
        check.query('offset').optional().isInt({$gt: -1})
    ],
    ControllerHandler(
        UserController.getUserGarments,
        (req, res, next) => [
            req.locals.auth.sub,
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined
        ]
    )
);
router.post('/garments',
    Authorization,
    ControllerHandler(
        UserController.addUserGarment,
        (req, res, next) => [
            req.locals.auth.sub,
            req.body
        ]
    )
);
router.put('/garments/:id',
    Authorization,
    ControllerHandler(
        UserController.updateUserGarmentTags,
        (req, res, next) => [
            req.locals.auth.sub,
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
            req.locals.auth.sub,
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
            req.locals.auth.sub,
        ]
    )
);

// ------------------------------------------------------------------------------

module.exports = router;