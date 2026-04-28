import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nav({ transparent = false }) {
  const router = useRouter()
  const isStory = router.pathname.startsWith('/story')

  return (
    <nav className={`nav ${transparent || isStory ? 'nav--story' : ''}`}>
      <Link href="/" className="nav-logo">
        Webshakk <span>Cosmos</span>
      </Link>
      {!isStory && (
        <ul className="nav-links">
          <li><Link href="/">Stories</Link></li>
          <li><Link href="/?category=Space">Space</Link></li>
          <li><Link href="/?category=Biology">Biology</Link></li>
          <li><Link href="/?category=Physics">Physics</Link></li>
          <li><Link href="/?category=Earth">Earth</Link></li>
        </ul>
      )}
      {isStory && (
        <Link href="/" className="nav-back">← All Stories</Link>
      )}
    </nav>
  )
}