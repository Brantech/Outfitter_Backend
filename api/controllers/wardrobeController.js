// Import garment model
WardrobeItem = require('./../mocks/wardrobeModel');

// Handle index actions
exports.indexWardrobeItems = (req, res) => {
    WardrobeItem.get((err, wardrobeItems) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "User's garments retrieved successfully",
            data: wardrobeItems
        });
    });
};

// Handle create garment actions
exports.newWardrobeItem = (req, res) => {
    var wardrobeItem = new WardrobeItem();
    wardrobeItem.owner_id = req.body.owner_id; // = cookies
    wardrobeItem.unavailable = req.body.unavailable;
    wardrobeItem.reserveDate = req.body.reserveDate;
    wardrobeItem.reserveTilDate = req.body.reserveTilDate;
    wardrobeItem.torn = req.body.torn;
    wardrobeItem.garment_id = req.body.garment_id;
    // Save the garment and check for errors
    wardrobeItem.save((err) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            message: 'New wardrobe item created!',
            data: wardrobeItem
        });
    });
};

// Handle view garment info
exports.viewWardrobeItem = (req, res) => {
    WardrobeItem.findById(req.params.wardrobeItem_id, (err, wardrobeItem) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Wardrobe details loading...',
            data: wardrobeItem
        });
    });
};

// Handle update garment info
exports.updateWardrobeItem = (req, res) => {
    WardrobeItem.findById(req.params.wardrobeItem_id, (err, wardrobeItem) => {
        if (err) {
            res.send(err);
        }
        wardrobeItem.owner_id = req.body.owner_id; // = cookies
        wardrobeItem.unavailable = req.body.unavailable;
        wardrobeItem.reserveDate = req.body.reserveDate;
        wardrobeItem.reserveTilDate = req.body.reserveTilDate;
        wardrobeItem.torn = req.body.torn;
        wardrobeItem.garment_id = req.body.garment_id;
        // save the garment and check for errors
        wardrobeItem.save((err) => {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'Wardrobe Info updated',
                data: wardrobeItem
            });
        });
    });
};

// Handle delete garment
exports.deleteWardrobeItem = (req, res) => {
    WardrobeItem.remove({ _id: req.params.wardrobeItem_id }, (err, wardrobeItem) => {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            message: 'Garment deleted'
        });
    });
};