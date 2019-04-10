class Chat {
    constructor(db) {
        this.db = db;
        this.pool = db.pool;
        this.chat = [];
    }

    getMessages(chatId = 0, limit = 50) {
        return new Promise((resolve, reject) => {
            if (chatId === 0) {
                // Common chat
                let sql = 'SELECT * FROM chat JOIN users ON chat.user_id = users.id ORDER BY chat.ts DESC LIMIT ?';
                this.pool.query(sql, [limit], (err, results, fields) => {
                    if (err) {
                        reject(this.db.error(err));
                    } else {
                        resolve(results);
                    }
                });
            }
        });
    }

    sendMessage(chatId, msg) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO chat SET ?'
            this.pool.query(sql, {
                chat_id: chatId,
                msg: msg,
                user_id: user.info !== undefined ? user.info.id : null
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
}

module.exports = Chat;