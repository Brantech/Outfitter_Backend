const User = require('../models/User.model');

exports.getUser = async (userId) => {
    let user = User.findById(userId);

    return {
        success: true,
        data: user
    }
}

exports.getUsers = async (limit = 10, offset = 0) => {
    let users = await User.find({})
        .limit(limit)
        .skip(offset);

    return {
        success: true,
        data: users
    };
}

exports.getUserGarments = async (userId, limit = 10, offset = 0) => {
    let userGarments = await User.findById(
        userId, 
        {garments: {$slice: [offset, limit]}}
    );
    
    return {
        success: true,
        data: userGarments
    }
}

exports.addUserGarment = async (userId, requestBody) => {
    let foundUser = await User.findById(userId);
    foundUser.garments.push(requestBody);
    let updatedUser = user.save();

    return {
        status: 200,
        message: 'Updated user garment',
        data: updatedUser
    }
}

exports.deleteUser = async (userId) => {
    let deleted = await User.findByIdAndDelete(userId);

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