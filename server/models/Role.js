const db = require('./../config/database');

module.exports = {
    deleteRoleById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE role ' +
                        'SET is_deleted = ? ' +
                        'WHERE role_id = ?';
            db.query(query, [data.is_deleted, id],
                (err, result) => {
                    if(err) {
                        console.log('deleteRoleById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getRoleByIdAndName: async (role_id, role_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_name ` +
                        `FROM role ` +
                        `WHERE is_deleted = 0 ` +
                        `AND role_name = '${role_name}' ` +
                        `AND role_id != '${role_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getRoleByIdAndName', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getRoleByName: async (role_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_name ` +
                        `FROM role ` +
                        `WHERE is_deleted = 0 ` +
                        `AND role_name = '${role_name}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getRoleByName', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getRoleById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT role_id, role_date_created, role_name ' +
                        'FROM role ' +
                        'WHERE is_deleted = 0 ' +
                        'AND role_id = ?';
            db.query(query, [id],
                (err, result) => {
                    if(err) {
                        console.log('getRoleById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    insertRole: async (data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO role ' +
                        'SET ?';
            db.query(query, [data],
                (err, result) => {
                    if(err) {
                        console.log('insertRole', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    searchRole: async (role_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT role_id, role_date_created, role_name ` +
                        `FROM role ` +
                        `WHERE is_deleted = 0 ` +
                        `AND role_name LIKE '%${role_name}%' ` +
                        `ORDER BY role_date_created DESC`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchRole', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateRoleById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE role ' +
                        'SET role_name = ? ' +
                        'WHERE role_id = ?';
            db.query(query, [data.role_name, id],
                (err, result) => {
                    if(err) {
                        console.log('updateRoleById', err);
                        resolve(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
}