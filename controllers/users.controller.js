const User = require('../models/User.model');

exports.getUser = async (userId) => {
    let user = await User.findById(userId);

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
    let updatedUser = await foundUser.save();

    return {
        status: 200,
        success: true,
        data: updatedUser
    }
}

exports.updateUserGarmentTags = async (userId, garmentId, requestBody) => {
    let foundUser = await User.findById(userId);
    let index = null;

    for(let i = 0; i < foundUser.garments.length; i++) {
        if(foundUser.garments[i].garment_id == garmentId) {
            index = i;
            break;
        }
    }

    foundUser.garments[index].tags = requestBody.tags;
    foundUser = await foundUser.save();

    return {
        success: true,
        data: foundUser
    }
}

exports.deleteUserGarment = async (userId, garmentId) => {
    let foundUser = await User.findById(userId);
    let index = null;

    for(let i = 0; i < foundUser.garments.length; i++) {
        if(foundUser.garments[i].garment_id == garmentId) {
            index = i;
            break;
        }
    }

    foundUser.garments.splice(index, 1);
    foundUser = await foundUser.save();

    return {
        success: true,
        data: foundUser
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
    let foundUser = await User.findById(userId);
    
    if(foundUser !== null) {
        return {
            success: true,
        }
    }

    let created = new User();
    created._id = userId;
    created.save();

    return {
        success: true,
        data: created
    }
}