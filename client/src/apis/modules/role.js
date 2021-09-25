import Api from './../index';

export default {
    deleteRoleById(data) {
        return Api().delete(`/roles/${data.id}`, {
            headers: data.headers
        });
    },
    createRole(data) {
        return Api().post('/roles', {
            role_name: data.role_name,
            is_deleted: data.is_deleted
        }, {
            headers: data.headers
        });
    },
    getRoleById(data) {
        return Api().get(`/roles/${data.id}`, {
            headers: data.headers
        });
    },
    searchRole(data) {
        return Api().post('/roles/search', {
            role_name: data.role_name
        }, {
            headers: data.headers
        });
    },
    updateRoleById(data) {
        return Api().put(`/roles/${data.id}`, {
            role_name: data.role_name,
        }, {
            headers: data.headers
        });
    }
}