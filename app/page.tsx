import dynamic from "next/dynamic";
import { About } from './_components/sections/About'
import { Contact } from './_components/sections/Contact'
import { Hero } from './_components/sections/Hero'
import { Projects } from './_components/sections/Projects'

const Certificates = dynamic(() =>
  import('./_components/sections/Certificates').then((m) => ({ default: m.Certificates }))
);

const Skills = dynamic(() =>
  import('./_components/sections/Skills').then((m) => ({ default: m.Skills }))
);
export default function Home() {
  return (
    <main id="main-content">
      <div className="container-content flex flex-col gap-y-content md:gap-y-heading">
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Skills />
        <Contact />
      </div>
    </main>
  )
}
