const connection = require('./connection')

class Data {
    constructor(connection){
        this.connection = connection
    }

    findAllDepartments(){
        // department names and department ids
        return this.connection.promise().query('SELECT * FROM department;')
    }

    findAllRoles(){
        // the job title, role id, the department that role belongs to, and the salary for that role
        return this.connection.promise().query(`
            SELECT role.id, role.title, department.name AS department, role.salary
            FROM role LEFT JOIN department
            ON role.department_id = department.id;
            `)
    }

    findAllEmployees(){
        // formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        return this.connection.promise().query(`
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, manager.last_name AS manager
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id
            LEFT JOIN department
            ON role.department_id = department.id
            LEFT JOIN employee AS manager
            ON manager.id = employee.manager_id;
            `)
    }

    addToDepartment(department){
        return this.connection.promise().query(
        'INSERT INTO department SET ?',  department
        )
    }

    addToRole(role){
        return this.connection.promise().query(
        'INSERT INTO role SET ?',  role
        )
    }

    addToEmployee(employee){
        return this.connection.promise().query(
        'INSERT INTO employee SET ?',  employee
        )
    }

    updateEmployee(res){
        return this.connection.promise().query(`
            UPDATE employee
            SET role_id = ${res.role_id}
            WHERE employee.id = ${res.name};
        `)
    }
}

module.exports = new Data(connection)