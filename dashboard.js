import project from "./project.js";

let dashboard = document.getElementById('dashboard');
let taskForm = document.getElementById('addTodoMenu');

let dashboardObj = (function(){
  function addTodo(info) {
    for (let i = 0; i<project.todoList.length; i++) {
      if (project.todoList[i].projectName==project.getCurrentProject()) {
        let newTodo = project.todoList[i].newProject(info.name, info.desc, info.date, info.priority, info.note)
        project.todoList[i].todos.push(newTodo) //info
      }
    }
  }
  function getPriorityColor (priority) {
    let color = "";
    if (priority=="low") {
      color = "#85FFC7";
    } else if (priority=="med") {
      color = "#FFFF8F";
    } else if (priority=="high") {
      color = "#ff6961";
    } else {
      color = "black";
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
          if (todo.isCompleted==true) {
            item.style.backgroundColor = "#63666A";
          } else {
          item.style.backgroundColor = getPriorityColor(todo.priority);
          }
          isDoneCheck.addEventListener('click', function(){
            todo.isCompleted = !todo.isCompleted;

            if (todo.isCompleted==true) {
              item.style.backgroundColor = "#63666A";
            } else {
              item.style.backgroundColor = getPriorityColor(todo.priority);
            }
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