module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }
        res.locals.user.remove((err) => {
            if (err) {
                return next(err);
            }
            return next();
        })
    };
};