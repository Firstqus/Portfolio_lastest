"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import FadeInWhenVisible from "./FadeInWhenVisible"

const SPIRIT_SLAYER_GALLERY = [
  "/start.jpg",
  "/ingame.jpg",
  "/before.jpg",
  "/died.jpg",
]

const STATION_4_GALLERY = ["/1 (2).jpg", "/2 (2).jpg", "/3 (2).jpg", "/4 (2).jpg"]

const IMMUNE_KNIGHT_GALLERY = [
  "/immune1.jpg",
  "/immune2.jpg",
  "/immune3.jpg",
  "/immune4.jpg",
]

const projects = [
  {
    title: "Spirit Slayer",
    github: "https://patawee.itch.io/spirit-slayer-demo",
    gallery: SPIRIT_SLAYER_GALLERY,
    image: SPIRIT_SLAYER_GALLERY[0],
    tech: ["Unity", "C#", "Action"],
    description:
      "Play as Eren, a young orphan adopted and raised by the dojo’s leaders—mentor and father figures. After they are killed by the Spirit Realm, Eren seeks revenge for his family and fights through the five Spirit Realm leaders.",
  },
  {
    title: "Station 4",
    github: "https://github.com/Firstqus",
    gallery: STATION_4_GALLERY,
    image: STATION_4_GALLERY[0],
    tech: ["Unity", "C#", "Horror"],
    description:
      "You are a Park Ranger with a normal daily mission: check the radio station. But once you enter, you hear strange sounds and an unsettling atmosphere. With limited ammo, a flashlight, and a radio communicator that can detect a monster’s signal, you must find a way out—before the station consumes you.",
  },
  {
    title: "Immune Knight",
    github: "https://github.com/Firstqus/white-blood-cell-game",
    gallery: IMMUNE_KNIGHT_GALLERY,
    image: IMMUNE_KNIGHT_GALLERY[0],
    tech: ["Unity", "C#", "Game Design"],
    description:
      "Immune Knight is an educational tower defense game where players deploy real immune cells to fight off pathogens invading the body. Instead of just memorizing biology facts, players apply their knowledge in real time—making decisions under pressure the way your immune system actually does. Built as a submission for the TMH Innovation Competition, the game is designed to make immunology engaging, accurate, and interactive for students. That’s why we ranked top 24 teams in Thailand.",
  },
  {
    title: "Game reveiws",
    github: "https://github.com/Firstqus/game-review-web",
    image: "/game-review.jpg",
    tech: ["React", "RAWG API"],
    description:
      "A game discovery web app built with React. Browse thousands of games, search by name, filter by genre, and save your favorites to a personal wishlist — all powered by the RAWG API.",
  },
]

export default function Projects() {
  const [spiritSlide, setSpiritSlide] = useState(0)
  const spiritLen = useMemo(() => SPIRIT_SLAYER_GALLERY.length, [])

  const [stationSlide, setStationSlide] = useState(0)
  const stationLen = useMemo(() => STATION_4_GALLERY.length, [])

  const [immuneSlide, setImmuneSlide] = useState(0)
  const immuneLen = useMemo(() => IMMUNE_KNIGHT_GALLERY.length, [])

  useEffect(() => {
    const t = setInterval(() => {
      setSpiritSlide((i) => (i + 1) % spiritLen)
    }, 2500)
    return () => clearInterval(t)
  }, [spiritLen])

  useEffect(() => {
    const t = setInterval(() => {
      setStationSlide((i) => (i + 1) % stationLen)
    }, 2500)
    return () => clearInterval(t)
  }, [stationLen])

  useEffect(() => {
    const t = setInterval(() => {
      setImmuneSlide((i) => (i + 1) % immuneLen)
    }, 2500)
    return () => clearInterval(t)
  }, [immuneLen])

  return (
    <section id="projects" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <div className="text-left">
          <p className="text-sm font-semibold tracking-widest text-sky-600 dark:text-sky-300">
            FEATURED PROJECTS
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            A selection of projects where I build and ship.
          </h2>
        </div>
      </FadeInWhenVisible>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, idx) => (
          <FadeInWhenVisible key={project.title} delay={idx * 0.06}>
            <div className="group overflow-hidden rounded-3xl border border-slate-200/70 bg-white/60 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-500/40 dark:border-white/10 dark:bg-white/5">
              <div
                className={[
                  "relative overflow-hidden bg-slate-50 dark:bg-white/5",
                  idx === 2 ? "aspect-[9/16]" : idx <= 1 ? "aspect-[16/10]" : "aspect-[16/9]",
                ].join(" ")}
              >
                <Image
                  src={
                    idx === 0
                      ? project.gallery[spiritSlide]
                      : idx === 1
                        ? project.gallery[stationSlide]
                        : idx === 2
                          ? project.gallery[immuneSlide]
                          : project.image
                  }
                  alt={project.title}
                  fill
                  className={
                    idx <= 1
                      ? "object-cover p-0"
                      : idx === 2
                        ? "object-contain p-0"
                        : "object-contain p-10"
                  }
                />

                <div className="absolute inset-0 bg-sky-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex flex-wrap justify-center gap-2 px-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-sky-500/35 bg-sky-500/15 px-3 py-1 text-xs font-medium text-indigo-100 backdrop-blur dark:text-indigo-50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-sky-500/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                >
                  <span>View on GitHub</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 18l-6 3 3-6 13-13a2 2 0 0 1 3 3L9 18z" />
                    <path d="M15 6l3 3" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  )
}
