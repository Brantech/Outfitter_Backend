var mongoose = require('mongoose');

// Setup schema
var outfitSchema = mongoose.Schema({
    owner_id: {
        type: String,
        required: true
    },
    top: {
        type: String,
        required: true
    },
    bottom: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    communityRating: {
        type: Number,
        required: true,
        defualt: 0
    },
    numberOfRatings: {
        type: Number,
        required: true,
        defualt: 0
    },
    category: {
        type: String,
        required: false,
    },
    shared: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Export Garment model
var Outfit = module.exports = mongoose.model('outfit', outfitSchema);
module.exports.get = (callback, limit) => {
    Outfit.find(callback).limit(limit);
}