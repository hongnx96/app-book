const db = require('./../config/database');

module.exports = {
    getCustomer: async () => {
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
                        console.log('getCustomer', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateBookStockBorrowBook: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE book_stock ' +
                        'SET instock = ?, ' +
                            'rending = ?, ' +
                            'quantity = ? ' +
                        'WHERE is_deleted = 0 ' +
                        'AND book_id = ?';
            db.query(query,
                [
                    data.instock,
                    data.rending,
                    data.quantity,
                    id
                ],
                (err, result) => {
                    if(err) {
                        console.log('updateBookStockBorrowBook', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }); 
        });
    },
    getBookStockByBookId: async (id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT instock, ` +
                                'rending, ' +
                                'quantity ' +
                        `FROM book_stock ` +
                        `WHERE is_deleted = 0 ` +
                        `AND book_id = '${id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getBookStockByBookId', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
}