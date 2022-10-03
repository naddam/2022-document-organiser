module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.locals.userdoc === 'undefined') {
            return next();
        }
        res.locals.userdoc.remove((err) => {
            if (err) {
                return next(err);
            }
            return next();
        })
    };
};