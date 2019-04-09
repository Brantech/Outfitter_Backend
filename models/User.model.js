var mongoose = require('mongoose');

var UserGarmentSchema = new mongoose.Schema({
    tags: [String],
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

var UserSchema = new mongoose.Schema({
    garments: [UserGarmentSchema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;