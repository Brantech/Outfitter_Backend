var mongoose = require('mongoose');
var urlValidator = require('../validators/url.validator');

var SurveySchema = new mongoose.Schema({
    sex: Number,
    state: Number,
    formality: Number,
    weather: Number,
    temperature: Number,
    season: Number,
    created_outfit: {
        top: {
            type: String,
            validate: urlValidator
        },
        bottom: {
            type: String,
            validate: urlValidator
        },
        rating: Number
    },
    random_outfit: {
        top: {
            type: String,
            validate: urlValidator
        },
        bottom: {
            type: String,
            validate: urlValidator
        },
        rating: Number
    }
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;