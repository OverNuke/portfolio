import type { Skill } from '@/app/_lib/types'

export function SkillBadge({ name }: Pick<Skill, 'name'>) {
  return (
    <li className="font-mono text-xs px-3 py-1.5 border border-edge text-muted hover:border-accent hover:text-accent transition-colors">
      {name}
    </li>
  )
}
