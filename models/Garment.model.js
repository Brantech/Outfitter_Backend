var mongoose = require('mongoose');
var validator = require('mongoose-validator');

var GarmentSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    image_source: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isURL(value, { 
                protocols: ['http','https','ftp'], 
                require_tld: true, 
                require_protocol: true
            }),
            message: "Invalid URL scheme"
        }
    }
});

var Garment = mongoose.model('Garment', GarmentSchema);

module.exports = Garment;