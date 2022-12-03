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
                        let tempHtml = `<p>Hi ${user.name}!</p><br><br><p>Your following documents will expire in the the next 4 weeks:</p>`;
                        let send = false;
                        docs.forEach((doc) => {
                            let expirity = new Date(doc.expires_at);
                            let checkBefore = new Date();
                            checkBefore.setDate(checkBefore.getDate() + 4 * 7)
                            if (expirity < checkBefore) {
                                temp += `${doc.name} -------- ${doc.expires_at.getFullYear()}/${doc.expires_at.getMonth() + 1}/${doc.expires_at.getDate()}\n`;
                                tempHtml += `<p>${doc.name} -------- ${doc.expires_at.getFullYear()}/${doc.expires_at.getMonth() + 1}/${doc.expires_at.getDate()}</p>`;
                                send = true;
                            }
                        });
                        temp += `Visit http://localhost:4040/documents/ to check and update your documents!\n`
                        tempHtml += `<p>Click <a href="http://localhost:4040/documents/">here</a> to check and update your documents!</p><br>`
                        temp += "\nThank you for using our service,\n\nThe Document Organiser team."
                        tempHtml += "<br><p>Thank you for using our service,</p><br><br><p>The Document Organiser team.</p>"
                        let mailOptions = {
                            from: 'Document Organiser <doc.org.naddam@gmail.com>',
                            to: user.email,
                            subject: 'You have document(s) that are about to expire!',
                            text: temp,
                            html: tempHtml
                        };

                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'doc.org.naddam@gmail.com',
                                pass: 'zosrckvhqujsllsy',
                            },
                        });

                        if (send) {

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) console.log(error);
                                else console.log('Email sent to ' + user.email + ' -- ' + info.response);
                            });
                        }
                    }
                })
            });
        }
    });
}