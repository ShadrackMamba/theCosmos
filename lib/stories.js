import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const storiesDir = path.join(process.cwd(), 'stories')

/* ─────────────────────────────────────────────────────────────────
   PHOTO SOURCES — you can use ANY of these in your stories:

   UNSPLASH (free, no signup needed)
   https://images.unsplash.com/photo-PHOTO_ID?w=1200&q=80
   → Go to unsplash.com, click a photo, copy the URL from your browser

   PEXELS (free, no signup needed)
   https://images.pexels.com/photos/PHOTO_ID/pexels-photo-PHOTO_ID.jpeg?w=1200
   → Go to pexels.com, right-click any photo → Copy image address

   NASA (free, public domain — perfect for space stories)
   https://apod.nasa.gov/apod/image/YEAR/FILENAME.jpg
   → Go to images.nasa.gov, right-click any photo → Copy image address

   WIKIMEDIA COMMONS (free, public domain)
   https://upload.wikimedia.org/wikipedia/commons/...
   → Go to commons.wikimedia.org, open any image, right-click → Copy image address

   YOUR OWN PHOTOS
   Put your photo in the /public/images/ folder of your project, then use:
   /images/your-photo.jpg
   (no full URL needed — just the path)

   ANY OTHER WEBSITE
   Right-click any image on the web → Copy image address
   Paste it directly — as long as it ends in .jpg .jpeg .png .webp .gif it will work

   USAGE IN YOUR STORY:
   ::photo[URL_HERE](Your caption text here)

   BACKGROUND USAGE:
   bg: URL_HERE
─────────────────────────────────────────────────────────────────── */

export function getAllStories() {
  return fs.readdirSync(storiesDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '')
      const raw  = fs.readFileSync(path.join(storiesDir, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getAllSlugs() {
  return fs.readdirSync(storiesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ params: { slug: f.replace('.md', '') } }))
}

export function getAllCategories() {
  return [...new Set(getAllStories().map(s => s.category).filter(Boolean))]
}

export async function getStoryBySlug(slug) {
  const raw = fs.readFileSync(path.join(storiesDir, `${slug}.md`), 'utf8')
  const { data: meta, content } = matter(raw)

  if (content.includes('---section---')) {
    const rawSections = content.split('---section---').filter(s => s.trim())
    const sections = await Promise.all(rawSections.map(parseSection))
    return { slug, meta, sections, contentHtml: '' }
  }

  const processed = await remark().use(html).process(content)
  return { slug, meta, sections: [], contentHtml: processed.toString() }
}

/* ─── parse a single section block ─────────────────────────────── */
async function parseSection(raw) {
  const ymlMatch = raw.match(/^\s*---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  let meta = {}
  let body = raw.trim()

  if (ymlMatch) {
    ymlMatch[1].split('\n').forEach(line => {
      const m = line.match(/^(\w+):\s*(.+)$/)
      if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, '').trim()
    })
    body = ymlMatch[2].trim()
  }

  /* ── ::photo[URL](caption) → <figure> HTML ──────────────────────
     Supports ANY valid image URL from any source:
     - https://images.unsplash.com/photo-xxx?w=1200&q=80
     - https://images.pexels.com/photos/xxx/photo.jpeg
     - https://upload.wikimedia.org/wikipedia/commons/...
     - https://apod.nasa.gov/apod/image/...
     - /images/my-own-photo.jpg  (from your /public/images/ folder)
     - https://any-website.com/any-image.jpg
  ─────────────────────────────────────────────────────────────────*/
  body = body.replace(
    /::photo\[([^\]]+)\]\(([^)]*)\)/g,
    (_, url, caption) =>
      `<figure class="story-photo">` +
      `<img src="${url}" alt="${caption}" loading="lazy" />` +
      `<figcaption>${caption}</figcaption>` +
      `</figure>`
  )

  const processed = await remark().use(html, { sanitize: false }).process(body)

  return {
    bg:             meta.bg || '',
    chapter:        meta.chapter || '',
    heading:        meta.heading || '',
    overlayOpacity: meta.overlayOpacity ? parseFloat(meta.overlayOpacity) : 0.55,
    tint:           meta.tint || '',
    bodyHtml:       processed.toString(),
  }
}