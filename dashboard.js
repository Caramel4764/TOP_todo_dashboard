import project from "./project.js";

let dashboard = document.getElementById('dashboard');
let taskForm = document.getElementById('addTodoMenu');
let todoViewerDiv = document.getElementById('todoViewerDiv');
let todoViewerDesc = document.getElementById('todoViewerDesc');
let todoViewerDate = document.getElementById('todoViewerDate');
let todoViewerNote = document.getElementById('todoViewerNote');
let todoViewerTitle = document.getElementById('todoViewerTitle');
let todoViewerPriority = document.getElementById('todoViewerPriority');
let todoViewerIsDone = document.getElementById('todoViewerIsDone');


let dashboardObj = (function(){
  function addTodo(info) {
    for (let i = 0; i<project.todoList.length; i++) {
      if (project.todoList[i].projectName==project.getCurrentProject()) {
        let newTodo = project.todoList[i].newProject(info.name, info.desc, info.date, info.priority, info.note)
        project.todoList[i].todos.push(newTodo) //info
      }
    }
  }
  function updateViewer(todo) {
    todoViewerTitle.textContent = todo.title;
    todoViewerDesc.textContent = todo.desc;
    todoViewerDate.textContent = todo.dueDate;
    todoViewerNote.textContent = todo.note;
    todoViewerPriority.textContent = todo.priority;
    todoViewerIsDone.checked = todo.isCompleted;
  }
  //takes a todo and returns the correct background color
  function getPriorityColor (todo) {
    let color = "";
    if (todo.isCompleted==true) {
      color = "#63666A";
    } else {
      if (todo.priority=="low") {
        color = "#85FFC7";
      } else if (todo.priority=="med") {
        color = "#FFFF8F";
      } else if (todo.priority=="high") {
        color = "#ff6961";
      } else {
        color = "black";
      }
    }
      return color;
  }
  function update() {
    dashboard.innerHTML = "";
    for (let i = 0; i<project.todoList.length; i++) {
      if (project.getCurrentProject()==project.todoList[i].projectName) {
        let currentBoard = project.todoList[i];
        currentBoard.todos.forEach(function(todo) {
          let item = document.createElement('div');
          let title = document.createElement('h2');
          let date = document.createElement('p');
          let titleDiv = document.createElement('div');
          titleDiv.classList.add('titleDiv');
          let isDoneCheck = document.createElement('input');
          isDoneCheck.classList.add("isDone")
          isDoneCheck.setAttribute('type', 'checkbox');
          title.textContent = todo.title;
          date.textContent = todo.dueDate;
          item.classList.add('task');
          titleDiv.appendChild(isDoneCheck);
          titleDiv.appendChild(title);
          item.appendChild(titleDiv);
          item.appendChild(date);
          dashboard.appendChild(item)
          item.addEventListener('click', function(){
            todoViewerDiv.style.visibility='visible';
            updateViewer(todo);
          })
          item.style.backgroundColor = getPriorityColor(todo);;
          isDoneCheck.addEventListener('click', function(event){
            event.stopPropagation()
            todo.isCompleted = !todo.isCompleted;
            item.style.backgroundColor = getPriorityColor(todo);
          })
        })
      }
    }
    let addGrid = document.createElement('div');
    addGrid.classList.add('task');
    addGrid.innerHTML = "<h2>+</h2>";
    addGrid.addEventListener('click', function(){
      taskForm.style.visibility='visible';
    })
    addGrid.setAttribute('id', 'addTask');
    dashboard.appendChild(addGrid);
  }
  return {
    add: addTodo,
    update: update,
  }
})()


export default dashboardObj;