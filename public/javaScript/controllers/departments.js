const deptPage = document.getElementById('departmentspage');
deptPage.classList.add('active');


function notifySuccess() {
    try {
        var succes = document.getElementById('message').getAttribute('data-msg');
        var opt = {
            from: 'top',
            align: 'center',
            colorTheme: 'success',
            message: succes,
            timer: 800,
            icon: 'fa fa-check'
        };
        nowuiDashboard.showNotification(opt);
    } catch (error) {
        console.log(error);
    }
}

notifySuccess();

const deleteBtns = document.getElementsByClassName('deleteBtns');
const updateBtnArray = document.getElementsByClassName('editBtns');

const mainContent = document.getElementById('mainContent');
const subContent = document.getElementById('subContent');
const newDept = document.getElementById('newDept');
const backBtn = document.getElementById('back');
const addDeptBtn = document.getElementById('addDept');
const deptID = document.getElementById('deptID');
const deptName = document.getElementById('deptName');
const subContentUpdate = document.getElementById('subContent-EditDept');

var updatBackBtn = null;
var updateBtn = null;
var updateDeptID = null;
var updateDeptName = null;

const mainpageContent = document.getElementById('main-content');
const errorContent = document.getElementById('error-content');


subContent.style.display = 'none';
subContentUpdate.style.display = 'none';

for (let i = 0; i < deleteBtns.length; i++) {
    const element = deleteBtns[i];
    element.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const result = await axios.delete(`https://localhost:3000/courses/admin/departments/${element.getAttribute('data-id')}`, {
                headers: {
                    'request-type': 'axios'
                }
            });
            window.location = 'https://localhost:3000/courses/admin/departments';
        } catch (error) {
            showErrorContent(error.response.data);
        }
    });
}

for (let i = 0; i < updateBtnArray.length; i++) {
    const element = updateBtnArray[i];
    element.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const result = await axios.get(`https://localhost:3000/courses/admin/departments/${element.getAttribute('data-id')}`, {
                headers: {
                    'request-type': 'axios'
                }
            });
            setupEditContent(result.data);
        } catch (error) {
            showErrorContent(error.response.data);
        }
    });
}


newDept.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    mainContent.style.display = 'none';
    subContent.style.display = '';
});

backBtn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    subContent.style.display = 'none';
    mainContent.style.display = '';
});

addDeptBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        var data = { id: deptID.value, name: deptName.value };
        const response = await axios.post('https://localhost:3000/courses/admin/departments', JSON.stringify(data),
            { headers: { 'Content-Type': 'application/json', 'request-type': 'axios' } });
        window.location = 'https://localhost:3000/courses/admin/departments';
    } catch (error) {
        showErrorContent(error.response.data);
    }
});


function setupEditContent(data) {
    subContentUpdate.innerHTML = data;
    updatBackBtn = document.getElementById('updateback');
    updateBtn = document.getElementById('updateDept');
    updateDeptID = document.getElementById('editdeptID');
    updateDeptName = document.getElementById('editdeptName');

    mainContent.style.display = 'none';
    subContentUpdate.style.display = '';

    updatBackBtn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        subContentUpdate.style.display = 'none';
        mainContent.style.display = '';
    })

    updateBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            var data = { deptID: updateDeptID.value, deptName: updateDeptName.value };
            const response = await axios.put('https://localhost:3000/courses/admin/departments', JSON.stringify(data),
                { headers: { 'Content-Type': 'application/json', 'request-type': 'axios' } });
            window.location = 'https://localhost:3000/courses/admin/departments';
        } catch (error) {
            showErrorContent(error.response.data);
        }
    });

}

function hideErrorContent() {
    errorContent.style.display = 'none';
}

function showErrorContent(data) {
    mainpageContent.style.display = 'none';
    errorContent.innerHTML = data;
    errorContent.style.display = '';
}

hideErrorContent();