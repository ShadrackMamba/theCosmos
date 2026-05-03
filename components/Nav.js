import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Nav() {
  const router = useRouter()
  const isStory = router.pathname.startsWith('/story')
  const isAbout = router.pathname === '/about'
  const [menuOpen, setMenuOpen] = useState(false)

  // Active category for highlighting nav links
  const activeCategory = router.query.category || null

  return (
    <nav className={`nav ${isStory ? 'nav--story' : ''}`}>
      <Link href="/" className="nav-logo">
        Webshakk <span>Cosmos</span>
      </Link>

      {/* ── DESKTOP LINKS ── */}
      <ul className="nav-links">
        <li>
          <Link
            href="/"
            className={!activeCategory && !isAbout && !isStory ? 'nav-active' : ''}
          >
            All
          </Link>
        </li>
        {['Space', 'Biology', 'Physics', 'Earth'].map(cat => (
          <li key={cat}>
            <Link
              href={`/?category=${cat}`}
              className={activeCategory === cat ? 'nav-active' : ''}
            >
              {cat}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/timeline"
            className={router.pathname === '/timeline' ? 'nav-active' : ''}
          >
            Timeline
          </Link>
        </li>
        <li>
          <Link href="/about" className={isAbout ? 'nav-active' : ''}>
            About
          </Link>
        </li>
      </ul>

      {/* ── STORY PAGE RIGHT SIDE ── */}
      {isStory && (
        <Link href="/" className="nav-back">← All Stories</Link>
      )}
    </nav>
  )
}