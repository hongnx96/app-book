import { searchBookType, updateBookTypeById } from '../../../../server/models/BookType';
import BookTypeService from './../../apis/modules/bookType';

const actions = {
    async deleteBookTypeById({ commit }, data) {
        try {
            const response = BookTypeService.deleteBookTypeById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async createBookType({ commit }, data) {
        try {
            const response = BookTypeService.createBookType(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async getBookTypeById({ commit }, data) {
        try {
            const response = BookTypeService.getBookTypeById(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async searchBookType({ commit }, data) {
        try {
            const response = BookTypeService.searchBookType(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateBookTypeById({ commit }, data) {
        try {
            const response = BookTypeService.updateBookTypeById(data);
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