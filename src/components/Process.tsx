import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    num: 1,
    title: 'Discovery',
    description:
      'We map your entire operation, identify where AI can reshape how your business works, and define success metrics.',
    delay: '',
  },
  {
    num: 2,
    title: 'Design',
    description:
      'Our team architects custom agents tailored to your specific processes and system integrations.',
    delay: 'reveal-delay-1',
  },
  {
    num: 3,
    title: 'Deploy',
    description:
      'Agents go live in your environment with monitoring, guardrails, and human-in-the-loop controls.',
    delay: 'reveal-delay-2',
  },
  {
    num: 4,
    title: 'Optimize',
    description:
      'Continuous improvement driven by real performance data. Your agents get smarter over time.',
    delay: 'reveal-delay-3',
  },
]

export default function Process() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="process" id="process" ref={ref}>
      <div className="process-inner">
        <div className="section-label reveal">How it works</div>
        <h2 className="section-heading reveal reveal-delay-1">
          From discovery to deployment in weeks, not months
        </h2>
        <p className="section-subtext reveal reveal-delay-2">
          A proven process that transforms your operations with AI — quickly and
          safely.
        </p>

        <div className="process-grid">
          {steps.map((s) => (
            <div key={s.num} className={`process-step reveal ${s.delay}`}>
              <div className="process-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
