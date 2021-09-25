const db = require('./../config/database');

module.exports = {
    deleteCustomerById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE customer ' +
                        'SET is_deleted = ? ' +
                        'WHERE customer_id = ?';
            db.query(query, [data.is_deleted, id],
                (err, result) => {
                    if(err) {
                        console.log('deleteCustomerById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getCustomerByIdAndName: async (customer_id, customer_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_id_name ` +
                        `FROM customer ` +
                        `WHERE is_deleted = 0 ` +
                        `AND customer_name = '${customer_name}' ` +
                        `AND customer_id != '${customer_id}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getCustomerByIdAndName', err);
                        reject(result);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getCustomerByName: async (customer_name) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT count(*) count_name ` +
                        `FROM customer ` +
                        `WHERE is_deleted = 0 ` +
                        `AND customer_name = '${customer_name}'`;
            db.query(query,
                (err, result) => {
                    if(err) {
                        console.log('getCustomerByName', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    getCustomerById: async (id) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT customer_id, customer_date_created, customer_name, customer_email, customer_number_phone ' +
                        'FROM customer ' +
                        'WHERE is_deleted = 0 ' +
                        'AND customer_id = ?';
            db.query(query, [id],
                (err, result) => {
                    if(err) {
                        console.log('getCustomerById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    insertCustomer: async (data) => {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO customer ' +
                        'SET ?';
            db.query(query, [data],
                (err, result) => {
                    if(err) {
                        console.log('insertCustomer', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
    searchCustomer: async (customer_name, customer_email, customer_number_phone) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT customer_id, customer_date_created, customer_name, customer_email, customer_number_phone ` +
                        `FROM customer ` +
                        `WHERE is_deleted = 0`;
            if(customer_name != null && customer_name != '') {
                query = query + ` AND customer_name LIKE '%${customer_name}%'`;
            }
            if(customer_email != null && customer_email != '') {
                query = query + ` AND customer_email LIKE '%${customer_email}%'`;
            } 
            if(customer_number_phone != null && customer_number_phone != '') {
                query = query + ` AND customer_number_phone LIKE '%${customer_number_phone}%'`;
            }
            query = query + ' ORDER BY customer_date_created DESC';
            db.query(query,
                (err, results) => {
                    if(err) {
                        console.log('searchCustomer', err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    },
    updateCustomerById: async (data, id) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE customer ' +
                        'SET customer_name = ?, customer_email = ?, customer_number_phone = ? ' +
                        'WHERE customer_id = ?';
            db.query(query, [data.customer_name, data.customer_email, data.customer_number_phone, id],
                (err, result) => {
                    if(err) {
                        console.log('updateCustomerById', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        });
    },
}