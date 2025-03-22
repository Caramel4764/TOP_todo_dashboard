import "./style.css";
import dateObj from "./dateObj.js";
import dashboard from "./dashboard.js";
import project from "./project.js";

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

todoSubmitBtn.addEventListener('click', function() {
  taskForm.style.visibility='hidden';
  dashboard.add({
    name: taskInput.value,
    desc: descInput.value, 
    date: dateInput.value, 
    priority: priorityInput.value, 
    note: noteInput.value,
  });
  dashboard.update();
})



project.create('All');

dashboard.add({
  name: "test",
  desc: "test",
  date: "test",
  priority: "low",
  note: "test",
})
dashboard.update();