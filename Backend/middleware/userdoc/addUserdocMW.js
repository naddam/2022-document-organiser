const requireOption = require('../generic/requireOption');
const uuid = require('uuid');

module.exports = function (objectrepository) {

    const UserdocModel = requireOption(objectrepository, 'UserdocModel');

    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body._doctype === 'undefined') ||
            (typeof req.body.expires_at === 'undefined') ||
            (typeof req.body.details === 'undefined')) {
            return next();
        }
        res.locals.userdoc = new UserdocModel();
        res.locals.userdoc.name = req.body.name;
        res.locals.userdoc.upgrade = false;
        res.locals.userdoc._doctype = req.body._doctype;
        res.locals.userdoc.currentfile = {location: res.locals.filename, date: Date.now()};
        res.locals.userdoc.oldfiles = [];
        if (req.body._owner && (res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin')) {
            res.locals.userdoc._owner = req.body._owner;
        }
        else {
            res.locals.userdoc._owner = res.locals.authenticatedUser.userId;
        }
        res.locals.userdoc.expires_at = req.body.expires_at;
        try {
            res.locals.userdoc.details = JSON.parse(req.body.details);
        }
        catch {
            res.locals.userdoc.details = req.body.details;
        }
        res.locals.userdoc.save((err) => {
            if (err) {
                return next(err);
            }
            return next();
        })
    };
};