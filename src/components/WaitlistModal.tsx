import { useEffect, useRef, useState, type FormEvent } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const firstNameRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => firstNameRef.current?.focus(), 350)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const form = formRef.current
    if (!form) return

    setSubmitting(true)
    setError('')

    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      createdAt: serverTimestamp(),
    }

    try {
      await addDoc(collection(db, 'waitlist'), data)
      setSubmitted(true)

      setTimeout(() => {
        setSubmitted(false)
        form.reset()
      }, 4000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={`modal-overlay${isOpen ? ' active' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {!submitted ? (
          <div className="waitlist-form">
            <div className="modal-badge">Early Access</div>
            <h2>Join the Waitlist</h2>
            <p className="modal-subtitle">
              Be among the first to deploy AI agents built for your business.
              We'll reach out when your spot opens up.
            </p>

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                    required
                    ref={firstNameRef}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Work email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jane@acme.com"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary form-submit"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : <>Request Early Access <span className="btn-arrow">&rarr;</span></>}
              </button>
            </form>

            {error && <p className="form-note" style={{ color: '#c44' }}>{error}</p>}
            <p className="form-note">
              No spam, ever. We'll only contact you about your waitlist status.
            </p>
          </div>
        ) : (
          <div className="form-success show">
            <div className="form-success-icon">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l6 6L23 7" />
              </svg>
            </div>
            <h3>You're on the list</h3>
            <p>Thanks for your interest! We'll be in touch soon with next steps.</p>
          </div>
        )}
      </div>
    </div>
  )
}
