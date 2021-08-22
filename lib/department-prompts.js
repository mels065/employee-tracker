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

    async deleteDepartment() {
        try {
            const { departmentId } = await inquirer.prompt([
                {
                    name: 'departmentId',
                    type: 'list',
                    message: 'Which department will be deleted?',
                    choices: [
                        'None',
                        ...(
                        await this.sql.select(
                            'departments',
                            ['id', 'name']
                        )
                    ).map(({ id, name }) => ({ name, value: id }))
                    ]
                }
            ]);

            if (departmentId !== 'None') {
                const { confirm } = await inquirer.prompt([
                    {
                        name: 'confirm',
                        type: 'confirm',
                        message: 'Are you sure you want to delete this department?',
                    }
                ]);
                if (confirm) {
                    await this.sql.delete(
                        'departments',
                        `id = ${departmentId}`
                    )
                    console.log('Department has been successfully deleted');
                }
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = DepartmentPrompts;
