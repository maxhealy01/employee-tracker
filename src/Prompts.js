const inquirer = require('inquirer');
const {viewAllDepartments, viewAllEmployees} = require('../db/database')

function Prompts() {

}

Prompts.prototype.initializeProgram = function() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'View Employees by Manager', 'View Employees by Department',
              'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager']
  }])
    .then(({choice}) => {
      switch (choice) {
        case 'View All Employees':
          viewAllEmployees();
          this.initializeProgram();
      }
    })

  }
//View all employees -- by manager, department; add employee, remove employee, update employee role, manager;
Prompts.prototype.initializeProgram();