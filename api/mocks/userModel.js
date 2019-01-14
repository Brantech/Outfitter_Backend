var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const saltRounds = 10;

// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// userSchema.pre('save', (next) => {
//     var user = this;
//     bcrypt.hash(user.password, saltRounds, (err, hash) => {
//         if(err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });

// Export user model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = (callback, limit) => {
    User.find(callback).limit(limit);
}