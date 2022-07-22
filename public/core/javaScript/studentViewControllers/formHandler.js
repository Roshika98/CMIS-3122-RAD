const registerNav = document.getElementById('registerNav');
registerNav.classList.add('active');

//! Variables-------------------------------------------------------



var currTab = 0;
const regForm = document.getElementById('regForm')
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

const mainpageContent = document.getElementById('mainpage-content');
const errorContent = document.getElementById('error-content');
const confirmContent = document.getElementById('confirmation');

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

//* Helper variables to check credit requirements--------

var sem1Credits = 0;
var sem1MandatoryCredits = 0;
var sem2Credits = 0;
var sem2MandatoryCredits = 0;
var totalCredits = 0;
var sem1CreditIndicator;
var sem2CreditIndicator;
var totalCreditIndicator;

var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

//* Events----------------------------------------------------

//! Multi step form traversal control functions---------------

nextBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        if (currTab == 0) {
            if (!regForm.checkValidity()) {
                regForm.classList.add('was-validated');
                return;
            }
            else {
                regForm.classList.add('was-validated');
                var params = prepareSelectionQuery();
                var response = await axios.get('https://localhost:3000/courses/register', {
                    params,
                    headers: {
                        'request-type': 'axios'
                    }
                });
                addDynamicContent(response.data);
            }
        }
        Showcontent(1);
    } catch (error) {
        if (error.response)
            showError(error.response.data);
        else console.log(error);
    }
});


prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    Showcontent(-1);
});



// ! Prepare to send data to backend in order to get the registration pdf downloaded-----

submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    totalCredits = sem1Credits + sem2Credits;
    if (totalCredits >= 30 && totalCredits <= 33) {
        try {
            var body = JSON.stringify(prepareReqBody());
            var response = await axios.post('https://localhost:3000/courses/register', body,
                { headers: { 'Content-Type': 'application/json', 'request-type': 'axios' } });
            var data = response.data;
            showConfirmation(data);
            window.location = 'https://localhost:3000/courses/downloads';
        } catch (error) {
            showError(error.response.data);
        }
    } else {
        alert('Credit requirements are not met!', 'danger');
    }
});



//! Selector functions-----------------------

levelSelector.addEventListener('change', e => {
    ShowLevelContent(levelSelector.value);
});

degreeSelector.addEventListener('change', e => {
    ShowDegreeType(degreeSelector.value);
});


//! Upload the image file to backend-------------------

imageFile.addEventListener('change', async (event) => {
    var formData = new FormData();
    formData.append("img", imageFile.files[0]);
    // var params = new URLSearchParams([['file', `${imageFile.value}`]]);
    var response = await axios.post('https://localhost:3000/courses/register/img', formData);
});


//* Utility function declarations & calls-------------------------------------

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
    } else {
        var queryP = new URLSearchParams([['level', '0'], ['selection', '0']]);
        return queryP;
    }
}

//! Set up the selected data in the multi step form----------

function addDynamicContent(dynamicContent) {
    dynamicHolder.innerHTML = dynamicContent;
    content = document.getElementsByClassName('tab');
    content[1].style.display = 'none';
    content[2].style.display = 'none';
    sem1CreditIndicator = document.getElementById('sem1Credits');
    sem2CreditIndicator = document.getElementById('sem2Credits');
    totalCreditIndicator = document.getElementById('totCredits');
    resetCredits();
    fillUpMandatory();
    setupOptionalCreditsProcessing();
}

//! Fills up the mandatory module arrays------------

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
                if (i == 0) {
                    sem1Mandatory.push(data);
                    sem1Credits += parseInt(credit);
                    sem1MandatoryCredits += parseInt(credit);
                }
                else {
                    sem2Mandatory.push(data);
                    sem2Credits += parseInt(credit);
                    sem2MandatoryCredits += parseInt(credit);
                }
            }
        }
    }
    processCredits();
}

function processCredits() {
    totalCredits = sem1Credits + sem2Credits;
    sem1CreditIndicator.innerText = `Credit count : ${sem1Credits}`;
    sem2CreditIndicator.innerText = `Credit count : ${sem2Credits}`;
    totalCreditIndicator.innerText = `Total Credits : ${totalCredits}`;
}

function resetCredits() {
    sem1Credits = 0;
    sem2Credits = 0;
    totalCredits = 0;
}


function setupOptionalCreditsProcessing() {
    var semesters = document.getElementsByClassName('sem');
    for (var i = 0; i < semesters.length; i++) {
        var optionalContent = semesters[i].querySelectorAll('.optional');
        for (var j = 0; j < optionalContent.length; j++) {
            var listItems = optionalContent[j].querySelectorAll('ul li');
            listItems.forEach(element => {
                var checkbox = element.querySelector('input');
                checkbox.addEventListener('click', (e) => {
                    if (checkbox.checked) {
                        if (element.getAttribute('data-sem') == '1') {
                            sem1Credits += parseInt(element.getAttribute('data-credit'));
                        } else sem2Credits += parseInt(element.getAttribute('data-credit'));
                    } else {
                        if (element.getAttribute('data-sem') == '1') {
                            sem1Credits -= parseInt(element.getAttribute('data-credit'));
                        } else sem2Credits -= parseInt(element.getAttribute('data-credit'));
                    }
                    processCredits();
                });
            });
        }
    }
}


function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
}

//! Fills up the optional module arrays---------

function fillUpOptional() {
    if (sem1Optional.length > 0 && sem2Optional.length > 0) {
        sem1Optional = [];
        sem2Optional = [];
    }
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

//! Prepares the final request's Body --------------

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
        }, Credits: {
            sem1: {
                mandatory: sem1MandatoryCredits,
                optional: sem1Credits - sem1MandatoryCredits
            },
            sem2: {
                mandatory: sem2MandatoryCredits,
                optional: sem2Credits - sem2MandatoryCredits
            },
            total: totalCredits
        }
    };
    return req;
}


//! Error handling functions-----------------

function showError(data) {
    mainpageContent.style.display = 'none';
    errorContent.innerHTML = data;
    errorContent.style.display = '';
}

function hideSecondaryContent() {
    errorContent.style.display = 'none';
    confirmContent.style.display = 'none';
}

function showConfirmation(data) {
    mainpageContent.style.display = 'none';
    errorContent.style.display = 'none';
    confirmContent.innerHTML = data;
    confirmContent.style.display = '';
}


