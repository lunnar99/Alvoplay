import './Player.css'

export default function Player({ playing, loading, volume, muted, onTogglePlay, onToggleMute, onVolumeChange }) {
  return (
    <section className="player-card" aria-label="Controles do player">
      <button
        className={`play-btn ${playing ? 'playing' : ''} ${loading ? 'loading' : ''}`}
        onClick={onTogglePlay}
        aria-label={loading ? 'Carregando' : playing ? 'Pausar' : 'Ouvir ao vivo'}
        disabled={loading}
      >
        {loading ? (
          <svg className="spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 20" />
          </svg>
        ) : playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v14l11-7-11-7z"/>
          </svg>
        )}
        <span className="play-btn-label">
          {loading ? 'Conectando…' : playing ? 'Pausar' : 'Ouvir ao vivo'}
        </span>
      </button>

      <div className="volume-control" aria-label="Controle de volume">
        <button
          className="mute-btn"
          onClick={onToggleMute}
          aria-label={muted ? 'Ativar som' : 'Silenciar'}
        >
          {muted || volume === 0 ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : volume < 0.5 ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
        <input
          type="range"
          className="volume-slider"
          min={0}
          max={1}
          step={0.02}
          value={muted ? 0 : volume}
          onChange={e => onVolumeChange(parseFloat(e.target.value))}
          aria-label="Volume"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((muted ? 0 : volume) * 100)}
        />
        <span className="volume-label" aria-hidden="true">
          {Math.round((muted ? 0 : volume) * 100)}%
        </span>
      </div>
    </section>
  )
}
