const modulePage = document.getElementById('modulespage');
modulePage.classList.add('active');


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

const mainContent = document.getElementById('mainDisplay');
const dynamicContent = document.getElementById('dynamicContent');
const editContent = document.getElementById('editContentDisplay');

const submitBtn = document.getElementById('submitbtn');
const deptSelect = document.getElementById('deptSelect');
const lvlSelect = document.getElementById('lvlSelect');

const n_Code = document.getElementById('m_code');
const n_Name = document.getElementById('m_name');
const n_Credit = document.getElementById('m_credit');
const n_Dept = document.getElementById('m_dept');
const n_Level = document.getElementById('m_level');
const n_Sem = document.getElementById('m_semester');
const n_Desc = document.getElementById('m_desc');
const n_Gen_Available = document.getElementById('m_general_available');
const n_Gen_Mandatory = document.getElementById('m_general_mandatory');
const n_M1_Available = document.getElementById('m_m1_available');
const n_M1_Mandatory = document.getElementById('m_m1_mandatory');
const n_M2_Available = document.getElementById('m_m2_available');
const n_M2_Mandatory = document.getElementById('m_m2_mandatory');
const n_Sp_Available = document.getElementById('m_special_available');
const n_Sp_Mandatory = document.getElementById('m_special_mandatory');
const n_submit = document.getElementById('m_submit');
const n_clear = document.getElementById('m_clear');


const mainpageContent = document.getElementById('main-content');
const errorContent = document.getElementById('error-content');


var u_Code = null;
var u_Name = null;
var u_Credit = null;
var u_Dept = null;
var u_Level = null;
var u_Sem = null;
var u_Desc = null;
var u_Gen_Available = null;
var u_Gen_Mandatory = null;
var u_M1_Available = null;
var u_M1_Mandatory = null;
var u_M2_Available = null;
var u_M2_Mandatory = null;
var u_Sp_Available = null;
var u_Sp_Mandatory = null;




var backBtn = null;
var updateBtn = null;


var deleteBtns = null;
var editBtns = null;

submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (deptSelect.value == 'Select Department' || lvlSelect.value == 'Select Level of study') {
        var opt = {
            from: 'top',
            align: 'center',
            colorTheme: 'warning',
            message: 'please select both department & level',
            timer: 800,
            icon: 'now-ui-icons travel_info'
        };
        nowuiDashboard.showNotification(opt);
        return;
    }
    var params = new URLSearchParams([['department', `${deptSelect.value}`], ['level', `${lvlSelect.value}`]]);
    try {
        var response = await axios.get('https://localhost:3000/courses/admin/modules', {
            params, headers: {
                'request-type': 'axios'
            }
        });
        addContent(response.data);
        var opt = {
            from: 'top',
            align: 'center',
            colorTheme: 'info',
            message: 'modules view updated',
            timer: 800,
            icon: 'now-ui-icons ui-1_bell-53'
        };
        nowuiDashboard.showNotification(opt);
        setupBtns();
    } catch (error) {
        if (error.message == 'axios is not defined') {
            var opt = {
                from: 'top',
                align: 'center',
                colorTheme: 'danger',
                message: 'Something Went Wrong :( , please check your connection',
                timer: 800,
                icon: 'now-ui-icons travel_info'
            };
            nowuiDashboard.showNotification(opt);
        } else {
            showErrorContent(error.response.data);
        }
    }

});


n_submit.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const data = {
        code: n_Code.value,
        name: n_Name.value,
        credit: n_Credit.value,
        level: n_Level.value,
        semester: n_Sem.value,
        department: n_Dept.value,
        description: n_Desc.value,
        general_available: n_Gen_Available.checked,
        general_mandatory: n_Gen_Mandatory.checked,
        m1_available: n_M1_Available.checked,
        m1_mandatory: n_M1_Mandatory.checked,
        m2_available: n_M2_Available.checked,
        m2_mandatory: n_M2_Mandatory.checked,
        special_available: n_Sp_Available.checked,
        special_mandatory: n_Sp_Mandatory.checked
    }
    try {
        const params = JSON.stringify(data);
        const response = await axios.post('https://localhost:3000/courses/admin/modules', params,
            { headers: { 'Content-Type': 'application/json', 'request-type': 'axios' } });
        console.log(response.data);
        window.location = 'https://localhost:3000/courses/admin/modules';
    } catch (error) {
        showErrorContent(error.response.data);
    }
});



function setupBtns() {
    deleteBtns = document.getElementsByClassName('deleteBtns');
    editBtns = document.getElementsByClassName('editBtns');
    for (let i = 0; i < deleteBtns.length; i++) {
        const element = deleteBtns[i];
        element.addEventListener('click', async (event) => {
            event.preventDefault();
            event.stopPropagation();
            try {
                const response = await axios.delete(`https://localhost:3000/courses/admin/modules/${element.getAttribute('data-id')}`, {
                    headers: {
                        'request-type': 'axios'
                    }
                });
                console.log(response.data[0]);
                submitBtn.click();
            } catch (error) {
                showErrorContent(error.response.data);
            }
        })
    }

    for (let i = 0; i < editBtns.length; i++) {
        const element = editBtns[i];
        element.addEventListener('click', async (event) => {
            event.preventDefault();
            event.stopPropagation();
            try {
                const response = await axios.get(`https://localhost:3000/courses/admin/modules/${element.getAttribute('data-id')}`, {
                    headers: {
                        'request-type': 'axios'
                    }
                });
                setUpEditEnvironment(response.data);
            } catch (error) {
                showErrorContent(error.response.data);
            }
        });
    }
}


function setUpEditEnvironment(content) {
    editContent.innerHTML = content;
    mainContent.style.display = 'none';
    editContent.style.display = '';
    backBtn = document.getElementById('back');
    updateBtn = document.getElementById('update');
    setupEditVariables();
    backBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        resetEditEnvironment();
    });
    updateBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await performUpdate();
        resetEditEnvironment();
        submitBtn.click();
    });
}

function setupEditVariables() {

    u_Code = document.getElementById('u_code');
    u_Name = document.getElementById('u_name');
    u_Credit = document.getElementById('u_credit');
    u_Level = document.getElementById('u_level');
    u_Sem = document.getElementById('u_semester');
    u_Dept = document.getElementById('u_dept');
    u_Desc = document.getElementById('u_desc');
    u_Gen_Available = document.getElementById('u_general_available');
    u_Gen_Mandatory = document.getElementById('u_general_mandatory');
    u_M1_Available = document.getElementById('u_m1_available');
    u_M1_Mandatory = document.getElementById('u_m1_mandatory');
    u_M2_Available = document.getElementById('u_m2_available');
    u_M2_Mandatory = document.getElementById('u_m2_mandatory');
    u_Sp_Available = document.getElementById('u_special_available');
    u_Sp_Mandatory = document.getElementById('u_special_mandatory');

}

async function performUpdate() {
    const data = {
        code: u_Code.value,
        name: u_Name.value,
        credit: u_Credit.value,
        level: u_Level.value,
        semester: u_Sem.value,
        department: u_Dept.value,
        description: u_Desc.value,
        general_available: u_Gen_Available.checked,
        general_mandatory: u_Gen_Mandatory.checked,
        m1_available: u_M1_Available.checked,
        m1_mandatory: u_M1_Mandatory.checked,
        m2_available: u_M2_Available.checked,
        m2_mandatory: u_M2_Mandatory.checked,
        special_available: u_Sp_Available.checked,
        special_mandatory: u_Sp_Mandatory.checked
    }
    try {
        const params = JSON.stringify(data);
        const response = await axios.put('https://localhost:3000/courses/admin/modules', params,
            { headers: { 'Content-Type': 'application/json', 'request-type': 'axios' } });
        console.log(response.data);
    } catch (error) {
        showErrorContent(error.response.data);
    }
}


function resetEditEnvironment() {
    editContent.innerHTML = '';
    editContent.style.display = 'none';
    mainContent.style.display = '';
}


/**
 * used set the dynamic content of the webpage
 * @param  {} content html content sent by the server
 */
function addContent(content) {
    dynamicContent.innerHTML = content;

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

