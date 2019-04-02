var config = require('../config');
var Garment = require('../models/Garment.model');

exports.getRecommendations = async function (id, factors) {
    try {
        var userWardrobe = await Wardrobe.find({user_id: id});
        console.log(userWardrobe);
    } catch (e) {
        throw Error('Error creating recommendations');
    }
}