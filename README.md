# Webshakk Cosmos
### Science Stories for the Curious Mind

A Next.js stories platform. Write stories in Markdown, deploy free on Vercel.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev
# → Open http://localhost:3000
```

---

## Adding a New Story

Create a `.md` file in the `/stories` folder:

```markdown
---
title: "Your Story Title"
date: "2026-04-27"
category: "Space"          # Space | Biology | Physics | Earth
author: "Your Name"
excerpt: "A short summary shown on the homepage card."
readTime: "7 min read"
coverImage: "/images/your-image.jpg"   # optional
---

Your story content goes here in Markdown.

## Section Heading

Paragraphs, **bold**, *italic*, > blockquotes — all standard Markdown.
```

That's it. The homepage and story page update automatically.

---

## Categories

Current categories: `Space`, `Biology`, `Physics`, `Earth`

To add a new category, just use it in a story's frontmatter.
Add a nav link in `components/Nav.js` if you want it in the menu.

---

## Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts — link to GitHub for auto-deploy)
vercel
```

Your site will be live at `yourproject.vercel.app` in minutes.
Every time you push to GitHub, Vercel auto-deploys.

---

## Project Structure

```
webshakk-cosmos/
├── stories/          ← Your Markdown story files go here
├── lib/
│   └── stories.js    ← Reads and parses all .md files
├── components/
│   ├── Nav.js        ← Navigation bar
│   └── StoryCard.js  ← Card shown on homepage
├── pages/
│   ├── _app.js       ← App wrapper
│   ├── index.js      ← Homepage
│   └── story/
│       └── [slug].js ← Individual story page
├── styles/
│   └── globals.css   ← All styles
└── public/
    └── images/       ← Put story cover images here
```

---

## Upgrading to a Database Later

When you outgrow Markdown files, swap `lib/stories.js` to query
Supabase (free Postgres). The rest of the site stays identical.
