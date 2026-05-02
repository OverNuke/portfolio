export interface Project {
  title: string
  description: string
  tags: string[]
  href: string
  repo?: string
  featured?: boolean
}

export interface Certificate {
  title: string
  issuer: string
  date: string
  href?: string
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'tool' | 'other'
}

export interface SocialLink {
  label: string
  href: string
  icon?: string
}
