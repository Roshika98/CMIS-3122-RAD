const sql = require('mysql2/promise');
const container = require('./data/dataHolder');

var createDept = 'CREATE TABLE departments(deptID INT NOT NULL PRIMARY KEY,deptName VARCHAR(50) NOT NULL)';
var createModules = 'CREATE TABLE modules(course_code VARCHAR(10) NOT NULL PRIMARY KEY, name VARCHAR(50) NOT NULL,credit INT NOT NULL,level INT NOT NULL,semester INT NOT NULL,deptID NOT NULL,desc VARCHAR(255),CONSTRAINT fk_dept FOREIGN KEY deptID REFERENCES departments(deptID) ON DELETE CASCADE ON UPDATE CASCADE)';
var createGeneral = 'CREATE TABLE general(course_code VARCHAR(10) NOT NULL,availability BOOLEAN NOT NULL,mandatory BOOLEAN NOT NULL,CONSTRAINT fk_gencourseCode FOREIGN KEY course_code REFERENCES modules(course_code) ON DELETE CASCADE ON UPDATE CASCADE)';
var createJM = 'CREATE TABLE jointMajor(course_code VARCHAR(10) NOT NULL,m1_availability BOOLEAN NOT NULL,m1_mandatory BOOLEAN NOT NULL,m2_availabilty BOOLEAN NOT NULL,m2_mandatory BOOLEAN NOT NULL,CONSTRAINT fk_jmcourseCode FOREIGN KEY course_code REFERENCES modules(course_code) ON DELETE CASCADE ON UPDATE CASCADE)';
var createSpecial = 'CREATE TABLE special(course_code VARCHAR(10) NOT NULL,availabilty BOOLEAN NOT NULL,CONSTRAINT fk_spcourseCode FOREIGN KEY course_code REFERENCES modules(course_code) ON DELETE CASCADE ON UPDATE CASCADE)';

var insertDept = 'INSERT INTO departments(deptID,deptName) VALUES (?,?)';
var insertModules = 'INSERT INTO modules(course_code,name,credit,level,semester,deptID,desc) VALUES (?,?,?,?)';




async function createTables() {
    try {
        const connection = await sql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'fas'
        });
        var q1 = await connection.query(createDept);
        var q2 = await connection.query(createModules);
        var q3 = await connection.query(createGeneral);
        var q4 = await connection.query(createJM);
        var q5 = await connection.query(createSpecial);
        const ending = await connection.end();
        console.log('Tables created......');
    } catch (error) {
        console.log(error);
    }
}


async function addData() {
    try {
        const connection = await sql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'fas'
        });
        cmis.forEach(element => {
            execution(insertCMIS, connection, element);
        });
        connection.end();
    } catch (error) {
        console.log(error);
    }

}

async function execution(q, connection, values) {
    var result = await connection.execute(q, values);
    return result;
}

// addData();

// createTables();




