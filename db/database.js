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

//console.log(departmentIds)
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
  console.log("The department has been added!")
  let data = db.promise().query(
    `INSERT INTO departments (department) VALUES (?)`,
    department)
  return data;
}

// This is a helper function that will take the name of a department and find its id.
function getDepartmentId(department){
  let data = db.promise().query(`SELECT id FROM departments WHERE department = '${department}'`)
  return data
}

// function addRole(role, salary, department){
//   console.log("The role has been added!")
//   getDepartmentId(department).then(depInfo =>{
//     let department_id = depInfo[0][0].id
//     let data = db.promise().query(
//       `INSERT INTO roles (title, salary, department_id) VALUES ('${role}','${salary}','${department_id}')`)
//     return data
// })}

function addRole(role,salary,department){
  console.log("The role has been added!")
  db.promise().query(`SELECT id, department FROM departments`).then(data => {
    let depArray = []
    for (i=0; i < data[0].length; i++){
      depArray.push(data[0][i])
    }
    return depArray
  }).then(depArray => {
    let depId = ''
    for (i=0; i < depArray.length; i++){
      if (depArray[i].department == department){
        depId = depArray[i].id
      }
    }
    console.log(depId)
    // let data = db.promise().query(
    //   `INSERT INTO roles (title, salary, department_id) 
    //   VALUES ('${role}','${salary}','${}')`
    // )
  })
}

// This is a helper function that will take the name of a role and find its id.
function getRoleId(role){
  let data = db.promise().query(`SELECT id FROM roles WHERE title = '${role}'`)
  return data
}

// This is a helper function that will take the name of a manager and find their id. This may or may not be the best way to do this.
function getManagerId(manager){
  let data = db.promise().query(`SELECT id FROM managers WHERE manager = '${manager}'`)
  return data
}

function addEmployee(firstName, lastName, role, manager){
  console.log("The employee has been added!")
  getRoleId(role).then(roleInfo => {
    let role_id = roleInfo[0][0].id
    getManagerId(manager).then(managerInfo => {
      let manager_id = managerInfo[0][0].id
      // console.log(role_id, manager_id)
      let data = db.promise().query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id)
       VALUES ('${firstName}','${lastName}','${role_id}','${manager_id}')`
    )
    return data
  })
})}


function updateRole(firstName, lastName, role){
  getRoleId(role).then(roleInfo => {
    let role_id = roleInfo[0][0].id
    let data = db.promise().query(
      `UPDATE employees
      SET role_id = '${role_id}'
      WHERE first_name = '${firstName}' AND last_name = '${lastName}'`
    )
    return data
  })
}

function updateManager(firstName, lastName, manager){
  console.log(firstName, lastName, manager)
  console.log("The employee's manager has been updated!")
}

function seeExpendituresNow(department){
  console.log(department)
  let salaries = db.promise().query(
    `SELECT roles.salary FROM roles WHERE de`
  )
}

// function viewEmployeesByManager(first_name, last_name){
//   console.log(first_name, last_name)
// }

// add a department, add a role, add an employee, and update an employee role
//View all employees -- by manager, department; add employee, remove employee, update employee role, manager;
// view all departments, view all roles

module.exports = {db, 
  viewAllDepartments, 
  viewAllEmployees, 
  viewAllRoles,
  addDepartment,
  addRole,
  addEmployee,
  updateRole,
  updateManager,
  seeExpendituresNow
}