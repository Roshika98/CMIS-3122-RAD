console.log('I am departments');

const deleteBtns = document.getElementsByClassName('deleteBtns');

const mainContent = document.getElementById('mainContent');
const subContent = document.getElementById('subContent');
const newDept = document.getElementById('newDept');
const backBtn = document.getElementById('back');

subContent.style.display = 'none';

for (let i = 0; i < deleteBtns.length; i++) {
    const element = deleteBtns[i];
    element.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const result = await axios.delete(`https://localhost:3000/courses/admin/departments/${element.getAttribute('data-id')}`);
        window.location = 'https://localhost:3000/courses/admin/departments';
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
})