import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const storiesDir = path.join(process.cwd(), 'stories')

export function getAllStories() {
  const files = fs.readdirSync(storiesDir)
  return files
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

export async function getStoryBySlug(slug) {
  const raw = fs.readFileSync(path.join(storiesDir, `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    meta: data,
    contentHtml: processed.toString()
  }
}

export function getStoriesByCategory(category) {
  return getAllStories().filter(s => s.category === category)
}

export function getAllCategories() {
  const stories = getAllStories()
  const cats = [...new Set(stories.map(s => s.category).filter(Boolean))]
  return cats
}
