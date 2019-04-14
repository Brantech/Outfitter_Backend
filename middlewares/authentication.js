const createError = require('http-errors');

const authentication = (req, res, next) => {
    let token = req.headers['x-access-token'];
    
    if (!token) {
        return next(new createError.Unauthorized('missing token'));
    }

    req.app.locals.cognitoExpress.validate(token, function(err, response) {
        if (err) {
            return next(new createError.Unauthorized('unauthorized token'));
        }
        res.locals.auth = response;
        return next();
    });
}

module.exports = authentication;