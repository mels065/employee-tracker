const inquirer = require('inquirer');

const pausePrompt = require('../utils/pause-prompt');

class DepartmentPrompts {
    constructor(sql) {
        this.sql = sql;
    }

    async viewDepartments() {
        try {
            const departments = await this.sql.select(
                'departments',
                [
                    'departments.id',
                    'departments.name'
                ]
            )
            console.table(departments);
            await pausePrompt();
        } catch (err) {
            throw err;
        }
    }

    async addDepartment() {
        try {
            const {
                name
            } = await inquirer.prompt([
                {
                    name: 'name',
                    message: 'What is the name of the department?'
                }
            ]);

            await this.sql.insert(
                'departments',
                ['name'],
                [name]
            );
            console.log('New department has been added');
        } catch (err) {
            throw err;
        }
    }
}

module.exports = DepartmentPrompts;
