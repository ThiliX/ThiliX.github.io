/**
 * Projects shown in the "Projects" section.
 *
 * - `featured: true` shows the project as a large, full-width card at the top. Keep this to 2–3 projects.
 * - `features` / `tech` are optional: empty lists are simply not shown.
 * - `repoUrl` / `demoUrl` / `links`: buttons only appear when set. Never put a placeholder URL here.
 * - `image`: put screenshots in /public/projects/ and reference them WITHOUT a leading slash,
 *   e.g. 'projects/file.jpg' (so the site also works when hosted under a sub-path like /repo-name/).
 *   Use roughly 16:10 images (e.g. 1280×800), ideally under ~200 KB.
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
    id: 'retro-computer',
    name: "ThiliX's Battlestation",
    category: 'Interactive 3D web experience',
    year: '2026',
    featured: true,
    summary:
      'An interactive 3D room built with React and three.js. Sit down at a gaming PC and it boots "Sunset OS 98", a working 90s-style desktop with draggable windows, a terminal, Paint and a synthesizer. Every model, texture and sound is generated in code, with no downloaded assets.',
    features: [
      'Procedural 3D scene with RGB lighting, bloom and four switchable colour schemes',
      'Camera glides to the monitor; a full BIOS boot sequence leads into the retro desktop',
      'Windowed OS with taskbar, terminal, Paint, synthesizer and a CRT scanline filter',
      'All sound effects synthesised live with the Web Audio API',
    ],
    tech: ['React', 'three.js', 'JavaScript', 'Web Audio API', 'CSS'],
    image: 'projects/retro-computer.jpg',
    imageAlt: 'A 3D night-time gaming room with RGB lights, a neon ThiliX sign and a desk with a gaming PC',
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
