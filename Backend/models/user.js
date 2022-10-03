const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    name: String,
    email: {type: String, unique: true},
    role: {type: String, enum: ['User', 'Administrator', 'Superadmin']},
    password: String,
});

module.exports = User;