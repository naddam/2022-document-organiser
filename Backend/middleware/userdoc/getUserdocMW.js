const { response } = require('express');
const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

    const UserdocModel = requireOption(objectrepository, 'UserdocModel');

    return function (req, res, next) {
        UserdocModel.findOne({ _id: req.params.userdocid }, (err, userdoc) => {
            if (err || !userdoc) {
                return next(err);
            }
            if (res.locals.authenticatedUser.id === userdoc._owner || res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin') {
                res.locals.userdoc = userdoc;
            }
            else{
                res.status(200).json({success:false, message: "Error! Access level too low."});
            }
            return next();
        });
    };
};