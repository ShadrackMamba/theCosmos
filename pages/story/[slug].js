import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { getAllSlugs, getStoryBySlug } from '../../lib/stories'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function StoryPage({ story }) {
  const { meta, contentHtml } = story

  return (
    <>
      <Head>
        <title>{meta.title} — Webshakk Cosmos</title>
        <meta name="description" content={meta.excerpt || ''} />
        {meta.coverImage && <meta property="og:image" content={meta.coverImage} />}
      </Head>

      <div className="page-wrap">
        <Nav />

        <div className="container">
          {/* ── STORY HERO ── */}
          <header className="story-hero">
            <Link href="/" className="back-link">
              ← All Stories
            </Link>

            {meta.category && (
              <div className="story-category-badge">{meta.category}</div>
            )}

            <h1 className="story-title">{meta.title}</h1>

            <div className="story-byline">
              {meta.author && (
                <span>✦ {meta.author}</span>
              )}
              {meta.date && (
                <span>📅 {formatDate(meta.date)}</span>
              )}
              {meta.readTime && (
                <span>⏱ {meta.readTime}</span>
              )}
            </div>
          </header>

          {/* ── COVER IMAGE ── */}
          {meta.coverImage && (
            <img
              src={meta.coverImage}
              alt={meta.title}
              className="story-cover"
            />
          )}

          {/* ── STORY BODY ── */}
          <article
            className="story-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        <footer className="footer">
          <strong>Webshakk Cosmos</strong> &nbsp;·&nbsp; Science Stories for the Curious Mind
          <br />
          <Link href="/" style={{ color: 'var(--cosmos-accent)', marginTop: '8px', display: 'inline-block' }}>
            ← Back to all stories
          </Link>
        </footer>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllSlugs()
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const story = await getStoryBySlug(params.slug)
  return { props: { story } }
}
