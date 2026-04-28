import { useEffect, useRef, useState, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getAllSlugs, getStoryBySlug } from '../../lib/stories'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function StoryPage({ story }) {
  const { meta, sections, contentHtml } = story
  // Go straight to the story — no title screen, no extra click
  if (sections && sections.length > 0) {
    return <ScrollyStory meta={meta} sections={sections} />
  }
  return <ClassicStory meta={meta} contentHtml={contentHtml} />
}

/* ─────────────────────────────────────────────────────────────────
   SCROLLYTELLING LAYOUT
   - Backgrounds stack behind the entire page, fixed in place
   - User scrolls normally through the article
   - As each section marker enters the viewport the background
     quietly crossfades to that section's photo
   - Real inline photos sit inside the article text
───────────────────────────────────────────────────────────────── */
function ScrollyStory({ meta, sections }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const sectionRefs = useRef([])

  const onScroll = useCallback(() => {
    // Find which section marker is closest to 38% down the viewport
    const trigger = window.innerHeight * 0.38
    let best = 0
    let bestDist = Infinity
    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const dist = Math.abs(el.getBoundingClientRect().top - trigger)
      if (dist < bestDist) { bestDist = dist; best = i }
    })
    setActiveIdx(best)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <>
      <Head>
        <title>{meta.title} — Webshakk Cosmos</title>
        <meta name="description" content={meta.excerpt || ''} />
      </Head>

      {/* ── FIXED FULL-PAGE BACKGROUNDS ── */}
      <div className="story-backgrounds" aria-hidden="true">
        {sections.map((s, i) => (
          <div
            key={i}
            className={`story-bg ${i === activeIdx ? 'active' : ''}`}
            style={{
              backgroundImage: s.bg ? `url('${s.bg}')` : 'none',
              '--overlay-opacity': s.overlayOpacity ?? 0.55,
            }}
          />
        ))}
        {/* dark gradient overlay — always present */}
        <div className="story-bg-overlay" />
      </div>

      {/* ── NAV ── */}
      <nav className="nav nav--story">
        <Link href="/" className="nav-logo">
          Webshakk <span>Cosmos</span>
        </Link>
        <Link href="/" className="nav-back">← All Stories</Link>
      </nav>

      {/* ── ARTICLE ── */}
      <main className="story-article">

        {/* Title */}
        <header className="story-article__header">
          {meta.category && (
            <span className="story-article__category">{meta.category}</span>
          )}
          <h1 className="story-article__title">{meta.title}</h1>
          <div className="story-article__meta">
            {meta.author && <span>{meta.author}</span>}
            {meta.date   && <span>·</span>}
            {meta.date   && <span>{formatDate(meta.date)}</span>}
            {meta.readTime && <span>·</span>}
            {meta.readTime && <span>{meta.readTime}</span>}
          </div>
          {meta.excerpt && (
            <p className="story-article__excerpt">{meta.excerpt}</p>
          )}
        </header>

        {/* Sections */}
        {sections.map((section, i) => (
          <section
            key={i}
            ref={el => sectionRefs.current[i] = el}
            className="story-section"
          >
            {(section.chapter || section.heading) && (
              <div className="story-section__head">
                {section.chapter && (
                  <span className="story-section__chapter">{section.chapter}</span>
                )}
                {section.heading && (
                  <h2 className="story-section__heading">{section.heading}</h2>
                )}
              </div>
            )}
            <div
              className="story-prose"
              dangerouslySetInnerHTML={{ __html: section.bodyHtml }}
            />
          </section>
        ))}

        <footer className="story-article__footer">
          <Link href="/" className="story-article__back">← Back to all stories</Link>
          <p className="story-article__site">Webshakk Cosmos</p>
        </footer>
      </main>
    </>
  )
}

/* ─── CLASSIC STORY (no sections) ─────────────────────────────── */
function ClassicStory({ meta, contentHtml }) {
  return (
    <>
      <Head>
        <title>{meta.title} — Webshakk Cosmos</title>
      </Head>
      <div className="page-wrap">
        <nav className="nav">
          <Link href="/" className="nav-logo">Webshakk <span>Cosmos</span></Link>
        </nav>
        <div className="container">
          <header className="story-hero">
            <Link href="/" className="back-link">← All Stories</Link>
            {meta.category && <div className="story-category-badge">{meta.category}</div>}
            <h1 className="story-title">{meta.title}</h1>
          </header>
          <article
            className="story-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  return { paths: getAllSlugs(), fallback: false }
}

export async function getStaticProps({ params }) {
  const story = await getStoryBySlug(params.slug)
  return { props: { story } }
}