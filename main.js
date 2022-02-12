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

loadList();

 
  
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




function loadList() {
  if(listOfToDoes.todo.length || listOfToDoes.completed.length) {
    for (let i = 0; i < listOfToDoes.todo.length; i++) {
      let value = listOfToDoes.todo[i];
      addTodo(value.text, value.date, value.id)
    }
    for (let j = 0; j < listOfToDoes.completed.length; j++) {
      let value = listOfToDoes.completed[j];
      addTodoCompleted(value.text, value.date, value.id)
    }
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
  
  let parent_ul = entry.parentNode; 
  let lista_z_ktorej_usuwamy;
  let lista_na_ktora_dodajemy; 
  let kierunek_pzreniesienia;

  if (parent_ul.classList.contains('tasksHasBeenDone')){
    lista_z_ktorej_usuwamy = listOfToDoes.completed;
    lista_na_ktora_dodajemy = listOfToDoes.todo;
    kierunek_pzreniesienia = "z prawej do lewej";
  }
  else{
    lista_z_ktorej_usuwamy = listOfToDoes.todo;
    lista_na_ktora_dodajemy = listOfToDoes.completed;
    kierunek_pzreniesienia = "z lewej do prawej";
  }

  
  if(kierunek_pzreniesienia == "z lewej do prawej"){
    targetBtn.classList.add("unchecked");
    entry.classList.add("lineThrought");
  }
  else{
    targetBtn.classList.remove("unchecked");
    entry.classList.remove("lineThrought");
  }

  entry.remove()
  let entryId = parseInt(entry.id)
      
  let entryElement = lista_z_ktorej_usuwamy.filter(function(item) {
        return item.id === entryId
  });

  console.log(entryElement);
  entryElement = entryElement[0];
  
  let elements = lista_z_ktorej_usuwamy.filter(function(item) {
        return item.id !== entryId
  });

  console.log(elements);
  lista_z_ktorej_usuwamy = elements;
  lista_na_ktora_dodajemy.push(entryElement);

  if (kierunek_pzreniesienia == "z lewej do prawej"){
    tasksHasBeenDone.insertAdjacentElement('afterbegin', entry);
    listOfToDoes.todo = lista_z_ktorej_usuwamy;  
    listOfToDoes.completed = lista_na_ktora_dodajemy;

  }
  else{
    tasksToDo.insertAdjacentElement('afterbegin', entry);
    listOfToDoes.completed = lista_z_ktorej_usuwamy;  
    listOfToDoes.todo = lista_na_ktora_dodajemy;
  }

  saveLocalStorage();
      
}



function editElement(entry) {

  let parent_ul = entry.parentNode; 
  let lista_na_ktorej_szukamy; 

  if (parent_ul.classList.contains('tasksHasBeenDone')){
      console.log('kliknięto edycję na elemencie znajdującym się na has been done - więc filtrujemy completed');
      lista_na_ktorej_szukamy = listOfToDoes.completed;
  }
  else{
      console.log('kliknięto edycję na elemencie znajdującym się na todo - więc filtrujemy toto');
      lista_na_ktorej_szukamy = listOfToDoes.todo;
  }

  let entryId= parseInt(entry.id);
  let editedElem = lista_na_ktorej_szukamy.filter(function(item) {
    return item.id === entryId
  })
  inputText.value = editedElem[0].text;
  inputDate.value = editedElem[0].date;

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

    

    