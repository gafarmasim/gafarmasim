import { useState } from 'react'

const LINKS = [
  { href: '#services', label: 'Xidmətlər' },
  { href: '#process', label: 'Necə işləyirik' },
  { href: '#contact', label: 'Əlaqə' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#top" className="brand" aria-label="AvtoUsta ana səhifə">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="26" height="26">
              <path
                d="M44 14a10 10 0 0 0-9.5 13.2L16 45.7l5.3 5.3 18.5-18.5A10 10 0 0 0 50.8 20l-5.6 5.6-4.8-4.8L46 15.2A10 10 0 0 0 44 14z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="brand__name">
            Avto<em>Usta</em>
          </span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Əsas naviqasiya">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="btn btn--primary btn--sm" href="tel:+994500000000">
            <span aria-hidden="true">📞</span> Zəng et
          </a>
          <button
            className="nav__burger"
            aria-label="Menyunu aç"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
