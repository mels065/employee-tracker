const mysql2 = require('mysql2');

require('dotenv').config();

const SQL = require('./sql');

async function init() {
    const db = mysql2.createConnection({
            database: process.env.DB_NAME,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PW
        }
    );

    const sql = new SQL(db);
}

init();
