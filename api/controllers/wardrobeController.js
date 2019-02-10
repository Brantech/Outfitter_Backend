// Import wardrobe model
Wardrobe = require('./../models/wardrobeModel');
Garment = require('./../models/garmentModel');

// Get all combinations
exports.combine = (req, res) => {
    Wardrobe.get((err, wardrobeItems) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            var list = 
            Wardrobe.find({
                owner_id: req.params.user_id
            })
            .exec((err, wardrobes) => {
                var shirts = new Array();
                var pants = new Array();
                var combos = new Array();
    
                for(var i = 0; i < wardrobes.length; i++) {
                    if(wardrobes[i].type == 'shirt') {
                        shirts.push(wardrobes[i]);
                    }
                    if(wardrobes[i].type == 'pants') {
                        pants.push(wardrobes[i]);
                    }
                }
                for(var i = 0; i < shirts.length; i++) {
                    for(var j = 0; j < pants.length; j++) {
                        combos.push([shirts[i], pants[j]]);
                    }
                }
    
                res.json({
                    status: "success",
                    message: "Wardrobe combinations retrieved successfully",
                    data: combos
                });
            });
        }
    });
};

// Get user's wardrobe garments
exports.index = (req, res) => {
    Wardrobe.get((err, wardrobeItems) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            Wardrobe.find({
                owner_id: req.params.user_id
            })
            .exec((err, wardrobes) => {
                res.json({
                    status: "success",
                    message: "User's garments retrieved successfully",
                    data: wardrobes
                });
            });
        }
    });
};

// Handle create garment actions
exports.new = (req, res) => {
    var wardrobeItem = new Wardrobe();
    wardrobeItem.owner_id = req.params.user_id;
    wardrobeItem.tags = req.body.tags;
    wardrobeItem.garment_id = req.body.garment_id;
    wardrobeItem.type = req.body.type;
    // Save the garment and check for errors
    wardrobeItem.save((err) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                message: 'New wardrobe item created!',
                data: wardrobeItem
            });
        }
    });
};

// Handle view garment info
exports.view = (req, res) => {
    Wardrobe.findById(req.params.wardrobe_id, (err, wardrobeItem) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                message: 'Wardrobe details loading...',
                data: wardrobeItem
            });
        }
    });
};

// Handle update garment info
exports.update = (req, res) => {
    Wardrobe.findById(req.params.wardrobe_id, (err, wardrobeItem) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            wardrobeItem.tags = req.body.tags;
            wardrobeItem.type = req.body.type;
            // save the garment and check for errors
            wardrobeItem.save((err) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    res.json({
                        message: 'Wardrobe garment Info updated',
                        data: wardrobeItem
                    });
                }
            });
        }
    });
};

// Handle delete garment
exports.delete = (req, res) => {
    Wardrobe.remove({ _id: req.params.wardrobe_id }, (err, wardrobeItem) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                status: "success",
                message: 'Garment deleted from wardrobe'
            });
        }
    });
};