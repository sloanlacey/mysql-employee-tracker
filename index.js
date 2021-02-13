// Dependencies
const inquirer = require('inquirer');
require('console.table');
const db = require('./db/methods.js');
// Start-up function
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
// View functions
async function viewDepartments() {
    //departments variable which set to view all departments function from index.js in db folder
    const viewDept = await db.viewDepartments();
    // console tables departments variable
    console.table(viewDept);
    // runs main menu prompt 
    initialChoice();
  }

async function viewRoles() {
    const viewRole = await db.viewRoles();
    console.table(viewRole);
    
    initialChoice();
  }

async function viewEmployees() {
    const viewEmps = await db.viewEmployees();
    console.table(viewEmps);

    initialChoice();
  }
// Add functions
async function addDepartment() {
    const addDep = await inquirer.prompt({
      name: "departments",
      type: "input",
      message: "What is the name of the new department you wish to add?"
    });
  
    const res = await db.addDepartment(addDep.departments);
  
    console.log(`Added ${addDep.departments} to the the database.`);
    viewDepartments();
    initialChoice();
}

async function addRole() {
    const checkDepts = await db.viewDepartments();
    const deptOptions = checkDepts.map(({ id, dept_name }) => ({
      name: dept_name,
      value: id
    }))
  
    const roles = await inquirer.prompt([
      {
        type: 'input',
        name: 'role_title',
        message: 'What is the name of the new role you wish to add?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this new role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Into which department would you like this new role added?',
        choices: deptOptions
      }
    ])
    await db.addRole(roles);
    viewRoles();
    initialChoice();
  }

  async function addEmployee() {
    const roles = await db.viewEmployees();
    const roleChoices = roles.map(({ role_id, role_title }) => ({
      name: role_id,
      value: role_title
    }))
  
    const employees = await db.viewEmployees();
    const managerIdChoices = employees.map(({ manager_id, role_title }) => ({
      name: role_title,
      value: manager_id
    }))
  
    const employee = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the new employees' first name?"
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the new employees' last name?"
      },
      {
        type: 'list',
        name: 'role_id',
        message: "What is the new employees' role ID?",
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'What is the manager ID?',
        choices: managerIdChoices
      }
    ])
    await db.addEmployee(employee);
    viewEmployees();
  }


// Invoke start-up function
  initialChoice();
