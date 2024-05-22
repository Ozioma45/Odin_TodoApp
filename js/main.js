// main.js

import { updateProjectSelect, renderTasks } from "./dom.js";

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  updateProjectSelect();
  renderTasks();
});
