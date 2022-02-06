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
id = 0;



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

function addTodo (text, date, id) {
  tasksToDo.insertAdjacentHTML('afterbegin', createToDo(text, date, id)); 
}




function loadList() {
  for (let i = 0; i < listOfToDoes.todo.length; i++) {
    let value = listOfToDoes.todo[i];
    addTodo(value.text, value.date, value.id)
  }
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
  // localStorage.setItem('key', tasksHasBeenDone.innerHTML);
}
// function checkbox(entry, targetBtn, ) {
//   targetBtn.classList.toggle("unchecked");
//   entry.classList.add("lineThrought");
//   const list = entry.parentNode;
//   console.log(list)
//   let listId = list.id;
//   console.log(listId)

//   const target = (listId === "tasksToDo") ? tasksHasBeenDone: tasksToDo;
//   target.insertAdjacentElement('afterbegin', entry);
//   listOfToDoes.completed.push(entry)
//   listOfToDoes.todo.splice(listOfToDoes.todo.indexOf(entry))
// }

function checkbox(entry, targetBtn) {
  

  targetBtn.classList.toggle("unchecked");
  entry.classList.add("lineThrought");
    if(entry.classList.contains("lineThrought")) {
      // let entryId = entry.id;
      // let entryDate = entry.childNodes[1].childNodes[3].childNodes[1].textContent;
      // let entryText = entry.childNodes[1].childNodes[3].textContent;
      // target.insertAdjacentElement('afterbegin', entry);
       
      listOfToDoes.todo.splice(listOfToDoes.todo.indexOf(entry),1);
      console.log(listOfToDoes.todo);
      entry.remove()
      listOfToDoes.completed.push(entry)
      tasksHasBeenDone.insertAdjacentElement('afterbegin', entry); 
      console.log(listOfToDoes)
      saveLocalStorage()
    }  
    if(!targetBtn.classList.contains("unchecked")) {
      // let entryId = entry.id;
      // let entryDate = entry.childNodes[1].childNodes[3].childNodes[1].textContent;
      // let entryText = entry.childNodes[1].childNodes[3].textContent;
      entry.classList.remove("lineThrought");
        
      listOfToDoes.completed.splice(listOfToDoes.completed.indexOf(entry),1)
      entry.remove()
      listOfToDoes.todo.push(entry)
      tasksToDo.insertAdjacentElement('afterbegin', entry);
      saveLocalStorage()
      console.log(listOfToDoes)
      // localStorage.setItem('key', tasksHasBeenDone.innerHTML);
    }
  
}



function editElement(entry) {
  let id = parseInt(entry.id);
  let elem = listOfToDoes.todo.filter(function(item) {
    return item.id === id
  })
  inputText.value = elem[0].text;
  inputDate.value = elem[0].date;

  setDate()
  
  deleteElement(entry)
}
  

    
function deleteElement(entry) {
  let index = parseInt(entry.id);
  
  if(listOfToDoes.todo) {
    listOfToDoes.todo.splice(listOfToDoes.todo.findIndex(function(i) {
      return i.id === index;
    }), 1);
   
  }
  (listOfToDoes.completed.splice(listOfToDoes.completed.findIndex(function(i) {
    return i.id === index;
  }),1));
  entry.remove();
  saveLocalStorage()

  // localStorage.setItem("TODO", JSON.stringify(listOfToDoes));
  // localStorage.setItem("idTODO", JSON.stringify(id));
  // localStorage.setItem('key', tasksHasBeenDone.innerHTML);
}

const handler = (event) => {
  const targetBtn = event.target;
  const entry = targetBtn.parentNode.parentNode;
  console.log(entry)

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

// const saved = localStorage.getItem('key');
//   if(saved) {
//     tasksHasBeenDone.innerHTML = saved
//   }
   
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

    

    