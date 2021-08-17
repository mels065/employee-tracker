const inquirer = require('inquirer');

const pausePrompt = require('../utils/pause-prompt');

class RolePrompts {
    constructor(sql) {
        this.sql = sql;
    }

    async viewRoles() {
        try {
            const roles = await this.sql.select(
                'roles',
                [
                    'roles.id',
                    'roles.title',
                    'departments.name AS department_name',
                    'roles.salary'
                ],
                {
                    joins: [
                        {
                            table: 'departments',
                            on: 'roles.department_id = departments.id'
                        }
                    ]
                }
            )
            console.table(roles);
            await pausePrompt();
        } catch (err) {
            this.sql.end(err);
        }
    }

    async addRole() {
        try {
            const {
                title,
                departmentId,
                salary
            } = await inquirer.prompt([
                {
                    name: 'title',
                    message: 'What is the title of the role?'
                },
                {
                    name: 'departmentId',
                    type: 'list',
                    message: "Which department is this role a part of?",
                    choices: (
                        await this.sql.select(
                            'departments',
                            ['id', 'name']
                        )
                    ).map(({ id, name }) => ({ name, value: id }))
                },
                {
                    name: 'salary',
                    type: 'number',
                    message: 'What is the salary for this position?'
                }
            ]);

            await this.sql.insert(
                'roles',
                ['title', 'department_id', 'salary'],
                [title, departmentId, salary]
            );
            console.log('New role has been added');
        } catch (err) {
            this.sql.end(err);
        }
    }
}

module.exports = RolePrompts;
