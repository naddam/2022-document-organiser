const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

    const UserdocModel = requireOption(objectrepository, 'UserdocModel');

    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body._doctype === 'undefined') ||
            (typeof req.body._owner === 'undefined') ||
            (typeof req.body.expires_at === 'undefined') ||
            (typeof req.body.details === 'undefined')) {
            return next();
        }

        res.locals.userdoc = new UserdocModel();
        res.locals.userdoc.name = req.body.name;
        res.locals.userdoc._doctype = req.body._doctype;
        res.locals.userdoc._owner = req.body._owner;
        res.locals.userdoc.expires_at = req.body.expires_at;
        res.locals.userdoc.details = JSON.parse(req.body.details);
        res.locals.userdoc.save((err) => {
            if (err) {
                return next(err);
            }
            return next();
        })
    };
};