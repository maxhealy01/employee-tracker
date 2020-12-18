DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE departments (
	id INT PRIMARY KEY auto_increment,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
	id INT auto_increment,
    title VARCHAR(100) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE managers (
	id INT auto_increment PRIMARY KEY,
    manager VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
	id INT auto_increment PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);