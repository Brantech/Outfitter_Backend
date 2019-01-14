// Import garment model
Wardrobe = require('./../mocks/wardrobeModel');

// Handle index actions
exports.index = (req, res) => {
    Wardrobe.get((err, wardrobes) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "User's garments retrieved successfully",
            data: wardrobes
        });
    });
};

// Handle create garment actions
exports.new = (req, res) => {
    var wardrobe = new Wardrobe();
    wardrobe.owner_id = req.body.owner_id; // = cookies
    // Save the garment and check for errors
    wardrobe.save((err) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: 'New wardrobe item created!',
            data: wardrobe
        });
    });
};

// Handle view garment info
exports.view = (req, res) => {
    Wardrobe.findById(req.params.wardrobe_id, (err, wardrobe) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Wardrobe details loading...',
            data: wardrobe
        });
    });
};

// Handle update garment info
exports.update = (req, res) => {
    Wardrobe.findById(req.params.wardrobe_id, (err, wardrobe) => {
        if (err) {
            res.send(err);
        }
        wardrobe.owner_id = req.body.owner_id; // = cookies

        // save the garment and check for errors
        wardrobe.save((err) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'Wardrobe Info updated',
                data: wardrobe
            });
        });
    });
};

// Handle delete garment
exports.delete = (req, res) => {
    Wardrobe.remove({ _id: req.params.wardrobe_id }, (err, wardrobe) => {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'Garment deleted'
        });
    });
};