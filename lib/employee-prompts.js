const inquirer = require('inquirer');

class EmployeePrompts {
    constructor(sql) {
        this.sql = sql;
    }

    async viewEmployees() {
        try {
            console.table(await this.sql.select('employees'));
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = EmployeePrompts;
