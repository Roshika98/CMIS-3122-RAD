console.log("I'm active");

// Variables-------------------------------------------------------

var currTab = 0;
var prevBtn = document.getElementById('previous');
var nextBtn = document.getElementById('next');
var submitBtn = document.getElementById('submit');


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
    var content = document.getElementsByClassName('tab');
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
    var content = document.getElementsByClassName('tab');
    content[currTab].style.display = 'none';
    currTab += n;

    ShowButtons(currTab);

    console.log(n);
}


function HideAll() {
    var content = document.getElementsByClassName('tab');
    for (var i = 0; i < content.length; i++) {
        content[i].style.display = 'none';
    }
}


