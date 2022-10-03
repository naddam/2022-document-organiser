const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.role === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        res.locals.user = new UserModel();
        res.locals.user.name = req.body.name;
        res.locals.user.email = req.body.email;
        res.locals.user.role = req.body.role;
        res.locals.user.password = req.body.password;
        res.locals.user.save((err) => {
            if (err) {
                return next(err);
            }
            return next();
        })
    };
};