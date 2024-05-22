document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  function addTodo() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
      const listItem = document.createElement("li");

      const taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      listItem.appendChild(taskSpan);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        todoList.removeChild(listItem);
      });
      listItem.appendChild(deleteBtn);

      todoList.appendChild(listItem);
      todoInput.value = "";
      todoInput.focus();
    } else {
      alert("Please Insert a Task");
    }
  }
});
