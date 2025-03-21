import "./style.css";

let newProjectBtn = document.getElementById("newProject");
let projectDiv = document.getElementById('project');
let dashboard = document.getElementById('dashboard');
let newProjectInput = document.getElementById('newProjectInput');
let addTaskBtn = document.getElementById('addTask');
let todoSubmitBtn = document.getElementById("todo-submit-button");

let taskInput = document.getElementById('taskInput');
let dateInput = document.getElementById('dateInput');
let noteInput = document.getElementById('noteInput');
let descInput = document.getElementById('descInput');
let priorityInput = document.getElementById('todo-priority');



let currentProject = "All";
let todoList = [];

newProjectBtn.addEventListener('click', function(){
  createNewProject(newProjectInput.value)
})

todoSubmitBtn.addEventListener('click', function() {
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