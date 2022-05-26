const ejs = require('ejs');
const path = require('path');


async function createPDF(level, data) {
    if (level <= 2) {
        const pdfTemplate = await ejs.renderFile(path.join(__dirname, '/forms/level.ejs'), { data }, { beautify: true, async: true });
        return pdfTemplate;
    } else if (level == 3) {
        if (data.personal.degreeDetails.degreeType == 1) {
            const pdfTemplate = await ejs.renderFile(path.join(__dirname, '/forms/general.ejs'), { data }, { beautify: true, async: true });
            return pdfTemplate;
        } else if (data.personal.degreeDetails.degreeType == 2) {
            const pdfTemplate = await ejs.renderFile(path.join(__dirname, '/forms/jointMajor.ejs'), { data }, { beautify: true, async: true });
            return pdfTemplate;
        } else {
            const pdfTemplate = await ejs.renderFile(path.join(__dirname, '/forms/'), { data }, { beautify: true, async: true });
            return pdfTemplate;
        }
    } else {
        if (data.personal.degreeDetails.degreeType == 2) {
            const pdfTemplate = await ejs.renderFile(path.join(__dirname, '/forms/jointMajor.ejs'), { data }, { beautify: true, async: true });
            return pdfTemplate;
        } else {
            const pdfTemplate = await ejs.renderFile(path.join(__dirname, '/forms/'), { data }, { beautify: true, async: true });
            return pdfTemplate;
        }
    }
}

module.exports = createPDF;