config = require('../config')
exports.dbServer = require('nano')(config.DB)

exports.createTask = function(message, type, branch){
}
