const User = require('../models/User.model');

exports.getUser = async (userId) => {
    let user = User.findOne({_id: userId});

    return {
        message: 'Retrieved user',
        data: user
    }
}

exports.getUsers = async (limit, offset = 0) => {
    let query = User.find({}).skip(offset);
    if (limit) {
        query.limit(limit);
    }

    let results = await query;

    return {
        message: 'Retrieved users',
        count: results.length,
        data: results
    };
}

exports.getUserGarments = async (userId, limit, offset = 0) => {
    let range = limit ? [offset, limit] : [offset];
    let results = await User.findOne(
        {_id: userId},
        {garments: {$slice: range}});

    return {
        message: 'Retrieved user garments',
        count: results.garments.length,
        data: results
    }
}

exports.addUserGarment = async (userId, requestBody) => {
    let foundUser = await User.findOne({_id: userId});
    foundUser.garments.push(requestBody);
    let updatedUser = user.save();

    return {
        message: 'Updated user garment',
        data: updatedUser
    }
}

exports.deleteUser = async (userId) => {
    let deleted = await User.findOneAndDelete({_id: userId});

    return {
        success: true,
        data: deleted
    }
}

exports.newUser = async (userId) => {
    let created = new User();
    created._id = userId;

    return {
        success: true,
        data: created
    }
}