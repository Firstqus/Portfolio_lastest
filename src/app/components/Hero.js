"use client"

import FadeInWhenVisible from "./FadeInWhenVisible"
import HeroModel from "./hero/HeroModel"

const QUOTE =
  "A wise man learns from the mistakes of others."
const AUTHOR = "Zhuge Liang"

export default function Hero() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <FadeInWhenVisible y={20}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
                  Welcome to my portfolio
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-6xl">
                  Patawee Kimhia
                </h1>
                <p className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent dark:from-sky-400 dark:to-indigo-400 md:text-2xl">
                  Full-stack &amp; Game Developer
                </p>
              </div>

              <div className="border-l-2 border-sky-500/30 pl-4 py-1">
                <p className="italic text-base text-slate-600 dark:text-slate-300">
                  &ldquo;{QUOTE}&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  — {AUTHOR}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-sky-500 px-6 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-sky-500/30 dark:bg-sky-500 dark:hover:bg-sky-400"
                >
                  Explore Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white/70 px-6 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-50 dark:hover:bg-white/10"
                >
                  Let&apos;s Connect
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        <div className="lg:col-span-6">
          <FadeInWhenVisible delay={0.08} y={24}>
            <HeroModel />
          </FadeInWhenVisible>
        </div>
      </div>
    </div>
  )
}
