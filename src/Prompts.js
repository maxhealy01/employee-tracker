const inquirer = require('inquirer');
const cTable = require('console.table');
const {viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addRole, addEmployee, updateRole} = require('../db/database')

function Prompts() {

}

Prompts.prototype.initializeProgram = function() {
  inquirer
    .prompt([{
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
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
        case 'Add Department':
          this.addDepartmentQueries();
          break;
        case 'Add Role':
          this.addRoleQueries();
          break;
        case 'Add Employee':
          this.addEmployeeQueries();
          break;
        case 'Update Employee Role':
          this.updateRoleQueries();
      }
    })

  }

  // This function gets the prompts for View Employees by Manager
/*Prompts.prototype.employeesByManagerQueries = function() {
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
      viewEmployeesByManager(first_name, last_name)
    })
} */

Prompts.prototype.addDepartmentQueries = function() {
  inquirer
    .prompt([{
      type: 'text',
      name: 'department',
      message: "Enter the name of the new department.",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log("Please enter the name of the new department.");
          return false;
        }
      }
    }])
  // These prompts are then applied to the query.
    .then(({ department }) => {
      console.table(addDepartment(department))
      this.initializeProgram();
    })
}

Prompts.prototype.addRoleQueries = function() {
  inquirer
    .prompt([{
      type: 'text',
      name: 'role',
      message: 'Enter the name of the new role.',
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log("Please enter the name of the new role.");
          return false;
        }
      }},
      {
        type: 'text',
        name: 'salary',
        message: 'Enter the salary of this role.',
        validate: nameInput => {
          if (typeof parseInt(nameInput) == 'number'){
            return true;
          } else {
            console.log("Please enter the salary of the new role.");
            return false;
          }
      }
    },
    {
      type: 'text',
      name: 'department',
      message: "Enter the name of the role's department.",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log("Please enter the name of the new role.");
          return false;
        }
      }
    }])
    .then(({ role, salary, department }) => {
      console.table(addRole(role, salary, department))
      this.initializeProgram();
    })
}

Prompts.prototype.addEmployeeQueries = function() {
  inquirer
  .prompt([{
    type: 'text',
    name: 'firstName',
    message: "Enter the new employee's first name.",
    validate: nameInput => {
      if (nameInput){
        return true;
      } else {
        console.log("Please enter the new employee's first name.");
        return false;
      }
    }},
    {
      type: 'text',
      name: 'lastName',
      message: "Enter the employee's last name.",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log("Please enter the new employee's last name.");
          return false;
        }
      }
  },
  {
    type: 'text',
    name: 'role',
    message: "Enter the new employee's role.",
    validate: nameInput => {
      if (nameInput){
        return true;
      } else {
        console.log("Please enter the new employee's role.");
        return false;
      }
    }
  },
  {
    type: 'text',
    name: 'manager',
    message: "Enter the employee's manager.",
    validate: nameInput => {
      if (nameInput){
        return true;
      } else {
        console.log("Please enter the new employee's role.");
        return false;
      }
    }
    

  }])
  .then(({ firstName, lastName, role, manager }) => {
    console.table(addEmployee(firstName, lastName, role, manager))
    this.initializeProgram();
  })
}

Prompts.prototype.updateRoleQueries = function() {
  inquirer
  .prompt([{
    type: 'text',
    name: 'firstName',
    message: "Enter the employee's first name.",
    validate: nameInput => {
      if (nameInput){
        return true;
      } else {
        console.log("Please enter the employee's first name.");
        return false;
      }
    }},
    {
      type: 'text',
      name: 'lastName',
      message: "Enter the employee's last name.",
      validate: nameInput => {
        if (nameInput){
          return true;
        } else {
          console.log("Please enter the employee's last name.");
          return false;
        }
      }
  },
  {
    type: 'text',
    name: 'role',
    message: "Enter the employee's new role.",
    validate: nameInput => {
      if (nameInput){
        return true;
      } else {
        console.log("Please enter the employee's new role.");
        return false;
      }
    }
  }])
  .then(({ firstName, lastName, role }) => {
    console.table(updateRole(firstName, lastName, role))
    this.initializeProgram();
  })
}
Prompts.prototype.initializeProgram();