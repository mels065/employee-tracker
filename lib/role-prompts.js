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
            throw err;
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
            throw err;
        }
    }

    async deleteRole() {
        try {
            const { roleId } = await inquirer.prompt([
                {
                    name: 'roleId',
                    type: 'list',
                    message: 'Which role will be deleted?',
                    choices: [
                        'None',
                        ...(
                        await this.sql.select(
                            'roles',
                            ['id', 'title']
                        )
                    ).map(({ id, title }) => ({ name: title, value: id }))
                    ]
                }
            ]);

            if (roleId !== 'None') {
                const { confirm } = await inquirer.prompt([
                    {
                        name: 'confirm',
                        type: 'confirm',
                        message: 'Are you sure you want to delete this role?',
                    }
                ]);
                if (confirm) {
                    await this.sql.delete(
                        'roles',
                        `id = ${roleId}`
                    )
                    console.log('Role has been successfully deleted');
                }
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = RolePrompts;
