const { v4: uuidv4 } = require('uuid');
const mysql2 = require('mysql2/promise');
const bcrypt = require('bcrypt');


const dbOpt = {
    host: 'localhost',
    user: 'root',
    database: 'fas'
};



async function addNewUser(username, password) {
    const connection = await mysql2.createConnection(dbOpt);
    const id = uuidv4();
    const hash = await bcrypt.hash(password, 12);
    const query = 'INSERT INTO admin (id,username,password) VALUES (?,?,?)';
    const response = await connection.execute(query, [id, username, hash]);
    console.log(response);
    connection.end();
};

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
}

const deserializeUser = function deserializeUserSession(req) {
    req.session.destroy();
}

module.exports = { login: userLogin, serializeUser: serializeUser };

// logginUser('redcap98', 'Hello');

// addNewUser('redcap98', 'Hello');