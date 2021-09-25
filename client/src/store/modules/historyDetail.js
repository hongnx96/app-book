import HistoryDetailService from './../../apis/modules/historyDetail';

const actions = {
    async payBook({ commit }, data) {
        try {
            const response = await HistoryDetailService.payBook(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteHistoryDetailById({ commit }, data) {
        try {
            const response = await HistoryDetailService.deleteHistoryDetailById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getBook({ commit }, data) {
        try {
            const response = await HistoryDetailService.getBook(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getHistory({ commit }, data) {
        try {
            const response = await HistoryDetailService.getHistory(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getHistoryDetailById({ commit }, data) {
        try {
            const response = await HistoryDetailService.getHistoryDetailById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchHistoryDetail({ commit }, data) {
        try {
            const response = await HistoryDetailService.searchHistoryDetail(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateBorrowBook({ commit }, data) {
        try {
            console.log('store', data);
            const response = await HistoryDetailService.updateBorrowBook(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateBookStockPayBook({ commit }, data) {
        try {
            const response = await HistoryDetailService.updateBookStockPayBook(data);
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