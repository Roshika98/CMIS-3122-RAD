console.log('I am modules');

const dynamicContent = document.getElementById('dynamicContent');
const submitBtn = document.getElementById('submitbtn');
const deptSelect = document.getElementById('deptSelect');
const lvlSelect = document.getElementById('lvlSelect');

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

function addContent(content) {
    dynamicContent.innerHTML = content;
}
