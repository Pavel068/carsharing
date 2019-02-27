const mysql = require('mysql');
require('dotenv').config();

class DB {
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 15,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }
}

module.exports = DB;