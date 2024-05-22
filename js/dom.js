// dom.js

import {
  projects,
  createProject,
  addTodo,
  deleteTodo,
  getTodos,
  getTodoByIndex,
  updateTodo,
  setCurrentProject,
} from "./logic.js";

const projectSelect = document.getElementById("project-select");
const newProjectInput = document.getElementById("new-project-input");
const addProjectBtn = document.getElementById("add-project-btn");
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
const currentProjectTitle = document.getElementById("current-project-title");

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");
const editTitleInput = document.getElementById("edit-title-input");
const editDescriptionInput = document.getElementById("edit-description-input");
const editDueDateInput = document.getElementById("edit-due-date-input");
const editPriorityInput = document.getElementById("edit-priority-input");
const editNotesInput = document.getElementById("edit-notes-input");
const editChecklistItemInput = document.getElementById(
  "edit-checklist-item-input"
);
const editAddChecklistItemBtn = document.getElementById(
  "edit-add-checklist-item-btn"
);
const editChecklist = document.getElementById("edit-checklist");
const saveBtn = document.getElementById("save-btn");

let checklistItems = [];
let editChecklistItems = [];
let currentEditIndex = null;

export function updateProjectSelect() {
  projectSelect.innerHTML = "";
  for (let project in projects) {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    projectSelect.appendChild(option);
  }
  projectSelect.value = currentProject;
  updateProjectList();
}

export function updateProjectList() {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";
  for (let project in projects) {
    const listItem = document.createElement("li");
    listItem.textContent = project;
    listItem.addEventListener("click", () => {
      setCurrentProject(project);
      currentProjectTitle.textContent = project;
      renderTasks();
    });
    projectList.appendChild(listItem);
  }
}

export function renderTasks() {
  todoList.innerHTML = "";
  getTodos().forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.dataset.priority = task.priority;
    listItem.innerHTML = `
            <strong>${task.title}</strong>
            <p>Due: ${task.dueDate}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

    const editBtn = listItem.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
      currentEditIndex = index;
      openEditModal(task);
    });

    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteTodo(task);
      renderTasks();
    });

    todoList.appendChild(listItem);
  });
}

addProjectBtn.addEventListener("click", () => {
  const projectName = newProjectInput.value.trim();
  if (createProject(projectName)) {
    newProjectInput.value = "";
    updateProjectSelect();
    renderTasks();
  }
});

projectSelect.addEventListener("change", () => {
  setCurrentProject(projectSelect.value);
  currentProjectTitle.textContent = projectSelect.value;
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

addBtn.addEventListener("click", () => {
  const task = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
    notes: notesInput.value.trim(),
    checklist: [...checklistItems],
    status: "Pending",
    creationDate: new Date().toISOString().split("T")[0],
  };

  if (addTodo(task)) {
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "Low";
    notesInput.value = "";
    checklistItems = [];
    checklist.innerHTML = "";
    renderTasks();
  }
});

function openEditModal(task) {
  editTitleInput.value = task.title;
  editDescriptionInput.value = task.description;
  editDueDateInput.value = task.dueDate;
  editPriorityInput.value = task.priority;
  editNotesInput.value = task.notes;
  editChecklistItems = [...task.checklist];
  editChecklist.innerHTML = "";
  editChecklistItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    editChecklist.appendChild(listItem);
  });
  modal.style.display = "block";
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

editAddChecklistItemBtn.addEventListener("click", () => {
  const itemText = editChecklistItemInput.value.trim();
  if (itemText) {
    editChecklistItems.push(itemText);
    const listItem = document.createElement("li");
    listItem.textContent = itemText;
    editChecklist.appendChild(listItem);
    editChecklistItemInput.value = "";
  }
});

saveBtn.addEventListener("click", () => {
  const updatedTask = {
    title: editTitleInput.value.trim(),
    description: editDescriptionInput.value.trim(),
    dueDate: editDueDateInput.value,
    priority: editPriorityInput.value,
    notes: editNotesInput.value.trim(),
    checklist: [...editChecklistItems],
    status: "Pending",
    creationDate: getTodoByIndex(currentEditIndex).creationDate,
  };
  updateTodo(currentEditIndex, updatedTask);
  modal.style.display = "none";
  renderTasks();
});
