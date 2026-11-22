/**
 * Personal details used across the site.
 * Set a value to `null` to hide it — the UI shows a labelled placeholder instead of a broken link.
 */
export interface Profile {
  name: string
  firstName: string
  brand: string
  roles: string[]
  location: string
  domain: string
  intro: string
  about: string[]
  interests: string[]
  links: {
    github: string
    linkedin: string | null
    email: string | null
  }
  /** Path to a CV in /public (e.g. '/Thilina-Wickramanayake-CV.pdf'). The download button appears only when set. */
  cvUrl: string | null
  /**
   * Form service endpoint (e.g. a Formspree URL like 'https://formspree.io/f/xxxxxx').
   * When null, the form falls back to opening the visitor's email app (if `links.email` is set).
   */
  formEndpoint: string | null
}

export const profile: Profile = {
  name: 'Thilina Wickramanayake',
  firstName: 'Thilina',
  brand: 'ThiliX',
  roles: ['Software Engineering Undergraduate', 'Full-Stack Developer', 'Cloud & DevOps Enthusiast'],
  location: 'Sri Lanka',
  domain: 'thilixretro.com',
  intro:
    "Hi, I'm Thilina — a Software Engineering undergraduate who builds full-stack web apps, from React interfaces to .NET, Spring Boot and Python backends, and is especially interested in cloud: shipping apps with Docker, CI pipelines and Kubernetes.",
  about: [
    "I'm a Software Engineering undergraduate at NSBM Green University in Sri Lanka, expected to graduate in 2028. What I enjoy most about software is the step from a rough idea to something people can actually open, click through and rely on.",
    'Most of my work is full-stack: React and TypeScript on the frontend, C#/.NET, Java and Spring Boot or Python on the backend, and PostgreSQL or MySQL for data. My biggest project so far, PulseWatch, is a self-hostable API monitoring tool with incidents, email alerts and a dashboard, designed with security in mind from the start.',
    "Cloud computing is the area I'm most keen to grow in, especially how software gets shipped and kept running. I've built CI pipelines with GitHub Actions, containerised apps with Docker and run them on Kubernetes, and took part in the AzureX 2026 Azure Fundamentals workshop. I learn best by building, so most new topics end up as a project on my GitHub.",
  ],
  interests: [
    'Software Engineering',
    'Full-Stack Web Development',
    'Artificial Intelligence',
    'Cloud Computing & DevOps',
    'Creative Technology Projects',
  ],
  links: {
    github: 'https://github.com/ThiliX',
    linkedin: null, // TODO: add your LinkedIn profile URL
    email: null, // TODO: add your email address
  },
  cvUrl: null,
  formEndpoint: null,
}
