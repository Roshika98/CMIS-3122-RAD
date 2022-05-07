const sql = require('mysql2');

const generalConnection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fas'
});

const adminConnection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fas'
})

const connectionPool = {
    general: generalConnection,
    admin: adminConnection
}


module.exports = connectionPool;