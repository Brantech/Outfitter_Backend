var mongoose = require('mongoose');

// Setup schema
var garmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    fabric: {
        type: String
    },
    pattern: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Garment model
var Garment = module.exports = mongoose.model('garment', garmentSchema);
module.exports.get = (callback, limit) => {
    Garment.find(callback).limit(limit);
}