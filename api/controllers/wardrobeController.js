// Import wardrobe and garment models
Wardrobe = require('./../models/wardrobeModel');
Garment = require('./../models/garmentModel');
User = require('./../models/userModel');

// Authentication
let jwt = require('jsonwebtoken');
let jwkToPem = require('jwk-to-pem');

// Get all combinations
exports.combine = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.json({
                success: false,
                err: err
            });
        }
        else {
            Wardrobe.find({
                owner_id: decoded.sub
            })
            .exec((err, wardrobes) => {
                if(err == null) {
                    var tops = new Array();
                    var bottoms = new Array();
                    var combos = new Array();
        
                    for(var i = 0; i < wardrobes.length; i++) {
                        if(wardrobes[i].type == 'top') {
                            tops.push(wardrobes[i]);
                        }
                        if(wardrobes[i].type == 'bottom') {
                            bottoms.push(wardrobes[i]);
                        }
                    }
                    for(var i = 0; i < tops.length; i++) {
                        for(var j = 0; j < bottoms.length; j++) {
                            combos.push([tops[i], bottoms[j]]);
                        }
                    }
                    res.json({
                        success: true,
                        data: combos
                    });
                } else {
                    res.json({
                        success: false,
                        err: err
                    });
                }
            });
        }
    });
};

// Get user's wardrobe garments
exports.index = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false, err: err});
        } else {
            Wardrobe.find({
                owner_id: decoded.sub
            })
            .exec((err, wardrobes) => {
                if(err == null) {
                    res.json({
                        success: true,
                        data: wardrobes
                    });
                } else {
                    res.json({
                        success: false,
                        err: err
                    })
                }
            });
        }
    });
};

// Handle create garment actions
exports.new = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false})
            return
        } else {
            Garment.find({_id: req.body.garment_id}, (err, garment) => {
                if (garment) {
                    Wardrobe.find({garment_id: req.body.garment_id, owner_id: decoded.sub}, (err, wardrobeitem) => {
                        if(wardrobeitem.length) {
                            res.json({
                                success: false,
                                message: "This garment is already in your closet."
                            });
                        }
                        else {
                            var wardrobeItem = new Wardrobe();
                            wardrobeItem.owner_id = decoded.sub;
                            wardrobeItem.garment_id = req.body.garment_id;
                            wardrobeItem.type = garment[0].type;
                            wardrobeItem.src = req.body.src;
                            if(req.body.tags) {
                                wardrobeItem.tags = req.body.tags;
                            }
                            // Save the garment and check for errors
                            wardrobeItem.save((err) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        message: err,
                                    });
                                }
                                else {
                                    res.json({
                                        success: true,
                                        data: wardrobeItem
                                    });
                                }
                            });
                        }
                    });        
                }
                else {
                    res.json({
                        success: false,
                        message: "Garment does not exist in catalog."
                    });
                }
            });
        }
    });
};

// Handle view garment info
exports.view = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false})
            return
        } else {
            Wardrobe.findById(req.params.wardrobe_id, (err, wardrobeItem) => {
                if (err) {
                    res.json({
                        success: false,
                        err: err,
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: wardrobeItem
                    });
                }
            });
        }
    });
};

// Handle update garment info
exports.update = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false})
            return
        } else {
            Wardrobe.find({owner_id: decoded.sub, garment_id: req.params.garment_id}, (err, wardrobeItem) => {
                if(wardrobeItem.length) {
                    if(req.body.tags) {
                        wardrobeItem[0].tags = req.body.tags;
                    }
                    if(req.body.type) {
                        wardrobeItem[0].type = req.body.type;
                    }
                    // save the garment and check for errors
                    wardrobeItem[0].save((err) => {
                        if (err) {
                            res.json({
                                success: false,
                                message: err,
                            });
                        }
                        else {
                            res.json({
                                success: true,
                                data: wardrobeItem
                            });
                        }
                    });
                }
                else if (err) {
                    res.json({
                        success: false,
                        err: err,
                    });
                }
                else {
                    res.json({
                        success: false,
                        err: "No such item in wardrobe",
                    });
                }
                
            });
        }
    });
};

// Handle delete garment
exports.delete = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false})
            return
        } else {
            Wardrobe.remove({ owner_id: decoded.sub, garment_id: req.params.garment_id }, (err) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err,
                    });
                }
                else {
                    res.json({
                        success: true,
                    });
                }
            });
        }
    });
};