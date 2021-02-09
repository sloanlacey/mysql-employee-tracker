// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
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


connection.connect(function (err) {
    // if (err) throw err;
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
            db.connection.end();
            console.log('The application has ended.')
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
        let query = 'INSERT INTO departments (deptName) VALUES ( ? )';
        connection.query(query, answer.departments, function (err, res) {
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

        const deptChoice = res.map(({ id, deptName }) => ({
            value: id,
            name: `${id} ${deptName}`,
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
                    roleTitle: answer.roleName,
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
function addEmployee() {

}

// viewDepartments function
function viewDepartments() {
    let query = 'SELECT * FROM departments ORDER BY id ASC';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
        console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
        // Restart initial choice function 
        initialChoice();
}

// viewRoles function
function viewRoles() {
    let query = 'SELECT * FROM roles ORDER BY id ASC';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
        console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
        // Restart initial choice function 
        initialChoice();
}

// viewEmployees function
function viewEmployees() {
    let query = 'SELECT * FROM employees ORDER BY id ASC';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    });
        console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
        // Restart initial choice function 
        initialChoice();
}

// updateRoles function

