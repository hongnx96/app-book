import CartService from './../../apis/modules/cart';

const actions = {
    async borrowBook({ commit }, data) {
        //console.log('store', data);
        try {
            const response = await CartService.borrowBook(data);
            return response;
        } catch (error) {
            console.log(error)
        }
    },
    async getCustomer({ commit }, data) {
        
        try {
            const response = await CartService.getCustomer(data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    async updateBookStockBorrowBook({ commit }, data) {
        try {
            const response = await CartService.updateBookStockBorrowBook(data);
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