const db = require('../config/database');

module.exports = {
    deleteBookStockById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book_stock ' +
                        'SET is_deleted = ? ' +
                        'WHERE book_stock_id = ?';
            db.query(query,
                [data.is_deleted, id],
                (err, result) => {
                    if(err) {
                        console.log('deleteBookStockById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    getBook: async () => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT book_id, book_name ' +
                        'FROM book';
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getBook', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    getBookById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT book_name ' +
                        'FROM book ' +
                        'WHERE is_deleted = 0 ' +
                        'AND book_id = ?';
            db.query(query,
                [id],
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
    getBookStockById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT book_stock.book_stock_id, ' +
                            'book_stock.book_stock_date_created, ' +
                            'book_stock.book_id, ' +
                            'book.book_name, ' +
                            'book_stock.instock, ' + 
                            'book_stock.rending, ' +
                            'book_stock.quantity ' +
                        'FROM book_stock ' +
                        'LEFT JOIN book ' +
                        'ON book_stock.book_id = book.book_id ' +
                        'WHERE book_stock.is_deleted = 0 ' +
                        'AND book_stock.book_stock_id = ?';
            db.query(query,
                [id],
                (err, result) => {
                    if(err) {
                        console.log('getBookStockById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookStockByIdBook: async (book_id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_book ` +
                        `FROM book_stock ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_id = '${book_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getBookStockByIdBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookStockByIdBookAndBookStock: async (book_stock_id, book_id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id ` +
                        `FROM book_stock ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_id = ${book_id} ` +
                        `AND book_stock_id != ${book_stock_id}`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getBookStockByIdBookAndBookStock', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    insertBookStock: async (data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO book_stock ' +
                        'SET ?';
            db.query(query,
                [data],
                (err, result) => {
                    if(err) {
                        console.log('insertBookStock', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    searchBookStock: async (book_id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT book_stock.book_stock_id, ' +
                        'book_stock.book_stock_date_created, ' +
                        'book_stock.book_id, ' +
                        'book.book_name, ' +
                        'book_stock.instock, ' + 
                        'book_stock.rending, ' +
                        'book_stock.quantity ' +
                    'FROM book_stock ' +
                    'LEFT JOIN book ' +
                    'ON book_stock.book_id = book.book_id ' +
                    'WHERE book_stock.is_deleted = 0 ';
            if(book_id != null && book_id != '') {
                query = query + ` AND book_stock.book_id = '${book_id}'`;
            }
            query = query + ` ORDER BY book_stock.book_stock_date_created DESC`;
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchBookStock', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateBookStockById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book_stock ' +
                        'SET book_id = ?, ' +
                            'instock = ?, ' +
                            'rending = ?, ' +
                            'quantity = ? ' +
                        'WHERE is_deleted = 0 ' +
                        'AND book_stock_id = ?';
            db.query(query,
                [
                    data.book_id,
                    data.instock,
                    data.rending,
                    data.quantity,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('updateBookStockById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
}