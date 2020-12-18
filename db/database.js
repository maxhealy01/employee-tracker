const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'company_db'
});

db.connect((err) => {
  if (err) throw err;
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
    `SELECT * FROM roles`)
  return data;
}


module.exports = {viewAllDepartments,viewAllEmployees, viewAllRoles}