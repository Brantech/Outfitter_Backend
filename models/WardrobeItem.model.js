var mongoose = require('mongoose');

var WardrobeItemSchema = new mongoose.Schema({
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

var WardrobeItem = mongoose.model('WardrobeItem', WardrobeItemSchema);

module.exports = WardrobeItem;