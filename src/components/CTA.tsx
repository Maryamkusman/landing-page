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
          Ready to transform
          <br />
          how your business operates?
        </h2>
        <p className="reveal reveal-delay-2">
          We're partnering with a limited number of businesses to deliver
          full-scale AI transformation — from operations to strategy.
        </p>
        <button
          className="btn btn-primary btn-large reveal reveal-delay-3"
          onClick={onOpenModal}
        >
          Contact Us <span className="btn-arrow">&rarr;</span>
        </button>
      </div>
    </section>
  )
}
