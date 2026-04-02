import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: 'teal',
    title: 'End-to-End Process Transformation',
    description:
      'Agents that reshape entire workflows — from intake and triage to execution and reporting — so your team operates at a fundamentally higher level.',
    svgPath: <path d="M4.5 12.75l6 6 9-13.5" />,
    delay: '',
  },
  {
    icon: 'gold',
    title: 'Intelligent Routing',
    description:
      'AI that understands context, prioritizes tasks, and routes work to the right people or systems in real time.',
    svgPath: <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />,
    delay: 'reveal-delay-1',
  },
  {
    icon: 'warm',
    title: 'Document Processing',
    description:
      'Extract, classify, and act on information from any document type — contracts, invoices, reports, emails, and more.',
    svgPath: (
      <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    ),
    delay: 'reveal-delay-2',
  },
  {
    icon: 'teal',
    title: 'Predictive Analytics',
    description:
      'Agents that monitor your data streams, identify patterns, and surface insights before you even know to look for them.',
    svgPath: (
      <path d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    ),
    delay: '',
  },
  {
    icon: 'gold',
    title: 'System Integration',
    description:
      'Seamless connections to your CRM, ERP, databases, and SaaS tools. Your agents work within your existing stack.',
    svgPath: (
      <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-6.364-6.364L4.5 8.25" />
    ),
    delay: 'reveal-delay-1',
  },
  {
    icon: 'warm',
    title: 'Enterprise Security',
    description:
      'SOC 2 compliant infrastructure with role-based access, audit logging, and data encryption at every layer.',
    svgPath: (
      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    ),
    delay: 'reveal-delay-2',
  },
]

export default function Features() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="features" id="features" ref={ref}>
      <div className="section-label reveal">What we do</div>
      <h2 className="section-heading reveal reveal-delay-1">
        AI woven into <em>every</em> part of your business
      </h2>
      <p className="section-subtext reveal reveal-delay-2">
        Not point solutions — we deploy AI across your entire operation,
        transforming how your team works, decides, and grows.
      </p>

      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className={`feature-card reveal ${f.delay}`}>
            <div className={`feature-icon icon-${f.icon}`}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {f.svgPath}
              </svg>
            </div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
