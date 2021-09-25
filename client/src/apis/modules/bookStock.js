import Api from './../index';

export default {
    createBookStock(data) {
        return Api().post('/book-stocks', {
            book_id: data.book_id,
            instock: data.instock,
            rending: data.rending,
            quantity: data.quantity,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    deleteBookStockById(data) {
        return Api().delete(`/book-stocks/api/${data.id}`, {
            headers: data.headers
        });
    },
    getBook(data) {
        return Api().get(`/book-stocks/book`, {
            headers: data.headers
        });
    },
    getBookStockById(data) {
        return Api().get(`/book-stocks/api/${data.id}`, {
            headers: data.headers
        });
    },
    searchBookStock(data) {
        return Api().post('/book-stocks/search', {
            book_id: data.book_id
        }, {
            headers: data.headers
        });
    },
    updateBookStockById(data) {
        return Api().put(`/book-stocks/api/${data.id}`, {
            book_id: data.book_id,
            instock: data.instock,
            rending: data.rending,
            quantity: data.quantity,
        }, {
            headers: data.headers
        });
    }
}