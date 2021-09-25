const UserModel = require('./../models/User');
const encode = require('./../encodes/index');
const JWT = require('./../config/jsonWebToken');

module.exports = {
    deleteUser: async (req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await UserModel.deleteUser(data, id);
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            next(error);
        }
    },
    showRole: async (req, res) => {
        try {
            let roles = await UserModel.getRole();
            return res.status(200).json({
                roles
            });
        } catch (error) {
            next(error);
        }
    },
    showSearchUser: async (req, res) => {
        try {
            //console.log('data', req.body);
            let { 
                user_name, 
                role_id, 
                user_email 
            } = req.body;
            if(!user_name) {
                user_name = '';
            }
            if(!role_id) {
                role_id = '';
            }
            if(!user_email) {
                user_email = '';
            }
            //console.log('user_name', user_name.trim());
            let users = await UserModel.searchUser(
                user_name.trim(),
                role_id.trim(),
                user_email.trim()
            );
            /* let role = await UserModel.getRoleById(role_id);
            let role_name = null;
            if(role.length === 0) {
                role_name = '';
            } else {
                role_name = role[0].role_name;
            } */
            return res.status(200).json({
                users,
                search: {
                    user_name: user_name.trim(),
                    role_id: role_id.trim(),
                    user_email: user_email.trim()
                }
            });
        } catch (error) {
            next(error);
        }
    },
    showUserById: async (req, res) => {
        try {
            let { id } = req.params;
            let user = await UserModel.getUserById(id);
            return res.status(200).json({
                user
            });
        } catch (error) {
            next(error);
        }
    },
    signIn: async (req, res) => {
        try {
            //console.log(req.body);
            let { user_id, role_name, user_email } = req.body;
            //console.log('sign in', user_id);
            let token = JWT.encodeToken(user_id);
            return res.status(200).json({
                success: true,
                role_name,
                user_email,
                Authorization: token
            });
        } catch (error) {
            next(error);
        }
    },
    createUser: async (req, res) => {
        try {
            let { user_email } = req.body;
            let resultCount = await UserModel.getCountEmail(user_email);
            //console.log('count', resultCount);
            if(resultCount[0].count_email == 0) {
                let data = req.body;
                data.is_deleted = 0;
                //console.log('data', data);
                let { user_password } = req.body;
                let passwordEncode = await encode.bcryptValue(user_password);
                //console.log('encode', passwordEncode);
                data.user_password = passwordEncode;
                await UserModel.insertUser(data);
                return res.status(201).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: `${user_email} already exist.`
                });
            }
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            let { id } = req.params;
            let { user_email } = req.body;
            let resultCount = await UserModel.getCountIdAndEmail(id, user_email);
            if(resultCount[0].count_id_email === 0) {
                let data = req.body;
                await UserModel.updateUserById(data, id);
                return res.status(200).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: `${user_email} already exist.`
                })
            }
        } catch (error) {
            next(error);
        }
    }, 
}