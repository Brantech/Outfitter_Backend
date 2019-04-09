var mongoose = require('mongoose');
var isUrl = require('./validators/url.validator');

var GarmentSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    imageSource: {
        type: String,
        required: true,
        validate: isUrl
    }
});

var Garment = mongoose.model('Garment', GarmentSchema);

module.exports = Garment;