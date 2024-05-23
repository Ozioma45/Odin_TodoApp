// logic.js

import { format } from "date-fns";

export let projects = JSON.parse(localStorage.getItem("projects")) || {
  Default: [],
};
export let currentProject = localStorage.getItem("currentProject") || "Default";

export function createProject(projectName) {
  if (projectName && !projects[projectName]) {
    projects[projectName] = [];
    currentProject = projectName;
    saveToLocalStorage();
    return true;
  }
  return false;
}

export function addTodo(task) {
  if (task && task.title) {
    projects[currentProject].push(task);
    saveToLocalStorage();
    return true;
  }
  return false;
}

export function deleteTodo(task) {
  projects[currentProject] = projects[currentProject].filter((t) => t !== task);
  saveToLocalStorage();
}

export function getTodos() {
  return projects[currentProject];
}

export function getTodoByIndex(index) {
  return projects[currentProject][index];
}

export function updateTodo(index, updatedTask) {
  projects[currentProject][index] = updatedTask;
  saveToLocalStorage();
}

export function setCurrentProject(projectName) {
  if (projects[projectName]) {
    currentProject = projectName;
    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("currentProject", currentProject);
}
