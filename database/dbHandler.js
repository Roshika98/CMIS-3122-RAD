const connection = require('./dbConnector');

class DbHandler {

    // connection = require('./dbConnector');

    static startConnection() {
        connection.admin.connect(e => {
            if (e) console.log(e);
            else console.log('connection aquired');
        });
    };


}

module.exports = DbHandler;