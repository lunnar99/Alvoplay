import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Player from './components/Player'
import NowPlaying from './components/NowPlaying'
import Schedule from './components/Schedule'
import './App.css'

// Example stream URL – replace with the real Alvoplay stream URL when available
const STREAM_URL = 'https://stream.zeno.fm/0r0xa792kwzuv'

const STATION = {
  name: 'Alvoplay',
  genre: 'Variedades',
  description: 'Sua rádio online – as melhores músicas, 24 horas por dia.',
  website: 'https://alvoplay.com',
}

export default function App() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onWaiting = () => setLoading(true)
    const onCanPlay = () => setLoading(false)
    const onError = () => {
      setLoading(false)
      setPlaying(false)
      setError('Não foi possível conectar ao stream. Tente novamente.')
    }
    const onPlaying = () => {
      setLoading(false)
      setError(null)
    }

    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('error', onError)
    audio.addEventListener('playing', onPlaying)

    return () => {
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('playing', onPlaying)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume
    }
  }, [volume, muted])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    setError(null)
    if (playing) {
      audio.pause()
      audio.src = ''
      setPlaying(false)
    } else {
      setLoading(true)
      audio.src = STREAM_URL
      audio.play().catch(() => {
        setError('Erro ao iniciar a reprodução.')
        setLoading(false)
      })
      setPlaying(true)
    }
  }

  const toggleMute = () => setMuted(m => !m)

  const handleVolumeChange = (val) => {
    setVolume(val)
    setMuted(val === 0)
  }

  return (
    <div className="app">
      <audio ref={audioRef} preload="none" />
      <Header station={STATION} />
      <main className="main">
        <NowPlaying station={STATION} playing={playing} loading={loading} />
        <Player
          playing={playing}
          loading={loading}
          volume={volume}
          muted={muted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          onVolumeChange={handleVolumeChange}
        />
        {error && (
          <div className="error-banner" role="alert">
            <span>⚠️ {error}</span>
          </div>
        )}
        <Schedule />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Alvoplay – Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
