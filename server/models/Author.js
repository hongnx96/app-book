const db = require('./../config/database');

module.exports = {
    deleteAuthorById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE author ' +
                        'SET is_deleted = ? ' +
                        'WHERE author_id = ?';
            db.query(query, [data.is_deleted, id],
                (err, results) => {
                    if(err) {
                        console.log('deleteAuthorById', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    getAuthorByIdAndName: async (author_id, author_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_name ` +
                        `FROM author ` +
                        `WHERE is_deleted = 0 ` +
                        `AND author_name = '${author_name}' ` +
                        `AND author_id != '${author_id}'`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getAuthorByIdAndName', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        });
    },
    getAuthorByName: async (author_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_name ` +
                        `FROM author ` +
                        `WHERE is_deleted = 0 ` +
                        `AND author_name = '${author_name}'`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getAuthorByName', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    getAuthorById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT author_id, author_date_created, author_name, author_day_of_birth ' +
                        'FROM author ' +
                        'WHERE is_deleted = 0 ' +
                        'AND author_id = ?';
            db.query(query, [id],
                (err, results) => {
                    if(err) {
                        console.log('getAuthorById', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    insertAuthor: async (data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO author ' +
                        'SET ?';
            db.query(query, [data],
                (err, results) => {
                    if(err) {
                        console.log('insertAuthor', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    searchAuthor: async (author_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT author_id, author_date_created, author_name, author_day_of_birth ` +
                        `FROM author ` +
                        `WHERE is_deleted = 0 ` +
                        `AND author_name LIKE '%${author_name}%' ` +
                        `ORDER BY author_date_created DESC`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchAuthor', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateAuthorById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE author ' +
                        'SET author_name = ?, author_day_of_birth = ? ' +
                        'WHERE author_id = ?';
            db.query(query, [data.author_name, data.author_day_of_birth, id],
                (err, results) => {
                    if(err) {
                        console.log('updateAuthorById', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }
}