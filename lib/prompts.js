const inquirer = require('inquirer');

const EmployeePrompts = require('./employee-prompts');
const RolePrompts = require('./role-prompts');
const DepartmentPrompts = require('./department-prompts');

const VIEW_ALL_EMPLOYEES = "View All Employees";
const ADD_EMPLOYEE = "Add Employee";
const DELETE_EMPLOYEE = "Delete Employee";
const VIEW_ALL_ROLES = "View All Roles";
const ADD_ROLE ="Add Role";
const UPDATE_EMPLOYEE_ROLE = "Update Employee Role";
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
        this.rolePrompts = new RolePrompts(sql);
        this.departmentPrompts = new DepartmentPrompts(sql);
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
                            UPDATE_EMPLOYEE_ROLE,
                            DELETE_EMPLOYEE,
                            VIEW_ALL_ROLES,
                            ADD_ROLE,
                            DELETE_ROLE,
                            VIEW_ALL_DEPARTMENTS,
                            ADD_DEPARTMENT,
                            DELETE_DEPARTMENT,
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
                        await this.employeePrompts.addEmployee();
                        break;
                    }
                    case UPDATE_EMPLOYEE_ROLE: {
                        await this.employeePrompts.updateEmployeeRole();
                        break;
                    }
                    case DELETE_EMPLOYEE: {
                        await this.employeePrompts.deleteEmployee();
                        break;
                    }
                    case VIEW_ALL_ROLES: {
                        await this.rolePrompts.viewRoles();
                        break;
                    }
                    case ADD_ROLE: {
                        await this.rolePrompts.addRole();
                        break;
                    }
                    case DELETE_ROLE: {
                        await this.rolePrompts.deleteRole();
                        break;
                    }
                    case VIEW_ALL_DEPARTMENTS: {
                        await this.departmentPrompts.viewDepartments();
                        break;
                    }
                    case ADD_DEPARTMENT: {
                        await this.departmentPrompts.addDepartment();
                        break;
                    }
                    case DELETE_DEPARTMENT: {
                        await this.departmentPrompts.deleteDepartment();
                        break;
                    }
                    case EXIT: {
                        await this.sql.end();
                        break;
                    }
                }
            }
        } catch (err) {
            this.sql.end(err);
        }
    }
}

module.exports = Prompts;
