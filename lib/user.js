class User {
    constructor(db) {
        this.pool = db.pool;
        this.info = {};
    }

    register(info) {
        let sql = "INSERT INTO users SET ?";
        this.pool.query(sql, info, (err, result, fields) => {

        });
    }

    login(login, password) {
        let sql = "SELECT * FROM users WHERE ?";
        this.pool.query(sql, {}, (err, result, fields) => {

        });
    }

    getUser(userId) {

    }

    getTripsHistory(userId) {

    }
}

module.exports = User;