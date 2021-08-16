const inquirer = require('inquirer');

module.exports = async () => inquirer.prompt([
    {
        name: '*',
        type: 'list',
        choices: [
            '<Press Enter to continue>'
        ]
    }
])
