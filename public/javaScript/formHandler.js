
//! Variables-------------------------------------------------------

var currTab = 0;
var prevBtn = document.getElementById('previous');
var nextBtn = document.getElementById('next');
var submitBtn = document.getElementById('submit');
var levelSelector = document.getElementById('levelSelect');
var degreeSelector = document.getElementById('degreeType');

// * USED TO SHOW WHICH CONTENT SET TO DISPLAY ACCORDING TO LEVEL SELECTION

var set1 = document.getElementById('combSet1');
var set2 = document.getElementById('combSet2');

// * USED TO SHOW WHICH DEGREE SELECTION CONTAINER TO DISPLAY ACCORDING TO DEGREE SELECTION

var generalComb = document.getElementById('General');
var jointComb = document.getElementById('JM');
var specialComb = document.getElementById('special');

//* USED TO GET THE COMBINATION OF THE SELECTED DEGREE TYPE

var normalSelection = document.getElementById('combSelect');
var generalSelection = document.getElementById('generalComb');
var jmSelection = document.getElementById('jmComb');
var specialSelection = document.getElementById('spComb');

//* DIV ELEMENT TO HOLD DYNAMIC CONTENT

var dynamicHolder = document.getElementById('dynamicContent');


var content = document.getElementsByClassName('tab');
const degreetypes = [generalComb, jointComb, specialComb];

//! Events----------------------------------------------------

nextBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (currTab == 0) {
        var params = prepareSelectionQuery();
        var response = await axios.get('https://localhost:3000/courses/register', { params });
        addDynamicContent(response.data);
    }
    Showcontent(1);
});

prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    Showcontent(-1);
});


levelSelector.addEventListener('change', e => {
    ShowLevelContent(levelSelector.value);
});

degreeSelector.addEventListener('change', e => {
    ShowDegreeType(degreeSelector.value);
});


//! Function declarations & calls-------------------------------------

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


function ShowLevelContent(n) {
    if (n > 0 && n <= 2) {
        set1.style.display = '';
        set2.style.display = 'none';
    } else if (n <= 4) {
        set1.style.display = 'none';
        set2.style.display = '';
        ShowDegreeType(degreeSelector.value);
    } else {
        set1.style.display = 'none';
        set2.style.display = 'none';
    }
}

function ShowDegreeType(n) {
    for (var i = 0; i < degreetypes.length; i++) {
        if (i == (n - 1)) degreetypes[i].style.display = '';
        else degreetypes[i].style.display = 'none';
    }
}


function HideAll() {

    for (var i = 0; i < content.length; i++) {
        content[i].style.display = 'none';
    }
    set1.style.display = 'none';
    set2.style.display = 'none';
}


function prepareSelectionQuery() {
    if (levelSelector.value == 1 || levelSelector.value == 2) {
        var queryP = new URLSearchParams([['level', `${levelSelector.value}`], ['selection', `${normalSelection.value}`]]);
        return queryP;
    } else if (levelSelector.value == 3 || levelSelector.value == 4) {
        if (degreeSelector.value == 1) {
            var queryP = new URLSearchParams([['level', `${levelSelector.value}`], ['type', `${degreeSelector.value}`], ['selection', `${generalSelection.value}`]]);
            return queryP;
        } else if (degreeSelector.value == 2) {
            var queryP = new URLSearchParams([['level', `${levelSelector.value}`], ['type', `${degreeSelector.value}`], ['selection', `${jmSelection.value}`]]);
            return queryP;
        } else {
            var queryP = new URLSearchParams([['level', `${levelSelector.value}`], ['type', `${degreeSelector.value}`], ['selection', `${specialSelection.value}`]]);
            return queryP;
        }
    }
}

function addDynamicContent(dynamicContent) {
    dynamicHolder.innerHTML = dynamicContent;
    content = document.getElementsByClassName('tab');
    content[1].style.display = 'none';
    content[2].style.display = 'none';
}

