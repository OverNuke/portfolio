export interface Project {
  title: string
  subtitle?: string
  description: string
  tags: string[]
  href: string
  repo?: string
  featured?: boolean
  image?: string
  year?: string
  medium?: string
}

export type CertificateCategory = 'academic' | 'language' | 'honors'
export type CertificatePixelIcon = 'trophy' | 'crown' | 'globe' | 'scroll'

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  href: string
  category: CertificateCategory
  icon: CertificatePixelIcon
  hero?: boolean
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
