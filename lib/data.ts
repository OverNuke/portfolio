import type { Certificate, Project, Skill, SocialLink } from '@/types'

export const PROJECTS: Project[] = [
  {
    title: 'Barbershop',
    subtitle: 'Final project for Web Development Course',
    description:
      'Backend for an online booking system for a barbershop. Includes booking management, notifications, and full API documentation in the project wiki.',
    tags: ['Express', 'JavaScript', 'Docker', 'MySQL'],
    href: '#',
    repo: 'https://github.com/Sinhularity/barbershop',
    featured: true,
    image: '/projects/barbershop/user.png',
  },
  {
    title: 'AcopiaTech',
    subtitle: 'Mobile app for e-waste donation',
    description:
      'Allows users to find nearby e-waste collection points, schedule pickups, and learn about proper e-waste disposal.',
    tags: ['Google Maps API', 'Flutter', 'Dart', 'Firebase'],
    href: '#',
    repo: 'https://github.com/Sinhularity/acopiatech-app',
    featured: true,
    image: '/projects/acopiatech/main.jpg',
  },
  {
    title: 'Odoo Custom Module',
    subtitle: 'Document management module for a local company',
    description:
      'Maintenance and new features for a custom Odoo module handling document management workflows.',
    tags: ['Odoo', 'Python', 'PostgreSQL'],
    href: '#',
    featured: true,
    image: '/projects/odoo/access.png',
  },
    {
    title: 'Personal Portfolio',
    subtitle: 'My personal developer portfolio',
    description:
      "The site you're looking at. Dot-field background, retro game-button accents and a project section that tries to feel like both a gallery and a terminal.",
    tags: ['next.js', 'typescript', 'tailwind', 'shaders'],
    href: '/projects/portfolio',
    repo: 'https://github.com/OverNuke/portfolio',
    year: '2025',
    medium: 'FRONTEND',
  },
]


export const CERTIFICATES: Certificate[] = [
  {
    id: 'anfeca',
    title: 'ANFECA Academic Recognition',
    issuer: 'ANFECA',
    date: '2025',
    href: '/certificates/ANFECA_Certificate.jpg',
    category: 'honors',
    icon: 'trophy',
    hero: true,
  },
  {
    id: 'nota',
    title: 'Nota Laudatoria',
    issuer: 'Universidad',
    date: '2025',
    href: '/certificates/notaLaudatoria.pdf',
    category: 'honors',
    icon: 'crown',
  },
  {
    id: 'exaver',
    title: 'EXAVER Language Proficiency',
    issuer: 'Universidad Veracruzana',
    date: '2022',
    href: '/certificates/exaver.pdf',
    category: 'language',
    icon: 'globe',
  },
  {
    id: 'anglo',
    title: 'English Language Certificate',
    issuer: 'Anglo Mexicano de Coatzacoalcos',
    date: '2021',
    href: '/certificates/anglo.pdf',
    category: 'academic',
    icon: 'scroll',
  },
  {
    id: 'toefl',
    title: 'TOEFL Certificate',
    issuer: 'SEP',
    date: '2018',
    href: '/certificates/sepToelf.pdf',
    category: 'language',
    icon: 'globe',
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
  { label: 'GitHub', href: 'https://github.com/OverNuke', icon: '/github-light.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/keffwontwakeup/', icon: '/linkedin.svg' },
  { label: 'Email', href: 'mailto:ksfgarcia24@gmail.com', icon: '/gmail.svg' },
]
