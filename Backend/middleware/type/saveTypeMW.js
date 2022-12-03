const requireOption = require('../generic/requireOption');

module.exports = function (objectrepository) {

    const UserdocModel = requireOption(objectrepository, 'UserdocModel');

    return function (req, res, next) {
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.details === 'undefined')) {
            return next();
        }
        res.locals.doctype.name = req.body.name;
        let parsedDetails = JSON.parse(req.body.details);
        let upgrade = false;
        if (parsedDetails.length !== res.locals.doctype.details.length) {
            upgrade = true;
        }
        else {
            parsedDetails.forEach((element, idx) => {
                if (element.key !== res.locals.doctype.details[idx].key || element.keyType !== res.locals.doctype.details[idx].keyType) {
                    upgrade = true;
                }
            });
        }
        res.locals.doctype.details = parsedDetails;
        res.locals.doctype.save((err) => {
            if (err) {
                return next(err);
            }
            else {
                if (upgrade) {
                    UserdocModel.find({ _doctype: res.locals.doctype._id }, (err, docs) => {
                        if (err) {
                            return next(err);
                        }
                        docs.forEach(doc => {
                            doc.upgrade = true;
                            doc.save((err) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('Doc to upgrade: ' + doc._id)
                            });
                        });
                    })
                }
                return next();
            }
        })
    };
};