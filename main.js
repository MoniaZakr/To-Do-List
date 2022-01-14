const form = document.querySelector(".form");
const error = document.querySelector(".error");
const buttonAdd = document.querySelector(".add");
const inputText = document.getElementById("input");
const buttonDeadline = document.querySelector(".deadline");
const inputDate = document.getElementById("date");
const container = document.querySelector(".container");
const tasks = document.querySelector(".tasks");
const item = document.querySelector(".item");
const buttonChecked = document.querySelector(".checked");
const text = document.querySelector(".text");
const buttonsContainer = document.querySelector(".buttonsContainer");
const buttonEdit = document.querySelector(".edit");
const buttonDelete = document.querySelector(".delete");
const tasksToDo = document.querySelector(".tasksToDo");
const tasksHasBeenDone = document.querySelector(".tasksHasBeenDone");

listOfToDoes = [];
id = 0;

let data = localStorage.getItem("TODO");
  if(data) {
    listOfToDoes = JSON.parse(data);
    id = listOfToDoes.length
    loadList(listOfToDoes)
  }else{
    listOfToDoes = [];
    id = 0
}



function createToDo( text, date, id) {
  return `<li class="item" id=${id}>
    <section>
      <button class="checked">
      <svg xmlns="http://www.w3.org/2000/svg" height="" viewBox="0 0 24 24" width="" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
      </button>
     <p class="text">${text}<span>${date}</span></p>
    </section>
    <div class="buttonsContainer">
      <button class="edit" id=${id}>
      <svg xmlns="http://www.w3.org/2000/svg" height="" viewBox="0 0 24 24" width="" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
      </button>
      <button class="delete" id=${id}>
      <svg xmlns="http://www.w3.org/2000/svg" height="" viewBox="0 0 24 24" width="" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"/></svg>
      </button>
    </div>
  </li>`;
}

function addTodo (text, date, id)  {
  tasksToDo.insertAdjacentHTML('afterbegin', createToDo(text, date, id)); 
  localStorage.setItem("TODO", JSON.stringify(listOfToDoes));
}




function loadList(array) {
  array.forEach (function(item) {
    addTodo(item.text, item.date, item.id)
  })
}



function addTask()  {
  const text = inputText.value;
  const date = inputDate.value;

  buttonDeadline.classList.remove("dateDisable");
  inputDate.classList.add("dateDisable");
    if(text === "") {
      error.classList.remove("errorHide");
      return;
    }
    listOfToDoes.push(
      {
        text: text,
        date: date,
        id: id
      })
    id++;
    localStorage.setItem("TODO", JSON.stringify(listOfToDoes));
    
     
  createToDo(text, date, id);
  addTodo(text, date, id)
  clearAll(); 
}


function checkbox(entry, targetBtn) {
  targetBtn.classList.toggle("unchecked")
  entry.classList.add("lineThrought");
    if(entry.classList.contains("lineThrought")) {
      tasksHasBeenDone.insertAdjacentElement('afterbegin', entry);
    }
    if(!targetBtn.classList.contains("unchecked")) {
      entry.classList.remove("lineThrought");
      tasksToDo.insertAdjacentElement('afterbegin', entry);
    }
}

function editElement(entry) {
  let id = parseInt(entry.id);
  console.log(id)
  let elem = listOfToDoes.filter(function(item) {
    return item.id === id
  })
  console.log(elem),
  console.log(listOfToDoes)
  inputText.value = elem[0].text;
  inputDate.value = elem[0].date;
  setDate()

  entry.remove();
  localStorage.setItem("TODO", JSON.stringify(listOfToDoes));
}
  

    
function deleteElement(entry) {
  
  listOfToDoes.splice(entry, 1);
  entry.remove();
  localStorage.setItem("TODO", JSON.stringify(listOfToDoes));
}

const handler = (event) => {
  const targetBtn = event.target.parentNode;
  const entry = targetBtn.parentNode.parentNode;

  if(targetBtn.classList.contains("delete")) {
    deleteElement(entry);
  }else if(targetBtn.classList.contains("edit")) {
    editElement(entry);
  }else if(targetBtn.classList.contains("checked")) {
    checkbox(entry, targetBtn)
  }
}

const setDate = () => {
  buttonDeadline.classList.add("dateDisable");
  inputDate.classList.remove("dateDisable")
}
    
const clearAll = () => {
  inputText.value = "";
  inputDate.value = "";
}


    
const errorRemove = () => {
  error.classList.add("errorHide")
}
   

buttonAdd.addEventListener("click", addTask);
buttonDeadline.addEventListener("click", setDate);
inputText.addEventListener("blur",errorRemove);
tasksToDo.addEventListener("click", handler);
tasksHasBeenDone.addEventListener("click", handler);

    

    