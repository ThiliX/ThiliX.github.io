# ThiliX — Portfolio

Personal portfolio of **Thilina Wickramanayake (ThiliX)**, Software Engineering undergraduate at NSBM Green University.
Hosted free on GitHub Pages; see [Deploying](#deploying-free-on-github-pages).

Built with React 18, TypeScript, Vite, Tailwind CSS v4 and Lucide icons. No animation library: scroll animations use a small `IntersectionObserver` component.

## Getting started

Requires Node.js 18+ (20 LTS or newer recommended).

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
npm run typecheck  # TypeScript check only
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Project structure

```
├── index.html              # Main page: SEO meta tags, Open Graph, JSON-LD, theme script
├── 404.html                # Custom 404 page (served by static hosts for unknown URLs)
├── public/
│   ├── favicon.svg         # "TX" monogram favicon
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── data/               # ← ALL CONTENT LIVES HERE
    │   ├── profile.ts      # name, intro, about text, links, CV, form endpoint
    │   ├── skills.ts       # skill categories
    │   ├── projects.ts     # featured projects
    │   ├── experience.ts   # education + workshops/learning
    │   └── navigation.ts   # navbar items
    ├── sections/           # One component per page section (Hero, About, Skills, …)
    ├── components/         # Reusable UI: Navbar, Footer, Section, Button, ProjectCard, ContactForm, …
    ├── hooks/              # useTheme (light/dark), useActiveSection (navbar highlight)
    ├── pages/NotFound.tsx  # 404 page
    ├── index.css           # Tailwind import + colour tokens (light & dark)
    ├── App.tsx             # Page layout
    └── main.tsx            # Entry: shows the portfolio on "/" and the 404 page anywhere else
```

## Updating content

You should rarely need to touch components. Edit the files in `src/data/`.

### Personal details: `src/data/profile.ts`

- `links.email` / `links.linkedin`: set these to show real links. While they're `null`, the site shows a labelled placeholder ("to be added") instead of a fake link.
- `about`: the About paragraphs, one string per paragraph.
- `cvUrl`: put your CV in `public/` (e.g. `public/Thilina-Wickramanayake-CV.pdf`) and set `cvUrl: '/Thilina-Wickramanayake-CV.pdf'`. A **Download CV** button then appears in the hero.

### Contact form

The form chooses how to send messages based on `profile.ts`:

| `formEndpoint` | `links.email` | Behaviour |
| --- | --- | --- |
| set | any | Sends messages to the form service (works with Formspree, Getform, Basin, etc.) |
| `null` | set | Opens the visitor's email app with the message pre-filled |
| `null` | `null` | Form shown disabled with a note pointing to GitHub (current state) |

To get a working form with Formspree: create a free form at formspree.io, copy its endpoint (`https://formspree.io/f/xxxxxxx`) into `formEndpoint`, and rebuild.

### Skills: `src/data/skills.ts`

Add a skill to an existing category's `skills` array, or add a new category:

```ts
{ title: 'Cloud & DevOps', icon: 'cloud', skills: ['Microsoft Azure', 'Docker'] },
```

Available icons: `code`, `layout`, `server`, `database`, `tools`, `cloud`, `brain`. Add more in `src/components/SkillIcon.tsx` using any [Lucide icon](https://lucide.dev/icons).

### Projects: `src/data/projects.ts`

Each project has optional fields. Leave them out and the card shows a clear placeholder:

```ts
{
  id: 'smart-retail-pro',
  name: 'Smart Retail Pro',
  category: 'Software Engineering Project',
  summary: 'One or two sentences on what it does.',
  features: ['Inventory tracking', 'Sales reports'],
  tech: ['Java', 'Spring Boot', 'MySQL', 'React'],
  year: '2026',
  featured: false,                            // true = large card at the top (keep to 2–3)
  image: 'projects/smart-retail-pro.webp',    // file in public/projects/ — no leading slash
  imageAlt: 'Smart Retail Pro dashboard',
  repoUrl: 'https://github.com/ThiliX/your-repo',
  demoUrl: 'https://your-live-demo.example',  // Live demo button only appears when set
  links: [{ label: 'Docker Hub', href: 'https://hub.docker.com/r/...' }],  // optional extra buttons
},
```

- **Screenshots:** about 1280×800 (16:10), under ~200 KB, in `public/projects/` (`.webp` or `.jpg`).
- **Technology filter:** shows every technology used by at least two projects.
- **Empty `features`:** the Highlights list is simply hidden.
- **New project:** add another object to the array. The grid adjusts automatically.

### Education & workshops: `src/data/experience.ts`

Add entries to `learning` (kinds: `Workshop`, `Academic`, `Self-learning`, `Experience`). Use `note` for clarifications such as "Workshop participation — not a professional certification."

### Colours

The accent colour and all theme colours are tokens at the top of `src/index.css` (`:root` for light, `.dark` for dark). Change `--accent` in both to re-theme the site.

## Production build

```bash
npm run build
```

The finished static site is in `dist/`. It needs no server-side code, so any static host works.

## Deploying (free, on GitHub Pages)

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

**One-time setup:** in the GitHub repo, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. Push, and the site appears at the URL shown in the **Actions** tab.

The URL depends on the repository name, and the workflow sets the base path, canonical URL, `robots.txt` and `sitemap.xml` to match:

| Repository name | Site URL |
| --- | --- |
| `ThiliX.github.io` (recommended for a CV) | `https://thilix.github.io/` |
| anything else, e.g. `coauth` | `https://thilix.github.io/coauth/` |

**Custom domain (optional):** add a repository variable `CUSTOM_DOMAIN` (Settings → Secrets and variables → Actions → Variables), e.g. `thilixretro.com`, then in **Settings → Pages** enter the domain. At your registrar add `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and a `CNAME` for `www` → `thilix.github.io`. Tick **Enforce HTTPS** once the certificate is ready.

To test a sub-path build locally (PowerShell): `$env:BASE_PATH='/coauth/'; npm run build; npx vite preview --base /coauth/`

After deploying, submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console) to help the site get indexed.
