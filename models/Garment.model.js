var mongoose = require('mongoose');
var urlValidator = require('../validators/url.validator');

var GarmentSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    image_source: {
        type: String,
        required: true,
        validate: urlValidator
    }
});

var Garment = mongoose.model('Garment', GarmentSchema);

module.exports = Garment;