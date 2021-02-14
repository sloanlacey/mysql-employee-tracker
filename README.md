# mysql-employee-tracker

## Description

This is a command line application that allows business owners to build and manage an employee database.

## Table of contents

- [General Info](#general-info)
- [Code Snippets](#code-snippets)
- [Usage Instructions](#usage-instructions)
- [Technologies](#technologies)
- [Summary](#summary)
- [Author](#author)

## General Info

This application meets the following criteria:

```md
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Code Snippets

This application uses all asynchronous functions:

```javascript
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
```

## Usage Instructions

![Demo](https://github.com/sloanlacey/mysql-employee-tracker/blob/main/assets/demo.gif)

Click [here](https://drive.google.com/file/d/167LM4ToZSBy6t49jK19jS2lcgen0KYQD/view) for a full video demonstration.

## Technologies

This project was created with:

- [JavaScript](https://www.javascript.com/)

- [NPM (Express, mysql, console.table)](https://www.npmjs.com/package/express)

## Summary

- This application was designed for business owners to be able to manage employee databases in MySQL, and organize information. Managers and employers can view departments, roles, and employee rosters. They can also add to any of those fields, as well as update the various roles of employees as they change positions within the company.

## Author

- [Sloan Lacey](https://github.com/sloanlacey/mysql-employee-tracker)

## Questions?

If you have questions about this application, please send an email to sloanlacey89@gmail.com, and I will get back to you as soon as possible.