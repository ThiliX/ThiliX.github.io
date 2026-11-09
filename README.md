# ThiliX — Portfolio

Personal portfolio of **Thilina Wickramanayake (ThiliX)**, Software Engineering undergraduate at NSBM Green University.
Live at **[thilixretro.com](https://thilixretro.com)** (once deployed).

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
  image: '/projects/smart-retail-pro.webp',  // file in public/projects/
  imageAlt: 'Smart Retail Pro dashboard',
  repoUrl: 'https://github.com/ThiliX/your-repo',
  demoUrl: 'https://your-live-demo.example',  // Live demo button only appears when set
},
```

- **Screenshots:** save as `.webp`, about 1280×800 (16:10), under ~200 KB, in `public/projects/`.
- **Technology filter:** the filter buttons above the projects appear automatically once projects list at least two different technologies in `tech`.
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

## Deploying to thilixretro.com

### Option A: Vercel (recommended, free)

1. Push this project to a GitHub repository.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repo. Vercel detects Vite automatically (build: `npm run build`, output: `dist`).
3. In **Project → Settings → Domains**, add `thilixretro.com` and `www.thilixretro.com`.
4. At your domain registrar, add the DNS records Vercel shows. Typically:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
5. HTTPS is issued automatically once DNS propagates (minutes to a few hours).

Vercel serves `dist/404.html` for unknown URLs automatically.

### Option B: Netlify (free)

1. Import the GitHub repo on [netlify.com](https://netlify.com). Build command `npm run build`, publish directory `dist`.
2. **Domain management → Add a domain** → `thilixretro.com`, then follow the DNS instructions (Netlify DNS, or an `A` record to Netlify's load balancer plus a `www` CNAME).
3. Netlify uses `404.html` automatically.

### Option C: GitHub Pages

1. Create `public/CNAME` containing just `thilixretro.com`.
2. Build and publish `dist/` with a GitHub Actions workflow ("Static HTML" / Vite template under **Settings → Pages → Build and deployment → GitHub Actions**).
3. At your registrar, add `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and a `CNAME` for `www` → `ThiliX.github.io`.
4. Tick **Enforce HTTPS** in Pages settings once the certificate is ready.

### After deploying

- The canonical URL, Open Graph URL, `robots.txt` and `sitemap.xml` already point to `https://thilixretro.com/`. Update them if you use a different domain.
- Submit the sitemap in [Google Search Console](https://search.google.com/search-console) to help the site get indexed.
