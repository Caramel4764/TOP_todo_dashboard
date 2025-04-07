let data = (function(){
  let todoList = [];
  /*
  FORMAT
    newProject: function createTodoInProject() {}
    todos: [{
      projectName: projectName,
      isCompleted:false,
      title: title,
      desc: desc,
      dueDate: due,
      priority: priority,
      note: note,
    },],
    projectName: nameOfProject,
  */
 function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
 }
  function getTodoList() {
    //console.log(todoList);
    return todoList;
  }
  function addTodoList(task) {
    todoList.push(task);
    updateLocalStorage();
  }
  function setTodoList(newTodo) {
    todoList = newTodo;
    updateLocalStorage();

  }
  function deleteTodoList(index) {
    todoList.splice(index, 1);
    updateLocalStorage();

  }
  function addSingleTodo(index, task) {
    todoList[index].todos.push(task);
  }
  return {
    getTodoList,
    addTodoList,
    setTodoList,
    deleteTodoList,
    addSingleTodo,
    updateLocalStorage,
  }
})()

export default data;