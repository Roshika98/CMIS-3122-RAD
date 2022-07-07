
const homeIndicator = document.getElementById('homepage');
homeIndicator.classList.add("active");


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
        // console.log(error);
    }
}


function getTimeofDay() {
    let now = new Date();
    let isMorning = now.getHours() > 5 && now.getHours() <= 12;
    let isAfternoon = now.getHours() > 12 && now.getHours() <= 18;
    let isEvening = now.getHours() > 18 && now.getHours() <= 22;
    let isNight = now.getHours() > 22 || now.getHours() <= 5;
    var greetingMsg = isMorning ? 'Good Morning ' : isAfternoon ? 'Good Afternoon ' : isEvening || isNight ? 'Good Evening' : 'Hello ';
    var tod = document.getElementById('tod');
    tod.innerText = greetingMsg;
}

notifySuccess();
getTimeofDay();


