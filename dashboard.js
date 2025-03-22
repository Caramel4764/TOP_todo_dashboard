import project from "./project.js";

let dashboard = document.getElementById('dashboard');
let noteInput = document.getElementById('noteInput');
let descInput = document.getElementById('descInput');
let priorityInput = document.getElementById('todo-priority');
let taskInput = document.getElementById('taskInput');
let taskForm = document.getElementById('addTodoMenu');

let dashboardObj = (function(){
  function addTodo() {
    for (let i = 0; i<project.todoList.length; i++) {
      if (project.todoList[i].projectName==project.currentProject) {
        let newTodo = project.todoList[i].newProject(taskInput.value, descInput.value, dateInput.value, priorityInput.value, noteInput.value)
        project.todoList[i].todos.push(newTodo)
      }
    }
  }

  function update() {
    dashboard.innerHTML = "";
    for (let i = 0; i<project.todoList.length; i++) {
      console.log(project.todoList.length)
      if (project.currentProject==project.todoList[i].projectName) {
        let currentBoard = project.todoList[i];
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
  return {
    add: addTodo,
    update: update,
  }
})()


export default dashboardObj;