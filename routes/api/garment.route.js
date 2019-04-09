var express = require('express');
var Authorization = require('../../auth/authorization');
var GarmentController = require('../../controllers/garments.controller');

var router = express.Router();

router.get('/', 
    Authorization, 
    GarmentController.getGarments);
router.post('/', 
    Authorization, 
    GarmentController.addGarment);
router.delete('/:id', 
    Authorization, 
    GarmentController.deleteGarment);

module.exports = router;