var mongoose = require('mongoose');

// Setup schema
var wardrobeSchema = mongoose.Schema({
    tags: {
        type: [String]
    },
    owner_id: {
        type: String,
        required: true
    },
    garment_id: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    }
});

// Export Wardrobe model
var Wardrobe = module.exports = mongoose.model('wardrobe', wardrobeSchema);
module.exports.get = (callback, limit) => {
    Wardrobe.find(callback).limit(limit);
}