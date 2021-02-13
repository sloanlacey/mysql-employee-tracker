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

    addEmployee(employee) {
        return this.connection.query(
            `
            INSERT INTO
                employees  
            SET
                ?
            `, employee
        );
    }

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
  
    findEmployee() {
    return this.connection.query('SELECT id, first_name, last_name FROM employees');
    }

    findRoles() {
    return this.connection.query('SELECT id, role_title FROM roles');
    }

}

module.exports = new DB(connection);