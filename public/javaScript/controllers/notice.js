const homeIndicator = document.getElementById('noticepage');
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
        console.log(error);
    }
}

notifySuccess();


const deleteBtns = document.getElementsByClassName('deleteBtns');
for (let i = 0; i < deleteBtns.length; i++) {
    const element = deleteBtns[i];
    element.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const params = new URLSearchParams([['filename', `${element.getAttribute('data-id')}`]])
        const result = await axios.delete(`https://localhost:3000/courses/admin/notices`, { params });
        window.location = 'https://localhost:3000/courses/admin/notices';
    });
}