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


function initializeDatabase(){
  return new Promise(function (resolve, reject) { 
  // This piece of the function captures all the departments in an array of objects
  // This array is then added to the main array which will house all the data
  db.promise().query(`SELECT * FROM departments`).then(data => {
    let mainArray = []
    let depArray = []
    for (i=0; i < data[0].length; i++){
      depArray.push(data[0][i])
    }
    mainArray.push(depArray)
    return mainArray
  }).then(mainArray => {
  // The same is then done for employees
    db.promise().query(`SELECT * FROM employees`)
      .then(employeeData => {
        let employeeArray = []
        for (i=0; i < employeeData[0].length; i++){
          employeeArray.push(employeeData[0][i])
        }
        mainArray.push(employeeArray)
        return mainArray
      }).then(mainArray => {
        db.promise().query(`SELECT * FROM roles`)
        .then(roleData => {
          let roleArray = []
          for (i=0; i < roleData[0].length; i++){
            roleArray.push(roleData[0][i])
          }
          mainArray.push(roleArray)
          resolve(mainArray)
        })
      })
  })
} 
)}

function getArray(){
  initializeDatabase().then(mainArray => {
    departmentArray = mainArray[0]
    employeeArray = mainArray[1]
    roleArray = mainArray[2]
  })
}
getArray()
// initializeDatabase().then(mainArray => {
//   console.log(mainArray)
// })

