const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

   const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        UserModel.findOne({ _id: req.params.userid }, (err, user) => {
            if(err || !user){
                return next(err);
            }
            if(user._id == res.locals.authenticatedUser.userId || res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin'){
                res.locals.user = user;
                return next();
            }
            else{
                res.status(200).json({success:false, message: "Error! Access level too low."});
            }
        });
    };
};