"use client"

import { useEffect, useState } from "react"
import { SECTION_IDS } from "../constants/sections"

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "leadership", label: "Leadership" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
]

const THEME_STORAGE_KEY = "portfolio_theme"

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
]

function formatClock(date) {
  const pad = (n) => String(n).padStart(2, "0")
  const hours24 = date.getHours()
  const suffix = hours24 >= 12 ? "PM" : "AM"
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  return `${DAYS[date.getDay()]}, ${pad(hours12)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${suffix}`
}

/** Nivora keeps a live local-time readout in the header. */
function LiveClock({ className = "" }) {
  const [now, setNow] = useState(null)

  useEffect(() => {
    queueMicrotask(() => setNow(new Date()))
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <span
      className={`font-mono text-[10px] tracking-tight text-[rgba(255,255,255,0.5)] tabular-nums ${className}`}
      suppressHydrationWarning
    >
      {now ? formatClock(now) : " "}
    </span>
  )
}

export default function Navbar() {
  const [active, setActive] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    document.documentElement.classList.add("dark")
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark")

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return

    let rafId = null
    const update = () => {
      const focusY = window.scrollY + 140
      let current = sections[0].id
      for (const section of sections) {
        if (section.offsetTop <= focusY) current = section.id
        else break
      }
      setActive(current)
      setScrolled(window.scrollY > 20)

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setScrollProgress(progress)

      rafId = null
    }

    const onScrollOrResize = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)

    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      <nav className="fixed left-1/2 top-4 z-50 w-[94%] max-w-6xl -translate-x-1/2">
        <div
          className={`flex items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-4 transition-all duration-300 ${
            scrolled
              ? "border border-[rgba(255,255,255,0.1)] bg-black/70 backdrop-blur-xl"
              : "border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm"
          }`}
        >
          {/* Logo + live clock */}
          <div className="flex shrink-0 items-center gap-3 pl-2">
            <a
              href="#home"
              className="font-serif text-xl italic tracking-tight text-white transition-colors hover:text-[#A2E435]"
              aria-label="First — home"
            >
              First<span className="font-sans font-bold text-[#A2E435]">.</span>
            </a>
            <span className="hidden h-3.5 w-px bg-[rgba(255,255,255,0.15)] lg:block" aria-hidden />
            <LiveClock className="hidden lg:inline" />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden flex-1 justify-center gap-0.5 md:flex">
            {links.map(({ id, label }) => {
              const isActive = active === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] transition-all duration-200 ${
                    isActive
                      ? "bg-[rgba(162,228,53,0.1)] text-[#A2E435]"
                      : "text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>

          {/* Right: Resume + Hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-glow hidden h-9 items-center gap-1.5 px-5 text-[13px] md:inline-flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v5.19l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V3.75A.75.75 0 0110 3zm-5.25 9.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H4.75z" clipRule="evenodd" />
              </svg>
              Resume
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.75)] transition hover:bg-[rgba(162,228,53,0.1)] hover:text-[#A2E435] md:hidden"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-2 rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-black/90 p-3 backdrop-blur-xl md:hidden">
            <div className="grid gap-1">
              <div className="px-4 pb-2 pt-1">
                <LiveClock />
              </div>
              {links.map(({ id, label }) => {
                const isActive = active === id
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-full px-4 py-2.5 text-sm transition-all ${
                      isActive
                        ? "bg-[rgba(162,228,53,0.1)] text-[#A2E435]"
                        : "text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
                    }`}
                  >
                    {label}
                  </a>
                )
              })}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-glow mt-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v5.19l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V3.75A.75.75 0 0110 3zm-5.25 9.25a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H4.75z" clipRule="evenodd" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
