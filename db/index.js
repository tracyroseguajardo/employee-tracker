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
        return this.connection.promise().query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    // formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

}

module.exports = new Data(connection)