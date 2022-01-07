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
        <svg class="icon">
          <use xlink:href = "assets/sprite.svg#done_black_24dp">
          </use>
        </svg>
      </button>
     <p class="text">${text}<span>${date}</span></p>
    </section>
    <div class="buttonsContainer">
      <button class="edit" id=${id}>
        <svg class="icon">
          <use xlink:href = "assets/sprite.svg#edit_black_24dp"></use>
        </svg>
      </button>
      <button class="delete" id=${id}>
        <svg class="icon">
          <use xlink:href = "assets/sprite.svg#delete_black_24dp"></use>
        </svg>
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

    

    