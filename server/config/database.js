const mysql = require('mysql');
const { HOST, USER, PASSWORD, DATABASE } = require('./variable');

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

module.exports = db;