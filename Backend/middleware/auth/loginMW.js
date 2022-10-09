const requireOption = require('../generic/requireOption');
const jwt = require("jsonwebtoken");

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return async function (req, res, next) {

        if ((typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        let existingUser;
        try {
            existingUser = await UserModel.findOne({ email: req.body.email });
        } catch {
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }
        if (!existingUser || existingUser.password != req.body.password) {
            const error = Error("Wrong details please check at once");
            res.status(401);
            return next(error);
        }
        let token;
        try {
            //Creating jwt token
            token = jwt.sign(
                { userId: existingUser.id, email: existingUser.email },
                "woooosh-magical-secret-key",
                { expiresIn: "24h" }
            );
        } catch (err) {
            console.log(err);
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }

        res.status(200)
            .json({
                success: true,
                data: {
                    userId: existingUser.id,
                    name: existingUser.name,
                    role: existingUser.role,
                    email: existingUser.email,
                    token: token,
                },
            });
    };
};