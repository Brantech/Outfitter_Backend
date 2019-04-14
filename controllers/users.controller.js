const User = require('../models/User.model');

exports.getUserInfo = async (userId) => {
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

exports.generateOutfits = async (userId, params, limit = 10, offset = 0, random = false) => {
    let foundUser = await User.findById(userId);

    // TODO: IDK how the outfit objects are supposed to be formatted to conform to the machine learning stuff so I'll do it like this for now
    let outfits = [];

    let tops = foundUser.garments.filter((x) => x.category === 'top')
    let bottoms = foundUser.garments.filter((x) => x.category === 'bottom')

    for(let i = 0; i < tops.length; i++) {
        for(let j = 0; j < bottoms.length; j++) {
            outfits.push([tops[i], bottoms[j]]);
        }
    }

    if(random) {
        return {
            success: true,
            data: outfits.splice(offset, limit)
        }
    } else {
        // TODO: The ai stuff
    }
}

exports.addOutfit = async (userId, outfit) => {
    let foundUser = await User.findById(userId);
    foundUser.outfits.push(outfit);
    let updatedUser = await foundUser.save();

    return {
        status: 200,
        success: true,
        data: updatedUser
    }
}

exports.updateOutfit = async (userId, outfit, params) => {
    let foundUser = await User.findById(userId);

    let index = -1;
    for(let i = 0; i < foundUser.outfits.length; i++) {
        if(foundUser.outfits[i]._id == outfit) {
            index = i;
        }
    }

    if(index != -1) {
        if("shared" in params)
            foundUser.outfits[index].shared = params.shared;
        if("category" in params)
            foundUser.outfits[index].category = params.category;
        if("rating" in params)
            foundUser.outfits[index].rating = params.rating;
        await foundUser.save();
    }

    return {
        status: 200,
        success: true,
        modifiedOutfit: index,
        data: foundUser
    }
}

exports.deleteOutfit = async (userId, outfit) => {
    let foundUser = await User.findById(userId);
    
    let index = -1;
    for(let i = 0; i < foundUser.outfits.length; i++) {
        if(foundUser.outfits[i]._id == outfit) {
            index = i;
        }
    }

    if(index != -1) {
        foundUser.outfits.splice(index, 1);
        await foundUser.save();
    }

    return {
        status: 200,
        success: true,
        data: foundUser
    }
}

exports.wearOutfit = async (userId, outfit) => {
    let foundUser = await User.findById(userId);
    
    let index = -1;
    for(let i = 0; i < foundUser.outfits.length; i++) {
        if(foundUser.outfits[i]._id == outfit) {
            index = i;
        }
    }

    if(index != -1) {
        let outfit = foundUser.outfits[index];
        delete outfit._id
        foundUser.history.push(outfit);
        await foundUser.save();
    }

    return {
        status: 200,
        success: true,
        data: foundUser
    }
}

exports.deleteHistoryItem = async (userId, item) => {
    let foundUser = await User.findById(userId);

    let index = -1;
    for(let i = 0; i < foundUser.history.length; i++) {
        if(foundUser.history[i]._id == item) {
            index = i;
        }
    }

    if(index != -1) {
        foundUser.history.split(index, 1);
        await foundUser.save();
    }

    return {
        status: 200,
        success: true,
        data: foundUser
    }
}

exports.clearHistory = async (userId) => {
    let foundUser = await User.findById(userId);

    foundUser.history = [];
    await foundUser.save();


    return {
        status: 200,
        success: true,
        data: foundUser
    }
}