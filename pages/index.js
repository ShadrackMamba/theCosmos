import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import StoryCard from '../components/StoryCard'
import { getAllStories, getAllCategories } from '../lib/stories'

export default function Home({ stories, categories }) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest') // 'newest' | 'oldest' | 'earth'

  // Sync category filter with URL query param (?category=Space)
  useEffect(() => {
    const cat = router.query.category
    if (cat) setActiveCategory(cat)
    else setActiveCategory('All')
  }, [router.query.category])

  // Filter by category
  const filtered = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory)

  // Sort — publish date newest/oldest, or real-world Earth chronological order
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'earth') {
      // oldest real-world event first (Big Bang → present)
      return (Number(a.eventAge) || 0) - (Number(b.eventAge) || 0)
    }
    const da = new Date(a.date || 0)
    const db = new Date(b.date || 0)
    return sortOrder === 'newest' ? db - da : da - db
  })

  function handleCategory(cat) {
    setActiveCategory(cat)
    if (cat === 'All') router.push('/', undefined, { shallow: true })
    else router.push(`/?category=${cat}`, undefined, { shallow: true })
  }

  return (
    <>
      <Head>
        <title>Webshakk Cosmos — Science Stories for the Curious Mind</title>
        <meta name="description" content="Beautifully told science stories covering space, biology, physics, and our planet." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-wrap">
        <Nav />

        {/* ── HERO ── */}
        <section className="hero container">
          <p className="hero-eyebrow">✦ Science Stories for the Curious Mind</p>
          <h1 className="hero-title">
            Webshakk <span className="highlight">Cosmos</span>
          </h1>
          <p className="hero-sub">
            Where the universe's greatest stories are told — from the birth of
            stars to the secret lives of cells.
          </p>

          {/* ── CATEGORY FILTER PILLS ── */}
          <div className="category-bar">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── STORIES GRID ── */}
        <section className="stories-section container">

          {/* toolbar: count + sort */}
          <div className="stories-toolbar">
            <p className="section-label">
              {activeCategory === 'All' ? 'All Stories' : activeCategory}
              &nbsp;·&nbsp;
              {sorted.length} {sorted.length === 1 ? 'story' : 'stories'}
            </p>
            <div className="sort-controls">
              <span className="sort-label">Sort:</span>
              <button
                className={`sort-btn ${sortOrder === 'newest' ? 'active' : ''}`}
                onClick={() => setSortOrder('newest')}
              >
                Newest first
              </button>
              <span className="sort-divider">·</span>
              <button
                className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
                onClick={() => setSortOrder('oldest')}
              >
                Oldest first
              </button>
            </div>
          </div>

          {sorted.length > 0 ? (
            <div className="stories-grid">
              {sorted.map((story, i) => (
                <div
                  key={story.slug}
                  className="fade-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No stories in this category yet</h3>
              <p>Check back soon — the cosmos is always expanding.</p>
            </div>
          )}
        </section>

        <footer className="footer">
          <strong>Webshakk Cosmos</strong> · Science Stories for the Curious Mind
        </footer>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const stories = getAllStories()
  const categories = getAllCategories()
  return { props: { stories, categories } }
}