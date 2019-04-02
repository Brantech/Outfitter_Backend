var OutfitService = require('../services/outfit.service');

exports.getRecommendations = async function (req, res, next) {
    var id = req.params.id;
    var factors = {
        // ...
    };
    try {
        // var recommendations = await OutfitService.getRecommendations(id, factors);
        return res.status(200)
                  .json({
                      data: '', 
                      message: 'Successfully obtained recommendations'
                  });
    } catch (e) {
        return res.status(400)
                  .json({
                      status: 400, 
                      message: 'Failed to get outfit recommendations'
                  });
    }
}