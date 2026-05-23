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

export default function Navbar() {
  const [active, setActive] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === "light") document.documentElement.classList.remove("dark")
    else document.documentElement.classList.add("dark")

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return

    let rafId = null
    const updateActiveByScroll = () => {
      const focusY = window.scrollY + 140
      let current = sections[0].id

      for (const section of sections) {
        if (section.offsetTop <= focusY) current = section.id
        else break
      }
      setActive(current)
      rafId = null
    }

    const onScrollOrResize = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(updateActiveByScroll)
    }

    updateActiveByScroll()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)

    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark")
    if (nextIsDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
    window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light")
  }

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[92%] max-w-6xl -translate-x-1/2">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/60 sm:px-6">
        <a
          href="#home"
          className="shrink-0 text-sm font-bold tracking-tight text-sky-600 dark:text-sky-400 md:text-base"
          aria-label="First — home"
        >
          First
        </a>

        <div className="hidden flex-1 justify-center gap-5 md:flex lg:gap-6">
          {links.map(({ id, label }) => {
            const isActive = active === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`relative px-1 py-1 text-sm transition whitespace-nowrap ${
                  isActive
                    ? "font-semibold text-sky-600 dark:text-sky-300"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-300/70 dark:hover:text-slate-50"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute left-1 right-1 -bottom-2 h-0.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                )}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-0">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
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

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <span className="sr-only">Toggle theme</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-700 dark:hidden" aria-hidden>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hidden h-5 w-5 text-sky-300 dark:inline-block" aria-hidden>
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mt-2 rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/60 md:hidden">
          <div className="grid gap-2">
            {links.map(({ id, label }) => {
              const isActive = active === id
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300/70 dark:hover:bg-white/5 dark:hover:text-slate-50"
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
