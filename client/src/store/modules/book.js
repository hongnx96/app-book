import BookService from './../../apis/modules/book';

const actions = {
    async createBook({ commit }, data) {
        try {
            const response = await BookService.createBook(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteBookById({ commit }, data) {
        try {
            const response = await BookService.deleteBookById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getAuthor({ commit }, data) {
        try {
            const response = await BookService.getAuthor(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getBookById({ commit }, data) {
        try {
            const response = await BookService.getBookById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getBookType({ commit }, data) {
        try {
            const response = await BookService.getBookType(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchBook({ commit }, data) {
        try {
            const response = await BookService.searchBook(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateBookById({ commit }, data) {
        try {
            const response = await BookService.updateBookById(data);
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