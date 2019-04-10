var mongoose = require('mongoose');
var isURL = require('./validators/url.validator');

var GarmentSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    imageSource: {
        type: String,
        required: true,
        validate: isURL
    }
});

var Garment = mongoose.model('Garment', GarmentSchema);

module.exports = Garment;