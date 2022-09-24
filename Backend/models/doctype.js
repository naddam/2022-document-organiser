const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Doctype = db.model('Doctype', {
    name: String,
    details: [{key: String, keyType: {type: String, enum: ['Number', 'String', 'Date']}}],
});

module.exports = Doctype;