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
  currentProject,
} from "./logic.js";
import { format } from "date-fns";

const projectSelect = document.getElementById("project-select");
const newProjectInput = document.getElementById("new-project-input");
const addProjectBtn = document.getElementById("add-project-btn");
const addBtn = document.getElementById("add-btn");
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const dueDateInput = document.getElementById("due-date-input");
const priorityInput = document.getElementById("priority-input");
const todoList = document.getElementById("todo-list");
const currentProjectTitle = document.getElementById("current-project-title");

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close-btn");
const editTitleInput = document.getElementById("edit-title-input");
const editDescriptionInput = document.getElementById("edit-description-input");
const editDueDateInput = document.getElementById("edit-due-date-input");
const editPriorityInput = document.getElementById("edit-priority-input");

const saveBtn = document.getElementById("save-btn");
const newTBtn = document.getElementById("newTBtn");
const addTodoD = document.getElementById("add-todo");

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
  console.log("Updating Project List"); //TESTING AND TROUBLESHOOTING
  projectList.innerHTML = "";
  for (let project in projects) {
    console.log("Adding project:", project); //TESTING AND TROUBLESHOOTING
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
            <p>${task.description}</p>
            <strong>Priority:<span id='priority'> ${
              task.priority
            }</span></strong>
            <p>Due: ${format(new Date(task.dueDate), "MM/dd/yyyy")}</p>
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

    const priorityMain = listItem.querySelector("#priority");
    if (task.priority === "High") {
      priorityMain.classList.add("High");
    } else if (task.priority === "Medium") {
      priorityMain.classList.add("Medium");
    } else {
      priorityMain.classList.add("Low");
    }

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
  currentProjectTitle.textContent = `${projectSelect.value}'s Tasks`;
  renderTasks();
});

addBtn.addEventListener("click", () => {
  if (titleInput.value === "") {
    alert("You didn't add any task");
  }
  const task = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
    status: "Pending",
    creationDate: new Date().toISOString().split("T")[0],
  };

  if (addTodo(task)) {
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "Low";
    renderTasks();
  }

  addTodoD.classList.add("hide");
  newTBtn.classList.remove("hide");
});

function openEditModal(task) {
  editTitleInput.value = task.title;
  editDescriptionInput.value = task.description;
  editDueDateInput.value = task.dueDate;
  editPriorityInput.value = task.priority;
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

saveBtn.addEventListener("click", () => {
  const updatedTask = {
    title: editTitleInput.value.trim(),
    description: editDescriptionInput.value.trim(),
    dueDate: editDueDateInput.value,
    priority: editPriorityInput.value,
    status: "Pending",
    creationDate: getTodoByIndex(currentEditIndex).creationDate,
  };
  updateTodo(currentEditIndex, updatedTask);
  modal.style.display = "none";
  renderTasks();
});

newTBtn.addEventListener("click", () => {
  addTodoD.classList.remove("hide");
  newTBtn.classList.add("hide");
});
