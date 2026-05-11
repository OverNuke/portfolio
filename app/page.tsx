import { About } from './_components/sections/About'
import { Certificates } from './_components/sections/Certificates'
import { Contact } from './_components/sections/Contact'
import { Hero } from './_components/sections/Hero'
import { Projects } from './_components/sections/Projects'
import { Skills } from './_components/sections/Skills'
export default function Home() {
  return (
    <main id="main-content" className="flex flex-col gap-16">
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Skills />
      <Contact />
    </main>
  )
}
