import Api from './../index';

export default {
    deleteUserById(data) {
        return Api().delete(`/users/api/${data.id}`, {
            headers: data.headers
        });
    },
    createUser(data) {
        return Api().post('/users', {
            user_name: data.user_name,
            user_password: data.user_password,
            role_id: data.role_id,
            user_age: data.user_age,
            user_email: data.user_email,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    getRole(data) {
        return Api().get('/users/role', {
            headers: data.headers
        });
    },
    getUserById(data) {
        return Api().get(`/users/api/${data.id}`, {
            headers: data.headers
        });
    },
    searchUser(data) {
        return Api().post('/users/search', {
            user_name: data.user_name,
            role_id: data.role_id,
            user_email: data.user_email
        }, {
            headers: data.headers
        });
    },
    updateUserById(data) {
       
        return Api().put(`/users/api/${data.id}`, {
            user_name: data.user_name,
            role_id: data.role_id,
            user_age: data.user_age,
            user_email: data.user_email
        }, {
            headers: data.headers
        });
    },
    singIn(data) {
        return Api().post('/users/sign-in', {
            user_email: data.user_email,
            user_password: data.user_password
        });
    }
}