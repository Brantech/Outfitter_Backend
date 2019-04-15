const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const config = require('../config');
const User = require('../models/User.model');
const Garment = require('../models/Garment.model');
const fs = require('fs');

exports.getUser = async (userId) => {
    let user = await User.findOne({_id: userId});

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
    let updatedUser = await foundUser.save();

    return {
        message: 'Updated user garment',
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
    let deleted = await User.findOneAndDelete({_id: userId});

    return {
        success: true,
        data: deleted
    }
}

exports.newUser = async (userId, username) => {
    let foundUser = await User.findById(userId);
    
    if(foundUser !== null) {
        return {
            success: true,
        }
    }

    let created = new User();
    created._id = userId;
    created.username = username;
    await created.setNext('numericId');
    await created.save();

    return {
        success: true,
        data: created
    }
}

exports.getOutfitRecommendations = async (userId, factors, limit = 10) => {
    let user = await User.findOne({_id: userId});

    // Get clean garments belonging to the user
    let cleanGarments = user.garments.filter(garment => garment.tags.includes('clean'));
    
    if (cleanGarments.length == 0) {
        return {
            status: 422,
            message: 'The user has no clean garments',
            data: []
        }
    }

    // Get the actual garments using the ids previously obtained
    let garmentIds = [];
    for (let cleanGarment of cleanGarments) {
        garmentIds.push(cleanGarment._id);
    }
    let garments = await Garment.find({_id: {$in: garmentIds}});

    // Group the garments by their category
    let categorizedGarments = {
        top: [],
        bottom: [] 
    };
    for (let garment of garments) {
        let category = garment.category;
        categorizedGarments[category].push(garment)
    }

    // Generate all possible outfit combinations
    let outfits = [];
    for (top of categorizedGarments.top) {
        var file = top.imageSource.substring(top.imageSource.lastIndexOf("outfittr.net") + 12);
        var fv = fs.readFileSync(__dirname + '/../features/' + file + '.json', 'utf8');
        var topFeatures = JSON.parse(fv);

        for (bottom of categorizedGarments.bottom) {
            var file2 = bottom.imageSource.substring(bottom.imageSource.lastIndexOf("outfittr.net") + 12);
            var fv2 = fs.readFileSync(__dirname + '/../features/' + file2 + '.json', 'utf8');

            outfits.push({
                top: {
                    featureVector: topFeatures,
                    garment: top
                },
                bottom: {
                    featureVector: JSON.parse(fv2),
                    garment: bottom
                }
            });
        }
    }
    if (outfits.length == 0) {
        return {
            status: 422,
            message: 'The user cannot make any outfits',
            data: []
        }
    }

    // Construct an ordered, descending list of rated outfits
    let ratedOutfits = [];
    let model = await tf.loadLayersModel(config.tfjsModel);    
    for (outfit of outfits) {
        let tensorValues = [
            user.numericId,
            factors.state,
            factors.sex,
            factors.weather,
            factors.temperature,
            factors.formality,
            factors.season
        ];
        for (let garmentCategory of ['top', 'bottom']) {
            let featureVector = outfit[garmentCategory].featureVector;
            for (let component of featureVector) {
                tensorValues.push(component);
            }
        }

        let tensor = tf.tensor([tensorValues]);
        let prediction = model.predict(tensor);
        let predictionData = await prediction.argMax(1).data();
        let predictedRating = predictionData[0];

        ratedOutfits.push({
            outfit: [
                outfit.top.garment,
                outfit.bottom.garment
            ],
            rating: predictedRating
        });
    }
    ratedOutfits.sort((x, y) => y.rating - x.rating);

    // Take the top N rated outfits
    let recommendations = [];
    for (let i = 0; i < Math.min(limit, ratedOutfits.length); ++i) {
        recommendations.push(ratedOutfits[i]);
    }

    return {
        message: 'Generated user recommendations',
        data: recommendations
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

exports.getSharedOutfits = async(userId) => {
    let outfits = [];

    let users = await User.find();

    for(let i = 0; i < users.length; i++) {
        outfits.push([users[i].username, []]);
        for(let j = 0; j < users[i].outfits.length; j++) {
            if(users[i].outfits[j].shared)
                outfits[i][1].push(users[i].outfits[j]);
        }
    }

    return {
        status: 200,
        data: outfits.splice(0, 200),
    }
}

exports.rateOutfit = async(outfitId, ownerUsr, myRating) => {
    let owner = await User.findOne({username: ownerUsr});

    let outfit = null;
    for(let i = 0; i < owner.outfits.length; i++) {
        if(owner.outfits[i]._id == outfitId) {
            outfit = i;
            break;
        }
    }

    let rating = owner.outfits[outfit].communityRating * owner.outfits[outfit].numberOfRatings;
    rating += myRating;

    owner.outfits[outfit].numberOfRatings = owner.outfits[outfit].numberOfRatings + 1;
    owner.outfits[outfit].communityRating = rating / owner.outfits[outfit].numberOfRatings;

    await owner.save();

    return {
        status: 200,
        data: owner.outfits[outfit]
    }
}