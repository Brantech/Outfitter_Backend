// Import models
Garment = require('./../models/garmentModel');
SurveyObject = require('./../models/surveyModel');
SurveyOutputObject = require('./../models/surveyOutputModel');

// Combine garments
exports.out = (req, res) => {
    numberTops = req.body.numberTops;
    numberBottoms = req.body.numberBottoms;

    Garment.get((err, garments) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            var shirts = new Array();
            var pants = new Array();
            for(var i = 0; i < garments.length; i++) {
                if(garments[i].type == 'shirt') {
                    shirts.push(garments[i]);
                }
                if(garments[i].type == 'pants') {
                    pants.push(garments[i]);
                }
            }

            if(numberTops > shirts.length || numberTops > 10) {
                numberTops = Math.ceil(Math.random()*shirts.length);
                if(numberTops > 10) {
                    numberTops = 10
                }
                if(numberTops < 1) {
                    numberTops = 1
                }
            }
            if(numberBottoms > pants.length || numberBottoms > 10) {
                numberBottoms = Math.ceil(Math.random()*pants.length);
                if(numberBottoms > 10) {
                    numberBottoms = 10
                }
                if(numberBottoms < 1) {
                    numberBottoms = 1
                }
            }

            var randTops = new Array();
            var randBottoms = new Array();

            var indecies = new Array();
            for(var i = 0; i < shirts.length; i++) {
                indecies.push(i);
            }
            for(var i = 0; i < numberTops; i++) {
                index = Math.floor(Math.random()*indecies.length);
                randTops.push(shirts[indecies[index]]);
                indecies.splice(index, 1)
            }

            var moreIndecies = new Array();
            for(var i = 0; i < pants.length; i++) {
                moreIndecies.push(i);
            }
            for(var i = 0; i < numberBottoms; i++) {
                index = Math.floor(Math.random()*moreIndecies.length);
                randBottoms.push(pants[moreIndecies[index]]);
                moreIndecies.splice(index, 1);
            }

            var oneshirt = [randTops[Math.floor(Math.random()*randTops.length)]]
            var onebottom = [randBottoms[Math.floor(Math.random()*randBottoms.length)]]

            // randTops has random number of shirts
            // randBottoms has random number of bottoms
            // oneshirt has one random shirt from list
            // onepants is one random bottom from list

            var surveyOutput = new SurveyOutputObject();
            surveyOutput.randomOutfit.Tops = oneshirt;
            surveyOutput.randomOutfit.Bottoms = onebottom;
            surveyOutput.randomWardrobe.Tops = randTops;
            surveyOutput.randomWardrobe.Bottoms = randBottoms;
            
            res.json({
                surveyOutput
            });
        }
    });
};

// Handle create garment actions
exports.receive = (req, res) => {
    var surveyObject = new SurveyObject();
    surveyObject.sex = req.body.sex;
    surveyObject.state = req.body.state;
    surveyObject.factors.formality = req.body.formality;
    surveyObject.factors.weather = req.body.weather;
    surveyObject.factors.temperature = req.body.temperature;
    surveyObject.factors.season = req.body.season;
    surveyObject.createdOutfit.Tops = req.body.Tops;    
    surveyObject.createdOutfit.Bottoms = req.body.Bottoms;
    surveyObject.createRating = req.body.createRating;
    surveyObject.randomOutfit.Tops = req.body.randTops;
    surveyObject.randomOutfit.Bottoms = req.body.randBottoms;
    surveyObject.randRating = req.body.randRating;
    // Save the garment and check for errors
    surveyObject.save((err, survey) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                message: 'New survey received!',
                data: surveyObject
            });
        }
    });
};