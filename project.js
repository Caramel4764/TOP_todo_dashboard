import dashboardObj from "./dashboard.js";
import svg from "./svg.js";
let projectDiv = document.getElementById('project');

let projectObj = (function(){
  let currentProject = "All";
  let todoList = [];
  //changes current project
  function changeCurrentProject (projectName) {
    currentProject = projectName;
  }
  function returnTodoList () {
    return todoList;
  }
  function getCurrentProject () {
    return currentProject;
  }
  //creates a new project to array list
  function createNewProject(value, isAll) {
    if (doesProjectExist(value)) {
      Alert("A project with that name already exists.");
    } else {
      let newProject = createProject(value);
      let projectCat = {
        newProject,
        todos: [],
        projectName:value,
      }
      projectObj.todoList.push(projectCat);
      updateProjectDom();
    }
  }
  function doesProjectExist(value) {
    for (let i = 0; i<projectObj.todoList.length; i++) {
      if (value==projectObj.todoList[i].projectName) {
        return true;
      }
    }
    return false;
  }
  function deleteProject (projectName) {
    for (let i = 0; i<projectObj.todoList.length; i++) {
      if (projectName==projectObj.todoList[i].projectName) {
        let targetProject = projectObj.todoList[i];
        projectObj.todoList.splice(i, 1);
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
    for (let i = 0; i<projectObj.todoList.length; i++) {
      let projectContainer = document.createElement('div');
      let div = document.createElement('div');
      projectContainer.classList.add("projectDivs");
      div.textContent=projectObj.todoList[i].projectName;
      div.addEventListener('click', function(){
        projectObj.changeCurrentProject(projectObj.todoList[i]?projectObj.todoList[i].projectName:"All");
        if (projectObj.todoList[i].projectName=="All") {
          dashboardObj.updateAll();
        } else {
          dashboardObj.update();
        }
      })
      projectContainer.appendChild(div);
      if (projectObj.todoList[i].projectName!="All") {
        let iconDiv = document.createElement('div');
        let editIcon = svg.create({
          icon: "bi-pen-fill",
          path: "m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001",
          width: "25",
          color: "blue",
        });
        editIcon.addEventListener('click', function(){

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
  }
})()


export default projectObj;