const inquirer = require('inquirer');

const pausePrompt = require('../utils/pause-prompt');

class EmployeePrompts {
    constructor(sql) {
        this.sql = sql;
    }

    async viewEmployees() {
        try {
            console.table(await this.sql.select('employees'));
            await pausePrompt();

        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = EmployeePrompts;
