const db = require('./../config/database');

module.exports = {
    deleteBook: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book ' +
                        'SET is_deleted = ? ' +
                        'WHERE book_id = ?';
            db.query(query, [data.is_deleted, id],
                (err, result) => {
                    if(err) {
                        console.log('deleteBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getAuthor: async () => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT author_id, author_name ' +
                        'FROM author';
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getAuthor', err);
                        reject(err);
                    } else {
                        //console.log(results);
                        resolve(results);
                    }
                });
        });
    },
    getAuthorById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT author_name ' +
                        'FROM author ' +
                        'WHERE is_deleted = 0 ' +
                        'AND author_id = ?';
            db.query(query, [id],
                (err, result) => {
                    if(err) {
                        console.log('getAuthorById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookByIdAndName: async (book_id, book_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_name ` +
                        `FROM book ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_name = '${book_name}' ` +
                        `AND book_id != '${book_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getBookByIdAndName', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookByName: async (book_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_name ` +
                        `FROM book ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_name = '${book_name}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getBookByName', err);
                        reject(err)
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookById: async (id) => {
        //console.log(id);
        return new Promise((resolve, reject) => {
            let query = 'SELECT book.book_id, ' +
                            'book.book_date_created, ' +
                            'book.book_name, ' + 
                            'book.author_id, ' +
                            'author.author_name, ' + 
                            'book.book_type_id, ' +
                            'book_type.book_type_name, ' +
                            'book.book_publishing_house, ' + 
                            'book.book_publishing_date ' +
                        'FROM book ' +
                        'LEFT JOIN author ' +
                        'ON book.author_id = author.author_id ' +
                        'LEFT JOIN book_type ' +
                        'ON book.book_type_id = book_type.book_type_id ' +
                        'WHERE book.is_deleted = 0 ' +
                        'AND book.book_id = ?';
            db.query(query, [id],
                (err, result) => {
                    if(err) {
                        console.log('getBookById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookType: async () => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT book_type_id, book_type_name ' +
                        'FROM book_type';
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getBookType', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    getBookTypeById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT book_type_name ' +
                        'FROM book_type ' +
                        'WHERE is_deleted = 0 ' +
                        'AND book_type_id = ?';
            db.query(query, [id],
                (err, result) => {
                    if(err) {
                        console.log('getBookTypeById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    insertBook: async(data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO book ' +
                        'SET ?';
            db.query(query, [data],
                (err, result) => {
                    if(err) {
                        console.log('insertBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    searchBook: async (book_name, author_id, book_type_id) => {
        //console.log(book_type_id);
        return new Promise((resolve, reject) => {
            let query = `SELECT book.book_id, ` + 
                            `book.book_date_created, ` + 
                            `book.book_name, ` + 
                            `book.author_id, ` +
                            `author.author_name, ` + 
                            `book.book_type_id, ` +
                            `book_type.book_type_name, ` +
                            `book.book_publishing_house, ` +
                            `book.book_publishing_date, ` +
                            `book_stock.quantity ` +
                        `FROM book ` +
                        `LEFT JOIN author ` +
                        `ON book.author_id = author.author_id ` +
                        `LEFT JOIN book_type ` +
                        `ON book.book_type_id = book_type.book_type_id ` +
                        `LEFT JOIN book_stock ` +
                        `ON book.book_id = book_stock.book_id ` +
                        `WHERE book.is_deleted = 0`;
            if(book_name != null && book_name != '') {
                query = query + ` AND book.book_name LIKE '%${book_name}%'`;
            }
            if(author_id != null && author_id != '') {
                query = query + ` AND book.author_id = '${author_id}'`;
            }
            if(book_type_id != null && book_type_id != '') {
                query = query + ` AND book.book_type_id = '${book_type_id}'`;
            }
            query = query + ` ORDER BY book.book_date_created DESC`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchBook', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateBookById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book ' +
                        'SET book_name = ?, ' +
                            'author_id = ?, ' +
                            'book_type_id = ?, ' +
                            'book_publishing_house = ?, ' +
                            'book_publishing_date = ? ' +
                        'WHERE is_deleted = 0 ' +
                        'AND book_id = ?';
            db.query(query,
                [
                    data.book_name, 
                    data.author_id, 
                    data.book_type_id, 
                    data.book_publishing_house, 
                    data.book_publishing_date, 
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('updateBookById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
}