import type { Project } from '@/types'

export function ProjectCard({ title, subtitle, description, tags, href, repo }: Project) {
  return (
    <article className="group border border-edge p-6 hover:border-accent/50 transition-colors h-full flex flex-col">
      <h3 className="text-lg font-sans font-semibold text-foreground mb-1 group-hover:text-foreground/70 transition-colors">
        {title}
      </h3>
      {subtitle && (
        <p className="text-xs text-muted font-mono mb-2">{subtitle}</p>
      )}
      <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{description}</p>
      <ul className="flex flex-wrap gap-2 mb-5" aria-label="Technologies used">
        {tags.map((tag) => (
          <li
            key={tag}
            className="font-mono text-xs text-muted px-2 py-0.5 border border-accent/30"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="flex gap-4">
        {href && href !== '#' && (
          <a
            href={href}
            className="font-mono text-xs text-muted hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} live demo`}
          >
            Live →
          </a>
        )}
        {repo && repo !== '#' && (
          <a
            href={repo}
            className="font-mono text-xs text-muted hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} source on GitHub`}
          >
            GitHub →
          </a>
        )}
      </div>
    </article>
  )
}
