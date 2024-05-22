document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const titleInput = document.getElementById("title-input");
  const descriptionInput = document.getElementById("description-input");
  const dueDateInput = document.getElementById("due-date-input");
  const priorityInput = document.getElementById("priority-input");
  const notesInput = document.getElementById("notes-input");
  const checklistItemInput = document.getElementById("checklist-item-input");
  const addChecklistItemBtn = document.getElementById("add-checklist-item-btn");
  const checklist = document.getElementById("checklist");
  const todoList = document.getElementById("todo-list");

  let checklistItems = [];

  addChecklistItemBtn.addEventListener("click", () => {
    const itemText = checklistItemInput.value.trim();
    if (itemText) {
      checklistItems.push(itemText);
      const listItem = document.createElement("li");
      listItem.textContent = itemText;
      checklist.appendChild(listItem);
      checklistItemInput.value = "";
    }
  });

  addBtn.addEventListener("click", addTodo);

  function addTodo() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    const notes = notesInput.value.trim();

    if (title) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <strong>${title}</strong>
                <p>${description}</p>
                <p>Due: ${dueDate}</p>
                <p>Priority: ${priority}</p>
                <p>Notes: ${notes}</p>
                <ul>
                    ${checklistItems.map((item) => `<li>${item}</li>`).join("")}
                </ul>
                <button class="delete-btn">Delete</button>
            `;

      const deleteBtn = listItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        todoList.removeChild(listItem);
      });

      todoList.appendChild(listItem);

      titleInput.value = "";
      descriptionInput.value = "";
      dueDateInput.value = "";
      priorityInput.value = "Low";
      notesInput.value = "";
      checklistItems = [];
      checklist.innerHTML = "";
    }
  }
});
