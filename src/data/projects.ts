/**
 * Projects shown in the "Projects" section.
 *
 * - `featured: true` shows the project as a large, full-width card at the top. Keep this to 2–3 projects.
 * - `features` / `tech` are optional: empty lists are simply not shown.
 * - `repoUrl` / `demoUrl` / `links`: buttons only appear when set. Never put a placeholder URL here.
 * - `image`: put screenshots in /public/projects/ and reference them WITHOUT a leading slash,
 *   e.g. 'projects/file.jpg' (so the site also works when hosted under a sub-path like /repo-name/).
 *   Use roughly 16:10 images (e.g. 1280×800), ideally under ~200 KB.
 * - `video`: an optional MP4 shown instead of the image (muted, looping, plays while on screen).
 *   `image` is then used as its poster, and is all that reduced-motion visitors see until they press play.
 * - The technology filter shows every technology used by at least two projects.
 */
export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  id: string
  name: string
  category: string
  year: string
  summary: string
  features: string[]
  tech: string[]
  featured?: boolean
  image?: string
  imageAlt?: string
  /** Short muted demo clip (MP4) shown in place of the image; `image` becomes its poster. */
  video?: string
  repoUrl?: string
  demoUrl?: string
  /** Extra buttons, e.g. a second repository or a Docker Hub image. */
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: 'pulsewatch',
    name: 'PulseWatch',
    category: 'Full-stack · Open source',
    year: '2026',
    featured: true,
    summary:
      'A self-hostable API monitoring tool. It checks HTTP endpoints on a schedule, records status and response times, opens incidents when failures persist, emails alerts on failure and recovery, and shows the history in a dashboard. Designed security-first, since a tool that requests user-chosen URLs is a classic SSRF target.',
    features: [
      'Scheduled HTTP checks with incidents that open after N failures and resolve after M successes',
      'Email alerts through a transactional outbox with retries, so no alert is lost',
      'Four-layer SSRF protection, including connect-time address pinning against DNS rebinding',
      'Dashboard with uptime, p95 latency and response-time charts for 24 h / 7 d / 30 d',
      'Production setup: Docker Compose, Caddy auto-HTTPS, OpenTelemetry, backup & restore scripts',
    ],
    tech: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'React', 'TypeScript', 'Tailwind CSS', 'Docker'],
    image: 'projects/pulsewatch.webp',
    imageAlt: 'PulseWatch dashboard listing monitored APIs with their status, uptime and response times',
    repoUrl: 'https://github.com/ThiliX/pulsewatch',
  },
  {
    id: 'servora',
    name: 'Servora',
    category: 'Full-stack · AI · Multi-tenant SaaS',
    year: '2026',
    featured: true,
    summary:
      "A multi-tenant AI customer-support platform. Each business gets an isolated workspace: an assistant that answers customers only from that business's documents and cites them, an embeddable chat widget, and a team inbox where a person takes over when the assistant shouldn't answer.",
    features: [
      'Grounded answers: every citation is checked against the retrieved passages; with weak evidence the customer gets a person, not a guess',
      'Measured on a live model: 87% of answerable questions answered from the right document, 0 of 10 out-of-scope questions answered',
      'Tenant isolation enforced twice, in the application and by PostgreSQL Row-Level Security, with a cross-tenant test matrix over every endpoint',
      'Race-free AI-to-human handoff: once an agent takes over, a reply still being generated is never delivered',
      'Production-minded: hardened containers, OpenTelemetry traces across services, backups with a restore drill, Playwright and WCAG 2.1 AA checks',
    ],
    tech: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'React', 'TypeScript', 'Docker', 'OpenTelemetry'],
    image: 'projects/servora-poster.webp',
    video: 'projects/servora-demo.mp4',
    imageAlt:
      "Servora demo: a customer on a demo shop's website asks about returns and gets an answer citing the shop's returns policy, asks for a person, and an agent takes over and replies from the team inbox",
    repoUrl: 'https://github.com/ThiliX/Servora',
  },
  {
    id: 'retro-computer',
    name: "ThiliX's Portfolio XP",
    category: 'Interactive web experience',
    year: '2026',
    featured: true,
    summary:
      'A portfolio that boots like an early-2000s PC, built with React. A boot splash and log-on screen lead to a full desktop with draggable windows, a Start menu, a taskbar and built-in apps, with every system sound synthesised live in the browser.',
    features: [
      'Boot splash, welcome screen and log-on flow, plus Log Off, Stand By, Restart and Turn Off',
      'Window manager with drag, minimize/maximize, focus and a taskbar button per window',
      'Built-in apps: System Properties, Notepad, Command Prompt, web browser, Paint, Synth-80 and a K.I.T.T. AI chat',
      'System sounds synthesised with the Web Audio API, so no audio files ship with the app',
    ],
    tech: ['React', 'JavaScript', 'CSS', 'Web Audio API'],
    image: 'projects/retro-computer.webp',
    imageAlt: "An early-2000s style desktop with icons, a System Properties window showing Thilina's photo and details, and a blue taskbar",
    repoUrl: 'https://github.com/ThiliX/Retro-Computer',
    demoUrl: 'https://thilix.github.io/Retro-Computer/',
  },
  {
    id: 'talentiq',
    name: 'TalentIQ',
    category: 'Team project · AI module owner',
    year: '2026',
    summary:
      'An AI-assisted recruitment platform covering the full hiring lifecycle, built by a team of six for the Software Architecture module as an ASP.NET Core modular monolith. I owned the AI module: backend and UI.',
    features: [
      'Résumé-to-job match analysis with Gemini: score, matched and missing skills, strengths, growth areas and recommendations',
      'Deterministic fallback scoring, so screening keeps working when the AI service is unavailable',
      'REST endpoints for résumé analysis and AI-generated interview questions',
      'React UI for candidate screening, job recommendations and match breakdowns',
    ],
    tech: ['C#', '.NET', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Gemini API', 'React', 'TypeScript', 'Docker'],
    repoUrl: 'https://github.com/TalentIq-team/talentIQ',
  },
  {
    id: 'devops-practical',
    name: 'DevOps Pipeline Practical',
    category: 'DevOps · CI & Kubernetes',
    year: '2026',
    summary:
      'A Python Flask web app taken through a DevOps lifecycle: version control, automated testing in CI, containerisation, Kubernetes orchestration and a chaos test of self-healing.',
    features: [
      'GitHub Actions pipeline that runs pytest as a quality gate on every push',
      'Docker image published to Docker Hub',
      'Kubernetes Deployment with 2 replicas and a NodePort Service on Minikube',
      'Chaos test: deleted pods are recreated automatically',
    ],
    tech: ['Python', 'Flask', 'pytest', 'GitHub Actions', 'Docker', 'Kubernetes'],
    repoUrl: 'https://github.com/ThiliX/devops-practical',
    links: [{ label: 'Docker Hub', href: 'https://hub.docker.com/r/thilix7/flask-app' }],
  },
  {
    id: 'mobile-apps',
    name: 'Mobile App Development',
    category: 'Mobile · Coursework',
    year: '2026',
    summary:
      'Cross-platform mobile apps built for my Mobile Application Development module, using both Flutter and React Native.',
    features: [
      'Mini Cricket (Flutter): a one-over batting game with random shot outcomes, score and ball tracking',
      'Profile Details (React Native + Expo): a profile screen with avatar, details and a points counter',
    ],
    tech: ['Flutter', 'Dart', 'React Native', 'Expo', 'JavaScript'],
    repoUrl: 'https://github.com/ThiliX/cricketapp',
    links: [{ label: 'Profile app', href: 'https://github.com/ThiliX/profiledetailsapp' }],
  },
]
