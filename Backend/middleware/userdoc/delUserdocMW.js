module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.locals.userdoc === 'undefined') {
            return next();
        }
        if (res.locals.authenticatedUser.id === res.locals.userdoc._owner || res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin') {
            res.locals.userdoc.remove((err) => {
                if (err) {
                    return next(err);
                }
                return next();
            })
        }
        else{
            res.status(200).json({success:false, message: "Error! Access level too low."});
        }
    };
};