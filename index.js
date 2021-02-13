const inquirer = require('inquirer');
require('console.table');
const db = require('./db/methods.js');
const prompt = require('./db/prompts.js');
// Start-up function
const initialChoice = () => {

    inquirer.prompt(prompt.mainPrompt).then(function ({ choices }) {
        switch (choices) {
          case 'View departments': return viewDepartments();
          case 'View roles': return viewRoles();
          case 'View employees': return viewEmployees();
          case 'Add a department': return addDepartment();
          case 'Add a role': return addRole();
          case 'Add an employee': return addEmployee();
          case 'Update employee roles': return updateEmpRoles();
          case 'EXIT': process.exit();
        }
    });
};
// View functions
async function viewDepartments() {
    const viewDept = await db.viewDepartments();
    console.table(viewDept);

    initialChoice();
  };

async function viewRoles() {
    const viewRole = await db.viewRoles();
    console.table(viewRole);
    
    initialChoice();
  };

async function viewEmployees() {
    const viewEmps = await db.viewEmployees();
    console.table(viewEmps);

    initialChoice();
  };
// Add functions
async function addDepartment() {
    const addDep = await inquirer.prompt(prompt.addDept);
    const res = await db.addDepartment(addDep.departments);
    console.log(`Added ${addDep.departments} to the the database.`);
    viewDepartments();
};

async function addRole() {
    const checkDepts = await db.viewDepartments();
    const deptOptions = checkDepts.map(({ id, dept_name }) => ({
      name: dept_name,
      value: id
    }));
  
    const roles = await inquirer.prompt(prompt.addingRole(deptOptions));
    await db.addRole(roles);
    viewRoles();
  };

  async function addEmployee() {
    const roles = await db.viewRoles();
    const roleChoices = roles.map(({ id, role_title }) => ({
      name: role_title,
      value: id
    }));
  
    const managers = await db.viewEmployees();
    const managerIdChoices = managers.map(({ first_name, last_name, manager_id }) => ({
      name: `${first_name} ${last_name}`,
      value: manager_id
    }));
  
    const employees = await inquirer.prompt(prompt.addingEmps(roleChoices, managerIdChoices))
    await db.addEmployee(employees);
    viewEmployees();
  };

// Update functions
async function updateEmpRoles() {
    const checkRoles = await db.viewRoles();
    const roleChoice = checkRoles.map(({ id, role_title }) => ({
      name: role_title,
      value: id
    }));
    const checkEmps = await db.viewEmployees();
    const empChoice = checkEmps.map(({ id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
    
    })); 
  
    const newEmpRoll = await inquirer.prompt(prompt.updateRoles(empChoice, roleChoice));
    await db.updateEmpRoles(newEmpRoll);
    viewEmployees();
  };
// Invoke start-up function
  initialChoice();