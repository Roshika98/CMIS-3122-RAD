const sql = require('mysql2/promise');


// connection.connect(e => {
//     if (e) console.log(e);
//     else {
//         console.log("connection acquired");
//     }
// });


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

async function selectAll() {
    try {
        const connection = await sql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'fas'
        });
        const data = await connection.query(dataentry2);
        console.log(data[0]);
        const ender = await connection.end();
    } catch (error) {
        console.log(error);
    }
}

selectAll();


