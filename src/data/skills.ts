/**
 * Skills shown in the "Skills & Technologies" section.
 * To add a skill, append it to a category's `skills` list. To add a category, add a new object.
 * `icon` must be one of the keys in `src/components/SkillIcon.tsx`.
 */
export type SkillIconName = 'code' | 'layout' | 'server' | 'database' | 'tools' | 'cloud' | 'brain' | 'mobile'

export interface SkillCategory {
  title: string
  icon: SkillIconName
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  { title: 'Languages', icon: 'code', skills: ['Python', 'TypeScript', 'JavaScript', 'C#', 'Java', 'Dart'] },
  { title: 'Frontend', icon: 'layout', skills: ['React', 'Tailwind CSS', 'three.js', 'HTML', 'CSS', 'Vite'] },
  { title: 'Backend', icon: 'server', skills: ['.NET / ASP.NET Core', 'EF Core', 'Spring Boot', 'Python / Flask', 'REST APIs'] },
  { title: 'Databases', icon: 'database', skills: ['PostgreSQL', 'MySQL'] },
  { title: 'Cloud & DevOps', icon: 'cloud', skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'Microsoft Azure (fundamentals)'] },
  { title: 'Mobile', icon: 'mobile', skills: ['Flutter', 'React Native', 'Expo'] },
  { title: 'Tools & Practices', icon: 'tools', skills: ['Git', 'GitHub', 'Automated testing (pytest)', 'Linux / Bash'] },
]
