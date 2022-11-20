const nodemailer = require('nodemailer');
const UserModel = require('../models/user')
const UserdocModel = require('../models/userdoc')

module.exports = function () {

    UserModel.find({ role: 'User' }, (err, users) => {
        if (err) {
            console.log(err);
        }
        else {
            users.forEach(user => {
                UserdocModel.find({ _owner: user._id }, (err, docs) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        let temp = `Hi ${user.name}!\n\nYour following documents will expire in the the next 4 weeks:\n\n`;
                        docs.forEach((doc) => {
                            let expirity = new Date(doc.expires_at);
                            let checkBefore = new Date();
                            checkBefore.setDate(checkBefore.getDate() + 4 * 7)
                            if (expirity<checkBefore) {
                                temp+=`${doc.name} -------- ${doc.expires_at.getFullYear()}/${doc.expires_at.getMonth()+1}/${doc.expires_at.getDate()}\n`;
                            }
                        });
                        temp+="\nThank you again for using our service,\n\nThe Document Organiser team."
                        let mailOptions = {
                            from: 'Document Organiser <doc.org.naddam@gmail.com>',
                            to: user.email,
                            subject: 'You have document(s) that are about to expire!',
                            text: temp,
                        };

                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'doc.org.naddam@gmail.com',
                                pass: 'zosrckvhqujsllsy',
                            },
                        });

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) console.log(error);
                            else console.log('Email sent to ' + user.email + ' -- ' + info.response);
                        });
                    }
                })
            });
            console.log('--------------')
            console.log('All mails sent')
        }
    });
}