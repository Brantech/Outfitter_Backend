const Garment = require('../models/Garment.model');

exports.getGarments = async (limit = 10, offset = 0) => {
    let results = await Garment.find({})
        .limit(limit)
        .skip(offset);
    
    return {
        message: 'Retrieved garments',
        data: results
    };
}

exports.addGarment = async (requestBody) => {
    let saved = await new Garment(requestBody).save();

    return {
        message: 'Added garment',
        data: saved
    };
}

exports.deleteGarment = async (garmentId) => {
    let deleted = await Garment.findByIdAndDelete(garmentId);

    return {
        message: 'Deleted garment',
        data: deleted
    };
}