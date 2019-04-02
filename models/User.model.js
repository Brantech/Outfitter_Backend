var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date_joined: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;