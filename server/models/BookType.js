const db = require('./../config/database');

module.exports = {
    deleteBookTypeById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book_type ' +
                        'SET is_deleted = ? ' +
                        'WHERE book_type_id = ?';
            db.query(query, [data.is_deleted, id],
                (err, results) => {
                    if(err) {
                        console.log('deleteBookTypeById', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        });
    },
    getBookTypeByIdAndName: async (book_type_id, book_type_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_name ` +
                        `FROM book_type ` +
                        `WHERE is_deleted = 0 ` + 
                        `AND book_type_name = '${book_type_name}' ` + 
                        `AND book_type_id != '${book_type_id}'`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getBookTypeByIdAndName', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    getBookTypeByName: async (book_type_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_name ` +
                        `FROM book_type ` +
                        `WHERE is_deleted = 0 ` + 
                        `AND book_type_name = '${book_type_name}'`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getBookTypeByName', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    getBookTypeById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT book_type_id, book_type_date_created, book_type_name ' +
                        'FROM book_type ' +
                        'WHERE is_deleted = 0 ' + 
                        'AND book_type_id = ?';
            db.query(query, [id],
                (err, results) => {
                    if(err) {
                        console.log('getBookTypeById', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    insertBookType: async(data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO book_type ' +
                        'SET ?';
            db.query(query, [data],
                (err, results) => {
                    if(err) {
                        console.log('insertBookType', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    searchBookType: async (book_type_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT book_type_id, book_type_date_created, book_type_name ` + 
                        `FROM book_type ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_type_name LIKE '%${book_type_name}%' ` +
                        `ORDER BY book_type_date_created DESC`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchBookType', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateBookTypeById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book_type ' +
                        'SET book_type_name = ? ' +
                        'WHERE book_type_id = ?';
            db.query(query, [data.book_type_name, id],
                (err, results) => {
                    if(err) {
                        console.log('updateBookTypeById', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
}