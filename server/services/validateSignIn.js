const Compare = require('./../services/compareValue');
const UserModel = require('./../models/User');

module.exports = {
    validateSignIn: async(req, res, next) => {
        let { user_email, user_password } = req.body;
        //console.log('user_email', user_email);
        //console.log('user_password', user_password);
        let user = await UserModel.getUserByEmail(user_email);
        //console.log('user', user);
        if(user.length === 0) {
            return res.json({
                notificationEmail: 'Email is incorrect, please re-enter.'
            });
        } else {
            let newPassword = user_password;
            //console.log('newPassword', newPassword);
            let oldPassword = user[0].user_password;
            //console.log('oldPassword', oldPassword);
            let isCorrectPassword = await Compare.isCompare(newPassword, oldPassword);
            //console.log('isCorrectPassword', isCorrectPassword);
            if(!isCorrectPassword) {
                return res.json({
                    notificationPassword: 'Password is incorrect, please re-enter.'
                });
            } else {
                req.body = user[0];
                next();
            }
        }
    }
}