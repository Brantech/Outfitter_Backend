var mongoose = require('mongoose');

// Setup schema
var garmentSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    }
});

// Export Garment model
var Garment = module.exports = mongoose.model('garment', garmentSchema);
module.exports.get = (callback, limit) => {
    Garment.find(callback).limit(limit);
}