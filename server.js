// Packages
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const path = require("path");

const app = express();

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "classlist_db"
    },
    console.log("Connected to the personelle_db database.")
  );

  const menuQuestion =
  {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: ["view all departments", "add a department", "add a role", "add an employee", "update an employee role"]
  }

  const departmentQuestions =
    {
        type: "input",
        message: "What is the department you would like to add?",
        name: "newDepartment",
    }
  const roleQuestions = [
    {
        type: "input",
        message: "What is the role/ job title?",
        name: "role",
    },
    {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
    },
    {
        type: "input",
        message: "What is the department for this role?",
        name: "department",
    },
  ]

  const employeeQuestions = [
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
    },
    {
        type: "input",
        message: "What is the employee's role?",
        name: "role",
    },
    {
        type: "input",
        message: "Who is the employee's manager?",
        name: "manager",
    },
  ]

  const updateEmployee = [
    {
        type: "list",
        message: "Select an employee:",
        name: "updateEmployee",
        // TO DO: write function to list all employees by name and call it here
        // choices: []
    },
    {
        type: "list",
        message: "Select a new role:",
        name: "updateRole",
        // TO DO: write function to list all roles and call it here
        // choices: []
    },
  ]

  function menu() {
    inquirer.prompt(menuQuestion).then((answer) => {
        switch (answer.action) {
            case "view all departments":
                console.log("Chose to view all departments");
                db.query('SELECT * FROM departments', function (err, results) {
                    console.log(results);
                  });
                break;
            case "view all roles":
                console.log("Chose to view all roless");
                db.query('SELECT * FROM roles', function (err, results) {
                    console.log(results);
                  });
                break;
            case "add a department":
                console.log("Chose to add a new department");
                inquirer
                    .prompt(departmentQuestions).then((answers) => {
                        menu()
                    })
                break;
            case "add a role":
                console.log("Chose to add a new role");
                inquirer
                    .prompt(roleQuestions).then((answers) => {
                        menu()
                    })
                break; 
            case "add an employee":
                console.log("Chose to add a new employee");
                inquirer
                    .prompt(employeeQuestions).then((answers) => {
                        menu()
                    })
                break;           
            case "Update an employee role":
                console.log("chose update an employee role");
                inquirer
                    .prompt(updateEmployee).then((answers) => {
                        menu()
                    })
                break;
        }
    })
}

menu()
