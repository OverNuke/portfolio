import type { Certificate, Project, Skill, SocialLink } from './types'

export const PROJECTS: Project[] = [
  {
    title: 'Project One',
    description: 'Describe what this project does and the problem it solves.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    href: '#',
    repo: '#',
    featured: true,
  },
  {
    title: 'Project Two',
    description: 'Describe what this project does and the problem it solves.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    href: '#',
    repo: '#',
  },
  {
    title: 'Project Three',
    description: 'Describe what this project does and the problem it solves.',
    tags: ['TypeScript', 'REST API'],
    href: '#',
    repo: '#',
  },
]

export const CERTIFICATES: Certificate[] = [
  {
    title: 'Certificate Title',
    issuer: 'Issuing Organization',
    date: '2024',
    href: '#',
  },
  {
    title: 'Certificate Title',
    issuer: 'Issuing Organization',
    date: '2023',
    href: '#',
  },
]

export const SKILLS: Skill[] = [
  { name: 'TypeScript', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'HTML', category: 'language' },
  { name: 'CSS', category: 'language' },
  { name: 'React', category: 'framework' },
  { name: 'Next.js', category: 'framework' },
  { name: 'Tailwind CSS', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Git', category: 'tool' },
  { name: 'VS Code', category: 'tool' },
  { name: 'Figma', category: 'tool' },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com', icon: '/github-light.svg' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '/linkedin.svg' },
  { label: 'Email', href: 'mailto:ksfgarcia24@gmail.com', icon: '/gmail.svg' },
]
