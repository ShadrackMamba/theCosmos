import Link from 'next/link'

// gradient covers per category when no image is provided
const categoryGradients = {
  Space:   'linear-gradient(135deg, #0d1b3e 0%, #1a3a6e 50%, #0a2a55 100%)',
  Biology: 'linear-gradient(135deg, #0a1f0e 0%, #1a4a22 50%, #0d2a12 100%)',
  Physics: 'linear-gradient(135deg, #1a0d2e 0%, #3a1a5e 50%, #250d45 100%)',
  Earth:   'linear-gradient(135deg, #1a1205 0%, #3d2a08 50%, #1f1508 100%)',
  default: 'linear-gradient(135deg, #080c14 0%, #0d1a30 50%, #060a12 100%)',
}

const categoryIcons = {
  Space: '🪐',
  Biology: '🧬',
  Physics: '⚛️',
  Earth: '🌍',
  default: '✦',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

export default function StoryCard({ story }) {
  const gradient = categoryGradients[story.category] || categoryGradients.default
  const icon = categoryIcons[story.category] || categoryIcons.default

  return (
    <Link href={`/story/${story.slug}`}>
      <article className="story-card">
        <div className="card-image">
          {story.coverImage
            ? <img src={story.coverImage} alt={story.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            : (
              <div className="card-image-placeholder" style={{background: gradient, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <span style={{fontSize:'3.5rem', opacity:0.5}}>{icon}</span>
              </div>
            )
          }
        </div>
        <div className="card-body">
          <div className="card-meta">
            {story.category && <span className="card-category">{story.category}</span>}
            {story.date && <span className="card-date">{formatDate(story.date)}</span>}
          </div>
          <h2 className="card-title">{story.title}</h2>
          {story.excerpt && <p className="card-excerpt">{story.excerpt}</p>}
          <span className="card-read">Read story →</span>
        </div>
      </article>
    </Link>
  )
}
