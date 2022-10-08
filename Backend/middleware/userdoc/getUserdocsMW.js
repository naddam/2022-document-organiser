const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

    const UserdocModel = requireOption(objectrepository, 'UserdocModel');

    return function (req, res, next) {
        if (res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin') {
            UserdocModel.find({}, (err, userdocs) => {
                if (err) {
                    return next(err);
                }
                res.locals.userdocs = userdocs;
                return next();
            });
        }
        else{
            UserdocModel.find({_owner: res.locals.authenticatedUser.id}, (err, userdocs) => {
                if (err) {
                    return next(err);
                }
                res.locals.userdocs = userdocs;
                return next();
            });
        }
    };
};