var mongoose = require('mongoose');
var ObjectId = require('mongoose').Schema.Types.ObjectId;

var OwnedGarmentSchema = new mongoose.Schema({
    garment_id: ObjectId,
    category: String,
    imageSource: String,
    tags: [String],
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var OutfitSchema = new mongoose.Schema({
    garments: [ObjectId],
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
    },
    dateWorn: {
        type: Date,
        default: Date.now
    }
});

var UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    numericId: Number,
    role: String,
    sex: Number,
    state: Number,
    garments: [OwnedGarmentSchema],
    outfits: [OutfitSchema],
    history: [OutfitSchema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;