import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Hosting settings, normally set by the GitHub Pages workflow (.github/workflows/deploy.yml):
 * - BASE_PATH: the sub-path the site is served from ('/' for a root domain, '/repo-name/' for a project page).
 * - SITE_URL:  the full public URL, used for the canonical link, Open Graph tags, robots.txt and sitemap.xml.
 */
const basePath = process.env.BASE_PATH || '/'
const siteUrl = (process.env.SITE_URL || 'https://thilix.github.io/').replace(/\/?$/, '/')

/** Fills %SITE_URL% in the HTML pages and writes robots.txt + sitemap.xml for the configured URL. */
function siteUrlPlugin(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.split('%SITE_URL%').join(siteUrl),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  build: {
    rollupOptions: {
      // 404.html is a second page so static hosts can serve it for unknown URLs.
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
      },
    },
  },
})
