

const submit = document.getElementById('searchQ');
const dept = document.getElementById('deptSelect');
const lvl = document.getElementById('lvlSelect');
const dynamic = document.getElementById('moduleContent');
const mainpageContent = document.getElementById('main-content');
const errorContent = document.getElementById('error-content');
const defaultContent = document.getElementById('nothing-selected');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dept.value === 'Choose...' && lvl.value === 'Choose...') {
        nothingSelected();
        return;
    }
    var params = new URLSearchParams([['department', `${dept.value}`], ['level', `${lvl.value}`]]);
    try {
        var response = await axios.get('https://localhost:3000/courses/modules', {
            params,
            headers: {
                'request-type': 'axios'
            }
        });
        addContent(response.data);
        console.log('content displayed');
    } catch (error) {
        showError(error.response.data);
    }
});

function addContent(content) {
    dynamic.innerHTML = content;
    dynamic.style.display = '';
    defaultContent.style.display = 'none';
}


function nothingSelected() {
    // dynamic.innerHTML = '<h6>Nothing Selected</h6>';
    defaultContent.style.display = '';
    dynamic.style.display = 'none';
}


function showError(data) {
    mainpageContent.style.display = 'none';
    errorContent.innerHTML = data;
    errorContent.style.display = '';
}

function hideErrorContent() {
    errorContent.style.display = 'none';
}


hideErrorContent();
nothingSelected();


