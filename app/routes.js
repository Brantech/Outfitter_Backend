// Filename: api-routes.js

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
var garmentController = require('./garmentController');

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
var userController = require('./userController');

// Garment routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);

router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

// Export API routes
module.exports = router;