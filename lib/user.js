var crypto = require('crypto');

class User {
    constructor(db) {
        this.db = db;
        this.pool = db.pool;
        this.info = {};
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
                    reject(this.db.error(err));
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
                    reject(this.db.error(err));
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

    getUserInfo() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users JOIN docs ON users.id = docs.user_id WHERE users.id = ?';
            this.pool.query(sql, [this.info.id], (err, results, fields) => {
                if (err) {
                    reject(this.db.error(err));
                } else {
                    resolve(results)
                }
            });
        });
    }

    saveUserInfo(info) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users SET ?';
            this.pool.query(sql, info, (err, results, fields) => {
                if (err) {
                    reject(this.db.error(err));
                } else {
                    resolve({
                        status: true
                    })
                }
            });
        });
    }

    saveUserPassword(password) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users SET ?';
            this.pool.query(sql, {
                password: crypto.createHash('sha256').update(password).digest('hex')
            }, (err, results, fields) => {
                if (err) {
                    reject(this.db.error(err));
                } else {
                    resolve({
                        status: true
                    })
                }
            });
        });
    }

    saveUserAccountData(info) {
        return new Promise((resolve, reject) => {
            let sql = '';
        });
    }
}

module.exports = User;