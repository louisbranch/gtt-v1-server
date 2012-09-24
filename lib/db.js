config = require('../config')
exports.dbServer = require('nano')(config.DB)
