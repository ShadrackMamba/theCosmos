import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Webshakk Cosmos</title>
        <meta name="description" content="Webshakk Cosmos — science stories told with the depth and craft they deserve." />
      </Head>

      <div className="page-wrap">
        <Nav />

        <div className="about-page">

          {/* ── HERO ── */}
          <header className="about-hero">
            <p className="hero-eyebrow">About</p>
            <h1 className="about-title">
              Science deserves<br />
              <span className="highlight">better stories</span>
            </h1>
            <p className="about-lead">
              Webshakk Cosmos exists because the most astonishing things ever
              discovered — the Big Bang, the evolution of life, the nature of
              galaxies — are routinely reduced to bullet points and textbook
              summaries. We think they deserve more than that.
            </p>
          </header>

          {/* ── WHAT WE DO ── */}
          <section className="about-section">
            <div className="about-section__inner">
              <h2 className="about-section__title">What we do</h2>
              <p>
                Every story on Webshakk Cosmos is written as a piece of
                long-form narrative journalism — the kind of writing that takes
                a scientific subject seriously enough to give it space, context,
                and the human story behind the discovery.
              </p>
              <p>
                We care about accuracy. Every fact is sourced from peer-reviewed
                research, established scientific consensus, or the accounts of
                the scientists who made the discoveries. We do not oversimplify.
                We do not sensationalise. We try to convey what the science
                actually says, and why it is genuinely astonishing.
              </p>
              <p>
                We also care about craft. A story about the Big Bang should feel
                like reading about the Big Bang — immersive, precise, and
                occasionally overwhelming in exactly the way the subject
                deserves to be.
              </p>
            </div>
          </section>

          {/* ── STATS ── */}
          <section className="about-stats">
            <div className="about-stat">
              <span className="about-stat__number">5</span>
              <span className="about-stat__label">Stories published</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__number">4</span>
              <span className="about-stat__label">Categories</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__number">∞</span>
              <span className="about-stat__label">Years of science to cover</span>
            </div>
          </section>

          {/* ── CATEGORIES ── */}
          <section className="about-section">
            <div className="about-section__inner">
              <h2 className="about-section__title">What we cover</h2>
              <div className="about-categories">
                {[
                  {
                    name: 'Space',
                    icon: '🪐',
                    desc: 'Galaxies, black holes, the Big Bang, the expanding universe, and the deep history of the cosmos.',
                  },
                  {
                    name: 'Biology',
                    icon: '🧬',
                    desc: 'Evolution, DNA, the origin of life, the human body, and the astonishing diversity of living things.',
                  },
                  {
                    name: 'Physics',
                    icon: '⚛️',
                    desc: 'Quantum mechanics, relativity, the nature of time, energy, and the fundamental laws of reality.',
                  },
                  {
                    name: 'Earth',
                    icon: '🌍',
                    desc: 'Deep time, mass extinctions, plate tectonics, climate, and the 4.5 billion year history of our planet.',
                  },
                ].map(cat => (
                  <Link key={cat.name} href={`/?category=${cat.name}`} className="about-category-card">
                    <span className="about-category-card__icon">{cat.icon}</span>
                    <h3 className="about-category-card__name">{cat.name}</h3>
                    <p className="about-category-card__desc">{cat.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── PHILOSOPHY ── */}
          <section className="about-section about-section--dark">
            <div className="about-section__inner">
              <h2 className="about-section__title">Why it matters</h2>
              <p>
                The universe is 13.8 billion years old. Life on Earth has
                existed for 3.8 billion years. Modern humans have been here for
                300,000 years. Written history covers the last 5,000. In
                geological time, everything we call civilisation is a rounding
                error.
              </p>
              <p>
                Understanding our actual place in that timeline — understanding
                what we are, where we came from, and what the universe we
                inhabit actually is — seems to us like one of the most important
                things a person can do with their curiosity.
              </p>
              <blockquote className="about-quote">
                "The cosmos is within us. We are made of star stuff. We are a
                way for the universe to know itself."
                <cite>— Carl Sagan</cite>
              </blockquote>
              <p>
                We are not separate from the universe looking in at it. We are
                the universe — in one small, improbable corner — looking at
                itself. Webshakk Cosmos exists to help make that fact feel as
                real as it is.
              </p>
            </div>
          </section>

          {/* ── DEVELOPER BIO ── */}
          <section className="about-section about-section--dark">
            <div className="about-section__inner">
              <h2 className="about-section__title">Built by</h2>
              <div className="about-dev">
                <div className="about-dev__avatar">W</div>
                <div className="about-dev__info">
                  <h3 className="about-dev__name">Webshakk</h3>
                  <p className="about-dev__role">Developer &amp; Creator</p>
                  <p>
                    Webshakk Cosmos is designed and built by Webshakk — a
                    developer passionate about the intersection of great
                    storytelling, science communication, and beautifully crafted
                    web experiences. The site was built from scratch using
                    Next.js, Markdown, and a custom scrollytelling engine that
                    makes every story feel as immersive as the subject deserves.
                  </p>
                  <p>
                    Interested in working together, or just want to see more?
                  </p>
                  <a
                    href="https://webshakk.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-dev__link"
                  >
                    Visit webshakk.vercel.app →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="about-cta">
            <h2>Start reading</h2>
            <p>Five stories so far. More coming every week.</p>
            <Link href="/" className="about-cta__btn">
              Browse all stories →
            </Link>
          </section>

        </div>

        <footer className="footer">
          <strong>Webshakk Cosmos</strong> · Science Stories for the Curious Mind
        </footer>
      </div>
    </>
  )
}