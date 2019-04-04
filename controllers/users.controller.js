var UserService = require('../services/user.service');

exports.getUsers = async function (req, res, next) {
    try {
        var users = await UserService.getUsers({}, limit);
        var json = {
            status: 200, 
            message: 'Successfully retrieved users',
            data: users
        };
        return res.status(200).json(json);
    } catch (e) {
        var json = {
            status: 400,
            message: 'Failed to retrieve users'
        }
        return res.status(400).json(json);
    }
}

exports.createUser = async function (req, res, next) {
    var user = {
        _id: req.body.
    };
    try {
        var createdUser = await UserService.createUser(user);
        var json = {
            status: 201, 
            message: 'Successfully created user',
            data: createdUser
        };
        return res.status(201).json(json);
    } catch (e) {
        var json = {
            status: 400, 
            message: 'User creation failed',
            data: createdUser
        };
        return res.status(400).json(json);
    }
}

exports.updateUser = async function (req, res, next) {
    var id = req.app.locals.auth.sub;
    var update = {

    };

}
