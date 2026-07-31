"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { INTRO_STORAGE_KEY } from "../constants/sections"

const MIN_MS = 700

export default function IntroLoader({ children }) {
  const [showLoader, setShowLoader] = useState(null)

  const dismiss = () => {
    localStorage.setItem(INTRO_STORAGE_KEY, "1")
    setShowLoader(false)
  }

  useEffect(() => {
    queueMicrotask(() => {
      if (localStorage.getItem(INTRO_STORAGE_KEY)) {
        setShowLoader(false)
      } else {
        setShowLoader(true)
      }
    })
  }, [])

  useEffect(() => {
    if (showLoader !== true) return
    const t = setTimeout(() => {
      localStorage.setItem(INTRO_STORAGE_KEY, "1")
      setShowLoader(false)
    }, MIN_MS)
    return () => clearTimeout(t)
  }, [showLoader])

  const contentVisible =
    showLoader === false
      ? "opacity-100 transition-opacity duration-500"
      : "opacity-0 pointer-events-none select-none"

  return (
    <>
      <div className={contentVisible}>{children}</div>

      {showLoader === null && (
        <div
          className="fixed inset-0 z-[200] bg-[#000000]"
          aria-busy="true"
          aria-label="Loading"
        />
      )}

      <AnimatePresence>
        {showLoader === true && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#000000]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            aria-busy="true"
            aria-label="Welcome"
          >
            <motion.div
              className="h-10 w-10 rounded-full border-2 border-[#A2E435] border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            />
            <p className="font-mono text-xs tracking-widest text-[rgba(255,255,255,0.75)] uppercase">Loading portfolio…</p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-2 rounded-full border border-[rgba(255,255,255,0.12)] bg-transparent px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[rgba(255,255,255,0.75)] transition-all hover:border-[#A2E435] hover:text-[#A2E435]"
            >
              Skip intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
