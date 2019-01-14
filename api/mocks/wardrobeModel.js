var mongoose = require('mongoose');

// Setup schema
var wardrobeSchema = mongoose.Schema({
    unavailable: {
        type: Boolean,
        default: false
    },
    owner_id: {
        type: String
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
var Wardrobe = module.exports = mongoose.model('warment', wardrobeSchema);
module.exports.get = (callback, limit) => {
    Wardrobe.find(callback).limit(limit);
}