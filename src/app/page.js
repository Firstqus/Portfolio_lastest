"use client"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import IntroLoader from "./components/IntroLoader"
import CursorGlow from "./components/CursorGlow"
import About from "./components/About"
import Leadership from "./components/Leadership"

export default function Home() {
  return (
    <IntroLoader>
      <CursorGlow />
      <div className="bg-network" aria-hidden />
      <main className="relative z-10 min-h-screen text-slate-900 dark:text-slate-50">
        <Navbar />

        <section
          id="home"
          className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
          <div className="hero-mesh-bg" aria-hidden />
          <Hero />
        </section>

        <About />
        <Leadership />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </IntroLoader>
  )
}

