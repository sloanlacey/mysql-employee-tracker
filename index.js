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
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the name of the new department you wish to add?'
    }).then(function (answer) {
        connection.query('INSERT INTO departments (dept_name) VALUES ?', [answer.departments], function (err, res) {
            if (err) throw err;
            console.log(`The department titled: ${answer.departments} has been added.`);
        });
        // console.log();
        // Add a cl and maybe call the view departments function here? Should it be a default?
    });
}
// addRole function
function addRole () {
    let query = `SELECT * FROM departments`;

    connection.query(query, function (err, res) {
        if (err) throw err;

        const deptChoice = res.map(({ id, dept_name }) => ({
            value: id,
            name: `${id} ${dept_name}`,
        }));

        inquirer.prompt({
            type: 'input',
            name: 'roleName',
            message: 'Which new role would you like to add?',
        }, {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary for this role?',
        }, {
            type: 'input',
            name: 'departmentId',
            message: 'Into which department would you like to add this new role?',
            choices: [
                deptChoice,
            ],
        }).then(function (answer) {
            let query = `INSERT INTO role set ?`;
            connection.query(
                query,
                {
                    role_title: answer.roleName,
                    salary: answer.roleSalary,
                    department_id: departmentId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`\n${res.affectedRows} role created.`);

                    // Add viewRoles function call here?
                },
            );
        });
    });
}

// addEmployee function
function addEmployee () {
    // Select the emp dept
    let deptsArr = [];
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;

        res.forEach((element) => {
            deptsArr.push(`${element.id} ${element.dept_name}`);
        });
    // Select the emp role
    let rolesArr = [];
    connection.query(`SELECT * FROM roles`, (err, res) => {
        if (err) throw err;
        
        res.forEach((element) => {
            rolesArr.push(`${element.id} ${element.role_title}`);
        });
    // Select the emp manager
    let managerArr = [];
    connection.query(`SELECT id, first_name, last_name FROM employees`, (err, res) => {
        if (err) throw err;

        res.forEach((element) => {
            managerArr.push(`${element.id} ${element.first_name} ${element.last_name}`);
        });

        // Prompt questions about new emp
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
                            type: 'list',
                            name: 'role',
                            message: 'What is the role title of the new employee you\'d like to add?',
                            choices: [
                                    rolesArr,
                                ], 
                        }, {
                            type: 'input',
                            name: 'dept',
                            message: 'What is the department of the new employee you\'d like to add?',
                            choices: [
                                    deptsArr,
                            ],
                        }, {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the manager for the new employee you\'d like to add?',
                            choices: [
                                    managerArr,
                            ],
                        }
                    ]).then((response) => {
                        let roleChoice = parseInt(response.role);
                        let managerChoice = parseInt(response.manager);
                        connection.query('INSERT INTO employees SET ?',
                        {
                            first_name: response.firstName,
                            last_name: response.lastName,
                            role_id: roleChoice,
                            manager_id: managerChoice,
                        },
                        (err, res) => {
                            if (err) throw err;
                            console.log(`\n${res.affectedRows} employee created.`);
                            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                            viewEmployees();
                        })
                    });
                },
            );
        });
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
