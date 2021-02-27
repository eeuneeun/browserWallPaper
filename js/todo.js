const todoForm = document.querySelector(".js-toDOForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-toDoList");

const TODO_LS="currentTodo";
let toDos = [];



function deleteTodo(e){
    const delEL=e.target.parentElement;
    delEL.parentNode.removeChild(delEL);
    const cleanTodos = toDos.filter(function filterFn(toDo){ 
        return toDo.id !== parseInt(delEL.id);
    });
    console.log(cleanTodos);
    toDos=cleanTodos;
    saveTodo();
}

function saveTodo(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDos)); 
}


function handleTodoSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value="";
}


function askForTodo(){
    todoForm.classList.add(SHOWING_CN);
    todoForm.addEventListener("submit", handleTodoSubmit);
}


function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newID = toDos.length+1;
    delBtn.innerText="X";
    delBtn.addEventListener("click", deleteTodo)
    span.innerText=text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newID;
    todoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newID
    }
    toDos.push(toDoObj);
    saveTodo();
}

function loadTodo(){
    const loadToDos =localStorage.getItem(TODO_LS)
    if(loadToDos !== null){
         const parseToDos = JSON.parse(loadToDos);
         parseToDos.forEach(function(toDo){
             paintTodo(toDo.text);
         });
    }
}

function init(){
    loadTodo();
    askForTodo();
}

init();