import { useScrollReveal } from '../hooks/useScrollReveal'
import { useStatCounter } from '../hooks/useStatCounter'

interface StatCardProps {
  target: number
  suffix: string
  label: string
  delay: string
}

function StatCard({ target, suffix, label, delay }: StatCardProps) {
  const { ref, display } = useStatCounter(target, suffix)

  return (
    <div className={`stat-card reveal ${delay}`}>
      <div className="stat-number" ref={ref}>
        {display}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

const stats = [
  { target: 87, suffix: '%', label: 'Reduction in repetitive work', delay: '' },
  { target: 3, suffix: 'x', label: 'Faster turnaround times', delay: 'reveal-delay-1' },
  { target: 40, suffix: '%', label: 'Cost savings on average', delay: 'reveal-delay-2' },
  { target: 99.9, suffix: '%', label: 'Agent uptime SLA', delay: 'reveal-delay-3' },
]

export default function Stats() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="stats" ref={ref}>
      <div className="stats-grid">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
