module.exports = function (objectrepository) {
    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.details === 'undefined')) {
            return next();
        }
        res.locals.doctype.name = req.body.name;
        res.locals.doctype.details = JSON.parse(req.body.details);
        res.locals.doctype.save((err) => {
            if (err) {
                return next(err);
            }
            else {
                return next();
            }
        })
    };
};