import { useEffect, useState } from 'react'

interface NavbarProps {
  onOpenModal: () => void
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="logo">
        <div className="logo-mark">W</div>
        WDZ Solutions
      </a>
      <button
        className="nav-toggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li>
          <a href="#features" onClick={() => setMenuOpen(false)}>Solutions</a>
        </li>
        <li>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
        </li>
        {/* <li><a href="#testimonials">Results</a></li> */}
        <li>
          <a href="#about" onClick={() => setMenuOpen(false)}>Team</a>
        </li>
        <li>
          <a
            href="#"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault()
              setMenuOpen(false)
              onOpenModal()
            }}
          >
            Join Waitlist <span className="btn-arrow">&rarr;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
