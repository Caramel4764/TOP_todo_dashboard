import "./style.css";
import dateObj from "./dateObj.js";
import dashboardObj from "./dashboard.js";
import project from "./project.js";

let newProjectBtn = document.getElementById("newProject");
let newProjectInput = document.getElementById('newProjectInput');
let addTaskBtn = document.getElementById('addTask');
let todoSubmitBtn = document.getElementById("todo-submit-button");
let taskForm = document.getElementById('addTodoMenu');
let dateInput = document.getElementById('dateInput');

window.addEventListener('DOMContentLoaded', function(){
  dateInput.value = dateObj.getCurrentDate();
})

addTaskBtn.addEventListener('click', function(){
  taskForm.style.visibility='visible';
})
newProjectBtn.addEventListener('click', function(){
  createNewProject(newProjectInput.value)
})

todoSubmitBtn.addEventListener('click', function() {
  taskForm.style.visibility='hidden';
  dashboardObj.add();
  dashboardObj.update();
})



project.create('All');