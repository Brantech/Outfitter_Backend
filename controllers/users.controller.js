const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const config = require('../config');
const User = require('../models/User.model');
const Garment = require('../models/Garment.model');

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

exports.getOutfitRecommendations = async (userId, factors, limit = 10) => {
    let user = await User.findOne({_id: userId});

    // Get clean garments belonging to the user
    let cleanGarments = user.garments.filter(garment => {
        return garment.tags.includes('clean');
    });
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
        for (bottom of categorizedGarments.bottom) {
            outfits.push({
                top: {
                    featureVector: top.featureVector,
                    id: top._id
                },
                bottom: {
                    featureVector: bottom.featureVector,
                    id: bottom._id
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
            user.state,
            user.sex,
            user.numericId,
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
            outfit: {
                top: outfit.top.id,
                bottom: outfit.bottom.id
            },
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