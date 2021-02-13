const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection;
    }

    addDepartment(departments) {
        return this.connection.query('INSERT INTO departments SET ?', {
          dept_name: departments
        });
    };

    addRole(roles) {
        return this.connection.query(
            `INSERT INTO roles SET ?`, roles
        );
    }

    // addEmployee(first_name, last_name, role_id, manager_id) {
    //     return this.connection.query("INSERT INTO employees SET ?", {
    //       first_name: first_name,
    //       last_name: last_name,
    //       role_id: role_id,
    //       manager_id: manager_id
    //     });
    // };

viewDepartments(){
    return this.connection.query(
        `SELECT * FROM departments ORDER BY id ASC`
    )
};

viewRoles() {
    return this.connection.query(
        `SELECT * from roles ORDER BY id ASC`
    )
 };

viewEmployees() {
    return this.connection.query(
        `SELECT * from employees ORDER BY id ASC
            `
    )
};
    
    // updateEmployeeRole(role_id, id) {
    //     return this.connection.query(
    //       `UPDATE employee
    //         SET role_id = ? 
    //         WHERE id = ?;`,
    //       [role_id, id]
    //     );
    // };
  
    // findEmployee() {
    // return this.connection.query("SELECT id, first_name, last_name FROM employee");
    // }

    // findRoles() {
    // return this.connection.query("SELECT id, title FROM role");
    // }

}

module.exports = new DB(connection);