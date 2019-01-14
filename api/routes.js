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
    .get(garmentController.index)
    .post(garmentController.new);

router.route('/garments/:garment_id')
    .get(garmentController.view)
    .patch(garmentController.update)
    .put(garmentController.update)
    .delete(garmentController.delete);

// Import Garment controller
var userController = require('./controllers/userController');

// Garment routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

// Import Garment controller
var wardrobeController = require('./controllers/wardrobeController');

// Garment routes
router.route('/wardrobe')
    .get(wardrobeController.index)
    .post(wardrobeController.new);

router.route('/wardrobe/:wardrobe_id')
    .get(wardrobeController.view)
    .patch(wardrobeController.update)
    .put(wardrobeController.update)
    .delete(wardrobeController.delete);

// Export API routes
module.exports = router;