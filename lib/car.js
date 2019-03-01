class Car {
    constructor(db) {
        this.db = db;
        this.pool = db.pool;
    }

    getCarsList() {
        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM cars JOIN places ON cars.id = places.car_id";
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

    addCar(info) {
        // Validate
        var car = {};
        Object.keys(info).forEach((value, index) => {
            if (info[value] !== '') {
                car[value] = info[value];
            }
        });
        //
        return new Promise((resolve, reject) => {
            this.pool.query('INSERT INTO cars SET ?', car, (err, results, fields) => {
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
}

module.exports = Car;