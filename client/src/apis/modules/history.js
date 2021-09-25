import Api from './../index';

export default {
    deleteHistoryById(data) {
        return Api().delete(`/histories/api/${data.id}`, {
            headers: data.headers
        });
    },
    createHistory(data) {
        return Api().post('/histories', {
            customer_id: data.customer_id,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    getCustomer(data) {
        return Api().get('/histories/customer', {
            headers: data.headers
        });
    },
    getHistoryById(data) {
        return Api().get(`/histories/api/${data.id}`, {
            headers: data.headers
        });
    },
    searchHistory(data) {
        return Api().post('/histories/search', {
            customer_name: data.customer_name,
            customer_email: data.customer_email,
            customer_number_phone: data.customer_number_phone
        }, {
            headers: data.headers
        });
    },
    updateHistoryById(data) {
        return Api().put(`/histories/api/${data.id}`, {
            customer_id: data.customer_id
        }, {
            headers: data.headers
        });
    }
}