var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

var OwnedGarmentSchema = new mongoose.Schema({
    tags: [String],
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var WornOutfitSchema = new mongoose.Schema({
    garments: [ObjectId],
    dateWorn: {
        type: Date,
        default: Date.now
    }
});

var UserSchema = new mongoose.Schema({
    garments: [OwnedGarmentSchema],
    history: [WornOutfitSchema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;