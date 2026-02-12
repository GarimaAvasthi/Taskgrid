import { useState } from 'react'

export default function AddTask({ addTask }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')

  // Priority configuration
  const priorities = {
    high: { label: '🔴 High', color: '#dc3545' },
    medium: { label: '🟡 Medium', color: '#ffc107' },
    low: { label: '🟢 Low', color: '#28a745' }
  }

  function handle() {
    if (!text.trim()) return
    addTask({
      text: text.trim(),
      priority
    })
    setText('')
    setPriority('medium')
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handle()
    }
  }

  return (
    <div className="add-task-container">
      <div className="add-task">
        <input
          value={text}
          placeholder="Add a new task..."
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="task-input"
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
          title="Select task priority"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        <button onClick={handle} className="add-btn">+ Add</button>
      </div>
    </div>
  )
}