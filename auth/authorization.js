// TODO: Include role-based authentication w/Cognito.

var authorization = function (req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token) {
        var json = {
            status: 401,
            auth: false,
            message: 'No token provided'
        };
        return res.status(401).json(json);
    }

    req.app.locals.cognitoExpress.validate(token, function(err, response) {
        if (err) {
            var json = {
                status: 401,
                auth: false, 
                message: 'Failed to authenticate token'
            };
            return res.status(401).json(json);
        }
        res.locals.auth = response;
        next();
    });
}

module.exports = authorization;