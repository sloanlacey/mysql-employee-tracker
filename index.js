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


connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // call funtion to run first prompts here
    initialChoice();
  });

function initialChoice () {

    inquirer.prompt({
        type: 'list',
        name: 'choices',
        message: 'Welcome to the employee tracker! What would you like to do?',
        choices: [
                'Add a department',
                'Add a role',
                'Add an employee',
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles',
                'End the application',
        ],
    }).then(function ({ choices }) {
        switch (choices) {
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'View departments':
            viewDepartments();
            break;
          case 'View roles':
            viewRoles();
            break;
          case 'View employees':
            viewEmployees();
            break;
          case 'Update employee roles':
            updateEmpRoles();
            break;
          case 'End the application':
            connection.end();
            console.log('The application has ended.')
            break;  
        }
    });
}

// addDepartment function

// addRole function

// addEmployee function

// viewDepartments function

// viewRoles function

// viewEmployees function

// updateRoles function


// app.listen(PORT, function() {
//     // Log (server-side) when our server has started
//     console.log(`Server listening on: http://localhost: ${PORT}`);
//   });