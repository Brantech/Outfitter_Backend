var CognitoExpress = require('cognito-express');
var config = require('../config');

const cognitoExpress = new CognitoExpress(config.COGNITO_CONFIG);

var authorization = function (req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
        var message = {auth: false, message: 'No token provided.'};
        return res.status(401).send(message);
    }

    cognitoExpress.validate(token, function(err, response) {
        if (err) {
            var message = {auth: false, message: 'Failed to authenticate token.'};
            return res.status(401).send(message);
        }
        req.app.locals.user = response;
        next();
    });
}

module.exports = authorization;