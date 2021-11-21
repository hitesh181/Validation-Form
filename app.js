const usernameEl = document.querySelector('#name');
const emp= document.querySelector('#emp_id');
const age= document.querySelector('#age');
const dob = document.querySelector('#dob');
const designation = document.querySelector('#designation');
const salary = document.querySelector('#salary');

const form = document.querySelector('#signup');
const table = document.querySelector('table');
const gender = form.gender;


const checkUsername = () => {

    let valid = false;

    const min = 5,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

const checkEmpId = () => {

    let valid = false;

    const min = 1,
        max = 50;
    
    if (!isRequired(emp_id.value)) {
            showError(emp_id, 'Employee Id cannot be blank.');
        }
    else if(parseInt(emp.value) < min || parseInt(emp.value) > max)
        showError(emp, `ID must be between ${min} and ${max} characters.`)

    else {
            showSuccess(emp);
            valid = true;
        }
    return valid;
};



const checkAge = () => {

    let valid = false;

    const min = 18,
        max = 60;

    if (!isRequired(age.value)) {
            showError(age, 'Age cannot be blank.');
        }
    else if(parseInt(age.value) < min || parseInt(age.value) > max)
        showError(age, `ID must be between ${min} and ${max}.`)

    else {
            showSuccess(age);
            valid = true;
        }
           
    return valid;
};


const checkDOB = () => {

    let valid = false;

    if (!isRequired(dob.value)) {
            showError(dob, 'DOB cannot be blank.');
        }
    else {
            showSuccess(dob);
            valid = true;
        }
           
    return valid;
};

const checkDesignation = () => {

    let valid = false;

    if (!isRequired(designation.value)) {
            showError(designation, 'designation cannot be blank.');
        }
    else {
            showSuccess(designation);
            valid = true;
        }
           
    return valid;
};


const checkSalary = () => {

    let valid = false;

    const min = 10000;

    if (!isRequired(salary.value)) {
        showError(salary, 'Field cannot be blank.');
    }
    else if(parseInt(salary.value) < min)
        showError(salary, `Salary must be more than ${min}`)

    else {
            showSuccess(salary);
            valid = true;
        }
           
    return valid;
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


//to display the error message under each form field
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.innerHTML = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    
    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.innerHTML = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername();
    let isEmpIdValid = checkEmpId();
    let isAgeValid = checkAge();
    //let isGenderValid = checkGender();
    let isDOBValid = checkDOB();
    let isDesignationValid = checkDesignation();
    let isSalaryValid = checkSalary();

    let isFormValid = isUsernameValid && isEmpIdValid && isAgeValid && isDOBValid && isDesignationValid && isSalaryValid;

    if (isFormValid) {
        console.log("data added to the json file succesfully");

        addRecord(); 
    }});




let records =[];



function addRecord(){ 
    let record = {
        name: usernameEl.value,
        emp_id: form.emp_id.value,
        age: form.age.value,
        dob: form.dob.value,
        gender: form.gender.value,
        designation: form.designation.value,
        salary: form.salary.value
    }
    records.push(record);

    const Jsonobj = JSON.stringify(records);        //converting into string to pass into JSON

    localStorage.setItem("fileJson.json", Jsonobj);     //storing in the localsorange of the browers. NOTE - It is reset after reloading the page
    
    /*again adding the error class of css to mark the null error. Otherwise the borders were going green after entering one record. */

    showError(usernameEl, "");      
    showError(age, "");
    showError(emp, "");
    showError(dob, "");
    showError(salary, "");
    showError(designation, "");

    form.reset();       // resetting the form after every entry
}

 
let str = "";

 
function printData(){
    //Retrieving data from the localStorage
    let text = localStorage.getItem("fileJson.json");       

    let obj = JSON.parse(text);     //converting into JS object to operate on it
  
        let xhr=new XMLHttpRequest();
        
        xhr.open("GET","fileJson.json");
        
        let str=""

    
        //let Obj=JSON.parse(xhr.responseText);
            
            str+=`
            <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Age</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>designation</th>
                <th>salary</th>
            </tr>`
            for(key in obj){
                str+=`<tr>
                    <td>${obj[key].name} </td> 
                    <td>${obj[key].emp_id} </td> 
                    <td>${obj[key].age} </td> 
                    <td>${obj[key].gender} </td>
                    <td>${obj[key].dob} </td> 
                    <td>${obj[key].designation} </td>
                    <td>${obj[key].salary} </td>
                    </tr>`
                }
           
            table.innerHTML=str
            
        xhr.send()
        
       
}                          


document.querySelector("#mybtn").addEventListener('click',printData); // calling button for ajax request



/* this method is triggering the validation functions as soon as we input anything. It gives real time feedback of the errors */

form.addEventListener('input', function check(e) {
    switch (e.target.id) {      //e.target.id gives the ID attribute of the  thing that is triggered. We can combine this with click and hover as well
        case 'name':
            checkUsername();
            break;
        case 'emp_id':
            checkEmpId();
            break;
        case 'age':
            checkAge();
            break;
        case 'salary':
            checkSalary();
            break;
        case 'dob':
            checkDOB();
            break;
        case 'gender':
            checkGender();
            break;
        case 'designation':
            checkDesignation();
            break;
        
    }
});