const { v4: uuidv4 } = require('uuid');
const mysql2 = require('mysql2/promise');
const bcrypt = require('bcrypt');


const dbOpt = {
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME
};



async function addNewUser(username, password) {
    console.log(process.env.DATABASE_NAME);
    console.log(dbOpt);
    var connection = null;
    if (dbOpt.host) {
        connection = await mysql2.createConnection(dbOpt);
    } else {
        connection = await mysql2.createConnection({
            host: process.env.DATABASE_URL,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME
        })
    }
    const id = uuidv4();
    const hash = await bcrypt.hash(password, 12);
    const query = 'INSERT INTO admin (id,username,password) VALUES (?,?,?)';
    const response = await connection.execute(query, [id, username, hash]);
    connection.end();
};


/**
 * Used to login a user to their account
 * @param  {String} username username of the user account
 * @param  {String} password password for the user account
 */
const userLogin = async function logginUser(username, password) {
    const connection = await mysql2.createConnection(dbOpt);
    var query = 'SELECT id,username,password FROM admin WHERE username=?';
    const result = await connection.execute(query, [username]);
    if (result[0].length == 0) {
        await connection.end();
        return { isValid: false };
    } else {
        const validPassword = await bcrypt.compare(password, result[0][0].password);
        if (validPassword) {
            await connection.end();
            return { isValid: true, id: result[0][0].id };
        } else {
            await connection.end();
            return { isValid: false };
        }
    }
}

const serializeUser = function serializeUserSession(req, userID) {
    req.session.user_id = userID;
    req.session.timer = Date.now();
    req.session.signed_in = true;
}

const deserializeUser = function deserializeUserSession(req) {
    req.session.destroy();
}

module.exports = { login: userLogin, serializeUser: serializeUser, deserializeUser: deserializeUser, createNewUser: addNewUser };

