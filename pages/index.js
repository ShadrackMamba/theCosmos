import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Nav from '../components/Nav'
import StoryCard from '../components/StoryCard'
import { getAllStories, getAllCategories } from '../lib/stories'

export default function Home({ stories, categories }) {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState(
    router.query.category || 'All'
  )

  const filtered = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory)

  return (
    <>
      <Head>
        <title>Webshakk Cosmos — Science Stories for the Curious Mind</title>
        <meta name="description" content="Webshakk Cosmos: beautifully told science stories covering space, biology, physics, and our planet." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
            Where the universe's greatest stories are told — from the birth of stars
            to the secret lives of cells.
          </p>

          {/* category filter */}
          <div className="category-bar">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── STORIES ── */}
        <section className="stories-section container">
          <p className="section-label">
            {activeCategory === 'All' ? 'All Stories' : activeCategory} &nbsp;·&nbsp; {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
          </p>

          {filtered.length > 0 ? (
            <div className="stories-grid">
              {filtered.map((story, i) => (
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
          <strong>Webshakk Cosmos</strong> &nbsp;·&nbsp; Science Stories for the Curious Mind
        </footer>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const stories = getAllStories()
  const categories = getAllCategories()
  return {
    props: { stories, categories }
  }
}
