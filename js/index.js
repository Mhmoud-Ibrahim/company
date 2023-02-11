
var nameInput = document.getElementById('employerName');
var phoneInput = document.getElementById('employerPhone');
var idInput = document.getElementById('employerId');
var addBtn = document.getElementById('addBtn');
var deleteBtn = document.getElementById('deleteBtn');
var alertName = document.getElementById('alertName');
var alertphone = document.getElementById('alertphone');
var alertId = document.getElementById('alertId')

var regex = /^[A-z][a-z]{3,8}$/;
var regex2 = /^(002)?01[0125][0-9]{8}$/;
var regex3 = /^\d{4}$/;

employersContainer = [];
if(localStorage.getItem('employ') != null){
    employersContainer =JSON.parse(localStorage.getItem('employ'));
    displayEmployer()
}

addBtn.addEventListener('click',function(){
    if(validatename()&&validatePhone()&&validateId() == true){
       var employer = {
        employername:nameInput.value,
        employerphone:phoneInput.value,
        employerid:idInput.value
    }
    employersContainer.push(employer);
    localStorage.setItem(`employ`,JSON.stringify(employersContainer))
    displayEmployer()
    clearForm()
    alertName.classList.replace('d-inlineblock','d-none');
    alertphone.classList.replace('d-inlineblock','d-none');
    alertId.classList.replace('d-inlineblock','d-none')
    }else if(validatename() == false){
        alertName.classList.replace('d-none','d-inlineblock')
    }else if(validatePhone() == false){
        alertphone.classList.replace('d-none','d-inlineblock')
    }else if(validateId() == false){
        alertId.classList.replace('d-none','d-inlineblock')
    }
    
})

function displayEmployer(){
    var cartoona = '';
    for(i=0;i<employersContainer.length;i++){
        cartoona +=`
        <div class="col-md-3  p-2 rounded-2 text-center">
        <div class="employerData bg-light shadow">
        <span>${i}</span>
            <h2>${employersContainer[i].employername}</h2>
            <p>${employersContainer[i].employerphone}</p>
            <p>${employersContainer[i].employerid}</p>
            <button id="deleteBtn"  class="btn btn-danger btn-sm m-2 " onclick="deleteEmployer(${i})" >delete</button>
        </div>
    </div>
        `
    }
    document.getElementById('row').innerHTML = cartoona
}

function deleteEmployer(index){
    employersContainer.splice(index,1)
    localStorage.setItem(`employ`,JSON.stringify(employersContainer))
    displayEmployer()
}
function clearForm(){
    nameInput.value = "",
       phoneInput.value = "",
        idInput.value = ""
}

function validatename(){
    return regex.test(nameInput.value)
}

function validatePhone(){
    return regex2.test(phoneInput.value)
}
function validateId(){
    return regex3.test(idInput.value)
}
