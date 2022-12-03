const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Userdoc = db.model('Userdoc', {
    name: String,
    _doctype: {
        type: Schema.Types.ObjectId,
        ref: 'Doctype'
    },
    _owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    details: [{key: String, keyType: {type: String, enum: ['Number', 'String', 'Date']}, value: Schema.Types.Mixed}],
    expires_at: Date,
    currentfile: {date: Date, location: String},
    oldfiles: [{date: Date, location: String}],
    upgrade: Boolean
});

module.exports = Userdoc;