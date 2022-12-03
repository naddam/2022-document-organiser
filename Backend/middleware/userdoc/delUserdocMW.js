const fs = require('fs')

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (typeof res.locals.userdoc === 'undefined') {
            return next();
        }
        if (res.locals.authenticatedUser.userId === `${res.locals.userdoc._owner}` || res.locals.authenticatedUser.role === 'Administrator' || res.locals.authenticatedUser.role === 'Superadmin') {
            res.locals.userdoc.remove((err) => {
                if (err) {
                    return next(err);
                }
                fs.unlink('./files/' + res.locals.userdoc.currentfile.location, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    console.log('File ' + res.locals.userdoc.currentfile.location + ' deleted')
                  })
                res.locals.userdoc.oldfiles.forEach(element => {
                    fs.unlink('./files/' + element.location, (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                        console.log('File' + element.location + ' deleted')
                      })
                });
                return next();
            })
        }
        else{
            res.status(200).json({success:false, message: "Error! Access level too low."});
        }
    };
};