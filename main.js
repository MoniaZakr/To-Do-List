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
const lists = document.querySelectorAll(".lists")
const tasksToDo = document.getElementById("tasksToDo");
const tasksHasBeenDone = document.getElementById("tasksHasBeenDone");

let listOfToDoes = {
  todo:[],
  completed:[]
}
let id = 0;



listOfToDoes = (localStorage.getItem("TODO")) ? JSON.parse(localStorage.getItem("TODO")) : {
  todo:[],
  completed:[]
}  

id = localStorage.getItem("idTODO") ? JSON.parse(localStorage.getItem("idTODO")) : 0;

loadList(text, date, id);

 
  
function createToDo( text, date, id) {
  return `<li class="item" id=${id}>
    <section>
      <button class="checked"></button>
      <p class="text">${text}<span>${date}</span></p>
    </section>
    <div class="buttonsContainer">
      <button class="edit"></button>
      <button class="delete"></button>
    </div>
  </li>`;
}

function addTodo (text, date, id,) {
  tasksToDo.insertAdjacentHTML('afterbegin', createToDo(text, date, id)); 
}




function loadList(text, date, id) {
  if (!listOfToDoes.todo.length && !listOfToDoes.completed.length) return
  for (let i = 0; i <= listOfToDoes.todo.length-1; i++) {
    let value = listOfToDoes.todo[i];
    addTodo(value.text, value.date, value.id)
  }
  for (let j = 0; j <= listOfToDoes.completed.length-1; j++) {
    let value = listOfToDoes.completed[j];
    addTodoCompleted(value.text, value.date, value.id)
  }
}

function createTodoCompleted(text, date, id) {
  return `<li class="item lineThrought" id=${id}>
    <section>
      <button class="checked unchecked"></button>
      <p class="text">${text}<span>${date}</span></p>
    </section>
    <div class="buttonsContainer">
      <button class="edit"></button>
      <button class="delete"></button>
    </div>
  </li>`;
}

function addTodoCompleted(text, date, id) {
   tasksHasBeenDone.insertAdjacentHTML("afterbegin", createTodoCompleted(text, date, id))
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
    let entryObj = {
      text: text,
      date: date,
      id: id
    };
  listOfToDoes.todo.push(entryObj)
  createToDo(text, date, id);
  addTodo(text, date, id);
  id++;
  clearAll(); 
  saveLocalStorage()
}
// 


function checkbox(entry, targetBtn) {
  
  let parentUl = entry.parentNode;
  let listToRemoveTask;
  let listToAddTask;
  let direction;

  if(parentUl.classList.contains('tasksHasBeenDone')) {
    listToRemoveTask = listOfToDoes.completed;
    listToAddTask = listOfToDoes.todo;
    direction = "toLeft";
  }
  else {
    listToRemoveTask = listOfToDoes.todo;
    listToAddTask = listOfToDoes.completed;
    direction = "toRight";
  }

  if(direction === "toRight") {
    targetBtn.classList.add("unchecked");
    entry.classList.add("lineThrought");
  }
  else {
    targetBtn.classList.remove("unchecked");
    entry.classList.remove("lineThrought")
  }

  entry.remove();
  let entryId = parseInt(entry.id)
      
  let entryElement = listToRemoveTask.filter(function(item) {
    return item.id === entryId
  });
  console.log(entryElement)

  entryElement = entryElement[0];
  let elements = listToRemoveTask.filter(function(item) {
    return item.id !== entryId
  });
  listToRemoveTask = elements;
  listToAddTask.push(entryElement);

  if(direction === "toRight") {
    tasksHasBeenDone.insertAdjacentElement('afterbegin', entry);
    listOfToDoes.todo = listToRemoveTask;
    listOfToDoes.completed = listToAddTask;
  }
  else {
    tasksToDo.insertAdjacentElement('afterbegin', entry);
    listOfToDoes.completed = listToRemoveTask
    listOfToDoes.todo = listToAddTask;
  }
  saveLocalStorage();
}



function editElement(entry) {

  let parentUl = entry.parentNode;
  let searchList;

  if(parentUl.classList.contains('tasksHasBeenDone')) {
    searchList = listOfToDoes.completed
  }
  else {
    searchList = listOfToDoes.todo
  }

  let entryId = parseInt(entry.id);
  let editedElem = searchList.filter(function(item) {
      return item.id === entryId
  })
    
  console.log(editedElem);
  inputText.value = editedElem[0].text;
  inputDate.value = editedElem[0].date;

  deleteElement(entry)
  setDate()
  
  deleteElement(entry)
}
  
function deleteElement(entry) {
  let entryId = parseInt(entry.id);
  entry.remove();
  if(tasksToDo) {
    let entryDel = listOfToDoes.todo.filter(function(item) {
      return item.id === entryId;
    })
    entryDel = entryDel[0];
    let elementsDel = listOfToDoes.todo.filter(function(item) {
      return item.id !== entryId;
    })
    listOfToDoes.todo = elementsDel
  }
    let entryDel = listOfToDoes.completed.filter(function(item) {
      return item.id === entryId;
    })
    entryDel = entryDel[0];
    let elementsDel= listOfToDoes.completed.filter(function(item) {
      return item.id !== entryId;
    })
    listOfToDoes.completed = elementsDel
  
  saveLocalStorage()
}

const handler = (event) => {
  const targetBtn = event.target;
  const entry = targetBtn.parentNode.parentNode;

  if(targetBtn.classList.contains("delete")) {
    deleteElement(entry);
  }else if(targetBtn.classList.contains("edit")) {
    editElement(entry);
  }else if(targetBtn.classList.contains("checked") || (targetBtn.classList.contains("unchecked"))) {
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

function saveLocalStorage() {
  localStorage.setItem("TODO", JSON.stringify(listOfToDoes));
  localStorage.setItem("idTODO", JSON.stringify(id));
}
 
inputText.addEventListener('keydown', function (e) {
  if(e.code === 'Enter') {
    addTask(text, date, id);
  }
});
buttonAdd.addEventListener("click", addTask);
buttonDeadline.addEventListener("click", setDate);
inputText.addEventListener("blur",errorRemove);
tasksToDo.addEventListener("click", handler);
tasksHasBeenDone.addEventListener("click", handler);

    

    