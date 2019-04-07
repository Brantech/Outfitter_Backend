var AmazonCognitoIdentity = require('amazon-cognito-identity-js-node');
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
        var deleted = await User.deleteOne({_id: id});
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error('Error could not delete user');
        }
        return deleted;
    } catch (e) {
        throw Error('Error occurred while deleting the user');
    }
}

exports.updateUser = async function (user) {
    var id = user.id;
    try {
        var oldUser = await User.findById(id);
        if (!oldUser) {
            return false;
        }
    } catch (e) {
        throw Error('Error occurred while finding the user');
    }

    oldUser.username = user.username;

    try {
        return await oldUser.save();
    } catch (e) {
        throw Error('Error occurred while saving the updated user');
    }
}

exports.loginUser = async function (userPool, credentials) {
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: credentials.username,
        Pool: userPool
    });
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: credentials.username,
        Password: credentials.password
    });
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            return result.getAccessToken().getJwtToken();
        },
        onFailure: function (err) {
            throw Error('Error occurred while logging in user');
        }
    });
}