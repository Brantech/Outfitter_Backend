const Survey = require('../models/Survey.model');

exports.getSurveys = async function (query, project, paginate) {
    let results = Survey.find(query);
    if (paginate) {
        let limit = paginate.limit;
        let skip = limit * (paginate.page - 1);
        results = results.skip(skip).limit(limit);
    }
    return await results;
}

exports.saveSurvey = async function (survey) {
    return await new Survey(survey).save();
}