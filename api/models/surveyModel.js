var mongoose = require('mongoose');

// Setup schema
var surveySchema = mongoose.Schema({
    sex: Number,
    state: Number,
    factors: {
        formality: Number,
        weather: Number,
        temperature: Number,
        season: Number
    },
    createdOutfit: {
        Tops: String,
        Bottoms: String
    },
    createRating: Number,
    randomOutfit: {
        Tops: String,
        Bottoms: String
    },
    randRating: Number
});

// Export user model
var Survey = module.exports = mongoose.model('survey', surveySchema);
module.exports.get = (callback, limit) => {
    Survey.find(callback).limit(limit);
}