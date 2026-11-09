/**
 * Featured projects.
 *
 * - Leave `features` or `tech` empty and the card shows a labelled "to be added" note.
 * - `repoUrl` / `demoUrl`: buttons only appear when a URL is set. Never put a placeholder URL here.
 * - `image`: put screenshots in /public/projects/ and reference them as '/projects/file.webp'.
 *   Use roughly 16:10 images (e.g. 1280×800) saved as .webp for the best performance.
 * - The technology filter above the grid appears automatically once projects list `tech`.
 */
export interface Project {
  id: string
  name: string
  category: string
  summary: string
  features: string[]
  tech: string[]
  image?: string
  imageAlt?: string
  repoUrl?: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    id: 'smart-retail-pro',
    name: 'Smart Retail Pro',
    category: 'Software Engineering Project',
    summary: 'A retail operations management system designed to support the day-to-day running of a retail business.',
    features: [],
    tech: [],
    // image: '/projects/smart-retail-pro.webp',
    // repoUrl: 'https://github.com/ThiliX/<repository>',
  },
  {
    id: 'student-hub',
    name: 'Student Hub',
    category: 'Student Application',
    summary: 'A student-focused application built around the everyday needs of university students.',
    features: [],
    tech: [],
    // image: '/projects/student-hub.webp',
    // repoUrl: 'https://github.com/ThiliX/<repository>',
  },
  {
    id: 'talentiq',
    name: 'TalentIQ',
    category: 'AI Project',
    summary: 'An AI-related software project. Details of its technical implementation will be added here.',
    features: [],
    tech: [],
    // image: '/projects/talentiq.webp',
    // repoUrl: 'https://github.com/ThiliX/<repository>',
    // demoUrl: 'https://<live-demo-url>',
  },
]
