import HistoryService from './../../apis/modules/history';

const actions = {
    async createHistory({ commit }, data) {
        try {
            const response = await HistoryService.createHistory(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteHistoryById({ commit }, data) {
        try {
            const response = await HistoryService.deleteHistoryById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getCustomer({ commit }, data) {
        try {
            const response = await HistoryService.getCustomer(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getHistoryById({ commit }, data) {
        try {
            const response = await HistoryService.getHistoryById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchHistory({ commit }, data) {
        try {
            const response = await HistoryService.searchHistory(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateHistoryById({ commit }, data) {
        try {
            const response = await HistoryService.updateHistoryById(data);
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