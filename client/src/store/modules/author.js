import AuthorService from './../../apis/modules/author';

const actions = {
    async createAuthor({ commit }, data) {
        try {
            const response = await AuthorService.createAuthor(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteAuthorById({ commit }, data) {
        try {
            const response = await AuthorService.deleteAuthorById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getAuthorById({ commit }, data) {
        try {
            const response = await AuthorService.getAuthorById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchAuthor({ commit }, data) {
        try {
            const response = await AuthorService.searchAuthor(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateAuthorById({ commit }, data) {
        try {
            const response = await AuthorService.updateAuthorById(data);
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