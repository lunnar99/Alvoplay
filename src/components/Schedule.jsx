import './Schedule.css'

const SCHEDULE = [
  { time: '06:00', show: 'Alvorada Musical', host: 'DJ Carlos', desc: 'O melhor para começar o dia' },
  { time: '09:00', show: 'Manhã de Hits', host: 'Ana Lima', desc: 'Os maiores sucessos do momento' },
  { time: '12:00', show: 'Almoço com Música', host: 'Roberto Melo', desc: 'Música boa para o seu intervalo' },
  { time: '15:00', show: 'Tarde Livre', host: 'Juliana Costa', desc: 'Variedades e novidades' },
  { time: '18:00', show: 'Rush Hour', host: 'DJ Marcos', desc: 'Animação para o final do dia' },
  { time: '21:00', show: 'Noite de Estrelas', host: 'Fernanda Neves', desc: 'Romântico e especial' },
  { time: '00:00', show: 'Madrugada Alvo', host: 'Auto DJ', desc: 'Música não para' },
]

function getCurrentShow() {
  const now = new Date()
  const minutesNow = now.getHours() * 60 + now.getMinutes()
  for (let i = SCHEDULE.length - 1; i >= 0; i--) {
    const [h, m] = SCHEDULE[i].time.split(':').map(Number)
    if (minutesNow >= h * 60 + m) return i
  }
  return SCHEDULE.length - 1
}

export default function Schedule() {
  const currentIdx = getCurrentShow()

  return (
    <section className="schedule" id="programacao" aria-label="Programação">
      <h2 className="schedule-title">Programação</h2>
      <div className="schedule-list" role="list">
        {SCHEDULE.map((item, i) => (
          <div
            key={item.time}
            className={`schedule-item ${i === currentIdx ? 'current' : ''}`}
            role="listitem"
            aria-current={i === currentIdx ? 'true' : undefined}
          >
            <div className="schedule-time">{item.time}</div>
            <div className="schedule-info">
              <div className="schedule-show">
                {item.show}
                {i === currentIdx && <span className="on-air">no ar</span>}
              </div>
              <div className="schedule-meta">{item.host} — {item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
