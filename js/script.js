import "../style.css";
import dateObj from "./dateObj.js";
import dashboard from "./dashboard.js";
import project from "./project.js";
import data from "./data.js";
let newProjectBtn = document.getElementById("newProject");
let newProjectInput = document.getElementById('newProjectInput');
let addTaskBtn = document.getElementById('addTask');
let todoSubmitBtn = document.getElementById("todo-submit-button");
let taskForm = document.getElementById('addTodoMenu');
let dateInput = document.getElementById('dateInput');
let noteInput = document.getElementById('noteInput');
let descInput = document.getElementById('descInput');
let priorityInput = document.getElementById('todo-priority');
let taskInput = document.getElementById('taskInput');
let todoViewerDiv = document.getElementById('todoViewerDiv');
let todoViewerTitle = document.getElementById('todoViewerTitle');
let editMenuNameInput = document.getElementById('editMenuNameInput');
let editMenu = document.getElementById('editMenu');
let editMenuCloser = document.getElementById('editMenuCloser');
let renameButton = document.getElementById('renameButton');
editMenuCloser.addEventListener('click', function(){
  editMenu.style.visibility='hidden';
})
renameButton.addEventListener('click', function(){
  project.renameProject(project.returnCurrentEditProject(), editMenuNameInput.value);
  editMenu.style.visibility='hidden';
})
window.addEventListener('DOMContentLoaded', function(){
  dateInput.value = dateObj.getCurrentDate();
})

addTaskBtn.addEventListener('click', function(){
  taskForm.style.visibility='visible';
})
newProjectBtn.addEventListener('click', function(){
  //dashboard.update(newProjectInput.value)
  project.create(newProjectInput.value);

})
todoViewerCloser.addEventListener('click', function(){
  todoViewerDiv.style.visibility='hidden';
})
todoSubmitBtn.addEventListener('click', function() {
  taskForm.style.visibility='hidden';
  dashboard.add({
    name: taskInput.value||"Unnamed",
    desc: descInput.value||"No Description", 
    date: dateInput.value, 
    priority: priorityInput.value||"Low", 
    note: noteInput.value||"No Note",
  });
  dashboard.update();
})
todoViewerIsDone.addEventListener('click', function(){
  //change iscompleted and updates
  for (let j = 0; j<project.returnTodoList().length; j++) {
    console.log(project.returnTodoList()[j].todos);
    if (project.getCurrentProject()==project.returnTodoList()[j].projectName) {
      for (let i = 0; i<project.returnTodoList()[j].todos.length; i++) {
        if (todoViewerTitle.textContent==project.returnTodoList()[j].todos[i].title) {
          project.returnTodoList()[j].todos[i].isCompleted = !project.returnTodoList()[j].todos[i].isCompleted;
          console.log('swap')
        }
      }
    }
  }

  dashboard.update();
})

const storedTodoData = localStorage.getItem('todoList');
if (storedTodoData) {
  data.setTodoList(JSON.parse(storedTodoData));
} else {
  project.create('All', true);

  dashboard.add({
    name: "Test Task",
    desc: "This is a test task",
    date: "2025-03-23",
    priority: "high",
    note: "I needed this preview layout. It makes debugging a lot easier.",
  })
}
project.updateProjectDom();
dashboard.updateAll();


