import "./style.css";

let newProjectBtn = document.getElementById("newProject");
let projectDiv = document.getElementById('project');
let dashboard = document.getElementById('dashboard');
let newProjectInput = document.getElementById('newProjectInput');
let addTaskBtn = document.getElementById('addTask');
let todoSubmitBtn = document.getElementById("todo-submit-button");
let taskForm = document.getElementById('addTodoMenu');
let taskInput = document.getElementById('taskInput');
let dateInput = document.getElementById('dateInput');
let noteInput = document.getElementById('noteInput');
let descInput = document.getElementById('descInput');
let priorityInput = document.getElementById('todo-priority');

window.addEventListener('DOMContentLoaded', function(){
  console.log(getCurrentDate())
  dateInput.value = getCurrentDate();
})

function getCurrentDate() {
  let date = new Date();
  let month = date.getMonth()+1;
  if (month < 10) {
    month = "0"+month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0"+day
  }
  return `${date.getFullYear()}-${month}-${day}`
}
let currentProject = "All";
let todoList = [];

addTaskBtn.addEventListener('click', function(){
  taskForm.style.visibility='visible';
  
})
newProjectBtn.addEventListener('click', function(){
  createNewProject(newProjectInput.value)
})

todoSubmitBtn.addEventListener('click', function() {
  taskForm.style.visibility='hidden';
  addTodo();
  updateTaskboard();
})

function createNewProject(value) {
  let newProject = createProject(value);
  addProjectDom(value);
  let projectCat = {
    newProject,
    todos: [],
    projectName:value,
  }
  todoList.push(projectCat);
}
function addTodo() {
  for (let i = 0; i<todoList.length; i++) {
    if (todoList[i].projectName==currentProject) {
      let newTodo = todoList[i].newProject(taskInput.value, descInput.value, dateInput.value, priorityInput.value, noteInput.value)
      todoList[i].todos.push(newTodo)
    }
  }
}
function updateTaskboard() {
  dashboard.innerHTML = "";
  for (let i = 0; i<todoList.length; i++) {
    console.log(todoList.length)
    if (currentProject==todoList[i].projectName) {
      let currentBoard = todoList[i];
      currentBoard.todos.forEach(function(todo) {
        let item = document.createElement('div');
        let title = document.createElement('h2');
        let date = document.createElement('p');
        title.textContent = todo.title;
        date.textContent = todo.dueDate;
        item.classList.add('task');
        item.appendChild(title);
        item.appendChild(date);
        dashboard.appendChild(item)
        if (todo.priority=="low") {
          item.style.backgroundColor = "#85FFC7";
        } else if (todo.priority=="med") {
          item.style.backgroundColor = "#FFFF8F";
        } else if (todo.priority=="high") {
          item.style.backgroundColor = "#ff6961";
        }
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
function addProjectDom (projectName) {
  let div = document.createElement('div');
  div.classList.add("projectDivs");
  div.textContent=projectName;
  div.addEventListener('click', function(){
    currentProject = projectName;
    updateTaskboard()
  })
  projectDiv.appendChild(div);
}

function createProject(name) {
  let projectName = name;
  return function createTodo(title, desc, due, priority, note) {
    let todo = {
      projectName: projectName,
      isCompleted:false,
      title: title,
      desc: desc,
      dueDate: due,
      priority: priority,
      note: note,
    }
    return todo;
  }
}

createNewProject('All');