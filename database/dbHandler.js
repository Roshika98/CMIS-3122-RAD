const connection = require('./dbConnector');

class DbHandler {


    static async getmodulesDetails(dept, lvl) {
        var q = 'SELECT course_code,name,credit,semester,description FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE departments.deptID=? && modules.level=?';
        var data = null;
        try {
            data = await connection.general.promise().execute(q, [dept, lvl]);
        } catch (error) {
            console.log(error);
        }
        return data[0];
    }

    static async getDepartmentDetails(id) {
        var q = 'SELECT deptName FROM departments WHERE deptID=?';
        var data = null;
        try {
            data = await connection.general.promise().execute(q, [id]);
        } catch (error) {
            console.log(error);
        }
        return data[0];
    }
}

module.exports = DbHandler;