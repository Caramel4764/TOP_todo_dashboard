import "./style.css";

let newProjectBtn = document.getElementById("newProject");
let projectDiv = document.getElementById('project');
let dashboard = document.getElementById('dashboard');
let newProjectInput = document.getElementById('newProjectInput');

let currentProject = "none";
let todoList = [];
newProjectBtn.addEventListener('click', function(){
  let value = newProjectInput.value
  let newProject = createProject(value);
  addProjectDom(value);
  let projectCat = {
    newProject,
    todos: [],
    projectName:value,
  }
  todoList.push(projectCat);
})

function updateTaskboard() {
  dashboard.innerHTML = "";
  let currentBoard;
  for (let i = 0; i<todoList.length; i++) {
    if (currentProject==todoList[i].projectName) {
      currentBoard = todoList[i];
    }
  }
  console.log(currentBoard)
  console.log(currentProject)


  let item = document.createElement('div');
  let title = document.createElement('p');
  title.textContent = currentBoard.projectName;
  dashboard.appendChild(item)
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

let programming = createProject("programming");
//console.log(programming("study", "study for work", "10-15", "!!!", ""))