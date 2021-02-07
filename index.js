// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
// 
const PORT = process.env.PORT || 8080;

// Connection to DB
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bees_make_honey',
    database: 'employee_tracker_DB',
});





app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost: ${PORT}`);
  });