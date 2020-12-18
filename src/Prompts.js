const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewAllDepartments, viewAllEmployees, viewAllRoles} = require('../db/database')

function Prompts() {

}

Prompts.prototype.initializeProgram = function() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View All Departments', 'View All Roles', 'View Employees By Manager', 'View Employees By Department',
              'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager']
  }])
    .then(({choice}) => {
      switch (choice) {
        case 'View All Employees':
          viewAllEmployees().then(([data]) => {
          console.table(data)
          this.initializeProgram()});
          break;
        case 'View All Departments':
          viewAllDepartments().then(([data]) => {
          console.table(data)
          this.initializeProgram()});
          break;
        case 'View All Roles':
          viewAllRoles().then(([data]) => {
          console.table(data)
          this.initializeProgram()});
          break;
        case 'View Employees By Manager':
          this.employeesByManager();
          break;
      }
    })

  }

  // This function gets the prompts for View Employees by Manager
Prompts.prototype.employeesByManager = function() {
  inquirer
    .prompt([{
      type: 'text',
      name: 'first_name',
      message: "Enter the manager's first name.",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log(" Please enter the manager's first name.");
          return false;
        }
      }
    },
    {
      type: 'text',
      name: 'last_name',
      message: "Enter the manager's last name.",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log(" Please enter the manager's last name.");
          return false;
        }
      }
    }])
  // These prompts are then applied to the query.
    .then(({ first_name, last_name }) => {
      console.log(first_name.trim(), last_name.trim())
    })
}
//View all employees -- by manager, department; add employee, remove employee, update employee role, manager;
// view all departments, view all roles
Prompts.prototype.initializeProgram();