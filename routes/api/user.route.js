var express = require('express');
var Authorization = require('../../auth/authorization');
var UserController = require('../../controllers/users.controller');

var router = express.Router();

router.get('/',
    Authorization,
    UserController.getUsers);

router.post('/register', 
    UserController.registerUser);

router.post('/login',
    UserController.loginUser);

router.get('/info',
    Authorization,
    UserController.getUserInfo);
router.put('/info',
    Authorization,
    UserController.updateUserInfo);

router.get('/garments',
    Authorization,
    UserController.getUserGarments);
router.put('/garments/:id',
    Authorization,
    UserController.updateUserGarment);
router.post('/garments',
    Authorization,
    UserController.addUserGarment);
router.delete('/garments/:id',
    Authorization,
    UserController.removeUserGarment);

router.get('/history',
    Authorization,
    UserController.getUserHistory);

module.exports = router;