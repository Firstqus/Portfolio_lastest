"use client"

import Image from "next/image"
import FadeInWhenVisible from "./FadeInWhenVisible"
import ScrollRevealText from "./ScrollRevealText"
import SectionHeading from "./SectionHeading"

const ABOUT_PARAGRAPH =
  "Growing up surrounded by technology, I went from playing games to wondering how they were made. That curiosity led me to web and game development — building websites and creating games with Unity and C#. For me, programming isn't just writing code, it's solving problems and crafting experiences. I love taking on competitions and projects that push me to grow and collaborate. What started as childhood curiosity has become a passion I'm committed to pursuing."

const timeline = [
  {
    year: "2017–2020",
    title: "Phra Tamnak Suankulab Mahamongkol School",
    desc: "During my primary education, I was committed to my studies and developed an early interest in computer science.",
  },
  {
    year: "2021–2026",
    title: "Kanchanapisek Wittayalai Nakhon Pathom School",
    desc: "Since secondary school, I have deepened my studies across IoT, web development, and AI, and have earned achievements from various competitions.",
  },
]

const stats = [
  { value: "7+", label: "Projects Built" },
  { value: "17+", label: "Certificates" },
  { value: "5", label: "Competition Wins" },
  { value: "3+", label: "Tech Stacks" },
]

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-8 py-24">

      {/* Section divider top */}
      <div className="section-glow-divider mb-16" />

      {/* Heading */}
      <FadeInWhenVisible>
        <SectionHeading
          align="center"
          eyebrow="About Me"
          title={
            <>
              From curiosity to <span className="font-serif italic font-normal text-[#A2E435]">craft.</span>
            </>
          }
        />
      </FadeInWhenVisible>

      {/* Intro paragraph — full-width, centered, no imagery (Nivora's "studio intro" block) */}
      <div className="mx-auto mt-10 max-w-3xl">
        <ScrollRevealText className="text-center text-xl leading-relaxed text-white sm:text-2xl">
          {ABOUT_PARAGRAPH}
        </ScrollRevealText>
      </div>

      {/* Photo + stats — gallery-tile rhythm (Nivora's product gallery grid) */}
      <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-6 lg:grid-cols-12">
        <FadeInWhenVisible className="col-span-2 sm:col-span-6 lg:col-span-8">
          <div className="relative h-full overflow-hidden rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-black/40">
            <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[280px]">
              <Image
                src="/mine3.jpg"
                alt="Patawee Kimhia"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-transparent to-transparent" />
            </div>
          </div>
        </FadeInWhenVisible>

        <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-6 lg:col-span-4 lg:grid-cols-2">
          {stats.map((stat, i) => (
            <FadeInWhenVisible key={stat.label} delay={0.05 * i + 0.08}>
              <div className="flex h-full flex-col justify-between gap-6 rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] p-4 transition-colors duration-300 hover:border-[rgba(255,255,255,0.25)]">
                <span className="font-mono text-[10px] text-[rgba(255,255,255,0.35)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-3xl font-medium leading-none text-white">{stat.value}</p>
                  <p className="mt-2 text-xs text-[rgba(255,255,255,0.5)]">{stat.label}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>

      {/* Journey — horizontal step-flow (Nivora's "From Idea to Launch" process pattern) */}
      <div id="about-timeline" className="mt-24">
        <FadeInWhenVisible>
          <h3 className="text-center font-display text-xl font-bold text-white">
            My <span className="font-serif italic font-normal text-[#A2E435]">Journey</span>
          </h3>
        </FadeInWhenVisible>

        <div className="relative mt-12 grid gap-10 sm:grid-cols-2">
          {/* Connecting line across the row, desktop only */}
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-[rgba(255,255,255,0.1)] sm:block" aria-hidden />

          {timeline.map((t, idx) => (
            <FadeInWhenVisible key={t.year} delay={idx * 0.08}>
              <div className="relative flex flex-col items-center text-center">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#A2E435] bg-black font-mono text-xs text-[#A2E435]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="mt-4 inline-block rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#A2E435]">
                  {t.year}
                </span>
                <p className="mt-3 max-w-xs text-base font-bold text-white">{t.title}</p>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-[rgba(255,255,255,0.75)]">{t.desc}</p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>

      {/* Section divider bottom */}
      <div className="section-glow-divider mt-16" />
    </section>
  )
}
