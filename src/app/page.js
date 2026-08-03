"use client"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import IntroLoader from "./components/IntroLoader"
import CursorGlow from "./components/CursorGlow"
import ParticleNetwork from "./components/ParticleNetwork"
import About from "./components/About"
import Leadership from "./components/Leadership"
import Achievements from "./components/Achievements"
import Footer from "./components/Footer"
import BackToTop from "./components/BackToTop"

export default function Home() {
  return (
    <IntroLoader>
      <CursorGlow />
      <ParticleNetwork />
      <main
        id="main-content"
        className="relative z-10 min-h-screen text-white"
      >
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
        <Achievements />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
    </IntroLoader>
  )
}
