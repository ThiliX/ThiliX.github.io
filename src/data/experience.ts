/**
 * Education and "Experience & Learning" entries.
 * Only add things that actually happened — workshops, courses, volunteering, internships.
 */
export interface EducationEntry {
  institution: string
  programme: string
  status: string
  period: string
  location: string
  notes: string[]
}

export const education: EducationEntry[] = [
  {
    institution: 'NSBM Green University',
    programme: 'Software Engineering',
    status: 'Undergraduate · Currently studying',
    period: 'Expected graduation: 2028',
    location: 'Sri Lanka',
    notes: [
      'Building foundations in programming, databases and software design.',
      'Applying coursework through hands-on projects such as the AI module of the TalentIQ team project and mobile apps in Flutter and React Native.',
    ],
  },
]

export type LearningKind = 'Workshop' | 'Academic' | 'Self-learning' | 'Experience'

export interface LearningEntry {
  kind: LearningKind
  title: string
  organisation?: string
  date: string
  description: string
  /** Optional small clarification shown under the entry. */
  note?: string
}

export const learning: LearningEntry[] = [
  {
    kind: 'Workshop',
    title: 'AzureX 2026 — Azure Fundamentals Workshop',
    date: '2026',
    description: 'A workshop introducing the fundamentals of Microsoft Azure and core cloud computing concepts.',
    note: 'Workshop participation — not a professional certification.',
  },
  {
    kind: 'Academic',
    title: 'Software Engineering coursework',
    organisation: 'NSBM Green University',
    date: 'Ongoing',
    description: 'Learning object-oriented programming, database design and software engineering practice through university modules and project work.',
  },
  {
    kind: 'Self-learning',
    title: 'Full-stack & DevOps projects',
    date: 'Ongoing',
    description: 'Building and shipping my own projects: React and TypeScript interfaces, .NET and Spring Boot APIs, Docker images, GitHub Actions pipelines and Kubernetes deployments.',
  },
]
