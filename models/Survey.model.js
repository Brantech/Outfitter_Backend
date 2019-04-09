var mongoose = require('mongoose');
var isUrl = require('./validators/url.validator');

var SurveySchema = new mongoose.Schema({
    sex: Number,
    state: Number,
    formality: Number,
    weather: Number,
    temperature: Number,
    season: Number,
    createdOutfit: {
        top: {
            type: String,
            validate: isUrl
        },
        bottom: {
            type: String,
            validate: isUrl
        },
        rating: Number
    },
    randomOutfit: {
        top: {
            type: String,
            validate: isUrl
        },
        bottom: {
            type: String,
            validate: isUrl
        },
        rating: Number
    }
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;