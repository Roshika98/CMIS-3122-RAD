const res = require('express/lib/response');
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

    static async processSelection(data) {
        if (data.level == 1 || data.level == 2) {
            var result = await this.#normalSelect(data.level, data.selection);
            return result;
        }
        else {
            if (data.type == 1) {
                var result = await this.#generalSelect(data.level, data.selection);

                return result;
            } else if (data.type == 2) {
                var result = await this.#jmSelect(data.level, data.selection);
                return result;
            } else {
                var result = await this.#specialSelect(data.level, data.selection);
                return result;
            }
        }
    }

    static async #normalSelect(level, selection) {
        var dep1 = null;
        var dep2 = null;
        var dep3 = null;

        if (selection == 1) {
            dep1 = await this.#normalHelper(level, 1);
            dep2 = await this.#normalHelper(level, 2);
        } else if (selection == 2) {
            dep1 = await this.#normalHelper(level, 2);
            dep2 = await this.#normalHelper(level, 4);
        } else {
            dep1 = await this.#normalHelper(level, 1);
            dep2 = await this.#normalHelper(level, 4);
        }
        dep3 = await this.#normalHelper(level, 3);
        return { semester1: [[dep1[0], dep1[1]], [dep2[0], dep2[1]], [dep3[0], dep3[1]]], semester2: [[dep1[0], dep1[2]], [dep2[0], dep2[2]], [dep3[0], dep3[2]]] };
    }

    static async #generalSelect(level, selection) {
        var dep1 = null;
        var dep2 = null;
        var dep3 = null;
        if (selection == '1A') {
            dep1 = await this.#generalHelperforMathsDept(level, 3, 3);
            dep2 = await this.#generalHelper(level, 1);
            dep3 = await this.#generalHelper(level, 2);
        } else if (selection == '1B') {
            dep1 = await this.#generalHelperforMathsDept(level, 2, 3);
            dep2 = await this.#generalHelper(level, 1);
            dep3 = await this.#generalHelper(level, 2);
        } else if (selection == '1C') {
            dep1 = await this.#generalHelper(level, 3);
            dep2 = await this.#generalHelper(level, 1);
            return { semester1: [[dep1[0], dep1[1]], [dep2[0], dep2[1]]], semester2: [[dep1[0], dep1[2]], [dep2[0], dep2[2]]] };
        } else if (selection == '2A') {
            dep1 = await this.#generalHelperforMathsDept(level, 3, 3);
            dep2 = await this.#generalHelper(level, 2);
            dep3 = await this.#generalHelper(level, 4);
        } else if (selection == '2B') {
            dep1 = await this.#generalHelperforMathsDept(level, 2, 3);
            dep2 = await this.#generalHelper(level, 2);
            dep3 = await this.#generalHelper(level, 4);
        } else if (selection == '2C') {
            dep1 = await this.#generalHelper(level, 3);
            dep2 = await this.#generalHelper(level, 2);
            return { semester1: [[dep1[0], dep1[1]], [dep2[0], dep2[1]]], semester2: [[dep1[0], dep1[2]], [dep2[0], dep2[2]]] };
        } else if (selection == '3A') {
            dep1 = await this.#generalHelperforMathsDept(level, 3, 3);
            dep2 = await this.#generalHelper(level, 4);
            dep3 = await this.#generalHelper(level, 1);
        } else if (selection == '3B') {
            dep1 = await this.#generalHelperforMathsDept(level, 2, 3);
            dep2 = await this.#generalHelper(level, 4);
            dep3 = await this.#generalHelper(level, 1);
        } else {
            dep1 = await this.#generalHelper(level, 3);
            dep2 = await this.#generalHelper(level, 4);
            return { semester1: [[dep1[0], dep1[1]], [dep2[0], dep2[1]]], semester2: [[dep1[0], dep1[2]], [dep2[0], dep2[2]]] };
        }
        return { semester1: [[dep1[0], dep1[1]], [dep2[0], dep2[1]], [dep3[0], dep3[1]]], semester2: [[dep1[0], dep1[2]], [dep2[0], dep2[2]], [dep3[0], dep3[2]]] };
    }

    static async #jmSelect(level, selection) {
        var dep1 = null;
        var dep2 = null;
        if (selection == '1A') {
            dep1 = await this.#jmHelper(level, 1, 1);
            dep2 = await this.#jmHelper(level, 2, 2);
        } else if (selection == '1B') {
            dep1 = await this.#jmHelper(level, 1, 1);
            dep2 = await this.#jmHelper(level, 3, 2);
        } else if (selection == '1C') {
            dep1 = await this.#jmHelper(level, 1, 1);
            dep2 = await this.#jmHelper(level, 4, 2);
        } else if (selection == '2A') {
            dep1 = await this.#jmHelper(level, 2, 1);
            dep2 = await this.#jmHelper(level, 1, 2);
        } else if (Selection == '2B') {
            dep1 = await this.#jmHelper(level, 2, 1);
            dep2 = await this.#jmHelper(level, 3, 2);
        } else if (selection == '2C') {
            dep1 = await this.#jmHelper(level, 2, 1);
            dep2 = await this.#jmHelper(level, 4, 2);
        } else if (selection == '3A') {
            dep1 = await this.#jmHelper(level, 4, 1);
            dep2 = await this.#jmHelper(level, 2, 2);
        } else if (selection == '3B') {
            dep1 = await this.#jmHelper(level, 4, 1);
            dep2 = await this.#jmHelper(level, 3, 2);
        } else if (selection == '3C') {
            dep1 = await this.#jmHelper(level, 4, 1);
            dep2 = await this.#jmHelper(level, 1, 2);
        } else if (selection == '4A') {
            dep1 = await this.#jmHelper(level, 3, 1);
            dep2 = await this.#jmHelper(level, 1, 2);
        } else if (Selection == '4B') {
            dep1 = await this.#jmHelper(level, 3, 1);
            dep2 = await this.#jmHelper(level, 2, 2);
        } else {
            dep1 = await this.#jmHelper(level, 3, 1);
            dep2 = await this.#jmHelper(level, 4, 2);
        }
        return { semester1: [[dep1[0], dep1[1]], [dep2[0], dep2[1]]], semester2: [[dep1[0], dep1[2]], [dep2[0], dep2[2]]] };
    }

    static async #specialSelect(level, selection) {
        var dep = null;
        if (selection == 1) {
            dep = await this.#spHelper(level, 2);
        } else if (selection == 2) {
            dep = await this.#spHelper(level, 4)
        } else if (selection == 3) {
            dep = await this.#spHelper(level, 3)
        } else {
            dep = await this.#spHelper(level, 1)
        }
        return { semester1: [[dep[0], dep[1]]], semester2: [[dep[0], dep[2]]] };
    }

    static async #normalHelper(level, dept) {
        var q = 'SELECT deptName FROM departments WHERE deptID=?';
        var q2 = 'SELECT course_code,name,credit FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1';
        var q3 = 'SELECT course_code,name,credit FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2';
        return await this.#runQueries(q, q2, q3, level, dept);
    }

    static async #generalHelper(level, dept) {
        var q = 'SELECT deptName FROM departments WHERE deptID=?';
        var q2 = 'SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1 && general=true';
        var q3 = 'SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2 && general=true';
        return await this.#runQueries(q, q2, q3, level, dept);
    }

    static async #generalHelperforMathsDept(level, type, dept) {
        var q = 'SELECT deptName FROM departments WHERE deptID=?';
        var q2 = '';
        var q3 = '';
        if (type == 1) {
            q2 = 'SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1 && general=true';
            q3 = 'SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2 && general=true';
        } else if (type == 2) {
            q2 = `SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1 && general=true && modules.course_code LIKE ${'\'S%\''}`;
            q3 = `SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2 && general=true && modules.course_code LIKE ${'\'S%\''}`;
        } else {
            q2 = `SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1 && general=true && NOT (modules.course_code LIKE ${'\'S%\''})`;
            q3 = `SELECT course_code,name,credit,general_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2 && general=true && NOT (modules.course_code LIKE ${'\'S%\''})`;
        }
        return await this.#runQueries(q, q2, q3, level, dept);
    }

    static async #jmHelper(level, dept, majorType) {
        var q = 'SELECT deptName FROM departments WHERE deptID=?';
        var q2 = '';
        var q3 = '';
        if (majorType == 1) {
            q2 = 'SELECT course_code,name,credit,major1_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1 && major1=true';
            q3 = 'SELECT course_code,name,credit,major1_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2 && major1=true';
        } else {
            q2 = 'SELECT course_code,name,credit,major2_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1 && major2=true';
            q3 = 'SELECT course_code,name,credit,major2_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2 && major2=true';
        }
        return await this.#runQueries(q, q2, q3, level, dept);
    }

    static async #spHelper(level, dept) {
        var q = 'SELECT deptName FROM departments WHERE deptID=?';
        var q2 = 'SELECT course_code,name,credit,special_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=1 && special=true'
        var q3 = 'SELECT course_code,name,credit,special_mandatory AS mandatory FROM modules INNER JOIN departments ON departments.deptID=modules.deptID WHERE modules.level=? && departments.deptID=? && modules.semester=2 && special=true'
        return await this.#runQueries(q, q2, q3, level, dept);
    }

    static async #runQueries(q, q2, q3, level, dept) {
        var depName = await connection.general.promise().execute(q, [dept]);
        var sem1 = await connection.general.promise().execute(q2, [level, dept]);
        var sem2 = await connection.general.promise().execute(q3, [level, dept]);
        return [depName[0][0], sem1[0], sem2[0]];
    }
}

module.exports = DbHandler;