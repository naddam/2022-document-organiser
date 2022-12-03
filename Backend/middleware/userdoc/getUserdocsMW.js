const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

    const UserdocModel = requireOption(objectrepository, 'UserdocModel');
    const DoctypeModel = requireOption(objectrepository, 'DoctypeModel');
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function (req, res, next) {
        if (res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin') {
            UserdocModel.find({}, async (err, userdocs) => {
                if (err) {
                    return next(err);
                }
                res.locals.userdocs = [];
                for ([index, element] of userdocs.entries()) {
                    const doctype = await DoctypeModel.findOne({ _id: element._doctype });
                    const owner = await UserModel.findOne({ _id: element._owner });
                    res.locals.userdocs[index] = {};
                    res.locals.userdocs[index]._id = element._id;
                    res.locals.userdocs[index].details = element.details;
                    res.locals.userdocs[index].expires_at = element.expires_at;
                    res.locals.userdocs[index].name = element.name;
                    res.locals.userdocs[index].owner = {_id: owner._id, name: owner.name};
                    res.locals.userdocs[index].doctype = doctype;
                    res.locals.userdocs[index].currentfile = element.currentfile;
                    res.locals.userdocs[index].oldfiles = element.oldfiles;
                    res.locals.userdocs[index].upgrade = element.upgrade;
                }
                return next();
            });
        }
        else {
            UserdocModel.find({ _owner: res.locals.authenticatedUser.userId }, async (err, userdocs) => {
                if (err) {
                    return next(err);
                }
                res.locals.userdocs = [];
                for ([index, element] of userdocs.entries()) {
                    const doctype = await DoctypeModel.findOne({ _id: element._doctype });
                    const owner = await UserModel.findOne({ _id: element._owner });
                    res.locals.userdocs[index] = {};
                    res.locals.userdocs[index]._id = element._id;
                    res.locals.userdocs[index].details = element.details;
                    res.locals.userdocs[index].expires_at = element.expires_at;
                    res.locals.userdocs[index].name = element.name;
                    res.locals.userdocs[index].owner = {_id: owner._id, name: owner.name};
                    res.locals.userdocs[index].doctype = doctype;
                    res.locals.userdocs[index].currentfile = element.currentfile;
                    res.locals.userdocs[index].oldfiles = element.oldfiles;
                    res.locals.userdocs[index].upgrade = element.upgrade;
                }
                return next();
            });
        }
    };
};