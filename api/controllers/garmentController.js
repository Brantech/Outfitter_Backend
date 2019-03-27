// Import garment model
Garment = require('./../models/garmentModel');
Wardrobe = require('./../models/wardrobeModel');

// Handle index actions
exports.index = (req, res) => {
    Garment.get((err, garments) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                status: "success",
                message: "Garments retrieved successfully",
                data: garments
            });
        }
    });
};

// Combine garments
exports.combine = (req, res) => {
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
            var combos = new Array();

            for(var i = 0; i < garments.length; i++) {
                if(garments[i].type == 'shirt') {
                    shirts.push(garments[i]);
                }
                if(garments[i].type == 'pants') {
                    pants.push(garments[i]);
                }
            }
            for(var i = 0; i < shirts.length; i++) {
                for(var j = 0; j < pants.length; j++) {
                    combos.push([shirts[i], pants[j]]);
                }
            }

            res.json({
                status: "success",
                message: "Garment combinations retrieved successfully",
                data: combos
            });
        }
    });
};

// Handle create garment actions
exports.new = (req, res) => {
    var garment = new Garment();
    garment.type = req.body.type;
    garment.imageLink = req.body.imageLink;
    garment.src = req.body.src;
    // Save the garment and check for errors
    Garment.find({
        imageLink : req.body.imageLink
    }).exec((err, garments) => {
        if(err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else if(garments.length) {
            res.json({
                status: "failed",
                message: "Garment already exists.",
            });
        }
        else {
            garment.save((err) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    res.json({
                        message: 'New garment created!',
                        data: garment
                    });
                }
            });
        }
    })
};

// Handle view garment info
exports.view = (req, res) => {
    Garment.findById(req.params.garment_id, (err, garment) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                message: 'Garment details loading...',
                data: garment
            });
        }
    });
};

// Handle update garment info
exports.update = (req, res) => {
    Garment.findById(req.params.garment_id, (err, garment) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            garment.type = req.body.type;
            garment.imageLink = req.body.imageLink;
            garment.src = req.body.src;
            // save the garment and check for errors
            garment.save((err) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    res.json({
                        message: 'Garment Info updated',
                        data: garment
                    });
                }
            });
        }
    });
};

// Handle delete garment
exports.delete = (req, res) => {
    Garment.find({ _id: req.params.garment_id}, (err, garment) => {
        if(!garment.length) {
            res.json({
                status: "failed",
                message: "This garment does not exist."
            });
        }
        else if(err) {
            res.json({
                status: "error",
                message: err
            });
        }
        else if(garment.length) {
            Garment.remove({ _id: req.params.garment_id }, (err) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    Wardrobe.find({garment_id: req.params.garment_id}, (err, garms) => {
                        if(garms.length) {
                            Wardrobe.remove({ garment_id: req.params.garment_id} , (err) => {
                                if(err) {
                                    res.json({
                                        status: "error",
                                        message: err
                                    });
                                }
                                res.json({
                                    status: "success",
                                    message: 'Garment deleted and removed from all wardrobes'
                                });
                            });
                        }
                        else {
                            res.json({
                                status: "success",
                                message: 'Garment is deleted, and it does not exist in any wardrobes.'
                            })
                        }
                    })
                }
            });
        }
        else {
            res.json({
                status: "error",
                message: "An unknown issue has occurred."
            });
        }
    })
};