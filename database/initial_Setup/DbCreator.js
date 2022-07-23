const db = require('mysql2/promise');

var q = 'CREATE DATABASE studentRegistration';

var connection = null;

async function establishConnection() {
    try {
        connection = await db.createConnection({
            host: 'localhost',
            user: 'root'
        });
        if (connection) console.log('çonnection acquired............');
    } catch (error) {
        console.log(error);
    }
}


async function Create() {
    try {
        const result = await connection.query(q);
        if (result) console.log('student Registration Database created...............');
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
}


async function dropDatabase() {
    try {
        const result = await connection.query('DROP DATABASE IF EXISTS studentRegistration');
        if (result) console.log('Removed Database................');
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
}


//! Run this to create a database


establishConnection().then(e => {
    Create();
    connection.end();
});


// ! Run this to Remove the Database


//  establishConnection().then(e => {
//      dropDatabase();
//      connection.end();
//  });
