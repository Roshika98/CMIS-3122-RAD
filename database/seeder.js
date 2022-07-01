const sql = require('mysql2/promise');
const container = require('./data/dataHolder');

var createDept = 'CREATE TABLE departments(deptID INT NOT NULL PRIMARY KEY,deptName VARCHAR(50) NOT NULL)';
var createModules = 'CREATE TABLE modules(course_code VARCHAR(10) NOT NULL PRIMARY KEY, name VARCHAR(100) NOT NULL,credit INT NOT NULL,level INT NOT NULL,semester INT NOT NULL,deptID INT NOT NULL,special BOOLEAN NOT NULL,special_mandatory BOOLEAN NOT NULL,major1 BOOLEAN NOT NULL,major1_mandatory BOOLEAN NOT NULL,major2 BOOLEAN NOT NULL,major2_mandatory BOOLEAN NOT NULL,general BOOLEAN NOT NULL,general_mandatory BOOLEAN NOT NULL,description TEXT,CONSTRAINT fk_dept FOREIGN KEY (deptID) REFERENCES departments(deptID) ON DELETE CASCADE ON UPDATE CASCADE)';
var createAdmin = 'CREATE TABLE admin(id VARCHAR(40) NOT NULL PRIMARY KEY,username VARCHAR(20) NOT NULL,password VARCHAR(200),email VARCHAR(50),firstName VARCHAR(20),lastName VARCHAR(20))';
var createNotices = 'CREATE TABLE notices(id VARCHAR(40) NOT NULL PRIMARY KEY,heading VARCHAR(255) NOT NULL,url VARCHAR(255) NOT NULL,noticeDate DATE,filename VARCHAR(100))';

var insertDept = 'INSERT INTO departments(deptID,deptName) VALUES (?,?)';
var insertModules = 'INSERT INTO modules(course_code,name,credit,level,semester,deptID,special,special_mandatory,major1,major1_mandatory,major2,major2_mandatory,general,general_mandatory,description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';


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
        var q3 = await connection.query(createAdmin);
        var q4 = await connection.query(createNotices);
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
            execution(insertModules, connection, [element[0], element[1], element[2], element[3], element[4], element[5], element[6], element[7], element[8], element[9], element[10], element[11], element[12], element[13], desc]);
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




