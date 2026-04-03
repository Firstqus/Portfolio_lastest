"use client"

import { useEffect, useState } from "react"
import { SECTION_IDS } from "../constants/sections"

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
]

const THEME_STORAGE_KEY = "portfolio_theme"

export default function Navbar() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    // Apply theme class to <html> to let Tailwind `dark:` variants work.
    // Default is light; only switch to dark if the user previously selected it.
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (saved === "dark") document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
    console.warn("[THEME-DBG][H1] mount", {
      saved,
      htmlHasDarkClass: document.documentElement.classList.contains("dark"),
      prefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
      bodyColor: getComputedStyle(document.body).color,
    })
    // #region agent log
    fetch("http://127.0.0.1:7595/ingest/6759185a-1876-4ee1-ae71-ee2ed22ab078", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "1f59da",
      },
      body: JSON.stringify({
        sessionId: "1f59da",
        runId: "theme-debug-1",
        hypothesisId: "H1",
        location: "Navbar.js:mount-useEffect",
        message: "Applied theme from localStorage on mount",
        data: {
          saved,
          htmlHasDarkClass: document.documentElement.classList.contains("dark"),
          prefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return

    // Use the viewport "focus line" so nav state switches predictably by scroll position.
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
    const beforeHasDark = document.documentElement.classList.contains("dark")
    const beforeStored = window.localStorage.getItem(THEME_STORAGE_KEY)
    const nextIsDark = !document.documentElement.classList.contains("dark")
    if (nextIsDark) document.documentElement.classList.add("dark")
    else document.documentElement.classList.remove("dark")
    window.localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light")
    console.warn("[THEME-DBG][H2] toggle immediate", {
      beforeHasDark,
      afterHasDark: document.documentElement.classList.contains("dark"),
      nextIsDark,
      beforeStored,
      afterStored: window.localStorage.getItem(THEME_STORAGE_KEY),
      bodyColor: getComputedStyle(document.body).color,
    })
    // #region agent log
    fetch("http://127.0.0.1:7595/ingest/6759185a-1876-4ee1-ae71-ee2ed22ab078", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "1f59da",
      },
      body: JSON.stringify({
        sessionId: "1f59da",
        runId: "theme-debug-1",
        hypothesisId: "H2",
        location: "Navbar.js:toggleTheme",
        message: "Theme toggled and localStorage updated",
        data: {
          beforeHasDark,
          afterHasDark: document.documentElement.classList.contains("dark"),
          nextIsDark,
          beforeStored,
          afterStored: window.localStorage.getItem(THEME_STORAGE_KEY),
          prefersDark: window.matchMedia("(prefers-color-scheme: dark)").matches,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    requestAnimationFrame(() => {
      const main = document.querySelector("main")
      const bodyColor = getComputedStyle(document.body).color
      const mainColor = main ? getComputedStyle(main).color : null
      console.warn("[THEME-DBG][H3] toggle raf", {
        htmlHasDarkClass: document.documentElement.classList.contains("dark"),
        bodyColor,
        mainColor,
      })
      // #region agent log
      fetch("http://127.0.0.1:7595/ingest/6759185a-1876-4ee1-ae71-ee2ed22ab078", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "1f59da",
        },
        body: JSON.stringify({
          sessionId: "1f59da",
          runId: "theme-debug-1",
          hypothesisId: "H3",
          location: "Navbar.js:toggleTheme:raf",
          message: "Computed colors after theme toggle",
          data: {
            htmlHasDarkClass: document.documentElement.classList.contains("dark"),
            bodyColor,
            mainColor,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion
    })
  }

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[92%] max-w-6xl -translate-x-1/2">
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white/70 px-6 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/60">
        <div className="flex gap-7">
          {links.map(({ id, label }) => {
            const isActive = active === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`relative px-1 py-1 text-sm transition ${
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

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="ml-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/60 transition hover:bg-white dark:border-white/10 dark:bg-white/5"
        >
          <span className="sr-only">Toggle</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-slate-700 dark:hidden"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.93 19.07l1.41-1.41" />
            <path d="M17.66 6.34l1.41-1.41" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hidden h-5 w-5 text-sky-300 dark:inline-block"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
