import './Header.css'

export default function Header({ station }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon" aria-hidden="true">📻</span>
          <span className="logo-name">{station.name}</span>
        </div>
        <nav className="nav">
          <a href="#player" className="nav-link">Player</a>
          <a href="#programacao" className="nav-link">Programação</a>
          <a href={station.website} className="nav-link" target="_blank" rel="noopener noreferrer">Site</a>
        </nav>
      </div>
    </header>
  )
}
