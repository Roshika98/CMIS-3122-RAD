const sql = require('mysql2/promise');
const container = require('./data/dataHolder');

var createDept = 'CREATE TABLE departments(deptID INT NOT NULL PRIMARY KEY,deptName VARCHAR(50) NOT NULL)';
var createModules = 'CREATE TABLE modules(course_code VARCHAR(10) NOT NULL PRIMARY KEY, name VARCHAR(100) NOT NULL,credit INT NOT NULL,level INT NOT NULL,semester INT NOT NULL,deptID INT NOT NULL,description TEXT,CONSTRAINT fk_dept FOREIGN KEY (deptID) REFERENCES departments(deptID) ON DELETE CASCADE ON UPDATE CASCADE)';
var createGeneral = 'CREATE TABLE general(course_code VARCHAR(10) NOT NULL,availability BOOLEAN NOT NULL,mandatory BOOLEAN NOT NULL,CONSTRAINT fk_gencourseCode FOREIGN KEY (course_code) REFERENCES modules(course_code) ON DELETE CASCADE ON UPDATE CASCADE)';
var createJM = 'CREATE TABLE jointMajor(course_code VARCHAR(10) NOT NULL,m1_availability BOOLEAN NOT NULL,m1_mandatory BOOLEAN NOT NULL,m2_availability BOOLEAN NOT NULL,m2_mandatory BOOLEAN NOT NULL,CONSTRAINT fk_jmcourseCode FOREIGN KEY (course_code) REFERENCES modules(course_code) ON DELETE CASCADE ON UPDATE CASCADE)';
var createSpecial = 'CREATE TABLE special(course_code VARCHAR(10) NOT NULL,availability BOOLEAN NOT NULL,mandatory BOOLEAN NOT NULL,CONSTRAINT fk_spcourseCode FOREIGN KEY (course_code) REFERENCES modules(course_code) ON DELETE CASCADE ON UPDATE CASCADE)';

var insertDept = 'INSERT INTO departments(deptID,deptName) VALUES (?,?)';
var insertModules = 'INSERT INTO modules(course_code,name,credit,level,semester,deptID,description) VALUES (?,?,?,?,?,?,?)';
var insertSpecial = 'INSERT INTO special(course_code,availability,mandatory) VALUES (?,?,?)';
var insertJM = 'INSERT INTO jointMajor(course_code,m1_availability,m1_mandatory,m2_availability,m2_mandatory) VALUES (?,?,?,?,?)';
var insertGeneral = 'INSERT INTO general(course_code,availability,mandatory) VALUES (?,?,?)';

var desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et scelerisque urna, sed placerat mi. Nunc ac erat finibus nibh dictum dictum. In sed ex nec arcu vestibulum commodo. Nullam ut velit nec sem ultricies imperdiet iaculis quis erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor pharetra tellus et rhoncus.';


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
        container.deptData.forEach(element => {
            execution(insertDept, connection, element);
        });
        console.log('Department data added...............');
        container.modulesData.forEach(element => {
            execution(insertModules, connection, [element[0], element[1], element[2], element[3], element[4], element[5], desc]);
            /*if (element[3] == 3) {
                execution(insertGeneral, connection, [element[0], element[12], element[13]]);
            } if (element[3] > 2) {
                execution(insertJM, connection, [element[0], element[8], element[9], element[10], element[11]]);
                execution(insertSpecial, connection, [element[0], element[6], element[7]]);
            }*/
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

async function runQueries() {
    try {
        var q = await createTables().then(x => {
            console.log('Tables Created................');
        });
        var q2 = await addData().then(x => {
            console.log('Data entered into modules table.................');
        });
    } catch (error) {
        console.log(error);
    }
}


runQueries();




