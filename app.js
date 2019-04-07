var colors = require('colors');
var cors = require('cors');
var createDebug = require('debug');
var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var apiRouter = require('./routes/api');
var config = require('./config');

var app = express();
var debug = createDebug(config.debugId);

/**
 * Configure express middleware and api route(s).
 */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: config.cors.origins}))
app.use('/api', apiRouter);

/**
 * Used for verifying cognito access tokens.
 */
app.locals.cognitoExpress = new CognitoExpress({
    region: config.cognito.region,
    cognitoUserPoolId: config.cognito.userPoolId,
    tokenUse: 'access'
});

/**
 * Used for querying the system's cognito user pool. 
 */
app.locals.cognitoUserPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.clientId
});

/**
 * Connect to MongoDB.
 */
mongoose.connect(config.database, {useNewUrlParser: true})
        .then(() => {
            debug('Connected to MongoDB successfully');
        }).catch(() => {
            debug(colors.red('Error connecting to MongoDB'));
        });

/**
 * Generate a 404 and forward the error to the primary error handler.
 */
app.use(function (req, res, next) {
    next(createError(404));
});

/**
 * Error handler. Handles the generation of error responses.
 */
app.use(function (err, req, res, next) {
    var status = err.status || 500;
    var message = {
        status: status,
        message: err.message,
        error: (config.environment === 'development') ? err : {}
    } 
    return res.status(status).send(message);
});

module.exports = app;