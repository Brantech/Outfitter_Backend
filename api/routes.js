// Filename: routes.js

// Initialize express router
let router = require('express').Router();

// Default API response
router.get('/', (req, res) => 
    {res.json({
        status: 'API is working!',
        message: 'Welcome to Outfittr',
    });
});

// Import Garment controller
var garmentController = require('./controllers/garmentController');

// Garment routes
router.route('/garments')
    .get(garmentController.indexGarments)
    .post(garmentController.newGarment);

router.route('/garments/:garment_id')
    .get(garmentController.viewGarment)
    .patch(garmentController.updateGarment)
    .put(garmentController.updateGarment)
    .delete(garmentController.deleteGarment);

// Import Garment controller
var userController = require('./controllers/userController');

// Garment routes
router.route('/users')
    .get(userController.indexUsers)
    .post(userController.newUser);

router.route('/users/:user_id')
    .get(userController.viewUser)
    .patch(userController.updateUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

// Import Garment controller
var wardrobeController = require('./controllers/wardrobeController');

// Garment routes
router.route('/wardrobe')
    .get(wardrobeController.indexWardrobeItems)
    .post(wardrobeController.newWardrobeItem);

router.route('/wardrobeItem/:wardrobeItem_id')
    .get(wardrobeController.viewWardrobeItem)
    .patch(wardrobeController.updateWardrobeItem)
    .put(wardrobeController.updateWardrobeItem)
    .delete(wardrobeController.deleteWardrobeItem);

// Export API routes
module.exports = router;