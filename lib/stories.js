import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const storiesDir = path.join(process.cwd(), 'stories')

export function getAllStories() {
  return fs.readdirSync(storiesDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '')
      const raw = fs.readFileSync(path.join(storiesDir, filename), 'utf8')
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

  // Stories with ---section--- markers get the scrollytelling treatment.
  // Each section has:
  //   - bg: URL shown as full-page background while reading that section
  //   - chapter / heading text
  //   - prose paragraphs
  //   - inline ::photo[url](caption) markers that become real <img> tags
  if (content.includes('---section---')) {
    const rawSections = content.split('---section---').filter(s => s.trim())
    const sections = await Promise.all(rawSections.map(parseSection))
    return { slug, meta, sections, contentHtml: '' }
  }

  // Classic story — just render the whole body as HTML
  const processed = await remark().use(html).process(content)
  return { slug, meta, sections: [], contentHtml: processed.toString() }
}

// ─── parse one ---section--- block ────────────────────────────────
async function parseSection(raw) {
  // Optional YAML header between --- delimiters at the top of the block
  // ---
  // bg: https://...
  // chapter: Chapter 1 · Before
  // heading: A World Alive with Giants
  // overlayOpacity: 0.55
  // ---
  // body text...

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

  // Convert ::photo[url](caption) shortcodes into real HTML before remark
  // Example:  ::photo[https://images.unsplash.com/...](Caption text here)
  body = body.replace(
    /::photo\[([^\]]+)\]\(([^)]*)\)/g,
    (_, url, caption) =>
      `<figure class="story-photo">` +
      `<img src="${url}" alt="${caption}" loading="lazy"/>` +
      `<figcaption>${caption}</figcaption>` +
      `</figure>`
  )

  const processed = await remark().use(html, { sanitize: false }).process(body)

  return {
    bg: meta.bg || '',
    chapter: meta.chapter || '',
    heading: meta.heading || '',
    overlayOpacity: meta.overlayOpacity ? parseFloat(meta.overlayOpacity) : 0.55,
    tint: meta.tint || '',
    bodyHtml: processed.toString(),
  }
}
