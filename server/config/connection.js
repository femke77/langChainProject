const {connect, connection} = require('mongoose');

connect('mongodb://localhost:27017/langChainProject')

module.exports = connection;