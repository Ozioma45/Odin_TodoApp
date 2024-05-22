// logic.js

export let projects = {
  Default: [],
};
export let currentProject = "Default";

export function createProject(projectName) {
  if (projectName && !projects[projectName]) {
    projects[projectName] = [];
    currentProject = projectName;
    return true;
  }
  return false;
}

export function addTodo(task) {
  if (task && task.title) {
    projects[currentProject].push(task);
    return true;
  }
  return false;
}

export function deleteTodo(task) {
  projects[currentProject] = projects[currentProject].filter((t) => t !== task);
}

export function getTodos() {
  return projects[currentProject];
}

export function getTodoByIndex(index) {
  return projects[currentProject][index];
}

export function updateTodo(index, updatedTask) {
  projects[currentProject][index] = updatedTask;
}

export function setCurrentProject(projectName) {
  if (projects[projectName]) {
    currentProject = projectName;
  }
}
