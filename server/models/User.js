const db = require('./../config/database');

module.exports = {
    deleteUser: async(data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE user ' +
                        'SET is_deleted = ? ' +
                        'WHERE user_id = ?';
            db.query(query,
                [
                    data.is_deleted,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('deleteUser', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            ); 
        });
    },
    getCountEmail: async (user_email) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_email ` +
                        `FROM user ` +
                        `WHERE is_deleted = 0 ` +
                        `AND user_email = '${user_email}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getEmail', err);
                        reject(err)
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    getCountIdAndEmail: async (user_id, user_email) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_email ` +
                        `FROM user ` +
                        `WHERE is_deleted = 0 ` +
                        `AND user_email = '${user_email}' ` +
                        `AND user_id != '${user_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getCountIdAndEmail', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    getRole: async () => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT role_id, ' +
                            'role_name ' +
                        'FROM role ' +
                        'WHERE is_deleted = 0';
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getRole', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },
    getRoleById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT role_name ' +
                        'FROM role ' +
                        'WHERE is_deleted = 0 ' +
                        'AND role_id = ?';
            db.query(query,
                [id],
                (err, result) => {
                    if(err) {
                        console.log('getRoleById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    getUserByEmail: async(user_email) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT user.user_id, ` +
                            `user.user_password, ` +  
                            `user.user_email, ` +
                            `role.role_name ` +
                        `FROM user ` +
                        `LEFT JOIN role ` +
                        `ON user.role_id = role.role_id ` +
                        `WHERE user.is_deleted = 0 ` +
                        `AND user.user_email = '${user_email}'`;
            //console.log('query', query);
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getUserByEmail', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            )
        });
    },
    getUserById: async(id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT user.user_date_created, ' +
                            'user.user_name, ' +
                            'user.role_id, ' + 
                            'role.role_name, ' +
                            'user.user_age, ' +
                            'user.user_email ' +
                        'FROM user ' +
                        'LEFT JOIN role ' +
                        'ON user.role_id = role.role_id ' +
                        'WHERE user.is_deleted = 0 ' +
                        'AND user_id = ?';
            db.query(query,
                [id],
                (err, result) => {
                    if(err) {
                        console.log('getUserById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    insertUser: async (data) => {
        
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO user ' +
                        'SET ?';
            db.query(query,
                [data],
                (err, result) => {
                    if(err) {
                        console.log('insertUser', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    searchUser: async (user_name, role_id, user_email) => {
        //console.log('query', user_name);
        return new Promise((resolve, reject) => {
            let query = 'SELECT user.user_id, ' +
                            'user.user_date_created, ' +
                            'user.user_name, ' +
                            'user.role_id, ' + 
                            'role.role_name, ' +
                            'user.user_age, ' +
                            'user.user_email ' +
                        'FROM user ' +
                        'LEFT JOIN role ' +
                        'ON user.role_id = role.role_id ' +
                        'WHERE user.is_deleted = 0 ';
            if(user_name != null && user_name != '') {
                query = query + ` AND user.user_name LIKE '%${user_name}%'`;
            }
            if(role_id != null && role_id != '') {
                query = query + ` AND user.role_id = '${role_id}'`;
            }
            if(user_email != null && user_email != '') {
                query = query + ` AND user.user_email LIKE '%${user_email}%'`;
            }
            query = query + ' ORDER BY user.user_date_created DESC';
            //console.log(query);
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchUser', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
        
    },
    updateUserById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE user ' +
                        'SET user_name = ?, ' +
                            'role_id = ?, ' +
                            'user_age = ?, ' +
                            'user_email = ? ' +
                        'WHERE user_id = ?';
            db.query(query,
                [
                    data.user_name,
                    data.role_id,
                    data.user_age,
                    data.user_email,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('updateUserById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            )
        });
    },
}