const Garment = require('../models/Garment.model');

exports.getGarment = async (garmentId) => {
    let result = await Garment.findById(garmentId);

    return {
        success: true,
        data: result
    };
}

exports.getGarments = async (limit, offset = 0) => {
    let query = Garment.find({}).skip(offset);   
    if (limit) {
        query.limit(limit);
    }

    let results = await query;

    return {
        success: true,
        count: results.length,
        data: results
    };
};

exports.addGarment = async (requestBody) => {
    let saved = await new Garment(requestBody).save();

    return {
        success: true,
        data: saved
    };
};

exports.deleteGarment = async (garmentId) => {
    let deleted = await Garment.findByIdAndDelete(garmentId);

    return {
        success: true,
        data: deleted
    };
}