import { useEffect, useState } from 'react'

export default function Timer() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="timer">
      <span className="clock-emoji">🕐</span>
      <span className="time-display">{time.toLocaleTimeString()}</span>
    </div>
  )
}