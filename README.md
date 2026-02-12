# ✨ TaskGrid - Kanban Style Task Managing Application

A modern,and performant **Task management application** built with React, Vite, and drag-and-drop functionality.
Perfect for organizing your tasks by status and priority!

![TaskGrid](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---
The project is deployed on Vercel and can be accessed at:
https://assignment-1-seven-rho.vercel.app/

##  Features
- **TaskBoard**: Organize tasks into three columns - *To Do*, *In Progress*, and *Done*
- **Drag & Drop**: Smoothly drag tasks between columns and reorder within the same column
- **Priority System**: Set task priority as High, Medium, or Low with visual indicators
- **Task Search**: Filter tasks in real-time using the search bar
- **Task Editing**: Single-click to edit task
- **Task Deletion**: Remove tasks with a beautiful fade-out animation
- **Count Badge**: See the number of tasks in each column at a glance
- **Global Timer**: Real-time clock display in the navigation bar
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Themes**: 4 diffrent color themes are provided
- **Local Storage**: All tasks are automatically saved to browser storage
- **Auto-Save**: Changes are instantly persisted without manual save button
- **Data Recovery**: Your tasks are preserved even after closing the browser

---

### Tech-stack Used
- **React 18+**: UI framework with hooks
- **Vite**: Fast build tool and dev server
- **@dnd-kit/core**: Drag-and-drop library
- **dnd-kit/sortable**: Sortable utilities

---
## Project Structure

```
taskgrid/
├── src/
│   ├── components/
│   │   ├── AddTask.jsx          
│   │   ├── Board.jsx           
│   │   ├── Column.jsx           
│   │   ├── TaskCard.jsx        
│   │   ├── ThemeSwitcher.jsx   
│   │   └── Timer.jsx           
│   ├── hooks/
│   │   └── useLocalStorage.js   
│   ├── styles/
│   │   └── theme.css           
│   ├── App.jsx                 
│   └── main.jsx                
├── public/                    
├── index.html                  
├── package.json                
├── vite.config.js 
├── Prompts.md         
└── README.md                    
```

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GarimaAvasthi/Taskgrid.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open the browser and go to**:
   ```bash
   http://localhost:5173
   ```

---

## 📖 User Guide

### Adding a Task
1. Type your task description in the input field at the top
2. Select a priority level (High, Medium, Low)
3. Click the **"Add"** button or press Enter
4. Your task appears in the *To Do* column

### Editing a Task
1. Click on the task text you want to edit
2. The task enters edit mode with the text pre-selected
3. Make your changes
4. Press **Enter** to save or **Escape** to cancel
5. Alternatively, click outside the input to save

### Moving Tasks
1. **Drag a task** to move it between columns (*To Do* → *In Progress* → *Done*)
2. **Reorder tasks** within the same column by dragging
3. Tasks stay sorted by priority automatically

### Deleting a Task
1. Click the **✕** button on the task card
2. The task slides out smoothly and is removed
3. The deletion cannot be undone from the UI (but check your browser's undo)

### Searching Tasks
1. Use the **🔍 Search** input to filter tasks
2. Search works across all columns in real-time
3. Clear the search to see all tasks again

### Changing Themes
1. Click the **theme emoji buttons** in the top-right navbar
2. **🩷** = Pink (Default)
3. **🧡** = Peach
4. **💚** = Mint Green
5. **💜** = Lavender
6. Theme preference is saved automatically

---

### Key Components

#### Board.jsx
- Main container for the kanban board
- Manages task state and operations
- Handles drag-and-drop logic
- Implements priority-based sorting


## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Click task** | Edit task |
| **Enter** | Save task edit |
| **Escape** | Cancel task edit |
| **Click outside** | Save task edit |
| **Drag task** | Move between columns |

---

## Task Priority Levels

- **🔴 High**: Important tasks that need immediate attention
- **🟡 Medium**: Regular tasks with moderate priority
- **🟢 Low**: Tasks that can be done when there's time

---

##  Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

---

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

