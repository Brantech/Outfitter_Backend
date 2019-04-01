var mongoose = require('mongoose');

// Setup schema
var userSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

// Export user model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = (callback, limit) => {
    User.find(callback).limit(limit);
}