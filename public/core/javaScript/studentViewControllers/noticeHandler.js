// pdfjsLib.getDocument("https://res.cloudinary.com/fasstore/image/upload/v1656751293/notices/zyczk8qczdoxj8qftqqf.pdf").then(pdf => {
//     pdf.getPage(1).then(page => {
//         var canvas = document.getElementById("pdf");
//         var ctx = canvas.getContext("2d");
//         var viewport = page.getViewport(1);

//         canvas.width = viewport.width;
//         canvas.height = viewport.height;
//         page.render({
//             canvasContext: ctx,
//             viewport: viewport
//         });
//     });
// });

var heightratio = 1.5;
const loadPDF = async function (url) {
    const pdf = await pdfjsLib.getDocument(url);
    if (pdf) {
        console.log('pdf avaialble');
        console.dir(pdf);
        const pageContent = await pdf.getPage(1);
        if (pageContent) {
            var canvas = document.getElementById("pdf");
            var ctx = canvas.getContext('2d');
            var viewport = pageContent.getViewport(2);

            canvas.width = viewport.width;
            canvas.height = viewport.height;
            pageContent.render({
                canvasContext: ctx,
                viewport: viewport
            });
        }
    }
}

loadPDF("https://res.cloudinary.com/fasstore/image/upload/v1656751293/notices/zyczk8qczdoxj8qftqqf.pdf");

// var currentPageIndex = 0;
// var pdfInstance = null;
// var totalPagesCount = 0;

// const loadPdf = async function (pdfURL) {
//     // pdfjsLib.getDocument(pdfURL).then(function (pdf) {
//     //     pdfInstance = pdf;
//     //     totalPagesCount = pdf.numPages;
//     //     initPager();
//     //     render();
//     // });
//     const pdf = await pdfjsLib.getDocument(pdfURL);
//     if (pdf) {
//         console.log('pdf available');
//         pdfInstance = pdf;
//         totalPagesCount = pdf.numPages;
//         // initPager();
//         render();
//     }
// }

// var viewport = document.querySelector('#viewport')

// function render() {
//     pdfInstance.getPage(currentPageIndex + 1).then((page) => {
//         viewport.innerHTML = `<div><canvas></canvas></div>`
//         renderPage(page);
//     });
// }


// function renderPage(page) {
//     var pdfViewport = page.getViewport(1);

//     var container = viewport.children[0];

//     // Render at the page size scale.
//     pdfViewport = page.getViewport(container.offsetWidth / pdfViewport.width);
//     var canvas = container.children[0];
//     var context = canvas.getContext('2d');
//     canvas.height = pdfViewport.height;
//     canvas.width = pdfViewport.width;

//     page.render({
//         canvasContext: context,
//         viewport: pdfViewport,
//     });
// }


// loadPdf('https://res.cloudinary.com/fasstore/image/upload/v1656751293/notices/zyczk8qczdoxj8qftqqf.pdf');