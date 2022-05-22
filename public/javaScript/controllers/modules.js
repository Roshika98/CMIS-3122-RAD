console.log('I am modules');

const dynamicContent = document.getElementById('dynamicContent');
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
        var response = await axios.get('https://localhost:3000/courses/admin/modules', { params });
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
    const params = JSON.stringify(data);
    const response = await axios.post('https://localhost:3000/courses/admin/modules', params,
        { headers: { 'Content-Type': 'application/json' } });
    console.log(response.data);
    window.location = 'https://localhost:3000/courses/admin/modules';
});



function setupBtns() {
    deleteBtns = document.getElementsByClassName('deleteBtns');
    editBtns = document.getElementsByClassName('editBtns');
    for (let i = 0; i < deleteBtns.length; i++) {
        const element = deleteBtns[i];
        element.addEventListener('click', async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const response = await axios.delete(`https://localhost:3000/courses/admin/modules/${element.getAttribute('data-id')}`);
            console.log(response.data[0]);
            submitBtn.click();
        })
    }
}



/**
 * used set the dynamic content of the webpage
 * @param  {} content html content sent by the server
 */
function addContent(content) {
    dynamicContent.innerHTML = content;
}
