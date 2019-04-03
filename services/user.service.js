var User = require('../models/User.model');

exports.getUser = async function (id) {
    try {
        return await User.findById(id);
    } catch (e) {
        throw Error('Error while fetching user by id');
    }
}

exports.getUsers = async function (query, limit) {
    var options = {limit};
    try {
        return await User.find(query, options);
    } catch (e) {
        throw Error('Error while fetching users');
    }
}

exports.deleteUser = async function (id) {
    try {
        var deleted = await User.remove({_id: id});
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error('User could not delete user');
        }
        return deleted;
    } catch (e) {
        throw Error('Error occurred while deleting the user');
    }
}

exports.updateUser = async function (user) {
    var id = user.id;

    // Get the old user
    try {
        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error('Error occurred while finding the user');
    }
    if (!oldUser) {
        return false;
    }

    // Edit the old user
    oldUser.username = username;

    // Save the updates
    try {
        return await oldUser.save();
    } catch (e) {
        throw Error('Error occurred while saving the updated user');
    }
}

exports.createUser = async function (user) {
    var newUser = new User({
        username = user.username
    });
    try {
        return await newUser.save();
    } catch (e) {
        throw Error('Error occurred while creating user');
    }
}