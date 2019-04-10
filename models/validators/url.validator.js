var validate = require('mongoose-validator');

var isURL = validate({
    validator: 'isURL',
    protocols: ['http','https','ftp'], 
    require_tld: true, 
    require_protocol: true,
    message: 'invalid url scheme'
});

module.exports = isURL;