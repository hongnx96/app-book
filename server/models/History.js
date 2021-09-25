const db = require('./../config/database');

module.exports = {
    deleteHistoryById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE history ' +
                        'SET is_deleted = ? ' +
                        'WHERE history_id = ?';
            db.query(query, [data.is_deleted, id],
                (err, result) => {
                    if(err) {
                        console.log('deleteHistory', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getCustomer: async() => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT customer_id, customer_name ' +
                        'FROM customer ' +
                        'WHERE is_deleted = 0 ' +
                        'ORDER BY customer_date_created DESC';
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
    getHistoryById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT history.history_id, history.history_date_created, history.customer_id, customer.customer_name, customer.customer_email, customer.customer_number_phone ' +
                        'FROM history ' +
                        'LEFT JOIN customer ' +
                        'ON history.customer_id = customer.customer_id ' +
                        'WHERE history.is_deleted = 0 ' +
                        'AND history.history_id = ?';
            db.query(query, [id],
                (err, result) => {
                    if(err) {
                        console.log('getHistoryById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getHistoryByIdCustomer: async (customer_id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_customer ` +
                        `FROM history ` +
                        `WHERE is_deleted = 0 ` +
                        `AND customer_id = '${customer_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getHistoryByIdCustomer', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getHistoryByIdCustomerAndHistory: async (history_id, customer_id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id ` +
                        `FROM history ` +
                        `WHERE is_deleted = 0 ` +
                        `AND customer_id = '${customer_id}' ` +
                        `AND history_id != '${history_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getHistoryByIdCustomerAndHistory', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    insertHistory: async (data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO history ' +
                        'SET ?';
            db.query(query, [data],
                (err, result) => {
                    if(err) {
                        console.log('insertHistory', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    searchHistory: async (customer_name, customer_email, customer_number_phone) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT history.history_id, history.history_date_created, history.customer_id, customer.customer_name, customer.customer_email, customer.customer_number_phone ` +
                        `FROM history ` +
                        `LEFT JOIN customer ` +
                        `ON history.customer_id = customer.customer_id ` +
                        `WHERE history.is_deleted = 0 `;
            if(customer_name != null && customer_name != '') {
                query = query + ` AND customer.customer_name LIKE '%${customer_name}%'`;
            }
            if(customer_email != null && customer_email != '') {
                query = query + ` AND customer.customer_email LIKE '%${customer_email}%'`;
            }
            if(customer_number_phone != null && customer_number_phone != '') {
                query = query + ` AND customer.customer_number_phone LIKE '%${customer_number_phone}%'`;
            }
            query = query + ' ORDER BY history.history_date_created DESC';
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchHistory', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateHistoryById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE history ' +
                        'SET customer_id = ? ' +
                        'WHERE history_id = ?';
            db.query(query, [data.customer_id, id],
                (err, result) => {
                    if(err) {
                        console.log('updateHistoryById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
}