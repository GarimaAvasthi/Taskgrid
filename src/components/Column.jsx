import { useDroppable } from '@dnd-kit/core'
import TaskCard from './TaskCard'

export default function Column({ title, tasks, deleteTask, updateTask, id }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className="column">
      <h3 className="column-title">
        {title}
        <span className="task-count">{tasks.length}</span>
      </h3>
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))
        )}
      </div>
    </div>
  )
}