module.exports = {
    mainPrompt: {
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
                'EXIT',
        ],
    },

    addDept: {
        name: "departments",
        type: "input",
        message: "What is the name of the new department you wish to add?"
    },

    addingRole: (deptOptions) => [
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
          },
    ],

    addingEmps: (roleChoices, managerIdChoices) => [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the new employees\' first name?'
          },
          {
            type: 'input',
            name: 'last_name',
            message: 'What is the new employees\' last name?'
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'What is the role of the new employee?',
            choices: roleChoices
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager for this employee?',
            choices: managerIdChoices
          },
    ],

    updateRoles: (empChoice, roleChoice) => [
        {
            type: 'list',
            name: 'empId',
            message: 'Whose role would you like to update?',
            choices: empChoice
          },
      
          {
            type: 'list',
            name: 'newRole',
            message: 'What is the employees new role?',
            choices: roleChoice
          },
    ],
};