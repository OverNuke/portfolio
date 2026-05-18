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

export interface AboutTrait {
  label: string
  value: number
  max: number
}

export interface AboutProfile {
  firstName: string
  lastName: string
  role: string
  roleClass: string
  level: number
  exp: { current: number; max: number }
  slot: number
  status: string
  statusOnline: boolean
  bio: string
  bodyText: string
  location: string
  openTo: string
  traits: AboutTrait[]
  avatarSrc: string
  avatarSrcHover?: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
}
