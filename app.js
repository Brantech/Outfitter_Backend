var colors = require('colors');
var cors = require('cors');
var createDebug = require('debug');
var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var apiRouter = require('./routes/api');
var config = require('./config');

var app = express();
var debug = createDebug(config.API_DEBUG);

/**
 * Configure express middleware and api route(s).
 */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: config.ORIGINS}))
app.use('/api', apiRouter);

/**
 * Connect to MongoDB.
 */
mongoose.connect(config.DATABASE, {useNewUrlParser: true})
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
        error: (config.ENV === 'development') ? err : {}
    } 
    return res.status(status).send(message);
});

module.exports = app;