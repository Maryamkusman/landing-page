import { useScrollReveal } from '../hooks/useScrollReveal'

interface CTAProps {
  onOpenModal: () => void
}

export default function CTA({ onOpenModal }: CTAProps) {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="cta" ref={ref}>
      <div className="cta-inner">
        <div className="section-label reveal">Get started</div>
        <h2 className="reveal reveal-delay-1">
          Ready to put AI agents
          <br />
          to work for your business?
        </h2>
        <p className="reveal reveal-delay-2">
          Join the waitlist for early access. We're onboarding a limited number
          of partners to ensure exceptional results for every client.
        </p>
        <button
          className="btn btn-primary btn-large reveal reveal-delay-3"
          onClick={onOpenModal}
        >
          Join the Waitlist <span className="btn-arrow">&rarr;</span>
        </button>
      </div>
    </section>
  )
}
