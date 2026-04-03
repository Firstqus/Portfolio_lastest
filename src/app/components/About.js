"use client"

import Image from "next/image"
import FadeInWhenVisible from "./FadeInWhenVisible"

const timeline = [
  {
    year: "2017-2020",
    title: "Phra Tamnak Suankulab Mahamongkol School",
    desc: "During my primary education, I was committed to my studies and developed an early interest in computer science.",
  },
  {
    year: "2021-2026",
    title: "Kanchanapisek Wittayalai Nakhon Pathom School",
    desc: "Since secondary school, I have deepened my studies across IoT, web development, and AI, and have earned achievements from various competitions.",
  },
]

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-8 py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              About Me
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.06} className="mt-6">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Growing up surrounded by technology, I went from playing games to
              wondering how they were made. That curiosity led me to web and
              game development — building websites and creating games with
              Unity and C#. For me, programming isn&apos;t just writing code,
              it&apos;s solving problems and crafting experiences. I love taking
              on competitions and projects that push me to grow and
              collaborate. What started as childhood curiosity has become a
              passion I&apos;m committed to pursuing.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.12} className="mt-4">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
             
            </p>
          </FadeInWhenVisible>
        </div>

        <div className="lg:col-span-6">
          <FadeInWhenVisible delay={0.06}>
            <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/50 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/mine3.jpg"
                  alt="About right visual"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Move "My Journey" below About Me */}
      <div id="about-timeline" className="mt-16">
        <FadeInWhenVisible>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            My Journey
          </h3>
          <div className="mt-3 h-1 w-16 rounded bg-sky-500/30" />
        </FadeInWhenVisible>

        <div className="relative mt-10 pl-6">
          <div className="absolute left-1 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />

          {timeline.map((t, idx) => (
            <FadeInWhenVisible
              key={t.year}
              delay={idx * 0.07}
              className="mb-10"
            >
              <div className="relative">
                <div className="absolute -left-6 top-2 h-3 w-3 rounded-full bg-sky-500" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                  {t.year}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-50">
                  {t.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {t.desc}
                </p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}

