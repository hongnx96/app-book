import CustomerService from './../../apis/modules/customer';

const actions = {
    async createCustomer({ commit }, data) {
        try {
            const response = await CustomerService.createCustomer(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteCustomerById({ commit }, data) {
        try {
            const response = await CustomerService.deleteCustomerById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getCustomerById({ commit }, data) {
        try {
            const response = await CustomerService.getCustomerById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchCustomer({ commit }, data) {
        try {
            const response = await CustomerService.searchCustomer(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateCustomerById({ commit }, data) {
        try {
            const response = await CustomerService.updateCustomerById(data);
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