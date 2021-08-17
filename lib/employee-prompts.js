const inquirer = require('inquirer');

const pausePrompt = require('../utils/pause-prompt');

class EmployeePrompts {
    constructor(sql) {
        this.sql = sql;
    }

    async viewEmployees() {
        try {
            const employees = await this.sql.select(
                'employees',
                [
                    'employees.id',
                    'employees.first_name',
                    'employees.last_name',
                    'roles.title',
                    'departments.name AS department_name',
                    'roles.salary',
                    'concat(managers.first_name, " ", managers.last_name) AS managers_name'
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
            );
            console.table(employees);
            await pausePrompt();

        } catch (err) {
            throw err;
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
            throw err;
        }
    }

    async updateEmployeeRole() {
        try {
            const { employeeId, roleId } = await inquirer.prompt([
                {
                    name: 'employeeId',
                    type: 'list',
                    message: 'Select an employee',
                    choices: (
                        await this.sql.select(
                            'employees',
                            ['id', 'first_name', 'last_name']
                        )
                    ).map(employee => ({ name: `${employee['first_name']} ${employee['last_name']}`, value: employee.id }))
                },
                {
                    name: 'roleId',
                    type: 'list',
                    message: 'Select a new role for the employee',
                    choices: (
                        await this.sql.select(
                            'roles',
                            ['id', 'title']
                        )
                    ).map(role => ({ name: role.title, value: role.id }))
                }
            ]);

            await this.sql.update(
                'employees',
                ['role_id'],
                [roleId],
                `id = ${employeeId}`
            );
            console.log("Employee's role has been updated");
        } catch (err) {
            throw err;
        }
    }

    async deleteEmployee() {
        try {
            const { employeeId } = await inquirer.prompt([
                {
                    name: 'employeeId',
                    type: 'list',
                    message: 'Which employee will be deleted?',
                    choices: [
                        'None',
                        ...(
                        await this.sql.select(
                            'employees',
                            ['id', 'first_name', 'last_name']
                        )
                    ).map(employee => ({ name: `${employee['first_name']} ${employee['last_name']}`, value: employee.id }))
                    ]
                }
            ]);

            if (employeeId !== 'None') {
                const { confirm } = await inquirer.prompt([
                    {
                        name: 'confirm',
                        type: 'confirm',
                        message: 'Are you sure you want to delete this employee?',
                    }
                ]);
                if (confirm) {
                    await this.sql.delete(
                        'employees',
                        `id = ${employeeId}`
                    )
                    console.log('Employee has been successfully deleted');
                }
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = EmployeePrompts;
