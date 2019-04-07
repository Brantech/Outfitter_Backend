// Filename: routes.js

// Initialize express router
let router = require('express').Router();

// Default API response
router.get('/', (req, res) => 
    {
        res.json({
            status: 'API is working!',
            message: 'Welcome to Outfittr',
        });
    }
);

// Import Controllers
var garmentController = require('./controllers/garmentController');
var userController = require('./controllers/userController');
var wardrobeController = require('./controllers/wardrobeController');
var surveyController = require('./controllers/surveyController');



// Garment routes
router.route('/garments')
    .get(garmentController.index)
    .post(garmentController.new);

router.route('/garments/:garment_id')
    .get(garmentController.view)
    .patch(garmentController.update)
    .put(garmentController.update)
    .delete(garmentController.delete);

router.route('/garmentcombos')
    .get(garmentController.combine);



// User routes
router.route('/users')
    .get(userController.index)
    .post(userController.new)

router.route('/users/:idToken')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);



// Wardrobe routes
router.route('/wardrobe/:idToken')
    .get(wardrobeController.index)
    .post(wardrobeController.new);

router.route('/wardrobe/:idToken/update/:garment_id')
    .get(wardrobeController.view)
    .patch(wardrobeController.update)
    .put(wardrobeController.update)
    .delete(wardrobeController.delete);

router.route('/wardrobe/wardrobecombos/:user_id')
    .get(wardrobeController.combine);



// Survey routes
router.route('/survey')
    .get(surveyController.index)
    .post(surveyController.out);
router.route('/surveyin')
    .post(surveyController.receive)



// Export API routes
module.exports = router;