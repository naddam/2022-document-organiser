module.exports = function (objectrepository) {
    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.expires_at === 'undefined') ||
            (typeof req.body.details === 'undefined') ||
            (typeof res.locals.userdoc === 'undefined')) {
            return next();
        }
        res.locals.userdoc.name = req.body.name;
        if(req.body._owner && (res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin')){
            res.locals.userdoc._owner = req.body._owner;
        }
        res.locals.userdoc.expires_at = req.body.expires_at;
        try{
            res.locals.userdoc.details = JSON.parse(req.body.details);
        }
        catch{
            res.locals.userdoc.details = req.body.details;
        }
        res.locals.userdoc.save((err) => {
            if (err) {
                return next(err);
            }
            else {
                return next();
            }
        })
    };
};