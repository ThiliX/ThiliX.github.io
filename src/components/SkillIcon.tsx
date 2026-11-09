import { Brain, Cloud, Code2, Database, LayoutTemplate, Server, Wrench, type LucideProps } from 'lucide-react'
import type { SkillIconName } from '../data/skills'

const icons = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  tools: Wrench,
  cloud: Cloud,
  brain: Brain,
} satisfies Record<SkillIconName, React.ComponentType<LucideProps>>

export default function SkillIcon({ name, ...props }: { name: SkillIconName } & LucideProps) {
  const Icon = icons[name] ?? Code2
  return <Icon aria-hidden="true" {...props} />
}
