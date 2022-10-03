const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

   const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        UserModel.find({}, (err, users) => {
            if(err){
                return next(err);
            }
            res.locals.users = users;
            return next();
        });
    };
};