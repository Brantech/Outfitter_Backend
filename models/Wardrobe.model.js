var mongoose = require('mongoose');

var WardrobeSchema = new mongoose.Schema({
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
    date_added: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    }
});

var Wardrobe = mongoose.model('Wardrobe', WardrobeSchema);

module.exports = Wardrobe;