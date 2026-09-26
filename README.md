# Netlify Blog

![App Preview](https://imgix.cosmicjs.com/0f5648e0-b9dd-11f1-8db3-4fb4c6c7a846-CleanShot-2026-09-26-at-12-04-042x.png?w=1200&h=630&fit=crop&auto=format,compress)

A dark-themed, Netlify-inspired blog built with Next.js 16 and [Cosmic](https://www.cosmicjs.com), powered by your existing `blog` content type.

## Features

- 🌑 Dark navy theme with teal/cyan accents matching the Netlify Blog aesthetic
- 📰 Hero section for the latest post + responsive 3-column post grid
- ⬇️ "Load more" pagination powered by a lightweight API route
- 📝 Markdown rendering with GitHub-flavored markdown (tables, lists, code)
- 🏷️ Automatic category derivation with colored indicator dots
- 📅 Clean "Month Day, Year" date formatting
- 🔍 SEO metadata generated from `seo_description`
- ⚡ ISR (hourly revalidation) with pre-generated post pages
- 📱 Fully responsive with skeleton loading & custom error/404 pages

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6ab70313135b7942815df2a5&clone_repository=6ab81926b068eea79690e236)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Netlify Blog". The content is managed in Cosmic CMS with the following object types: blog. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog website styled closely after the Netlify blog (https://www.netlify.com/blog/), using the existing Cosmic "blog" object type (fields: seo_description, featured_image, published_at, content as rich-text markdown). ~100 published posts exist.
>
> DESIGN (match reference screenshots):
> - Dark theme: page background near-black navy (#0e1e25 / #181a1c range), white text, teal/cyan accent (#32e6e2 / #5cebdf) for buttons, links, active states.
> - Optional thin teal announcement bar at the very top with dark text and a dismiss X.
> - Header: logo "netlify" wordmark in white with a teal spark/asterisk mark on the left; nav items (Platform, Solutions, Developers, Resources, Pricing) with chevrons; right side: search icon, "Contact", "Log in", and a rounded pill teal "Sign up" button with dark text.
> - Sub-nav below header with thin border: Blog (active, teal with underline), News, Case Studies, Tutorials, Insights, Changelog.
> - Blog index hero: featured (latest) post in a two-column layout — left: small pill category tag with colored dot, large bold white headline (~40px), author avatar + name; right: large rounded-corner (16px) featured image. Horizontal divider below.
> - Below: 3-column responsive grid of post cards: rounded-corner image (16:9-ish), then row with category pill (dark gray bg, colored dot) and date ("September 22, 2026" format) in muted gray, then bold white title (~24px), then author avatar + name. Load more / pagination.
> - Font: clean geometric sans (e.g. "Pacaembu"-like; use Inter or Figtree / Mona Sans), bold headlines.
> - Single post page: dark theme, large title, date, featured image rounded, rendered markdown content with good typography (prose-invert), teal links, code blocks styled.
> - Floating bottom-right teal pill button "Ask Netlify" is optional decoration.
> - Footer dark with columns of links.
> Posts sorted by published_at descending. Since no author/category fields exist, derive a display category gracefully (e.g. default "News & Announcements") and omit author if absent. Render rich-text content as markdown.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org) — App Router, Server Components, ISR
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) + `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) via `@cosmicjs/sdk`
- [react-markdown](https://github.com/remarkjs/react-markdown) + `remark-gfm`

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic account with a bucket containing a `blog` object type

### Installation

```bash
bun install
```

Set your environment variables (see below), then run:

```bash
bun run dev
```

Visit `http://localhost:3000`.

## Cosmic SDK Examples

```typescript
// Fetch all blog posts sorted newest first
const { posts, total } = await getBlogPosts(9, 0)

// Fetch a single post by slug
const post = await getBlogPostBySlug('my-post-slug')
```

## Cosmic CMS Integration

This app reads exclusively from the `blog` object type in your Cosmic bucket:

- `title` — post headline
- `metadata.seo_description` — used for meta description & hero excerpt
- `metadata.featured_image` — hero/card imagery (served via imgix)
- `metadata.published_at` — used for sort order and date display
- `metadata.content` — markdown body rendered on the single post page

Posts are sorted by `published_at` (falling back to `modified_at`/`created_at`) descending. Since no author or category fields exist in the model, the app derives a stable, visually varied category label per post and simply omits any author UI.

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variables below in the Vercel dashboard
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Create a new site in [Netlify](https://www.netlify.com) from Git
3. Build command: `bun run build` — Publish directory: `.next`
4. Add the environment variables below in Site settings → Environment variables

### Environment Variables

Set these in your hosting provider's dashboard:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```
<!-- README_END -->