const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

   const UserdocModel = requireOption(objectrepository, 'UserdocModel');

    return function (req, res, next) {
        UserdocModel.find({}, (err, userdocs) => {
            if(err){
                return next(err);
            }
            res.locals.userdocs = userdocs;
            return next();
        });
    };
};