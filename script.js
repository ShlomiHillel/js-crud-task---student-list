



const loader = document.querySelector(`.loader`)
const endpoint = `https://appleseed-wa.herokuapp.com/api/users/`;
fetchData(endpoint)
let responseUser;
let userData;
const table = document.querySelector(`.appleseeds-table`);
const searchBox = document.querySelector(`.search-box`);
searchBox.addEventListener(`keyup`, search);
const whatSearch = document.querySelector(`.what-search`);
whatSearch.addEventListener(`click`, displayGenderSelect)
const toolBar = document.querySelector(`.tool-bar`)
const genderOption = document.querySelector(`.gender-select`)
let editBtn;
let removeBtn;
let confirmBtn;
let cancelBtn;
let tableHeadings;


const state = {
    bigData: [],
    myData: [],
    newData: [],
    whatSearchValue: null,
    valueSearchFor: null,
    personBeforeEdit: null,
    weatherData: [],
}

async function fetchData(url) {
    console.time(`check`)
    loader.classList.remove(`hidden`)
    const respone = await fetch(url)
    const appleData = await respone.json()
    state.bigData.push(appleData)
    for (let i = 0; i < state.bigData[0].length; i++) {
        responseUser = await fetch(url + i)
        userData = await responseUser.json()
        state.myData.push({
            userData: userData,
            firstName: state.bigData[0][i].firstName,
            lastName: state.bigData[0][i].lastName,
            capsule: state.bigData[0][i].capsule,
            id: state.bigData[0][i].id,
        })
        state.weatherData.push(userData.city)
    }
    firstRender()
    loader.classList.add(`hidden`)
    console.timeEnd(`check`)
}

function firstRender() {
    table.innerHTML = `
    <tr>
    <th><p data-value="id" class="table-heading">ID <i data-value="id" class="arrow down"></i></p></th>
    <th><p data-value="firstName" class="table-heading">First Name <i data-value="firstName" class="arrow down"></i></p></th>
    <th><p data-value="lastName" class="table-heading">Last Name <i data-value="lastName" class="arrow down"></i></p></th>
    <th><p data-value="capsule" class="table-heading">Capsule <i data-value="capsule" class="arrow down"></i></p></th>
    <th><p data-value="age" class="table-heading">Age <i data-value="age" class="arrow down"></i></p></th>
    <th><p data-value="city" class="table-heading">City <i data-value="city" class="arrow down"></i></p></th>
    <th><p data-value="gender" class="table-heading">Gender <i data-value="gender" class="arrow down"></i></p></th>
    <th><p data-value="hobby" class="table-heading">Hobby <i data-value="hobby" class="arrow down"></i></p></th>
    </tr>
    `

    for (let i = 0; i < state.myData.length; i++) {
        table.innerHTML += `
         <td>${state.myData[i].id}</td>
         <td>${state.myData[i].firstName}</td> 
         <td>${state.myData[i].lastName}</td>
         <td>${state.myData[i].capsule}</td>
         <td>${state.myData[i].userData.age}</td>
         <td>${state.myData[i].userData.city}</td>
         <td>${state.myData[i].userData.gender}</td>
         <td>${state.myData[i].userData.hobby}</td>
         <td><button class="btn edit-btn">Edit</button></td>
         <td><button class="btn remove-btn">Remove</button></td>
         <td><button class="btn confirm-btn hidden">Confirm</button></td>
         <td><button class="btn cancel-btn hidden">Cancel</button></td>
        `
    }
    reArrangeButtonsEvents()
}

function clearTable() {
    table.innerHTML =
        `
    <tr>
    <th><p data-value="id" class="table-heading">ID <i data-value="id" class="arrow down"></i></p></th>
    <th><p data-value="firstName" class="table-heading">First Name <i data-value="firstName" class="arrow down"></i></p></th>
    <th><p data-value="lastName" class="table-heading">Last Name <i data-value="lastName" class="arrow down"></i></p></th>
    <th><p data-value="capsule" class="table-heading">Capsule <i data-value="capsule" class="arrow down"></i></p></th>
    <th><p data-value="age" class="table-heading">Age <i data-value="age" class="arrow down"></i></p></th>
    <th><p data-value="city" class="table-heading">City <i data-value="city" class="arrow down"></i></p></th>
    <th><p data-value="gender" class="table-heading">Gender <i data-value="gender" class="arrow down"></i></p></th>
    <th><p data-value="hobby" class="table-heading">Hobby <i data-value="hobby" class="arrow down"></i></p></th>
    </tr>
    `
}

function render(array) {
    for (let i = 0; i < state.newData.length; i++) {
        table.innerHTML +=
            `
        <td>${state.newData[i].id}</td>
        <td>${state.newData[i].firstName}</td> 
        <td>${state.newData[i].lastName}</td>
        <td>${state.newData[i].capsule}</td>
        <td>${state.newData[i].userData.age}</td>
        <td>${state.newData[i].userData.city}</td>
        <td>${state.newData[i].userData.gender}</td>
        <td>${state.newData[i].userData.hobby}</td>
        <td><button class="btn edit-btn">Edit</button></td>
        <td><button class="btn remove-btn">Remove</button></td>
        <td><button class="btn confirm-btn hidden">Confirm</button></td>
        <td><button class="btn cancel-btn hidden">Cancel</button></td>
        `
    }
}

function renderSingleTr(id, tr) {

    table.children[tr].innerHTML = `
         <td>${state.myData[id].id}</td>
         <td>${state.myData[id].firstName}</td> 
         <td>${state.myData[id].lastName}</td>
         <td>${state.myData[id].capsule}</td>
         <td>${state.myData[id].userData.age}</td>
         <td>${state.myData[id].userData.city}</td>
         <td>${state.myData[id].userData.gender}</td>
         <td>${state.myData[id].userData.hobby}</td>
         <td><button class="btn edit-btn">Edit</button></td>
         <td><button class="btn remove-btn">Remove</button></td>
         <td><button class="btn confirm-btn hidden">Confirm</button></td>
         <td><button class="btn cancel-btn hidden">Cancel</button></td>
    `
    reArrangeButtonsEvents()

}

function reArrangeButtonsEvents() {
   

    editBtn = document.querySelectorAll(`.edit-btn`)
    removeBtn = document.querySelectorAll(`.remove-btn`)
    confirmBtn = document.querySelectorAll(`.confirm-btn`)
    cancelBtn = document.querySelectorAll(`.cancel-btn`)

 

    editBtn.forEach((e) => {
        e.removeEventListener(`click`, edit)
    })
    removeBtn.forEach((e) => {
        e.removeEventListener(`click`, remove)
    })
    confirmBtn.forEach((e) => {
        e.removeEventListener(`click`, confirm)
    })
    cancelBtn.forEach((e) => {
        e.removeEventListener(`click`, cancel)
    })

  

    editBtn.forEach((e) => {
        e.addEventListener(`click`, edit)
    })
    removeBtn.forEach((e) => {
        e.addEventListener(`click`, remove)
    })
    confirmBtn.forEach((e) => {
        e.addEventListener(`click`, confirm)
    })
    cancelBtn.forEach((e) => {
        e.addEventListener(`click`, cancel)
    })

  
    tableHeadings = document.querySelectorAll(`.table-heading`)
    for (let p of tableHeadings) {
        p.removeEventListener(`click`, sort)
    }
    for (let p of tableHeadings) {
        p.addEventListener(`click`, sort)
    }

}

function search(e) {
    clearTable()
    state.whatSearchValue = searchBox.value.toLowerCase(); // input value
    state.valueSearchFor = whatSearch.value; //dropdown value

    if (state.valueSearchFor === `firstName` ||
        state.valueSearchFor === `lastName` ||
        state.valueSearchFor === `capsule`) {
        for (let person of state.myData) {
            if (person[state.valueSearchFor].toString().toLowerCase().includes(state.whatSearchValue)) {
                state.newData = [];
                state.newData.push(person)
                render(state.newData)
            }
        }
    }
    
    if (state.valueSearchFor === `age` ||
        state.valueSearchFor === `city` ||
        state.valueSearchFor === `hobby`) {
        for (let person of state.myData) {
            if (person.userData[state.valueSearchFor].toString().toLowerCase().includes(state.whatSearchValue)) {
                state.newData = [];
                state.newData.push(person)
                render(state.newData)
            }
        }
    }
    reArrangeButtonsEvents()
}

function displayGenderSelect() {
 
    state.whatSearchValue = whatSearch.value
    if (state.whatSearchValue === `gender`) {
        searchBox.disabled = true;
        genderOption.classList.remove(`hidden`)
    } else {
        genderOption.classList.add(`hidden`)
        searchBox.disabled = false;
    }
    toolBar.children[2].addEventListener(`change`, (e) => {
        state.whatSearchValue = e.target.value;
        state.newData = [];
        table.innerHTML = ``;
        for (let person of state.myData) {
            if (person.userData.gender === state.whatSearchValue) {
                state.newData.push(person)
            }
        }
        clearTable()
        render(state.newData);
        searchBox.disabled = false;
    })
}

function sort(e) {
    clearTable()
    state.newData = []
    const sortBy = e.target.dataset.value;
    if (sortBy == `id` || sortBy == `capsule` || sortBy == `firstName` || sortBy == `lastName`) {
        state.newData = state.myData.sort((a, b) => {
            if (sortBy == `firstName` || sortBy == `lastName`) {
                const name1 = a[sortBy].toLowerCase()
                const name2 = b[sortBy].toLowerCase()
                if (name1 < name2) {
                    return -1;
                }
                if (name1 > name2) {
                    return 1;
                }
                return 0;
            } else {
                return a[sortBy] - b[sortBy];
            }
        })
    } else if (sortBy == `age` || sortBy == `gender` || sortBy == `city` || sortBy == `hobby`) {
        state.newData = state.myData.sort((a, b) => {
            if (sortBy == `gender` || sortBy == `city` || sortBy == `hobby`) {
                const name1 = a.userData[sortBy].toLowerCase();
                const name2 = b.userData[sortBy].toLowerCase();
                if (name1 < name2) {
                    return -1;
                }
                if (name1 > name2) {
                    return 1;
                }
                return 0;
            } else {
                return a.userData[sortBy] - b.userData[sortBy];
            };
        })
    }
    render(state.newData);
    reArrangeButtonsEvents();

}


function alphaOnly(e, inputBox) {
    const myReg = new RegExp("[0-9-*~`!@#$%^&*()-=+]");
    inputBox.readOnly = true; //cancel the options to write and remove cursor
    const key = e.key;
    if (myReg.test(key)) {
      
        for (let i = 0; i < inputBox.value.length; i++) {
        
            if (myReg.test(inputBox.value[i])) {
                inputBox.value = inputBox.value.replace(inputBox.value[i], ``)
            }
        }
    }
    inputBox.readOnly = false; //return the option to write and the cursor
}

function edit(e) {
    state.personBeforeEdit = state.myData[Number(e.path[2].children[0].textContent)];
    const personAfterEdit = e.path[2];
    
    personAfterEdit.children[8].classList.add(`hidden`);
    personAfterEdit.children[9].classList.add(`hidden`);
    personAfterEdit.children[10].children[0].classList.remove(`hidden`);
    personAfterEdit.children[11].children[0].classList.remove(`hidden`);
    
    for (let i = 1; i < 8; i++) {
        if (i === 3 || i === 4) {
            personAfterEdit.children[i].innerHTML = `<input type="number" value="${personAfterEdit.children[i].textContent}">`
        } else if (i === 6) {
            personAfterEdit.children[i].innerHTML = `
             <select class="gender-select">
            <option value="" disabled selected hidden>Choose a Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="B">B</option>
            </select>
            `
        } else {
            personAfterEdit.children[i].innerHTML = `<input onkeyup=alphaOnly(event,this) type="text" value="${personAfterEdit.children[i].textContent}">`
        }
    }
   
    reArrangeButtonsEvents()
}

function remove(e) {
    const idToRemove = Number(e.path[2].children[0].textContent);
    const personToRemove = state.myData.find((e) => {
        return e.id === idToRemove
    })
    const indexOfPersonToRemove = state.myData.indexOf(personToRemove);
    state.myData.splice(indexOfPersonToRemove, 1)
    firstRender()
    reArrangeButtonsEvents()
}

function confirm(e) {
    
    const personAfterEdit = e.path[2]
   
    state.personBeforeEdit.firstName = personAfterEdit.children[1].children[0].value;
    state.personBeforeEdit.lastName = personAfterEdit.children[2].children[0].value;
    state.personBeforeEdit.capsule = personAfterEdit.children[3].children[0].value;
    state.personBeforeEdit.userData.age = personAfterEdit.children[4].children[0].value;
    state.personBeforeEdit.userData.city = personAfterEdit.children[5].children[0].value;
    state.personBeforeEdit.userData.gender = personAfterEdit.children[6].children[0].value;
    state.personBeforeEdit.userData.hobby = personAfterEdit.children[7].children[0].value;
    state.personBeforeEdit.id = Number(personAfterEdit.children[0].textContent);
    
    let idToUpdate = state.myData.find((e) => {
        return e.id === state.personBeforeEdit.id
    }) //id want to update
    idToUpdate = idToUpdate.id
    const indexOfPersonToUpdate = state.myData.forEach((e, i) => {
        return e.id === idToUpdate ? i : null;
    }) //index of the person to update in my data
    state.myData[indexOfPersonToUpdate] = state.personBeforeEdit; 
   
    renderSingleTr(indexOfPersonToUpdate, e.path[2].rowIndex)
    reArrangeButtonsEvents()
}


function cancel(e) {
    renderSingleTr(state.personBeforeEdit.id, e.path[2].rowIndex)
    reArrangeButtonsEvents()
}