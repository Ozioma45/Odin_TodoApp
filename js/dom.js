// dom.js

import {
  projects,
  createProject,
  addTodo,
  deleteTodo,
  getTodos,
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

let checklistItems = [];

export function updateProjectSelect() {
  projectSelect.innerHTML = "";
  for (let project in projects) {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    projectSelect.appendChild(option);
  }
  projectSelect.value = currentProject;
}

export function renderTasks() {
  todoList.innerHTML = "";
  getTodos().forEach((task) => {
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
