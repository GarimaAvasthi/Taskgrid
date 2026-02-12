export default function ThemeSwitcher() {
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'pink' ? '' : theme)
  }

  return (
    <div className="theme-switcher">
      <button onClick={() => setTheme('pink')} className="theme-btn" title="pink Theme">
        🩷
      </button>
      <button onClick={() => setTheme('peach')} className="theme-btn" title="Peach Theme">
        🧡
      </button>
      <button onClick={() => setTheme('mint')} className="theme-btn" title="Mint Theme">
        💚
      </button>
      <button onClick={() => setTheme('lavender')} className="theme-btn" title="Lavender Theme">
        💜
      </button>
    </div>
  )
}