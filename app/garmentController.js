// Import garment model
Garment = require('./garmentModel');

// Handle index actions
exports.index = (req, res) => {
    Garment.get((err, garments) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Garments retrieved successfully",
            data: garments
        });
    });
};

// Handle create garment actions
exports.new = (req, res) => {
    var garment = new Garment();
    garment.name = req.body.name ? req.body.name : garment.name;
    garment.color = req.body.color;
    garment.fabric = req.body.fabric;
    garment.pattern = req.body.pattern;
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
exports.view = (req, res) => {
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
exports.update = (req, res) => {
    Garment.findById(req.params.garment_id, (err, garment) => {
        if (err) {
            res.send(err);
        }
        garment.name = req.body.name ? req.body.name : garment.name;
        garment.color = req.body.color;
        garment.fabric = req.body.fabric;
        garment.pattern = req.body.pattern;

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
exports.delete = (req, res) => {
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