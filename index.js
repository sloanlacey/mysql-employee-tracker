'use strict';
// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
require('console.table');
// const db = require('./sql');
// 
// const PORT = process.env.PORT || 8080;

// Connection to DB
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bees_make_honey',
    database: 'employee_tracker_DB',
});


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
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
            console.log('The application has ended.');
            break;  
        }
    });
}

// Add a Department
function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the name of the department that you wish to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO departments (dept_name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            initialChoice();
        })
    })
}
// addRole function
function addRole () {

        inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Which new role would you like to add?',
        }, {
            type: 'number',
            name: 'roleSalary',
            message: 'What is the salary for this role?',
        }, {
            type: 'number',
            name: 'departmentId',
            message: 'Please enter the department ID where you would like to add this role.',
        }
        ]).then(function (response) {
            connection.query('INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?)', [response.role_title, response.salary, response.department_id], function (err, data) {
                console.table(data);
            });
            initialChoice();
        });
    }

// addEmployee function
function addEmployee () {
    
        inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the first name of the new employee you\'d like to add?',
                        }, {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the last name of the new employee you\'d like to add?',
                        }, {
                            type: 'number',
                            name: 'roleId',
                            message: 'What is the role ID for this new employee? Please enter the number.', 
                        }, {
                            type: 'number',
                            name: 'managerId',
                            messgae: 'What is the manager ID for this new employee? Please enter the number.'
                        }
                    ]).then (function(res) {
                        connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
                            if (err) throw err;
                            console.table('Employee successfully added.')
                            initialChoice();
                        })
                });
};



// viewDepartments function
function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, data) {
        console.table(data);
        initialChoice();
    })
};

// viewRoles function
function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, data) {
        console.table(data);
        initialChoice();
    })
};

// viewEmployees function
function viewEmployees() {

    connection.query("SELECT * FROM employees", function (err, data) {
        console.table(data);
        initialChoice();
    })
};

// updateRoles function
function updateEmpRoles () {
    let employees = [];
    connection.query(`SELECT id, first_name, last_name FROM employees`, (err, res) => {
        if (err) throw err;

        res.forEach((element) => {
            employees.push(`${element.id} ${element.first_name} ${element.last_name}`,);
        });

        let jobTitle = [];
        connection.query(`SELECT id, role_title FROM roles`, (err, res) => {
            if (err) throw err;

            res.forEach((element) => {
                jobTitle.push(`${element.id} ${element.role_title}`);
            });

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'empOptions',
                    message: 'Which employee\'s role would you like to update?',
                    choices: employees,
                }, {
                    type: 'list',
                    name: 'roleOptions',
                    message: 'Please choose a new position for the employee.',
                    choices: updatedRoles,
                },
            ]).then((response) => {
                let updatedEmp = parseInt(response.empOptions);
                let updatedRole = parseInt(response.roleOptions);
                connection.query(`UPDATE employees SET role_id = ${updatedRole} WHERE id = ${updatedEmp}`, (err, res) => {
                    if (err) throw err;
                    console.log(`\n\n${res.affectedRows} updated successfully.`);
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    initialChoice();
                },
                );
            });
        });
        },
    );
};
