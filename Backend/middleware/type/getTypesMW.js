const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

   const DoctypeModel = requireOption(objectrepository, 'DoctypeModel');

    return function (req, res, next) {
        DoctypeModel.find({}, (err, doctypes) => {
            if(err){
                return next(err);
            }
            res.locals.doctypes = doctypes;
            return next();
        });
    };
};