var validate = require('mongoose-validator');

var urlValidator = {
    validator: value => validate.isURL(value, { 
        protocols: ['http','https','ftp'], 
        require_tld: true, 
        require_protocol: true
    }),
    message: "Invalid URL scheme"
};

module.exports = urlValidator;