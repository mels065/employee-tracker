const mysql2 = require('mysql2/promise');

require('console.table');
require('dotenv').config();

const SQL = require('./lib/sql');
const Prompts = require('./lib/prompts');

async function init() {
    try {
        const db = await mysql2.createConnection({
            database: process.env.DB_NAME,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PW
        });

        const sql = new SQL(db);
        const prompts = new Prompts(sql);
        prompts.displayMenu();
    } catch (err) {
        console.error(err);
    }
}

init();
