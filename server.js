// Packages
const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

const app = express();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'classlist_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

  const menuQuestion =
  {
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: ["view all departments", "add a department", "add a role", "add an employee", "update an employee role"]
  }

  function menu() {
    inquirer.prompt(menuQuestion).then((answer) => {
        switch (answer.action) {
            case "view all departments":
                console.log("chose view all departments");
                break;
            case "add a department":
                console.log("chose add a department");
                break;
            case "add a role":
                console.log("chose add a role");
                break; 
            case "add an employee":
                console.log("chose add an employee");
                break;           
            case "update an employee role":
                console.log("chose update an employeerole");
                break;
        }
    })
}