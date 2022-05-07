const connection = require('./dbConnector');

class DbHandler {

    // connection = require('./dbConnector');
    static async getmodules() {
        var q = 'SELECT * FROM modules';
        var data = null;
        try {
            data = await connection.general.promise().query(q);
        } catch (error) {
            console.log(error);
        }
        return data[0];
    }

}

module.exports = DbHandler;