import Api from './../index';

export default {
    deleteBookTypeById(data) {
        return Api().delete(`/book-types/${data.id}`, {
            headers: data.headers
        });
    },
    createBookType(data) {
        return Api().post('/book-types', {
            book_type_name: data.book_type_name,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    getBookTypeById(data) {
        return Api().get(`/book-types/${data.id}`, {
            headers: data.headers
        });
    },
    searchBookType(data) {
        return Api().post('/book-types/search', {
            book_type_name: data.book_type_name
        }, {
            headers: data.headers
        });
    },
    updateBookTypeById(data) {
        return Api().put(`/book-types/${data.id}`, {
            book_type_name: data.book_type_name
        }, {
            headers: data.headers
        });
    }
}