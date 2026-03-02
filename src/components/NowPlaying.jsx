import './NowPlaying.css'

export default function NowPlaying({ station, playing, loading }) {
  return (
    <section className="now-playing" id="player" aria-label="Tocando agora">
      <div className="album-art">
        <div className={`visualizer ${playing && !loading ? 'active' : ''}`} aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="bar" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <span className="station-emoji" role="img" aria-label="rádio">📻</span>
      </div>
      <div className="now-playing-info">
        <div className="live-badge" aria-live="polite">
          {loading ? (
            <><span className="dot loading" />Conectando…</>
          ) : playing ? (
            <><span className="dot live" />AO VIVO</>
          ) : (
            <><span className="dot off" />OFF</>
          )}
        </div>
        <h1 className="station-title">{station.name}</h1>
        <p className="station-subtitle">{station.description}</p>
        <span className="genre-tag">{station.genre}</span>
      </div>
    </section>
  )
}
