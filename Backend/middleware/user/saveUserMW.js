module.exports = function (objectrepository) {
    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.email === 'undefined')) {
            return next();
        }
        res.locals.user.name = req.body.name;
        res.locals.user.email = req.body.email;
        if (typeof req.body.role !== 'undefined' && res.locals.authenticatedUser.role === 'Superadmin') {
            res.locals.user.role = req.body.role;
        }
        if (typeof req.body.password !== 'undefined') {
            res.locals.user.password = req.body.password;
        }
        res.locals.user.save((err) => {
            if (err) {
                return next(err);
            }
            else {
                return next();
            }
        })
    };
};