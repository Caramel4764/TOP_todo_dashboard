let data = (function(){
  /*
  FORMAT
    newProject: {
      projectName: projectName,
      isCompleted:false,
      title: title,
      desc: desc,
      dueDate: due,
      priority: priority,
      note: note,
    },
    todos: [],
    projectName:value,
  */

  let todoList = [];
  function getTodoList() {
    return todoList;
  }
  function addTodoList(task) {
    todoList.push(task);
  }
  function setTodoList(newTodo) {
    todoList = newTodo;
  }
  function deleteTodoList(index) {
    todoList.splice(index, 1);
  }
  return {
    getTodoList,
    addTodoList,
    setTodoList,
    deleteTodoList
  }
})()

export default data;