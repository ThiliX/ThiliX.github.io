/**
 * Skills shown in the "Skills & Technologies" section.
 * To add a skill, append it to a category's `skills` list. To add a category, add a new object.
 * `icon` must be one of the keys in `src/components/SkillIcon.tsx`.
 */
export type SkillIconName = 'code' | 'layout' | 'server' | 'database' | 'tools' | 'cloud' | 'brain'

export interface SkillCategory {
  title: string
  icon: SkillIconName
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  { title: 'Programming Languages', icon: 'code', skills: ['Java', 'Python'] },
  { title: 'Frontend Development', icon: 'layout', skills: ['HTML', 'React', 'Tailwind CSS'] },
  { title: 'Backend Development', icon: 'server', skills: ['Java', 'Spring Boot'] },
  { title: 'Database', icon: 'database', skills: ['MySQL'] },
  { title: 'Tools & Technologies', icon: 'tools', skills: ['Git', 'GitHub'] },
]
