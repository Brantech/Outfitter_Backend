const createError = require('http-errors');
const User = require('../models/User.model');

const admin = async (req, res, next) => {
    let userId = res.locals.auth.sub;
    let user = await User.findOne({_id: userId});

    if (!(user && user.role === 'admin')) {
        return next(new createError.Unauthorized('not admin'));
    }

    return next();
}

module.exports = admin