// Import garment model
const Garment = require('../models/Garment.model');

// Get a specific garment
exports.getGarment = async (garmentId) => {
    let result = await Garment.findById(garmentId);

    return {
        success: true,
        data: result
    };
}

// Get all garments
exports.getGarments = async (limit = 10, offset = 0, category = null) => {
    let results = null;
    
    if(category == null) {
        results = await Garment.find({})
        .limit(limit)
        .skip(offset);
    } else {
        results = await Garment.find({category: category})
        .limit(limit)
        .skip(offset);
    }
    return {
        success: true,
        data: results
    };
};

// Handle create garment actions
exports.addGarment = async (requestBody) => {
    let saved = await new Garment(requestBody).save();

    return {
        success: true,
        data: saved
    };
};

// Handle delete garment
exports.deleteGarment = async (garmentId) => {
    let deleted = await Garment.findByIdAndDelete(garmentId);

    return {
        success: true,
        data: deleted
    };
}