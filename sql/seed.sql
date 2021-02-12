-- this is where the valupes/inputs will go
USE employee_tracker_DB;

-- department seeds

INSERT INTO departments (dept_name)
VALUES ('Sales');

INSERT INTO departments (dept_name)
VALUES ('Accounting');

INSERT INTO departments (dept_name)
VALUES ('Human Resources');

-- role seeds

-- sales
INSERT INTO roles (role_title, salary, department_id)
VALUES ('Sales Lead', 63000.00, 1);

INSERT INTO roles (role_title, salary, department_id)
VALUES ('Sales Person', 59000.00, 1);

INSERT INTO roles (role_title, salary, department_id)
VALUES ('Receptionist', 39000.00, 1);

-- accounting
INSERT INTO roles (role_title, salary, department_id)
VALUES ('Accountant', 57000.00, 2);

INSERT INTO roles (role_title, salary, department_id)
VALUES ('Payroll', 44000.00, 2);

INSERT INTO roles (role_title, salary, department_id)
VALUES ('Bookkeeper', 41000.00, 2);

-- HR
INSERT INTO roles (role_title, salary, department_id)
VALUES ('Workplace Safety Officer', 81000.00, 3);

INSERT INTO roles (role_title, salary, department_id)
VALUES ('Talent Specialist', 77000.00, 3);

INSERT INTO roles (role_title, salary, department_id)
VALUES ('HR Compliance Officer', 79000.00, 3);

-- employee seeds

-- sales
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Scott', 1, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jim', 'Halpert', 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Dwight', 'Schrute', 2, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Pam', 'Beesly', 3, 1);

-- accounting
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Oscar', 'Martinez', 4, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Angela', 'Martin', 5, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Malone', 6, 2);

-- HR
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Toby', 'Flenderson', 7, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Holly', 'Flax', 8, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Creed', 'Bratton', 9, 3);