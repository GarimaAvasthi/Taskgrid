import { useDraggable } from '@dnd-kit/core'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function TaskCard({ task, deleteTask, updateTask }) {

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const inputRef = useRef(null)
  const cardRef = useRef(null)

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      disabled: isEditing,

      // Prevent accidental drags
      activationConstraint: {
        distance: 8,
      },
    })

  // Sync text if task updates externally
  useEffect(() => {
    setEditText(task.text)
  }, [task.text])

  // Auto focus
  useEffect(() => {
    if (isEditing && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      })
    }
  }, [isEditing])

  // Format date
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }, [])

  // Drag transform
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
      }
    : undefined

  // Save edit
  const handleSaveEdit = useCallback(() => {
    const trimmed = editText.trim()

    if (trimmed && trimmed !== task.text) {
      updateTask(task.id, { text: trimmed })
    }

    setIsEditing(false)
  }, [editText, task, updateTask])

  // Keyboard
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSaveEdit()
      }

      if (e.key === 'Escape') {
        setEditText(task.text)
        setIsEditing(false)
      }
    },
    [handleSaveEdit, task.text]
  )

  // Delete animation
  const handleDeleteClick = useCallback(
    (e) => {
      e.stopPropagation()

      const el = cardRef.current

      if (el) {
        el.classList.add('deleting')

        setTimeout(() => {
          deleteTask(task.id)
        }, 250)
      } else {
        deleteTask(task.id)
      }
    },
    [task.id, deleteTask]
  )

  return (
    <div
      ref={(el) => {
        setNodeRef(el)
        cardRef.current = el
      }}
      style={style}
      className={`task-card priority-${task.priority}`}
    >
      {/*  DRAG HANDLE */}
      <div className="drag-handle" {...listeners} {...attributes}>
        ☰
      </div>

      <div className="task-content">
        {isEditing ? (
          <div
            className="task-edit-wrapper"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              className="task-edit-input"
              placeholder="Edit task..."
            />

            <div className="edit-hint">
              Enter → save • Esc → cancel
            </div>
          </div>
        ) : (
          <div className="task-view">
            <p
              className="task-text"
              onClick={() => setIsEditing(true)}
              title="Click to edit"
            >
              {task.text}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleDeleteClick}
        className="delete-btn"
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  )
}
