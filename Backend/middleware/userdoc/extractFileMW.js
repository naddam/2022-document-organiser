const uuid = require('uuid');

module.exports = function (objectrepository, required) {

    return function (req, res, next) {
        if (!req.files && required) {
            res.status(200).json({success:false, message: "Error! No files uploaded."});
        }
        else if(!req.files && !required) {
            next();
        }
        else if (req.files.filedata) {
            let filedata = req.files.filedata;
            let filename = uuid.v4();
            let temp = filedata.name.split('.');
            let filetype = temp[temp.length - 1];
            if (temp.length > 1) {
                filename = filename + '.' + filetype;
            }
            filedata.mv('./files/' + filename);
            console.log('File', filedata.name, 'saved as', filename);
            res.locals.filename = filename;
            return next();
        }
    }
}