# monsterpi13.dev

<img src="/github/cover.png width="500" />

This is the code for my personal blog site at [https://www.monsterpi13.dev](https://www.monsterpi13.dev), forked from
[onur.dev](https://github.com/suyalcinkaya/onur.dev) 🍴.

## Introduction

I created this blog to chronicle my journey as a front-end developer. The goals are:

- Showcase what I'm learning and working on 📚
- Gain experience building a real-world project ⚒️
- Get feedback from the dev community 👥

The clean design and features of [onur.dev](https://onur.dev/) exemplified the kind of blog I wanted to build for
myself. So I decided to fork it and customize for my own use. 🤓

## Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- Database: [Supabase](https://supabase.com/)
- CMS: [Contentful](https://www.contentful.com/)
- Deployment: [Vercel](https://vercel.com/) ⚡️

## Key Features

- SEO Optimization - implements generateMetadata to boost SEO 📈
- Static Generation - generates static pages at build time for better performance ⚡️
- Draft Previews - preview unpublished posts during development 🖊️
- Caching - intelligently caches and revalidates pages 💾
- Realtime - shows realtime post view count using Supabase 🔴

And more - see the [blog](https://dev.to/monsterpi13/building-my-developer-blog-site-2jee) posts for details.

## Getting Started

### Prerequisites

- Node.js and pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/MonsterPi13/monsterpi13.dev.git

# Install dependencies
pnpm install

# Configure environment variables
# See .env.example file

# Run the dev server
pnpm run dev
```

### Configuration

1. Create Contentful space
2. Create Supabase project
3. Add API keys to .env
4. Import content model
5. Populate space

### Deployment

The site can be easily deployed on Vercel, Netlify, etc:

1. Connect repo
2. Configure environment variables
3. Trigger deploy

### Contributing

Contributions are welcome! Please feel free to open issues and pull requests.
