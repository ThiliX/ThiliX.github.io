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
  roles: ['Software Engineering Undergraduate', 'Frontend Developer', 'Tech Enthusiast'],
  location: 'Sri Lanka',
  domain: 'thilixretro.com',
  intro:
    "Hi, I'm Thilina — a Software Engineering undergraduate passionate about building modern web applications, exploring emerging technologies, and turning ideas into practical solutions.",
  about: [
    "I'm a Software Engineering undergraduate at NSBM Green University in Sri Lanka, expected to graduate in 2028. What I enjoy most about software is the step from a rough idea to something people can actually open, click through and rely on.",
    'Right now my focus is frontend development — building interfaces with React and Tailwind CSS — alongside Java and Spring Boot on the backend and MySQL for data. Projects like Smart Retail Pro and Student Hub have given me practice taking a project from a blank repository to working features, and using Git and GitHub to keep that work organised.',
    "Beyond coursework, I'm exploring artificial intelligence, cloud computing and DevOps, most recently through the AzureX 2026 Azure Fundamentals workshop. I learn best by building, so most new topics end up as a small project on my GitHub.",
  ],
  interests: [
    'Software Engineering',
    'Frontend & Web Development',
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
