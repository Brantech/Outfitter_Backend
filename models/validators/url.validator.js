var validate = require('mongoose-validator');

var isUrl = {
    validator: value => validate.isURL(value, { 
        protocols: ['http','https','ftp'], 
        require_tld: true, 
        require_protocol: true
    }),
    message: 'invalid url scheme'
};

module.exports = isUrl;