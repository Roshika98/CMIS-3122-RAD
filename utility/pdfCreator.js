const ejs = require('ejs');
const path = require('path');


async function createPDF(level, data) {
    const pdfTemplate = await ejs.renderFile(path.join(__dirname, 'normal.ejs'), { data }, { beautify: true, async: true });
    return pdfTemplate;
}

module.exports = createPDF;