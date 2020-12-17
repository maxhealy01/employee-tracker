const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nipples2992',
  database: 'company_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});


// simple query
function viewAllDepartments(){
  db.query(
    'SELECT * FROM departments',
    function(err, results) {
      console.table(results); // results contains rows returned by server 
    }
  );
}

function viewAllEmployees(){
  db.query(
    'SELECT * FROM employees',
    function(err, results) {
      console.table(results); // results contains rows returned by server
    }
);
}

module.exports = {viewAllDepartments, viewAllEmployees}