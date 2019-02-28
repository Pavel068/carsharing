class Car {
    constructor(db) {
        this.db = db;
        this.pool = db.pool;
    }

    getCarsList() {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM cars";
            this.pool.query(query, [], (err, results, fields) => {
                if (err !== null) {
                    reject(this.db.error(err));
                } else {
                    resolve(results);
                }
            });
        });
    }

    getCarInfo(carId) {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM cars WHERE id = ?";
            this.pool.query(query, [carId], (err, results, fields) => {
                if (err !== null) {
                    reject(this.db.error(err));
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = Car;