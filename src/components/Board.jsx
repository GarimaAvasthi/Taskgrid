import { DndContext, closestCorners } from '@dnd-kit/core'
import { useState, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import Column from './Column'
import AddTask from './AddTask'

export default function Board() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [searchQuery, setSearchQuery] = useState('')

  // ✅ Add Task
  function addTask(taskData) {
    const newTask = {
      id: crypto.randomUUID(),
      text: taskData.text,
      priority: taskData.priority || 'medium',
      status: 'todo',
      createdAt: new Date().toISOString(),
      position: Math.max(...tasks.filter(t => t.status === 'todo').map(t => t.position || 0), 0) + 1
    }

    setTasks((prev) => [...prev, newTask])
  }

  // ✅ Delete Task
  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  // ✅ Update Task
  function updateTask(id, updatedTask) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTask } : t))
    )
  }

  // ✅ Move Task - reset position when moving between columns
  function moveTask(id, status) {
    setTasks((prev) => {
      const tasksInNewStatus = prev.filter(t => t.status === status)
      const maxPosition = Math.max(...tasksInNewStatus.map(t => t.position || 0), -1)
      return prev.map((t) => (t.id === id ? { ...t, status, position: maxPosition + 1 } : t))
    })
  }

  // ✅ Priority order
  const priorityOrder = { high: 0, medium: 1, low: 2 }

  // ✅ Sort tasks only by position (free shuffling)
  function sortByPriority(taskList) {
    return [...taskList].sort((a, b) => (a.position || 0) - (b.position || 0));
  }

  // ✅ Drag Start
  const handleDragStart = (event) => {
    const { active } = event;
    const activeTask = tasks.find((t) => t.id === active.id);

    if (activeTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === active.id ? { ...t, isDragging: true } : t
        )
      );
    }
  };

  // ✅ Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);
    const isOverAColumn = ["todo", "progress", "done"].includes(over.id);

    if (!activeTask) return;

    // Moving to a different column
    if (isOverAColumn) {
      moveTask(active.id, over.id);
    }
    // Reordering within the same column
    else if (overTask && activeTask.status === overTask.status) {
      reorderTask(active.id, over.id);
    }

    // Reset dragging state
    setTasks((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, isDragging: false } : t))
    );
  };

  const handleDragOver = (event) => {

  };

  // Enhanced reorderTask
  function reorderTask(taskId, targetTaskId) {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === taskId)
      const targetTask = prev.find((t) => t.id === targetTaskId)

      if (!task || !targetTask || task.status !== targetTask.status) {
        return prev
      }

      // Get all tasks in the same column 
      const sameColumn = prev.filter((t) => t.status === task.status)
      const taskIdx = sameColumn.findIndex((t) => t.id === taskId)
      const targetIdx = sameColumn.findIndex((t) => t.id === targetTaskId)

      if (taskIdx === targetIdx || taskIdx === -1 || targetIdx === -1) {
        return prev
      }

      // Reorder the array
      const reordered = [...sameColumn]
      const [movedTask] = reordered.splice(taskIdx, 1)
      reordered.splice(targetIdx, 0, movedTask)

      // Create a map of task IDs to their new positions
      const positionMap = new Map()
      reordered.forEach((t, idx) => {
        positionMap.set(t.id, idx)
      })

      // Update entire task list with correct positions for the column
      return prev.map((t) => {
        if (positionMap.has(t.id)) {
          return { ...t, position: positionMap.get(t.id) }
        }
        return t
      })
    })
  }

  // Memoized filtering and sorting 
  const { todo, progress, done } = useMemo(() => {
    const filtered = tasks.filter((t) =>
      t.text.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return {
      todo: sortByPriority(filtered.filter((t) => t.status === 'todo')),
      progress: sortByPriority(filtered.filter((t) => t.status === 'progress')),
      done: sortByPriority(filtered.filter((t) => t.status === 'done'))
    }
  }, [tasks, searchQuery])

  return (
    <div className="board-container">
      {/* Controls */}
      <div className="board-controls">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <AddTask addTask={addTask} />

      {/* Drag Context */}
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="board">
          <Column
            id="todo"
            title="📝 To Do"
            tasks={todo}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />

          <Column
            id="progress"
            title="⚙️ In Progress"
            tasks={progress}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />

          <Column
            id="done"
            title="✅ Done"
            tasks={done}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        </div>
      </DndContext>
    </div>
  )
}
