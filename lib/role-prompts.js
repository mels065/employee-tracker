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
}

module.exports = RolePrompts;
