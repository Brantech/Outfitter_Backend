var mongoose = require('mongoose');

// Setup schema
var wardrobeItemSchema = mongoose.Schema({
    unavailable: {
        type: Boolean,
        default: false
    },
    owner_id: {
        type: String
    },
    garment_id: {
        type: String,
        required: true
    },
    reserveDate: {
        type: Date,
    },
    reserveTilDate: {
        type: Date,
    },
    torn: {
        type: Boolean,
        default: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

// Export Wardrobe model
var WardrobeItem = module.exports = mongoose.model('wardrobeItem', wardrobeItemSchema);
module.exports.get = (callback, limit) => {
    WardrobeItem.find(callback).limit(limit);
}