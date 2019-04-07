var Survey = require('../models/Survey.model');

exports.getSurveys = async function (query, limit) {
    var options = {limit};
    try {
        return await Survey.find(query, options);
    } catch (e) {
        throw Error('Error while fetching surveys');
    }
}

exports.saveSurvey = async function (survey) {
    var newSurvey = new Survey({
        sex: survey.sex,
        state: survey.state,
        formality: survey.formality,
        weather: survey.weather,
        climate: survey.climate,
        season: survey.season,
        created_outfit: survey.createdOutfit,
        random_outfit: survey.randomOutfit
    });
    try {
        return await newSurvey.save();
    } catch (e) {
        throw Error('Error occurred while saving the survey');
    }
}