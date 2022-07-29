// Packages
const inquirer = require("inquirer");
require("console.table");
const db = require('./db')


const menuQuestion =
{
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        'quit'
    ]
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
        message: "What is the role/job title?",
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
                viewAllDepartments()
                break;
            case "view all roles":
                viewAllRoles()
                break;
            case "add a department":
                console.log("Chose to add a new department");
                inquirer
                    .prompt(departmentQuestions).then((answers) => {
                        // add to database
                        menu()
                    })
                break;
            case "add a role":
                console.log("Chose to add a new role");
                inquirer
                    .prompt(roleQuestions).then((answers) => {
                        // add to database
                        menu()
                    })
                break;
            case "add an employee":
                console.log("Chose to add a new employee");
                inquirer
                    .prompt(employeeQuestions).then((answers) => {
                        // add to database
                        menu()
                    })
                break;
            case "Update an employee role":
                console.log("chose update an employee role");
                inquirer
                    .prompt(updateEmployee).then((answers) => {
                        // add to database
                        menu()
                    })
                break;
                default:
                    process.exit();
        }
    })
}



function viewAllDepartments() {
    db.findAllDepartments().then(([data]) => {
        console.table(data)
    }).then(() => menu())
}

function viewAllRoles(){
    db.findAllRoles().then(([data]) => {
        console.table(data)
    }).then(() => menu())
}

menu()
