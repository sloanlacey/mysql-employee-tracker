// const { connect } = require('http2');
'use strict';
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'bees_make_honey',
    database: 'employee_tracker_DB',
});

connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;