
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

//* ERROR HANDLERS-----------

const mainpageContent = document.getElementById('main-content');
const errorContent = document.getElementById('error-content');


//* REQUEST HELPERS-----------------------------------------

var sem1Mandatory = [];
var sem1Optional = [];
var sem2Mandatory = [];
var sem2Optional = [];

var fName = document.getElementById('fullname');
var regNo = document.getElementById('registrationNo');
var contact = document.getElementById('contact');
var imageFile = document.getElementById('imageInput');
var acYear = document.getElementById('acyear');

//! Events----------------------------------------------------

nextBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        if (currTab == 0) {
            var params = prepareSelectionQuery();
            var response = await axios.get('https://localhost:3000/courses/register', {
                params,
                headers: {
                    'request-type': 'axios'
                }
            });
            addDynamicContent(response.data);
        }
        Showcontent(1);
    } catch (error) {
        showError(error.response.data);
    }
});


submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        var body = JSON.stringify(prepareReqBody());
        var response = await axios.post('https://localhost:3000/courses/register', body,
            { headers: { 'Content-Type': 'application/json', 'request-type': 'axios' } });
        var data = response.data;
        console.log(data);
        window.location = 'https://localhost:3000/courses/downloads';
    } catch (error) {
        showError(error.response.data);
    }
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
        if (n == 4) degreeSelector.querySelectorAll('option')[1].style.display = 'none';
        else degreeSelector.querySelectorAll('option')[1].style.display = '';
        degreeSelector.value = 'choose Degree Type';
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
    fillUpMandatory();
}


function fillUpMandatory() {
    if (sem1Mandatory.length > 0 && sem2Mandatory.length > 0) {
        sem1Mandatory = [];
        sem2Mandatory = [];
    }
    var semesters = document.getElementsByClassName('sem');
    for (var i = 0; i < semesters.length; i++) {
        var mandatoryContent = semesters[i].querySelectorAll('.mandatory');
        for (var j = 0; j < mandatoryContent.length; j++) {
            var listItems = mandatoryContent[j].querySelectorAll('ul li');
            for (var k = 0; k < listItems.length; k++) {
                var code = listItems[k].getAttribute('data-code');
                var name = listItems[k].getAttribute('data-name');
                var credit = listItems[k].getAttribute('data-credit');
                var data = { code: code, name: name, credit: credit };
                if (i == 0) sem1Mandatory.push(data);
                else sem2Mandatory.push(data);
            }
        }
    }
    console.log(sem1Mandatory);
    console.log(sem2Mandatory);
}


function fillUpOptional() {
    var semesters = document.getElementsByClassName('sem');
    for (var i = 0; i < semesters.length; i++) {
        var optionalContent = semesters[i].querySelectorAll('.optional');
        for (var j = 0; j < optionalContent.length; j++) {
            var listItems = optionalContent[j].querySelectorAll('ul li');
            for (var k = 0; k < listItems.length; k++) {
                var checkbox = listItems[k].querySelector('input');
                if (checkbox.checked) {
                    var code = listItems[k].getAttribute('data-code');
                    var name = listItems[k].getAttribute('data-name');
                    var credit = listItems[k].getAttribute('data-credit');
                    var data = { code: code, name: name, credit: credit };
                    if (i == 0) sem1Optional.push(data);
                    else sem2Optional.push(data);
                }
            }
        }
    }
}

function prepareReqBody() {
    fillUpOptional();
    var degree = null;
    if (levelSelector.value <= 2) {
        degree = { combination: normalSelection.value };
    } else {
        if (degreeSelector.value == 1)
            degree = { degreeType: degreeSelector.value, combination: generalSelection.value };
        else if (degreeSelector.value == 2)
            degree = { degreeType: degreeSelector.value, combination: jmSelection.value };
        else
            degree = { degreeType: degreeSelector.value, combination: specialSelection.value };
    }
    var details = {
        name: fName.value,
        regNo: regNo.value,
        contact: contact.value,
        image: imageFile.value,
        level: levelSelector.value,
        academicYear: acYear.value,
        degreeDetails: degree
    };
    var req = {
        personal: details,
        semester1: {
            mandatory: sem1Mandatory,
            optional: sem1Optional
        }, semester2: {
            mandatory: sem2Mandatory,
            optional: sem2Optional
        }
    };
    return req;
}


function showError(data) {
    mainpageContent.style.display = 'none';
    errorContent.innerHTML = data;
    errorContent.style.display = '';
}

function hideErrorContent() {
    errorContent.style.display = 'none';
}



