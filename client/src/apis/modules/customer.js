import Api from './../index';

export default {
    deleteCustomerById(data) {
        return Api().delete(`/customers/${data.id}`, {
            headers: data.headers
        });
    },
    createCustomer(data) {
        return Api().post('/customers', {
            customer_name: data.customer_name,
            customer_email: data.customer_email,
            customer_number_phone: data.customer_number_phone,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    getCustomerById(data) {
        return Api().get(`/customers/${data.id}`, {
            headers: data.headers
        });
    },
    searchCustomer(data) {
        return Api().post('/customers/search', {
            customer_name: data.customer_name,
            customer_email: data.customer_email,
            customer_number_phone: data.customer_number_phone
        }, {
            headers: data.headers
        });
    },
    updateCustomerById(data) {
        return Api().put(`/customers/${data.id}`, {
            customer_name: data.customer_name,
            customer_email: data.customer_email,
            customer_number_phone: data.customer_number_phone
        }, {
            headers: data.headers
        });
    }
}