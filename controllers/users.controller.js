const User = require('../models/User.model');

exports.getUsers = async (limit = 10, offset = 0) => {
    let users = await User.find({})
        .limit(limit)
        .skip(offset);

    return {
        message: 'Retrieved users',
        data: users
    };
}

exports.getUserGarments = async (userId, limit = 10, offset = 0) => {
    let userGarments = await User.findById(
        userId, 
        {garments: {$slice: [offset, limit]}}
    );
    
    return {
        message: 'Retrieved user garments',
        data: userGarments
    }
}

exports.updateUserGarmentTags = async (userId, garmentId, requestBody) => {
    let updatedUser = await User.findOneAndUpdate(
        {_id: userId, 'garments._id': garmentId }, 
        {garments: {$set: {'garments.$.tags': requestBody.tags}}}
    )

    return {
        message: 'Updated user garment tags',
        data: updatedUser
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

exports.deleteUserGarment = async (userId, garmentId) => {
    let updatedUser = await User.findByIdAndUpdate(
        userId,
        {$pull: {garments: {_id: garmentId}}}
    );
    
    return {
        status: 200,
        message: 'Deleted user garment',
        data: updatedUser
    }
}

exports.getUserHistory = async (userId, limit = 10, offset = 0) => {
    let foundHistory = await User.findById(
        userId, 
        {history: {$slice: [offset, limit]}}
    );

    return {
        message: 'Retrieved user history',
        data: foundHistory
    }
}