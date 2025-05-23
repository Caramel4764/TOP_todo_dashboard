import dashboardObj from "./dashboard.js";
import svg from "./svg.js";
import data from "./data.js"
let editMenu = document.getElementById('editMenu');
let projectDiv = document.getElementById('project');

let projectObj = (function(){
  let currentProject = "All";
  let todoList = [];
  let currentEditProject = null;
  //changes current project
  function changeCurrentProject (projectName) {
    currentProject = projectName;
    updateProjectDom();
  }
  function returnTodoList () {
    return todoList;
  }
  function returnCurrentEditProject () {
    return currentEditProject;
  }
  function getCurrentProject () {
    return currentProject;
  }
  //creates a new project to array list
  function createNewProject(value, isAll) {
    if (doesProjectExist(value)) {
      alert("A project with that name already exists.");
    } else {
      //let newProject = createProject(value);
      let projectCat = {
        //newProject,
        todos: [],
        projectName:value,
      }
      data.addTodoList(projectCat);
      updateProjectDom();
    }
  }
  function getProjectByName(name) {
    for (let i = 0; i<data.getTodoList().length; i++) {
      if (name==data.getTodoList().projectName) {
        return data.getTodoList()[i];
      }
    }
  }
  function renameProject (projectName, newName) {
    let target = getProjectByName(projectName);
    target.projectName = newName;
    changeCurrentProject(newName);
    updateProjectDom();
  }
  function doesProjectExist(value) {
    for (let i = 0; i<data.getTodoList().length; i++) {
      if (value==data.getTodoList()[i].projectName) {
        return true;
      }
    }
    return false;
  }
  function deleteProject (projectName) {
    for (let i = 0; i<data.getTodoList().length; i++) {
      if (projectName==data.getTodoList()[i].projectName) {
        let targetProject = data.getTodoList()[i];
        data.deleteTodoList(i);
        updateProjectDom();
      }
    }
  }
  //creates a new project div in dom
  function updateProjectDom (deleteable=true) {
    projectDiv.innerHTML = "";
    //create input again

    let newProjectDiv = document.createElement('div');
    newProjectDiv.setAttribute('id', 'newProjectDiv');
    let newProjectInput = document.createElement('input');
    newProjectInput.setAttribute('id', 'newProjectInput');
    let newProjectBtn = document.createElement('div');
    newProjectBtn.setAttribute('id', 'newProject');
    newProjectBtn.textContent="+";
    newProjectDiv.appendChild(newProjectInput);
    newProjectDiv.appendChild(newProjectBtn);
    projectDiv.appendChild(newProjectDiv);

    newProjectBtn.addEventListener('click', function(){
      createNewProject(newProjectInput.value);
    })
    for (let i = 0; i<data.getTodoList().length; i++) {
      let projectContainer = document.createElement('div');
      let div = document.createElement('div');
      projectContainer.classList.add("projectDivs");
      if (data.getTodoList()[i].projectName==currentProject) {
        projectContainer.classList.add("currentProject");
      }
      div.textContent=data.getTodoList()[i].projectName;
      projectContainer.addEventListener('click', function(){
        projectObj.changeCurrentProject(data.getTodoList()[i]?data.getTodoList()[i].projectName:"All");
        if (data.getTodoList()[i].projectName=="All") {
          dashboardObj.updateAll();
        } else {
          dashboardObj.update();
        }
      })
      projectContainer.appendChild(div);
      if (data.getTodoList()[i].projectName!="All") {
        let iconDiv = document.createElement('div');
        let editIcon = svg.create({
          icon: "bi-pen-fill",
          path: "m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001",
          width: "25",
          color: "blue",
        });
        editIcon.addEventListener('click', function(){
          currentEditProject = data.getTodoList()[i].projectName;
          editMenu.style.visibility="visible";
        })
        iconDiv.appendChild(editIcon);

        let trashIcon = svg.create({
          icon: "bi-trash-fill",
          path: "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0",
          width: "25",
          color: "red",
        });
        trashIcon.addEventListener('click', function(){
          deleteProject(div.textContent);
        })
        iconDiv.appendChild(trashIcon);
        iconDiv.classList.add("iconDiv");
        projectContainer.appendChild(iconDiv);
      }

      projectDiv.appendChild(projectContainer);
    }
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

  return {
    changeCurrentProject,
    currentProject,
    todoList,
    create: createNewProject,
    getCurrentProject,
    returnTodoList,
    updateProjectDom,
    renameProject,
    returnCurrentEditProject
  }
})()


export default projectObj;