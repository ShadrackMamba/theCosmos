import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import { getAllStories } from '../lib/stories'

function formatAge(age) {
  const n = Number(age)
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B years ago`
  if (n >= 1e6) return `${(n / 1e6).toFixed(0)}M years ago`
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K years ago`
  return `${n} years ago`
}

const categoryColours = {
  Space:   '#4fc3f7',
  Biology: '#6bcb77',
  Physics: '#b388ff',
  Earth:   '#f0c060',
  default: '#ffffff',
}

export default function Timeline({ stories }) {
  // Sort oldest real-world event first
  const sorted = [...stories]
    .filter(s => s.eventAge)
    .sort((a, b) => Number(b.eventAge) - Number(a.eventAge))

  return (
    <>
      <Head>
        <title>Earth Timeline — Webshakk Cosmos</title>
        <meta name="description" content="All Webshakk Cosmos stories arranged in the order they actually happened — from the Big Bang to the present day." />
      </Head>

      <div className="page-wrap">
        <Nav />

        <div className="timeline-page">

          <header className="about-hero">
            <p className="hero-eyebrow">✦ Earth Timeline</p>
            <h1 className="about-title">
              From the <span className="highlight">Big Bang</span><br />
              to right now
            </h1>
            <p className="about-lead">
              Every story on Webshakk Cosmos, arranged in the order the events
              actually happened — from the birth of the universe to the emergence
              of modern humans.
            </p>
          </header>

          <div className="tl-wrapper">
            {/* vertical spine */}
            <div className="tl-spine" />

            {sorted.map((story, i) => (
              <div key={story.slug} className="tl-item">
                {/* dot on spine */}
                <div
                  className="tl-dot"
                  style={{ background: categoryColours[story.category] || categoryColours.default }}
                />

                {/* age marker */}
                <div className="tl-age">
                  {story.eventLabel || formatAge(story.eventAge)}
                </div>

                {/* card */}
                <Link href={`/story/${story.slug}`} className="tl-card">
                  <span
                    className="tl-card__cat"
                    style={{ color: categoryColours[story.category] || categoryColours.default,
                             borderColor: categoryColours[story.category] || categoryColours.default }}
                  >
                    {story.category}
                  </span>
                  <h2 className="tl-card__title">{story.title}</h2>
                  <p className="tl-card__excerpt">{story.excerpt}</p>
                  <span className="tl-card__read">Read story →</span>
                </Link>
              </div>
            ))}

            {/* NOW marker */}
            <div className="tl-item tl-item--now">
              <div className="tl-dot tl-dot--now" />
              <div className="tl-age tl-age--now">Today</div>
              <div className="tl-now-card">
                <span>You are here</span>
                <p>300,000 years into the story of <em>Homo sapiens</em>.<br />
                13.8 billion years into the story of everything.</p>
              </div>
            </div>

          </div>
        </div>

        <footer className="footer">
          <strong>Webshakk Cosmos</strong> · Science Stories for the Curious Mind
        </footer>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const stories = getAllStories()
  return { props: { stories } }
}