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
      choices: ['Add an engineer', 'Add an intern', 'Finish']
  }])}

Prompts.prototype.initializeProgram();