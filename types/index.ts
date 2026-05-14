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
export type CertificateShape = 'hero' | 'circle' | 'pill' | 'strip' | 'portrait'

export interface Certificate {
  title: string
  issuer: string
  date: string
  href?: string
  category: CertificateCategory
  shape: CertificateShape
  ext?: 'PDF' | 'JPG' | 'PNG'
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
