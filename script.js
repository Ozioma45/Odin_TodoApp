document.addEventListener("DOMContentLoaded", () => {
  const addProjectBtn = document.getElementById("add-project-btn");
  const newProjectInput = document.getElementById("new-project-input");
  const projectSelect = document.getElementById("project-select");
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

  let projects = {
    Default: [],
  };
  let currentProject = "Default";
  let checklistItems = [];

  function updateProjectSelect() {
    projectSelect.innerHTML = "";
    for (let project in projects) {
      const option = document.createElement("option");
      option.value = project;
      option.textContent = project;
      projectSelect.appendChild(option);
    }
    projectSelect.value = currentProject;
  }

  addProjectBtn.addEventListener("click", () => {
    const projectName = newProjectInput.value.trim();
    if (projectName && !projects[projectName]) {
      projects[projectName] = [];
      currentProject = projectName;
      newProjectInput.value = "";
      updateProjectSelect();
      renderTasks();
    }
  });

  projectSelect.addEventListener("change", () => {
    currentProject = projectSelect.value;
    renderTasks();
  });

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
      const task = {
        title,
        description,
        dueDate,
        priority,
        notes,
        checklist: [...checklistItems],
        status: "Pending",
        creationDate: new Date().toISOString().split("T")[0],
      };

      projects[currentProject].push(task);
      renderTasks();

      titleInput.value = "";
      descriptionInput.value = "";
      dueDateInput.value = "";
      priorityInput.value = "Low";
      notesInput.value = "";
      checklistItems = [];
      checklist.innerHTML = "";
    }
  }

  function renderTasks() {
    todoList.innerHTML = "";
    projects[currentProject].forEach((task) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <p>Priority: ${task.priority}</p>
                <p>Notes: ${task.notes}</p>
                <ul>
                    ${task.checklist.map((item) => `<li>${item}</li>`).join("")}
                </ul>
                <button class="delete-btn">Delete</button>
            `;

      const deleteBtn = listItem.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        projects[currentProject] = projects[currentProject].filter(
          (t) => t !== task
        );
        renderTasks();
      });

      todoList.appendChild(listItem);
    });
  }

  // Initialize
  updateProjectSelect();
  renderTasks();
});
