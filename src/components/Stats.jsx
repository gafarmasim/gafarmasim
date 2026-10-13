const STATS = [
  { value: '12+', label: 'il təcrübə' },
  { value: '4 800+', label: 'təmir olunan avtomobil' },
  { value: '98%', label: 'məmnun müştəri' },
  { value: '6 ay', label: 'işə zəmanət' },
]

export default function Stats() {
  return (
    <section className="stats" aria-label="Rəqəmlərlə biz">
      <div className="container stats__grid">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
