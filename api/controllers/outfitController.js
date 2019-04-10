Outfit = require('./../models/outfitModel');

exports.index = (req, res) => {
    Outfit.find({
        shared: true
    })
    .exec((err, outfits) => {
        if(err == null) {
            res.json({
                success: true,
                data: outfits
            });
        } else {
            res.json({
                success: false,
                err: err
            })
        }
    });
};

exports.viewAll = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false, err: err});
        } else {
            Outfit.find({
                owner_id: decoded.sub
            })
            .exec((err, outfits) => {
                if(err == null) {
                    res.json({
                        success: true,
                        data: outfits
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
}

exports.new = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false, err: err});
        } else {
            Outfit.find({
                owner_id: decoded.sub, 
                top: req.body.top, 
                bottom: req.body.bottom
            })
            .exec((err, outfits) => {
                if(outfits.length != 0) {
                    res.send({success: false, err: "This outfit already exists."});
                    return;
                }
            })

            var outfit = new Outfit();
            outfit.owner_id = decoded.sub;
            outfit.top = req.body.top;
            outfit.bottom = req.body.bottom;
            if(req.body.rating) {
                outfit.rating = req.body.rating;
            }
            if(req.body.category) {
                outfit.category = req.body.category;
            }
            
            outfit.save((err) => {
                if (err) {
                    res.json({
                        success: false,
                        err: err,
                    });
                }
                else {
                    res.json({
                        success: true,
                        data: outfit
                    });
                }
            })
        }
    });
}

exports.update = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err);
            res.send({success: false, err: err});
        } else {
            Outfit.find({
                owner_id: decoded.sub,
                _id: req.body._id
            }).exec((err, outfit) => {
                if(req.body.rating) {
                    outfit.rating = rating;
                }
                if(req.body.category) {
                    outfit.category = category;
                }

                outfit.save((err) => {
                    if(err) {
                        res.json({
                            success: false, 
                            err: err
                        });
                    }
                    else {
                        res.json({
                            success: true
                        });
                    }
                });
            });
        }
    });
}

exports.delete = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err);
            res.send({success: false, err: err});
        }
        else {
            Outfit.remove({owner_id: decoded.sub, _id: req.body._id}, (err) => {
                if(err) {
                    res.json({
                        success: false,
                        err: err
                    });
                }
                else {
                    res.json({
                        success: true
                    })
                }
            })
        }
    });
}