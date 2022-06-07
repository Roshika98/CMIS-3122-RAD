const sql = require('mysql2');

const generalConnection = sql.createPool({
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME
});

generalConnection.on('error', (e) => {
    console.log('general connection error');
});

const adminConnection = sql.createPool({
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME
})

adminConnection.on('error', (e) => {
    console.log('admin connection error');
});

const connectionPool = {
    general: generalConnection,
    admin: adminConnection
}


module.exports = connectionPool;