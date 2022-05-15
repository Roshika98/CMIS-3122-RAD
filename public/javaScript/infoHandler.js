

const submit = document.getElementById('searchQ');
const dept = document.getElementById('deptSelect');
const lvl = document.getElementById('lvlSelect');
const dynamic = document.getElementById('moduleContent');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dept.value === 'Choose...' && lvl.value === 'Choose...') {
        nothingSelected();
        return;
    }
    var params = new URLSearchParams([['department', `${dept.value}`], ['level', `${lvl.value}`]]);
    var response = await axios.get('https://localhost:3000/courses/modules', { params });
    addContent(response.data);
    console.log('content displayed');
});

function addContent(content) {
    dynamic.innerHTML = content;
}


function nothingSelected() {
    dynamic.innerHTML = '<h6>Nothing Selected</h6>';
}


nothingSelected();


