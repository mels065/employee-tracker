const inquirer = require('inquirer');
require('console.table');

const EmployeePrompts = require('./employee-prompts');

const VIEW_ALL_EMPLOYEES = "View All Employees";
const ADD_EMPLOYEE = "Add Employee";
const UPDATE_EMPLOYEE = "Update Employee";
const DELETE_EMPLOYEE = "Delete Employee";
const VIEW_ALL_ROLES = "View All Roles";
const ADD_ROLE ="Add Role";
const DELETE_ROLE = "Delete Role";
const VIEW_ALL_DEPARTMENTS = "View All Departments";
const VIEW_BUDGET_IN_DEPARTMENT = "View Budget in Department";
const ADD_DEPARTMENT = "Add Department";
const DELETE_DEPARTMENT = "Delete Department";
const UPDATE_EMPLOYEE_MANAGERS = "Update Employee Managers";
const VIEW_EMPLOYEES_BY_MANAGER = "View Employees By Manager";
const VIEW_EMPLOYEES_BY_DEPARTMENT = "View Employees By Department";
const EXIT = "Exit";

class Prompts {
    constructor(sql) {
        this.sql = sql;
        this.employeePrompts = new EmployeePrompts(sql);
    }

    async displayMenu() {
        try {
            let menuChoice;
            while (menuChoice !== EXIT) {
                menuChoice = (await inquirer.prompt([
                    {
                        name: "menuChoice",
                        type: "list",
                        message: "Select an option",
                        choices: [
                            VIEW_ALL_EMPLOYEES,
                            ADD_EMPLOYEE,
                            UPDATE_EMPLOYEE,
                            DELETE_EMPLOYEE,
                            VIEW_ALL_ROLES,
                            ADD_ROLE,
                            DELETE_ROLE,
                            VIEW_ALL_DEPARTMENTS,
                            VIEW_BUDGET_IN_DEPARTMENT,
                            VIEW_EMPLOYEES_BY_DEPARTMENT,
                            ADD_DEPARTMENT,
                            DELETE_DEPARTMENT,
                            UPDATE_EMPLOYEE_MANAGERS,
                            VIEW_EMPLOYEES_BY_MANAGER,
                            EXIT
                        ]
                    }
                ])).menuChoice;
    
                switch(menuChoice) {
                    case VIEW_ALL_EMPLOYEES: {
                        await this.employeePrompts.viewEmployees();
                        break;
                    }
                    case ADD_EMPLOYEE: {
                        // Add code here
                        break;
                    }
                    case UPDATE_EMPLOYEE: {
                        // Add code here
                        break;
                    }
                    case DELETE_EMPLOYEE: {
                        // Add code here
                        break;
                    }
                    case VIEW_ALL_ROLES: {
                        // Add code here
                        break;
                    }
                    case ADD_ROLE: {
                        // Add code here
                        break;
                    }
                    case DELETE_ROLE: {
                        // Add code here
                        break;
                    }
                    case VIEW_ALL_DEPARTMENTS: {
                        // Add code here
                        break;
                    }
                    case VIEW_BUDGET_IN_DEPARTMENT: {
                        // Add code here
                        break;
                    }
                    case VIEW_EMPLOYEES_BY_DEPARTMENT: {
                        // Add code here
                        break;
                    }
                    case ADD_DEPARTMENT: {
                        // Add code here
                        break;
                    }
                    case DELETE_DEPARTMENT: {
                        // Add code here
                        break;
                    }
                    case UPDATE_EMPLOYEE_MANAGERS: {
                        // Add code here
                        break;
                    }
                    case VIEW_EMPLOYEES_BY_MANAGER: {
                        // Add code here
                        break;
                    }
                    case EXIT: {
                        await this.sql.end();
                        break;
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = Prompts;
