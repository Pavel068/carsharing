class Chat {
    constructor(db) {
        this.db = db;
        this.pool = db.pool;
        this.chat = [];
    }

    getMessages(chatId = 0, limit = 50) {
        if (chatId === 0) {
            // Common chat
            let sql = 'SELECT * FROM chat JOIN users ON chat.user_id = users.id ORDER BY chat.ts DESC LIMIT ?';
            this.pool.query(sql, limit, (err, results, fields) => {

            });
        }
    }

    sendMessage(chatId, msg) {
        let sql = 'INSERT INTO chat SET ?'
        this.pool.query(sql, {
            chat_id: chatId,
            msg: msg,
            user_id: 1
        }, (err, results, fields) => {

        });
    }
}