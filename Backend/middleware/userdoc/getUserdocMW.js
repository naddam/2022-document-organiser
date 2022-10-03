const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

   const UserdocModel = requireOption(objectrepository, 'UserdocModel');

    return function (req, res, next) {
        UserdocModel.findOne({ _id: req.params.userdocid }, (err, userdoc) => {
            if(err || !userdoc){
                return next(err);
            }
            res.locals.userdoc = userdoc;
            return next();
        });
    };
};