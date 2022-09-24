const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/docOrg');

module.exports = mongoose;