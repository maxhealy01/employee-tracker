const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company_db'
});

db.connect((err) => {
 // if (err) throw err;
  console.log('Connected to MySQL Server!');
});


// Query functions (promises)
function viewAllDepartments(){
  db.query(
    'SELECT * FROM departments',
    function(err, results) {
      console.table(results);  
    }
  );
}

function viewAllEmployees(){
  let data = db.promise().query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department, managers.manager 
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN managers ON employees.manager_id = managers.id`)
  return data;
}

function viewAllDepartments(){
  let data = db.promise().query(
    `SELECT * FROM departments`)
  return data;
}

function viewAllRoles(){
  let data = db.promise().query(
    `SELECT roles.id, roles.title, departments.department, roles.salary
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id`)
  return data;
}

function addDepartment(department){
  let data = db.promise().query(
    `INSERT INTO departments (department) VALUES (?)`,
    department)
  return data;
}

function addRole(role, salary, department){
  let data = db.promise().query(
    `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
    role, salary, department)
  return data
}

function addEmployee(firstName, lastName, role, manager){
  console.log(firstName, lastName, role, manager)
}

function updateRole(firstName, lastName, role){
  console.log(firstName, lastName, role)
}
// function viewEmployeesByManager(first_name, last_name){
//   console.log(first_name, last_name)
// }

// add a department, add a role, add an employee, and update an employee role
//View all employees -- by manager, department; add employee, remove employee, update employee role, manager;
// view all departments, view all roles

module.exports = {viewAllDepartments, 
  viewAllEmployees, 
  viewAllRoles,
  addDepartment,
  addRole,
  addEmployee,
  updateRole
}