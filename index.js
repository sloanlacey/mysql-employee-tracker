const inquirer = require('inquirer');
require('console.table');
const db = require('./db/methods.js');

const initialChoice = () => {

    inquirer.prompt({
        type: 'list',
        name: 'choices',
        message: 'Welcome to the employee tracker! What would you like to do?',
        choices: [
                'View departments',
                'View roles',
                'View employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee roles',
                'End the application',
        ],
    }).then(function ({ choices }) {
        switch (choices) {
          case 'View departments':
            viewDepartments();
            break;
          case 'View roles':
            viewRoles();
            break;
          case 'View employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
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

async function viewDepartments() {
    //departments variable which set to view all departments function from index.js in db folder
    const viewDept = await db.viewDepartments();
    // console tables departments variable
    console.table(viewDept);
    // runs main menu prompt 
    initialChoice();
  }

async function viewRoles() {
    //departments variable which set to view all departments function from index.js in db folder
    const viewRole = await db.viewRoles();
    // console tables departments variable
    console.table(viewRole);
    // runs main menu prompt 
    initialChoice();
  }

async function viewEmployees() {
    //departments variable which set to view all departments function from index.js in db folder
    const viewEmps = await db.viewEmployees();
    // console tables departments variable
    console.table(viewEmps);
    // runs main menu prompt 
    initialChoice();
  }

  initialChoice();
