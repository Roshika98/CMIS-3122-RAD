const userPage = document.getElementById('accountspage');
userPage.classList.add('active');


const mainpageContent = document.getElementById('main-content');
const errorContent = document.getElementById('error-content');

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

function hideErrorContent() {
    errorContent.style.display = 'none';
}

function showErrorContent(data) {
    mainpageContent.style.display = 'none';
    errorContent.innerHTML = data;
    errorContent.style.display = '';
}

hideErrorContent();

notifySuccess();

