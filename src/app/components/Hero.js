"use client"

import FadeInWhenVisible from "./FadeInWhenVisible"
import HeroModel from "./hero/HeroModel"
import { HERO_SUMMARY, SOCIAL_LINKS } from "../constants/social"
import { TypeAnimation } from "react-type-animation"
import SocialIcon from "./SocialIcon"

const QUOTE =
  "A wise man learns from the mistakes of others."
const AUTHOR = "Zhuge Liang"

const ROLES = [
  "Full-stack Developer",
  1200,
  "Game Developer",
  1200,
  "Unity & C# Builder",
  1200,
  "Problem Solver",
  1200,
]

export default function Hero() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <FadeInWhenVisible y={20}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
                  Welcome to my portfolio
                </span>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 md:text-6xl">
                  Patawee Kimhia
                </h1>
                <p className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent md:text-2xl dark:from-sky-400 dark:to-indigo-400">
                  Full-stack &amp;{" "}
                  <TypeAnimation
                    sequence={ROLES}
                    wrapper="span"
                    speed={45}
                    repeat={Infinity}
                    className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-400"
                  />
                </p>
              </div>

              <p className="max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                {HERO_SUMMARY}
              </p>

              <div className="border-l-2 border-sky-500/30 py-1 pl-4">
                <p className="text-base italic text-slate-600 dark:text-slate-300">
                  &ldquo;{QUOTE}&rdquo;
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  — {AUTHOR}
                </p>
              </div>

              <div className="mt-2 flex flex-wrap gap-4">
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

              <div className="flex items-center gap-3 pt-1">
                {SOCIAL_LINKS.map(({ href, label, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 transition hover:border-sky-500/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <SocialIcon icon={icon} className="text-lg" />
                  </a>
                ))}
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
