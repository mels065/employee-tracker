const inquirer = require('inquirer');

const pausePrompt = require('../utils/pause-prompt');

class EmployeePrompts {
    constructor(sql) {
        this.sql = sql;
    }

    async viewEmployees() {
        try {
            console.table(await this.sql.select(
                'employees',
                [
                    'employees.id',
                    'employees.first_name',
                    'employees.last_name',
                    'roles.title',
                    'departments.name AS department_name',
                    'roles.salary',
                    'concat(managers.first_name, " ", managers.last_name) AS managers_name'
                    // 'managers.first_name AS manager_first_name',
                    // 'managers.last_name AS manager_last_name'
                ],
                {
                    joins: [
                        {
                            type: 'LEFT',
                            table: 'employees',
                            as: 'managers',
                            on: 'managers.id = employees.manager_id'
                        },
                        {
                            table: 'roles',
                            on: 'employees.role_id = roles.id'
                        },
                        {
                            table: 'departments',
                            on: 'roles.department_id = departments.id AND employees.role_id = roles.id'
                        }
                    ],
                    orderBy: 'employees.id'
                }
            ));
            await pausePrompt();

        } catch (err) {
            console.error(err);
        }
    }

    async addEmployee() {
        try {
            let {
                name,
                role
            } = await inquirer.prompt([
                {
                    name: 'name',
                    message:"What is the name of the employee?",
                    validate: name => /^[A-Z][a-z]* [A-Z][a-z]*/.test(name)
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'What role does the employee have?',
                    choices: (await this.sql.select(
                        'roles',
                        ['id, title, department_id']
                    )).map(role => ({ name: role.title, value: role }))
                }
            ]);
            let { managerId } = await inquirer.prompt([
                {
                    name: 'managerId',
                    type: 'list',
                    message: 'Who is their manager?',
                    choices: [
                        'None',
                        ...(await this.sql.select(
                            'employees',
                            ['employees.id', 'employees.first_name', 'employees.last_name'],
                            {
                                joins: [
                                    {
                                        table: 'departments',
                                        on: `departments.id = ${role['department_id']}`
                                    },
                                    {
                                        table: 'roles',
                                        as: 'manager_roles',
                                        on: 'departments.id = manager_roles.department_id'
                                    }
                                ],
                                where: 'employees.manager_id IS NULL AND employees.role_id = manager_roles.id'
                            }
                        )).map(employee => ({ name: `${employee['first_name']} ${employee['last_name']}`, value: employee.id }))
                    ]
                }
            ])
    
            const [firstName, lastName] = name.split(' ');
            managerId = managerId === 'None' ? null : managerId;
            await this.sql.insert(
                'employees',
                ['first_name', 'last_name', 'role_id', 'manager_id'],
                [firstName, lastName, role.id, managerId]
            );
            console.log('Employee added!');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = EmployeePrompts;
