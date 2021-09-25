const RoleModel = require('./../models/Role');

module.exports = {
    createRole: async (req, res) => {
        try {
            let { role_name } = req.body;
            let resultCount = await RoleModel.getRoleByName(role_name);
            if(resultCount[0].count_name === 0) {
                let data = req.body;
                data.is_deleted = 0;
                await RoleModel.insertRole(data);
                return res.status(201).json({ 
                    success: true 
                });
            } else {
                return res.json({
                    notification: `${role_name} already exist.`
                })
            }
        } catch (error) {
            next(error);
        }
    },
    deleteRole: async (req, res) => {
        try {
            let { id } = req.params;
            let data = {};
            data.is_deleted = 1;
            await RoleModel.deleteRoleById(data, id);
            return res.status(200).json({ 
                success: true 
            });
        } catch (error) {
            next(error);
        }
    },
    showRoleById: async (req, res) => {
        try {
            let { id } = req.params;
            let role = await RoleModel.getRoleById(id);
            return res.status(200).json({
                role
            })
        } catch (error) {
            next(error);
        }
    },
    showSearchRole: async (req, res) => {
        try {
            let { role_name } = req.body;
            if(!role_name) {
                role_name = '';
            }
            let roles = await RoleModel.searchRole(role_name.trim());
            return res.status(200).json({
                roles,
                search: {
                    role_name: role_name.trim()
                }
            })
        } catch (error) {
            next(error);
        }
    },
    updateRole: async (req, res) => {
        try {
            let { id } = req.params;
            let { role_name } = req.body;
            let resultCount = await RoleModel.getRoleByIdAndName(id, role_name);
            if(resultCount[0].count_id_name === 0) {
                let data = req.body;
                await RoleModel.updateRoleById(data, id);
                return res.status(200).json({
                    success: true
                });
            } else {
                return res.json({
                    notification: `${role_name} already exist.`
                });
            }
        } catch (error) {
            next(error);
        }
    },
}