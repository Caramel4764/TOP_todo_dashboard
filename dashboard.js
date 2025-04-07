import project from "./project.js";
import data from "./data.js";
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
  function addTodo({name, desc, date, priority, note}) {
    for (let i = 0; i<data.getTodoList().length; i++) {
      if (data.getTodoList()[i].projectName==project.getCurrentProject()) {
        //let newTodo = project.todoList[i].newProject(info.name, info.desc, info.date, info.priority, info.note)
        console.log(data.getTodoList()[i]);
        //let newTodo = data.getTodoList()[i].newProject(info.name, info.desc, info.date, info.priority, info.note)
        
          let todo = {
            projectName: project.getCurrentProject(),
            isCompleted:false,
            name: name,
            desc: desc,
            dueDate: date,
            priority: priority,
            note: note,
          }

        data.addSingleTodo(i, todo) //info
      }
    }
    data.updateLocalStorage();
  }
  function updateViewer(todo) {
    todoViewerTitle.textContent = todo.name;
    todoViewerDesc.textContent = todo.desc;
    todoViewerDate.textContent = todo.dueDate;
    todoViewerNote.textContent = todo.note;
    todoViewerPriority.textContent = todo.priority;
    todoViewerPriority.style.backgroundColor = getPriorityColor(todo);
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
  function updateAll() {
    dashboard.innerHTML = "";
    for (let i = 0; i<data.getTodoList().length; i++) {
      let currentBoard = data.getTodoList()[i];
      updateOneDashboardDom(currentBoard);
    }
    createAddGrid();
  }
  function createAddGrid () {
    let addGrid = document.createElement('div');
    addGrid.classList.add('task');
    addGrid.innerHTML = "<h2>+</h2>";
    addGrid.addEventListener('click', function(){
      taskForm.style.visibility='visible';
    })
    addGrid.setAttribute('id', 'addTask');
    dashboard.appendChild(addGrid);
  }
  function updateOneDashboardDom(projectDashboard) {
    projectDashboard.todos.forEach(function(todo) {
      let item = document.createElement('div');
      let title = document.createElement('h2');
      let date = document.createElement('p');
      let titleDiv = document.createElement('div');
      titleDiv.classList.add('titleDiv');
      let isDoneCheck = document.createElement('input');
      isDoneCheck.classList.add("isDone")
      isDoneCheck.setAttribute('type', 'checkbox');
      isDoneCheck.checked = todo.isCompleted;
      title.textContent = todo.name;
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
  function update() {
    dashboard.innerHTML = "";
    for (let i = 0; i<data.getTodoList().length; i++) {
      if (project.getCurrentProject()==data.getTodoList()[i].projectName) {
        let currentBoard = data.getTodoList()[i];
        updateOneDashboardDom(currentBoard);
      }
    }
    createAddGrid();
  }
  return {
    add: addTodo,
    update: update,
    updateAll:updateAll,
  }
})()


export default dashboardObj;