const mysql = require('mysql');

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

    // Error message for mysql queries
    error(err) {
        return {
            status: false,
            errorCode: err.code,
            sql: err.sql
        }
    }
}

module.exports = DB;