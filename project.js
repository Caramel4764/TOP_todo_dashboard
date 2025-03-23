import dashboardObj from "./dashboard.js";

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
    let newProject = createProject(value);
    addProjectDom(value, isAll);
    let projectCat = {
      newProject,
      todos: [],
      projectName:value,
    }
    projectObj.todoList.push(projectCat);
  }
  
  //creates a new project div in dom
  function addProjectDom (projectName, isAll=false) {

    let div = document.createElement('div');
    div.classList.add("projectDivs");
    div.textContent=projectName;
    div.addEventListener('click', function(){
      projectObj.changeCurrentProject(projectName);
      if (isAll) {
        dashboardObj.updateAll();
      } else {
        dashboardObj.update();

      }
    })
    projectDiv.appendChild(div);
  }
  function addProjectDomAll (projectName) {
    let div = document.createElement('div');
    div.classList.add("projectDivs");
    div.textContent=projectName;
    div.addEventListener('click', function(){
      projectObj.changeCurrentProject(projectName);
      dashboardObj.updateAll();
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

  return {
    changeCurrentProject,
    currentProject,
    todoList,
    create: createNewProject,
    getCurrentProject,
    returnTodoList,
    addProjectDomAll,
  }
})()


export default projectObj;