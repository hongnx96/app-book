import UserService from './../../apis/modules/user';

const actions = {
    async createUser({ commit }, data) {
        try {
            const response = await UserService.createUser(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteUserById({ commit }, data) {
        try {
            const response = await UserService.deleteUserById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getRole({ commit }, data) {
        try {
            let response = await UserService.getRole(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getUserById({ commit }, data) {
        try {
            const response = await UserService.getUserById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async signIn({ commit }, data) {
        try {
            let response = await UserService.singIn(data);
            return response;
        } catch (error) {
            
        }
    },
    async searchUser({ commit }, data) {
        try {
            const response = await UserService.searchUser(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateUserById({ commit }, data) {
        try {
            const response = await UserService.updateUserById(data);
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