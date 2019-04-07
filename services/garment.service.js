var Garment = require('../models/Garment.model');

exports.getGarments = async function (query, limit) {
    var options = {limit};
    try {
        return await Garment.find(query, options);
    } catch (e) {
        throw Error('Error while fetching wardrobe items');
    }
}