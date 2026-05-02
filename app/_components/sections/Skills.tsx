import { SKILLS } from '@/app/_lib/data'
import { SectionHeading } from '../ui/SectionHeading'
import { SkillBadge } from '../ui/SkillBadge'

const CATEGORY_ORDER: string[] = ['language', 'framework', 'tool', 'other']

export function Skills() {
  const categories = CATEGORY_ORDER.filter((cat) =>
    SKILLS.some((s) => s.category === cat)
  )

  return (
    <section id="skills" className="py-24" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading label="// 04" id="skills-heading">
          Skills
        </SectionHeading>
        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4 capitalize">
                {cat}
              </h3>
              <ul
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={`${cat} skills`}
              >
                {SKILLS.filter((s) => s.category === cat).map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
