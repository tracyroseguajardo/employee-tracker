// Packages
const inquirer = require("inquirer");
require("console.table");
const db = require('./db');

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
};

function menu() {
    inquirer.prompt(menuQuestion).then((answer) => {
        switch (answer.action) {
            case "view all departments":
                viewAllDepartments()
                break;
            case "view all roles":
                viewAllRoles()
                break;
            case "view all employees":
                viewAllEmployees()
                break;
            case "add a department":
                saveDept();
                break;
            case "add a role":
                saveRole()
                break;
            case "add an employee":
                createEmployee();
                break;
            case "update an employee role":
                updateEmployee();
                break;
            default:
                process.exit();
        }
    })
};

function viewAllDepartments() {
    db.findAllDepartments().then(([data]) => {
        console.table(data)
    }).then(() => menu())
};

function viewAllRoles() {
    db.findAllRoles().then(([data]) => {
        console.table(data)
    }).then(() => menu())
};

function viewAllEmployees() {
    db.findAllEmployees().then(([data]) => {
        console.table(data)
    }).then(() => menu())
};

const departmentQuestions =
{
    type: "input",
    message: "What department would you like to add?",
    name: "name",
};

function saveDept() {
    inquirer
        .prompt(departmentQuestions).then((res) => {
            db.addToDepartment(res)
                .then(() => menu())
        })
}

function saveRole() {
    db.findAllDepartments().then(([data]) => {
        const deptChoices = data.map((department) => ({
            name: department.name,
            value: department.id
        }));

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the role/job title?",
                    name: "title",
                },
                {
                    type: "input",
                    message: "What is the salary for this role?",
                    name: "salary",
                },
                {
                    type: "list",
                    message: "What is the department for this role?",
                    name: "department_id",
                    choices: [
                            deptChoices[0],
                            deptChoices[1],
                            deptChoices[2],
                            deptChoices[3],
                            deptChoices[4],
                            deptChoices[5],
                            deptChoices[6],
                            deptChoices[7],
                            deptChoices[8],
                            deptChoices[9],
                    ],
                }
            ])
            .then((res) => {
                db.addToRole(res)
                    .then(() => menu())
            })
    })
};

function createEmployee() {
    db.findAllRoles().then(([data]) => {
        const roleChoices = data.map((role) => ({
            name: role.title,
            value: role.id
        }));
        console.log(roleChoices);
        db.findAllEmployees().then(([data]) => {
            const managerChoices = data.map((employee) => ({
                name: (employee.first_name + ' ' + employee.last_name),
                value: employee.id
            }));    

        inquirer.prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name",
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role_id",
                choices: [
                    roleChoices[0],
                    roleChoices[1],
                    roleChoices[2],
                    roleChoices[3],
                    roleChoices[4],
                    roleChoices[5],
                    roleChoices[6],
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager_id",
                choices: [
                    managerChoices[0],
                    managerChoices[1],
                    managerChoices[2],
                    managerChoices[3],
                    managerChoices[4],
                    managerChoices[5],
                ]
            },
        ])
        .then((res) => {
            db.addToEmployee(res)
                .then(() => menu())
        })


    }) 
    })   
};

function updateEmployee() {
    db.findAllEmployees().then(([data]) => {
        // console.log(data);
        const employeeChoices = data.map((employee) => ({
            name: (employee.first_name + ' ' + employee.last_name),
            value: employee.id
        }));

    db.findAllRoles().then(([data]) => {
        // console.log(data);
        const roleChoices = data.map((role) => ({
            name: role.title,
            value: role.id
        }));
           
        inquirer.prompt([
            {
                type: "list",
                message: "Which employee would you like to update?",
                name: "name",
                choices: [
                    employeeChoices[0],
                    employeeChoices[1],
                    employeeChoices[2],
                    employeeChoices[3],
                    employeeChoices[4],
                    employeeChoices[5],
                    employeeChoices[6],
                    employeeChoices[7],
                ]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role_id",
                choices: [
                    roleChoices[0],
                    roleChoices[1],
                    roleChoices[2],
                    roleChoices[3],
                    roleChoices[4],
                    roleChoices[5],
                    roleChoices[6]

                ]
            },
        ])
        .then((res) => {
            // console.log(res);
            db.updateEmployee(res)
                .then(() => menu())
        })

    })
    })    
};

menu()
