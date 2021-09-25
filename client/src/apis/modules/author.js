import Api from './../index';

export default {
    deleteAuthorById(data) {
        return Api().delete(`/authors/${data.id}`, {
            headers: data.headers
        });
    },
    createAuthor(data) {
        return Api().post('/authors', {
            author_name: data.author_name,
            author_day_of_birth: data.author_day_of_birth,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    getAuthorById(data) {
        return Api().get(`/authors/${data.id}`, {
            headers: data.headers
        });
    },
    searchAuthor(data) {
        return Api().post('/authors/search', {
            author_name: data.author_name
        }, {
            headers: data.headers
        });
    },
    updateAuthorById(data) {
        return Api().put(`/authors/${data.id}`, {
            author_name: data.author_name,
            author_day_of_birth: data.author_day_of_birth
        }, {
            headers: data.headers
        });
    }
}