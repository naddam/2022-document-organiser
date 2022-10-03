const requireOption = require('../generic/requireOption');
const jwt = require("jsonwebtoken");

module.exports = function (objectrepository) {

    const UserModel = requireOption(objectrepository, 'UserModel');

    return async function (req, res, next) {

        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        const newUser = UserModel();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.role = "User"
        newUser.password = req.body.password;

        try {
            await newUser.save();
        } catch {
            const error = new Error("Error! Something went wrong.");
            res.status(409);
            return next(error);
        }
        let token;
        try {
            token = jwt.sign(
                { userId: newUser.id, email: newUser.email },
                "woooosh-magical-secret-key",
                { expiresIn: "1h" }
            );
        } catch (err) {
            const error = new Error("Error! Something went wrong.");
            return next(error);
        }
        res
            .status(201)
            .json({
                success: true,
                data: {
                    userId: newUser.id,
                    name: newUser.name,
                    role: newUser.role,
                    email: newUser.email,
                    token: token,
                },
            });
    };
};