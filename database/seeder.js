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


var querySql = "CREATE TABLE modules( course_code VARCHAR(10) NOT NULL PRIMARY KEY, name VARCHAR(255),credit INT NOT NULL,description VARCHAR(255) )";

// connection.query(querySql, (e, result, fields) => {
//     if (e) console.log(e);
//     if (result) console.log(result);
// });


var data = [
    ['CMIS3114', 'Data Communication & computer Networks', 4],
    ['CMIS3112', 'Rapid Apllication Development', 2],
    ['CMIS3134', 'Computer Architecture & Compiler Design', 4],
    ['MMOD3113', 'Mathematical Methods', 3],
    ['STAT3124', 'Time Series Analysis', 4],
    ['CMIS2214', 'Data Structures & Algorithms', 4]
];

var dataentry = 'INSERT INTO modules (course_code,name,credit) VALUES ?';

// connection.query(dataentry, [data], (e, result) => {
//     if (e) console.log(e);
//     if (result) console.log(result);
// });

var dataentry2 = 'SELECT * FROM modules';

connection.query(dataentry2, (e, result) => {
    if (e) console.log(e);
    if (result) console.log(result);
})


connection.end(e => {
    if (e) console.log(e);
})