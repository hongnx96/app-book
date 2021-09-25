import Api from './../index';

export default {
    deleteBookById(data) {
        return Api().delete(`/books/api/${data.id}`, {
            headers: data.headers
        });
    },
    createBook(data) {
        return Api().post('/books', {
            book_name: data.book_name,
            author_id: data.author_id,
            book_type_id: data.book_type_id,
            book_publishing_house: data.book_publishing_house,
            book_publishing_date: data.book_publishing_date,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    getAuthor(data) {
        return Api().get('/books/author', {
            headers: data.headers
        });
    },
    getBookById(data) {
        return Api().get(`/books/api/${data.id}`, {
            headers: data.headers
        });
    },
    getBookType(data) {
        return Api().get('/books/book-type', {
            headers: data.headers
        });
    },
    searchBook(data) {
        return Api().post('/books/search', {
            book_name: data.book_name,
            author_id: data.author_id,
            book_type_id: data.book_type_id
        }, {
            headers: data.headers
        });
    },
    updateBookById(data) {
        return Api().put(`/books/api/${data.id}`, {
            book_name: data.book_name,
            author_id: data.author_id,
            book_type_id: data.book_type_id,
            book_publishing_house: data.book_publishing_house,
            book_publishing_date: data.book_publishing_date
        }, {
            headers: data.headers
        });
    }
}