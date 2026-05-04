import { PROJECTS } from '@/app/_lib/data'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../ui/ProjectCard'
import { ProjectShowcase } from '../ui/ProjectShowcase'

export function Projects() {
  return (
    <section id="projects" className="py-24" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading label="// 02" id="projects-heading">
          Projects
        </SectionHeading>
        <ProjectShowcase />
        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Project list"
        >
          {PROJECTS.map((project) => (
            <li key={project.title}>
              <ProjectCard {...project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
