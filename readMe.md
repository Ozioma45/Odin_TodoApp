# Advanced To-Do List App

Welcome to the Advanced To-Do List App! This project is part of the Odin Project's JavaScript Full Stack curriculum. It provides a practical application of DOM manipulation, module patterns, and local storage in JavaScript.

## Live Preview

You can view a live preview of the project [here](https://ozioma45.github.io/Odin_TodoApp/).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Project Management**: Create and manage multiple projects.
- **Task Management**: Add, edit, delete, and view tasks.
- **Priority Levels**: Set priority levels for tasks (Low, Medium, High).
- **Due Dates**: Assign due dates to tasks.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Local Storage**: Persists projects and tasks across browser sessions.

## Technologies Used

- **JavaScript**: Core functionality.
- **HTML**: Structure of the web page.
- **CSS**: Styling of the application.
- **Webpack**: Module bundler.
- **date-fns**: Utility library for date formatting.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/ozioma45/Odin_TodoApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Odin_TodoApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Open `index.html` in your browser, or run a local server to view the project.

## Usage

### Adding a New Project

1. Enter a project name in the "New project name" input field.
2. Click the "Add Project" button.
3. The new project will appear in the project list.

### Adding a New Task

1. Select a project from the dropdown menu.
2. Click the "Add New Task" button.
3. Fill in the task details (title, description, due date, priority).
4. Click the "Add Task" button.
5. The new task will appear in the task list for the selected project.

### Editing a Task

1. Click the "Edit" button next to the task you want to edit.
2. Modify the task details in the modal.
3. Click the "Save Changes" button.

### Deleting a Task

1. Click the "Delete" button next to the task you want to remove.
2. The task will be removed from the list.

## Project Structure

```
Odin_TodoApp/
├── dist/
│   ├── bundle.js
│   └── index.html
├── src/
│   ├── index.js
│   ├── logic.js
│   └── dom.js
├── styles/
│   └── style.css
├── .babelrc
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js
```

- `dist/`: Contains the bundled JavaScript and HTML files for deployment.
- `src/`: Contains the source JavaScript files.
  - `index.js`: Entry point for the application.
  - `logic.js`: Contains the core logic for managing projects and tasks.
  - `dom.js`: Handles DOM manipulation and user interactions.
- `styles/`: Contains the CSS file for styling.
- `.babelrc`: Babel configuration file.
- `.gitignore`: Specifies files to be ignored by Git.
- `package.json`: Lists project dependencies and scripts.
- `webpack.config.js`: Webpack configuration file.

## Future Enhancements

- **User Authentication**: Allow users to sign up and log in to save their projects and tasks online.
- **Notifications**: Implement reminders for upcoming due dates.
- **Drag and Drop**: Enable drag-and-drop functionality for organizing tasks within projects.
- **Search and Filter**: Add the ability to search and filter tasks based on various criteria.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
