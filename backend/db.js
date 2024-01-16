const mongoose = require('mongoose');
require('dotenv').config()

const ServerConnection = mongoose.connect(process.env.SERVER_CONNECTION)

module.exports = ServerConnection

