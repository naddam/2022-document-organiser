const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Userdoc = db.model('Userdoc', {
    name: String,
    _doctype: {
        type: Schema.Types.ObjectId,
        ref: 'Doctype'
    },
    details: [{key: String, keyType: {type: String, enum: ['Number', 'String', 'Date']}, value: Schema.Types.Mixed}],
    expires_at: Date,
});

module.exports = Userdoc;