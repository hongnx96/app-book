import BookStockService from './../../apis/modules/bookStock';

const actions = {
    async createBookStock({ commit }, data) {
        try {
            const response = await BookStockService.createBookStock(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteBookStockById({ commit }, data) {
        try {
            const response = await BookStockService.deleteBookStockById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getBook({ commit }, data) {
        try {
            const response = await BookStockService.getBook(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getBookStockById({ commit }, data) {
        try {
            const response = await BookStockService.getBookStockById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchBookStock({ commit }, data) {
        try {
            const response = await BookStockService.searchBookStock(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateBookStockById({ commit }, data) {
        try {
            const response = await BookStockService.updateBookStockById(data);
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