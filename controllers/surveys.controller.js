const Survey = require('../models/Survey.model');
const Garment = require('../models/Garment.model');

exports.getSurveys = async (limit, offset) => {
    let query = Survey.find({});

    if (limit) {
        query.limit(limit)
    }
    if (offset) {
        query.skip(offset);
    }

    let results = await query;

    return {
        message: 'Retrieved survey',
        count: results.length,
        data: results
    };
}

exports.saveSurvey = async (survey) => {
    let saved = await new Survey(survey).save();

    return {
        message: 'Saved survey',
        data: saved
    };
}

exports.generateSurveyData = async (tops, bottoms) => {
    let queries = [
        {category: 'top', 
         operations: [{collection: 'wardrobe', amount: tops}, 
                      {collection: 'outfit', amount: 1}]},
        {category: 'bottom', 
         operations: [{collection: 'wardrobe', amount: bottoms}, 
                      {collection: 'outfit', amount: 1}]}
    ];
    let results = {
        wardrobe: {},
        outfit: {}
    };

    for (let query of queries) {
        let category = query.category;
        for (let operation of query.operations) {
            // Note: $sample may output the same document more than once in its result set.
            // https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/#cursor-isolation
            // We attempt to mitigate this problem by setting a large quantity as the sample size.
            let randomGarments = await Garment.aggregate([
                {$match: {category: category}},
                {$sample: {size: 100}},
                {$group: {_id: '$_id', imageSource: {$addToSet: "$imageSource"}}},
                {$project: {_id: false, imageSource: {$arrayElemAt: ["$imageSource", 0]}}},
                {$limit: operation.amount}
            ]);
            results[operation.collection][category] = randomGarments;
        }
    }

    return {
        message: 'Generated survey data',
        data: results
    };
}
