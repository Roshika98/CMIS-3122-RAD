const sql = require('mysql');
var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'fas'
});


connection.connect(e => {
    if (e) console.log(e);
    else {
        console.log("connection acquired");
    }
});


var querySql = "CREATE TABLE modules( course_code INT NOT NULL PRIMARY KEY, name VARCHAR(255) )";

connection.query(querySql, (e, result, fields) => {
    if (e) console.log(e);
    if (result) console.log(result);
});

