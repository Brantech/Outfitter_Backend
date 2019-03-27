var mongoose = require('mongoose');

// Setup schema
var surveyOutputSchema = mongoose.Schema({
    randomOutfit: {
        Tops: [String],
        Bottoms: [String]
    },
    randomWardrobe: {
        Tops: [String],
        Bottoms: [String]
    }
});

// Export Garment model
var SurveyOutput = module.exports = mongoose.model('surveyOutput', surveyOutputSchema);
module.exports.get = (callback, limit) => {
    SurveyOutput.find(callback).limit(limit);
}