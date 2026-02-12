import { useState } from 'react'
import Board from './components/Board'
import Timer from './components/Timer'
import ThemeSwitcher from './components/ThemeSwitcher'

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-left">
          <h1>✨ TaskGrid</h1>
          <Timer />
        </div>
        <ThemeSwitcher />
      </nav>
      <Board />
    </div>
  )
}