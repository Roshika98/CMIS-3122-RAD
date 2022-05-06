const sql = require('mysql');

var generalConnection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fas'
});

var adminConnection = sql.createConnection({
    host: 'localhost',
    user: '',
    database: 'fas'
})

var connectionPool = {
    general: generalConnection,
    admin: adminConnection
}


module.exports = connectionPool;