import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        Webshakk <span>Cosmos</span>
      </Link>
      <ul className="nav-links">
        <li><Link href="/">Stories</Link></li>
        <li><Link href="/?category=Space">Space</Link></li>
        <li><Link href="/?category=Biology">Biology</Link></li>
        <li><Link href="/?category=Physics">Physics</Link></li>
        <li><Link href="/?category=Earth">Earth</Link></li>
      </ul>
    </nav>
  )
}
