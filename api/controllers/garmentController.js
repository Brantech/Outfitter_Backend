// Import garment model
Garment = require('./../mocks/garmentModel');

// Handle index actions
exports.indexGarments = (req, res) => {
    Garment.get((err, garments) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            garments
        });
    });
};

// Handle create garment actions
exports.newGarment = (req, res) => {
    var garment = new Garment();
    garment.type = req.body.type ? req.body.type : garment.type;
    garment.imageLink = req.body.imageLink;
    // Save the garment and check for errors
    garment.save((err) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: 'New garment created!',
            data: garment
        });
    });
};

// Handle view garment info
exports.viewGarment = (req, res) => {
    Garment.findById(req.params.garment_id, (err, garment) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Garment details loading...',
            data: garment
        });
    });
};

// Handle update garment info
exports.updateGarment = (req, res) => {
    Garment.findById(req.params.garment_id, (err, garment) => {
        if (err) {
            res.send(err);
        }
        garment.type = req.body.type ? req.body.type : garment.type;
        garment.imageLink = req.body.imageLink;

        // save the garment and check for errors
        garment.save((err) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'Garment Info updated',
                data: garment
            });
        });
    });
};

// Handle delete garment
exports.deleteGarment = (req, res) => {
    Garment.remove({ _id: req.params.garment_id }, (err, garment) => {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'Garment deleted'
        });
    });
};