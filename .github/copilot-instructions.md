# Copilot Instructions

## Project Overview

This is a [VuePress 2](https://v2.vuepress.vuejs.org/) static site for **Spokane Food Justice**, a non-profit organization. It is deployed to GitHub Pages automatically on every push to `main`.

## Commands

```bash
npm run docs:dev      # Start local dev server (hot reload)
npm run docs:build    # Build for production → outputs to docs/.vuepress/dist
```

There are no tests or linters configured.

## Architecture

- **Content**: All pages are Markdown files in `docs/`. Each `.md` file maps to a URL (e.g., `docs/about.md` → `/about`).
- **Config**: `docs/.vuepress/config.js` controls the site title, navbar, sidebar, and bundler. Add new pages to both `navbar` and `sidebar` arrays here.
- **Theme**: Uses `@vuepress/theme-default` with no customizations — no custom components, layouts, or styles yet.
- **Deployment**: `.github/workflows/deploy.yml` runs `npm ci && npm run docs:build` and uploads `docs/.vuepress/dist` to GitHub Pages.

## Adding a New Page

1. Create `docs/<page-name>.md`
2. Add it to `navbar` and `sidebar` in `docs/.vuepress/config.js`

## VuePress Frontmatter

The homepage (`docs/README.md`) uses VuePress's built-in home page layout via frontmatter (`home: true`, `heroText`, `actions`, `features`). Other pages are plain Markdown with `# H1` titles.
