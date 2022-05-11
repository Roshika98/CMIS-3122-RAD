
// Variables-------------------------------------------------------

var currTab = 0;
var prevBtn = document.getElementById('previous');
var nextBtn = document.getElementById('next');
var submitBtn = document.getElementById('submit');
var generalComb = document.getElementById('General');
var jointComb = document.getElementById('JM');
var specialComb = document.getElementById('special');
const content = document.getElementsByClassName('tab');


// Button events----------------------------------------------------

nextBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    Showcontent(1);
});

prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    Showcontent(-1);
})


// Function declarations & calls-------------------------------------

HideAll();
ShowButtons(currTab);

function ShowButtons(n) {

    content[currTab].style.display = '';
    if (n == 0) {
        prevBtn.style.display = 'none';
        submitBtn.style.display = 'none';
        nextBtn.style.display = '';
    } else if (n == content.length - 1) {
        prevBtn.style.display = '';
        submitBtn.style.display = '';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = '';
        nextBtn.style.display = '';
        submitBtn.style.display = 'none';
    }

}

function Showcontent(n) {

    content[currTab].style.display = 'none';
    currTab += n;

    ShowButtons(currTab);

    console.log(n);
}


function HideAll() {

    for (var i = 0; i < content.length; i++) {
        content[i].style.display = 'none';
    }
}


