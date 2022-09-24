const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

   const DoctypeModel = requireOption(objectrepository, 'DoctypeModel');

    return function (req, res, next) {
        DoctypeModel.findOne({ _id: req.params.typeid }, (err, doctype) => {
            if(err || !doctype){
                return next(err);
            }
            res.locals.doctype = doctype;
            return next();
        });
    };
};