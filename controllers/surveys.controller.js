const createError = require('http-errors');
const SurveyService = require('../services/survey.service');
const GarmentService = require('../services/garment.service');

exports.getSurveys = async function (req, res, next) {
    let paginate = {
        limit: req.query.limit,
        page: req.query.page
    };

    try {
        let results = await SurveyService.getSurveys({}, {}, paginate);
        return res.status(200).json({
            status: 200,
            data: results
        });
    } catch (e) {
        return next(createError(500, e));
    }
}

exports.saveSurvey = async function (req, res, next) {
    try {
        let saved = await SurveyService.saveSurvey(req.body);
        return res.status(201).json({
            status: 201,
            data: saved
        });
    } catch (e) {
        return next(createError(500, e));
    }
}

exports.generateSurveyData = async function (req, res, next) {
    let tops = req.query.tops;
    let bottoms = req.query.bottoms;
    let queries = [
        {category: 'tops', 
         operations: [{collection: 'wardrobe', amount: tops}, 
                      {collection: 'outfit', amount: 1}]},
        {category: 'bottoms', 
         operations: [{collection: 'wardrobe', amount: bottoms}, 
                      {collection: 'outfit', amount: 1}]}
    ];
    let results = {
        wardrobe: {},
        outfit: {}
    };

    try {
        for (let query of queries) {
            let category = query.category;
            for (let operation of query.operations) {
                // Note: $sample may output the same document more than once in its result set.
                // This issue should be non-existent for our use case, however.
                // https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/#cursor-isolation
                let randomGarments = await GarmentService.aggregateGarments([
                    {$match: {category: category}},
                    {$sample: {size: operation.amount}},
                    {$project: {_id: false, imageSource: true}}
                ]);
                results[operation.collection][category] = randomGarments;
            }
        }
        return res.status(200).json({
            status: 200,
            message: 'Generated survey data',
            data: results
        });
    } catch (e) {
        return next(createError(500, e));
    }
}