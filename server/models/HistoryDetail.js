const db = require('../config/database');

module.exports = {
    borrowBook: async(data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO history_detail ' +
                        'SET ?';
            db.query(query,
                [data],
                (err, result) => {
                    if(err) {
                        console.log('borrowBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    deleteHistoryDetailById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE history_detail ' +
                        'SET is_deleted = ? ' +
                        'WHERE history_detail_id = ?';
            db.query(query,
                [
                    data.is_deleted,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('deleteHistoryDetailById', err);
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
            let query = 'SELECT book_id, ' +
                            'book_name ' +
                        'FROM book ' +
                        'WHERE is_deleted = 0';
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
    getBookIdAndQuantityByHistoryDetailId: async (history_detail_id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT book_id, ` +
                            `quantity ` +
                        `FROM history_detail ` +
                        `WHERE is_deleted = 0 ` +
                        `AND history_detail_id = '${history_detail_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getBookIdByHistoryDetailId', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookNameByBookId: async (book_id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT book_name ` +
                        `FROM book ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_id = '${book_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getBookNameByBookId', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getBookStockByBookId: async (book_id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT instock, ` +
                                `rending, ` +
                                `quantity ` +
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
    getHistory: async() => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT history.history_id, ' +
                                'customer.customer_name ' +
                        'FROM history ' +
                        'LEFT JOIN customer ' +
                        'ON history.customer_id = customer.customer_id ' +
                        'WHERE history.is_deleted = 0';
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('getHistory', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    getHistoryDetailById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT history_detail.history_detail_date_created, ' +
                            'history_detail.history_id, ' +
                            'customer.customer_name, ' +
                            'book.book_name, ' +
                            'book.book_id, ' +
                            'author.author_name, ' +
                            'book_type.book_type_name, ' +
                            'history_detail.quantity, ' +
                            'history_detail.borrowed_book_date, ' +
                            'history_detail.pay_book_date, ' +
                            'history_detail.status ' +
                        'FROM history_detail ' +
                        'LEFT JOIN history ' +
                        'ON history_detail.history_id = history.history_id ' +
                        'LEFT JOIN book ' +
                        'ON history_detail.book_id = book.book_id ' +
                        'LEFT JOIN customer ' +
                        'ON history.customer_id = customer.customer_id ' +
                        'LEFT JOIN author ' +
                        'ON book.author_id = author.author_id ' +
                        'LEFT JOIN book_type ' +
                        'ON book.book_type_id = book_type.book_type_id ' +
                        'WHERE history_detail.is_deleted = 0 ' +
                        'AND history_detail.history_detail_id = ?';
            db.query(query,
                [id],
                (err, result) => {
                    if(err) {
                        console.log('getHistoryDetailById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    getQuantityByBookId: async(id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT quantity ` +
                        `FROM book_stock ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_id = '${id}'`;
            console.log('query', query);
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getQuantityByBookId', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getQuantityHistoryDetailById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT quantity ` +
                        `FROM history_detail ` +
                        `WHERE is_deleted = 0 ` +
                        `AND history_detail_id = '${id}'`;
            console.log(query);
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getQuantityHistoryById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    payBook: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE history_detail ' +
                        'SET status = ? ' +
                        'WHERE history_detail_id = ?';
            db.query(query,
                [
                    data.status,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('payBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    searchHistoryDetail: async(history_id, book_id, status) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT history_detail.history_detail_id, ` +
                                `history_detail.history_detail_date_created, ` +
                                `customer.customer_name, ` +
                                `history_detail.book_id, ` +
                                `book.book_name, ` +
                                `author.author_name, ` +
                                `book_type.book_type_name, ` +
                                `history_detail.quantity, ` +
                                `history_detail.borrowed_book_date, ` +
                                `history_detail.pay_book_date, ` +
                                `history_detail.status ` +
                        `FROM history_detail ` +
                        `LEFT JOIN history ` +
                        `ON history_detail.history_id = history.history_id ` +
                        `LEFT JOIN book ` +
                        `ON history_detail.book_id = book.book_id ` +
                        `LEFT JOIN customer ` +
                        `ON history.customer_id = customer.customer_id ` +
                        `LEFT JOIN author ` +
                        `ON book.author_id = author.author_id ` +
                        `LEFT JOIN book_type ` +
                        `ON book.book_type_id = book_type.book_type_id ` +
                        `WHERE history_detail.is_deleted = 0`;
            if(history_id !== null && history_id !== '') {
                query = query + ` AND history_detail.history_id = '${history_id}'`;
            }
            if(book_id !== null && book_id !== '') {
                query = query + ` AND history_detail.book_id = '${book_id}'`;
            }
            if(status !== null && status !== '') {
                query = query + ` AND history_detail.status LIKE '%${status}%'`;
            }

            query = query + ` ORDER BY history_detail.history_detail_date_created DESC`;

            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchHistoryDetail', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },

    updateBookStockUpdateHistoryDetail: async(data, id) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE book_stock ` +
                        `SET instock = ?, ` +
                            `rending = ?, ` +
                            `quantity = ? ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_id = ?`;
            db.query(query,
                [
                    data.instock,
                    data.rending,
                    data.quantity,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('updateBookStockUpdateHistoryDetail', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },

    updateBorrowBook: async(data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE history_detail ' +
                        'SET history_id = ?, ' +
                            'book_id = ?, ' +
                            'quantity = ?, ' +
                            'borrowed_book_date = ?, ' +
                            'pay_book_date = ? ' +
                        'WHERE is_deleted = 0 ' +
                        'AND history_detail_id = ?';
            db.query(query,
                [
                    data.history_id,
                    data.book_id,
                    data.quantity,
                    data.borrowed_book_date,
                    data.pay_book_date,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('updateBorrowBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });

        });
    },
    updateBookStockPayBook: async(data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book_stock ' +
                        'SET instock = ?, ' +
                            'rending = ?, ' +
                            'quantity = ? ' +
                        'WHERE book_id = ?';
            db.query(query,
                [
                    data.instock,
                    data.rending,
                    data.quantity,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('updateBookStockPayBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    }
}