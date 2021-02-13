-- This is the schema for the emp tracker

DROP DATABASE IF EXISTS employee_tracker_DB;

CREATE DATABASE employee_tracker_DB;

USE employee_tracker_DB;

CREATE TABLE departments (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    dept_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (

    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,

    role_title VARCHAR(30) NOT NULL,

    salary DECIMAL NOT NULL,

    department_id INT NOT NULL,

    CONSTRAINT fkey_dept FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (

    id INT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(30) NOT NULL,

    last_name VARCHAR(30) NOT NULL,

    role_id INT(10) NOT NULL,

    CONSTRAINT fkey_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,

    manager_id INT,

    CONSTRAINT fkey_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);