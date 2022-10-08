const requireOption = require('../generic/requireOption');
const jwt = require("jsonwebtoken");

module.exports = function (objectrepository, accessLevel) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        const token = req.headers.authorization.split(' ')[1]; 
        //Authorization: 'Bearer TOKEN'
        if(!token)
        {
            res.status(200).json({success:false, message: "Error! Token was not provided."});
        }
        //Decoding the token
        const decodedToken = jwt.verify(token,"woooosh-magical-secret-key" );
        UserModel.findOne({ _id: decodedToken.userId }, (err, user) => {
            if(err || !user){
                return next(err);
            }
            res.locals.authenticatedUser = {
                id: decodedToken.userId,
                role: user.role
            };
            if(accessLevel === 'User'){
                return next();
            }
            else if(accessLevel === 'Administrator'){
                if(user.role === 'Administrator' || user.role === 'Superadmin'){
                    return next();
                }
                else{
                    res.status(200).json({success:false, message: "Error! Access level too low."});
                }
            }
            else if(accessLevel === 'Superadmin'){
                if(user.role === 'Superadmin'){
                    return next();
                }
                else{
                    res.status(200).json({success:false, message: "Error! Access level too low."});
                }
            }
        });
    };
};