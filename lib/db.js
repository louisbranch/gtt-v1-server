config = require('../config');
module.exports = require('nano')(config.DB);
