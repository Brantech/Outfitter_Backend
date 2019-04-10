var AmazonCognitoIdentity = require('amazon-cognito-identity-js-node');
var colors = require('colors');
var cors = require('cors');
var createDebug = require('debug');
var createError = require('http-errors');
var CognitoExpress = require('cognito-express');
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
  res.locals = {
    jwk: {
      "keys":
      [
          {   // This key is used to verify the id tokens
              "alg":"RS256",
              "e":"AQAB",
              "kid":"r59aWNwnX2Zgoap95YQ6JOpMQ8K5N4V0LtuJlXt7OAE=",
              "kty":"RSA",
              "n":"k7VdEiTtMCNs5y3VuwTMBvN4AJVNV836r-PRQCUPnhxZ9UnLeAHBGrg7qByxZ3ZrZ6x4mmpMiMWBl92owl06zTDbj_p3AJDGB-H_yQ6AnxU-A_67K7PQWp1LlGGZx_x7Ivw3YzwZ5tWAeo7OPHlESuyRIczE9WQwSEX7Nvkn4Jw9jvFM71fSaUY4SmF0qV2lnNouqObuChpZ4DrLHpcD_eezLs1Et2PzPdmpRkt0SDOD2tPUKomA7RL4MIHRWnC5g9-UPiv4kHfBsyXzJC2yElcfb3dX8iIlP4D8ydEC02d4QpAh4QE6Jya3LKq7U0G-oAc5Cj5_a8pDYFrDFJWdqw",
              "use":"sig"
          },
          {   // This key is used to verify the access tokens
              "alg":"RS256",
              "e":"AQAB",
              "kid":"6YCyR6wK9ao3K2Do5uDSd9eqvscDtPCZgu9W3XUkoIc=",
              "kty":"RSA",
              "n":"jyIVK7PvVw9zz_e8jKlOBrFRbRVgFn5rPgIk_q6YMO65vQdvhFPOD6FePb_ktsj19eQiP2AsU-3YNkrzOwoC1aMOehcWEbcs6DJn1siAZ9NtGymt1k3Qt6bT4aIBlhrPRrtvWQ3tgIcCr1qpVmar_F33mWOOjKbWeievy5beg-KwYBeeNYb_BE8XUA5JC4V671buykU2vFAfZiCWvb-7drK37eLYKI8hkbiGMf_qKxCq7SxfmPI4dtEdMWB0wM_EfeHY4XxM4UDqcz64PWg4no58_QAa04GMrHUocy8BMv4564bQuTAEiDgNxBf79508Y_tcO4GJzRxmwN7-htYUnQ",
              "use":"sig"
          }
      ]
    },
  };
    next(createError(404));
});

/**
 * Error handler. Handles the generation of error responses.
 */
app.use(function (err, req, res, next) {
    var isDevEnvironment = config.environment === 'development';
    return res.status(err.status).json({
        status: err.status,
        message: isDevEnvironment || err.expose ? err.message : 'Unknown',
        errors: isDevEnvironment ? err.stack : {}
    });
});

module.exports = app;