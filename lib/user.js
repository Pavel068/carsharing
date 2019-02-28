var crypto = require('crypto');

class User {
    constructor(db) {
        this.pool = db.pool;
        this.info = {};
    }

    // Error message for mysql queries
    error(err) {
        return {
            status: false,
            errorCode: err.code,
            sql: err.sql
        }
    }

    register(info) {
        // Validate
        Object.keys(info).forEach((value, index) => {
            if (info[value] !== '') {
                // sha1 password
                if (value === 'password') {
                    info[value] = crypto.createHash('sha256').update(info[value]).digest('hex');
                }

                this.info[value] = info[value];
            }
        });
        //
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO users SET ?";
            var query = this.pool.query(sql, this.info, (err, results, fields) => {
                if (err !== null) {
                    reject(this.error(err));
                } else {

                    resolve({
                        status: true,
                        insertId: results.insertId,
                    })
                }
            });
        });
    }

    login(login, password) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE login = ? AND password = ?";
            this.pool.query(sql, [
                login,
                crypto.createHash('sha256').update(password).digest('hex')
            ], (err, results, fields) => {
                if (err !== null) {
                    reject(this.error(err));
                } else {
                    if (results !== undefined && results.length > 0) {
                        this.info = results[0];
                    } else {
                        this.info = {};
                    }
                    resolve({
                        status: true
                    })
                }
            });
        });
    }
}

module.exports = User;