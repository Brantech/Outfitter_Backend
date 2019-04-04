var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    
});

const User = mongoose.model('User', UserSchema);

module.exports = User;