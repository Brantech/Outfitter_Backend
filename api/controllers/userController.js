// Import user model
User = require('./../models/userModel');


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
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    // Save the user and check for errors
    user.save((err) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                message: 'New user created!',
                data: user
            });
        }
    });
};

// Handle view user info
exports.view = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                message: 'User details loading...',
                data: user
            });
        }
    });
};

// Handle update user info
exports.update = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.username = req.body.username;
            user.password = req.body.password;
            user.email = req.body.email;
    
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
};

// Handle delete user
exports.delete = (req, res) => {
    User.remove({ _id: req.params.user_id }, (err, user) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else {
            res.json({
                status: "success",
                message: 'User deleted'
            });
        }
    });
};