// Import user and wardrobe models
User = require('./../models/userModel');
Wardrobe = require('./../models/wardrobeModel');

// Authentication
let jwt = require('jsonwebtoken');
let jwkToPem = require('jwk-to-pem');
const {Auth} = require('aws-amplify');

Auth.configure({
    identityPoolId: 'us-east-1:609b02fe-1656-4f3c-a709-f0314352727a',
    region: 'us-east-1',
    userPoolId: 'us-east-1_bBfUzR7Vr',
    userPoolWebClientId: '2qlg1os2kkpdbulfhlt48cptq4',
});


// Handle index actions
exports.index = (req, res) => {
    User.get((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        }
    });
};

// Handle create user actions
exports.new = (req, res) => {
    var newuser = new User();
    // Registration validation
    const payload = {
        username: req.body.username,
        password: req.body.password,
        attributes: {
            email: req.body.email,
            family_name: req.body.lname,
            name: req.body.fname
        }
    }
    Auth.signUp(payload).then((data) => {
        console.log("hey1");
        newuser.username = data['user']['username']
        newuser._id = data['userSub']
        console.log("hey2");
        // Save the user and check for errors
        newuser.save((err, newuser) => {
            console.log("Yup");
            if (err) {
                console.log("fail");
                res.send({
                    status: "error",
                    message: err,
                });
            }
            else {
                console.log("success");
                res.send({
                    message: 'New user created!',
                    data: newuser
                });
            }
        });
    }).catch(err => {
        console.log(err)
        console.log("I mean we got somewhere.");
        res.send({message: err})
    });
};

// Handle view user info
exports.view = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false})
        } else {
            User.findById(decoded['sub'], (err, user) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    if(user) {
                        res.json({
                            success: true,
                            message: 'User details loading...',
                            data: user
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            message: 'There is no such user in existence.'
                        });
                    }
                }
            });
        }
    });
};

// Handle update user info
exports.update = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false})
        }
        else {
            User.findById(decoded['sub'], (err, user) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                else {
                    if(req.body.username) {
                        user.username = req.body.username;
                    }
                    // save the user and check for errors
                    user.save((err) => {
                        if (err) {
                            res.json({
                                status: "error",
                                message: err,
                            });
                        }
                        else {
                            res.json({
                                message: 'User Info updated',
                                data: user
                            });
                        }
                    });
                }
            });
        }
    });
};

// Handle delete user
exports.delete = (req, res) => {
    jwt.verify(req.params.idToken, jwkToPem(res.locals.jwk.keys[0]), {algorithms: ['RS256']}, (err, decoded) => {
        if(err) {
            console.log(err)
            res.send({success: false})
        }
        else {
            console.log(decoded);

            User.remove({ _id: decoded['sub'] }, (err) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err,
                    });
                }
                else {
                    Wardrobe.deleteMany({
                        owner_id: decoded['sub']
                    })
                    .exec((err) => {
                        if(err) {
                            res.json({
                                success: false,
                                message: err,
                            });
                        }
                        else {
                            res.json({
                                success: true,
                                message: 'User and wardrobe deleted'
                            });
                        }
                    });
                }
            });
        }
    });
};