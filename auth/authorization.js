var jwt = require('jsonwebtoken');
var config = require('../config');

var authorization = function (req, res, next) {
    var token = req.headers['x-access-token'];
    
    if (!token) {
        var message = {auth: false, message: 'No token provided.'};
        return res.status(500).send(message);
    }

    jwt.verify(token, config.SECRET, function (err, decodedToken) {
        if (err) {
            var message = {auth: false, message: 'Failed to authenticate token.'};
            return res.status(500).send(message);
        }
        req.decodedToken = decodedToken;
        next();
    });
}

module.exports = authorization;