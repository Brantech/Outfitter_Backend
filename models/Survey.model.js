var mongoose = require('mongoose');
var isUrl = require('./validators/url.validator');

var SurveySchema = new mongoose.Schema({
    sex: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    formality: {
        type: Number,
        required: true
    },
    weather: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    createdOutfit: {
        top: {
            type: String,
            required: true,
            validate: isUrl
        },
        bottom: {
            type: String,
            required: true,
            validate: isUrl
        },
        rating: {
            type: Number,
            required: true
        }
    },
    randomOutfit: {
        top: {
            type: String,
            required: true,
            validate: isUrl
        },
        bottom: {
            type: String,
            required: true,
            validate: isUrl
        },
        rating: {
            type: Number,
            required: true
        }
    }
});

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;