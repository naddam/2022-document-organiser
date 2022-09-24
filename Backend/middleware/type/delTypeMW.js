module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.locals.doctype === 'undefined') {
            return next();
        }
        res.locals.doctype.remove((err) => {
            if (err) {
                return next(err);
            }
            return next();
        })
    };
};