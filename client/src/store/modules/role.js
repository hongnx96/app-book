import RoleService from './../../apis/modules/role';

const actions = {
    async createRole({ commit }, data) {
        try {
            const response = await RoleService.createRole(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteRoleById({ commit }, data) {
        try {
            const response = await RoleService.deleteRoleById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getRoleById({ commit }, data) {
        try {
            const response = await RoleService.getRoleById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchRole({ commit }, data) {
        try {
            const response = await RoleService.searchRole(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateRoleById({ commit }, data) {
        try {
            const response = await RoleService.updateRoleById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

export default {
    namespaced: true,
    actions
}