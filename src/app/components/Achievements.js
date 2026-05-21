import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import FadeInWhenVisible from "./FadeInWhenVisible"
import { motion } from "framer-motion"

const achievements = [
  // Game
  {
    title: "Game Development Achievement",
    issuer: "Organization Name",
    date: "2025",
    image: "/Ref.png",
    category: "Game",
  },
  {
    title: "Game Project Certification",
    issuer: "Organization Name",
    date: "2026",
    image: "/cer.png",
    category: "Game",
  },
  {
    title: "TMH Game Award",
    issuer: "Organization Name",
    date: "2025",
    image: "/TMH_cer.jpg",
    category: "Game",
  },
  {
    title: "IT clash Multimedia 2026",
    issuer: "Organization Name",
    date: "2026",
    image: "/IT Clash 2026 Multimedia.jpg",
    category: "Game",
  },
  // Programming
  {
    title: "C++ Programming Model",
    issuer: "Organization Name",
    date: "2025",
    image: "/c++_model.jpg",
    category: "Programming",
  },
  {
    title: "IT Clash Competition",
    issuer: "Organization Name",
    date: "2025",
    image: "/ITclash.png",
    category: "Programming",
  },
  {
    title: "TobeIT Achievement",
    issuer: "Organization Name",
    date: "2025",
    image: "/tobeIT.jpg",
    category: "Programming",
  },
  // Web
  {
    title: "Web Development Review",
    issuer: "Organization Name",
    date: "2025",
    image: "/game-review.jpg",
    category: "Web",
  },
  {
    title: "AgriAdviser Project",
    issuer: "Organization Name",
    date: "2026",
    image: "/agriAdviser.jpg",
    category: "Web",
  },
  // IOT
  {
    title: "IOT Research Project",
    issuer: "Organization Name",
    date: "2025",
    image: "/reseach_IOT.jpg",
    category: "IOT",
  },
  // AI
  {
    title: "AIAT AI Specialist",
    issuer: "Organization Name",
    date: "2025",
    image: "/AIAT.jpg",
    category: "AI",
  },
  {
    title: "Innovator Award",
    issuer: "Organization Name",
    date: "2025",
    image: "/INNOVATOR_1.jpg",
    category: "AI",
  },
  {
    title: "PSU AI Prompt Challenge",
    issuer: "Prince of Songkla University",
    date: "2025",
    image: "/PSU_Ai_Prompt.jpg",
    category: "AI",
  },
  {
    title: "Agispark AI Hackathon",
    issuer: "Organization Name",
    date: "2026",
    image: "/Agispark.jpg",
    category: "Web,AI",
  },
  // Camp
  {
    title: "Comcamp Certificate",
    issuer: "KMUTT",
    date: "2025",
    image: "/comcamp_cer.jpg",
    category: "Camp",
  },
  {
    title: "IT Camp 22 Certificate",
    issuer: "KMITL",
    date: "2025",
    image: "/ITcamp22_cer.jpg",
    category: "Camp",
  },
  // Other
  {
    title: "MUIC Excel Certification",
    issuer: "MUIC",
    date: "2024",
    image: "/MUIC Excel.png",
    category: "Other",
  },
]

const categories = ["All", ...new Set(achievements.map((a) => a.category))]

export default function Achievements() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = useMemo(() => {
    return achievements.filter((a) => {
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.issuer.toLowerCase().includes(search.toLowerCase())
      const matchCategory = activeCategory === "All" || a.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [search, activeCategory])

  const isFiltering = search !== "" || activeCategory !== "All"

  // Split items for two rows
  const midPoint = Math.ceil(filtered.length / 2)
  const firstRow = filtered.slice(0, midPoint)
  const secondRow = filtered.slice(midPoint)

  return (
    <section id="achievements" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              My <span className="text-sky-500">Achievements</span>
            </h2>
            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
              A collection of certificates and awards reflecting my continuous learning and growth.
            </p>
          </FadeInWhenVisible>

          {/* Search & Filter UI */}
          <FadeInWhenVisible delay={0.1} className="mt-10 w-full max-w-3xl">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 px-6 py-4 pl-12 text-sm shadow-sm outline-none transition-all focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${activeCategory === cat
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative mt-4">
        {isFiltering ? (
          /* Grid View when filtering */
          <div className="mx-auto max-w-7xl px-8">
            {filtered.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((item, idx) => (
                  <AchievementCard key={idx} item={item} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-slate-500">
                No certificates found matching your search.
              </div>
            )}
          </div>
        ) : (
          /* Two-Row Infinite Marquee View by default */
          <div className="flex flex-col gap-8 py-10">
            <MarqueeRow items={firstRow} direction="left" speed={50} />
            <MarqueeRow items={secondRow} direction="right" speed={55} />
          </div>
        )}
      </div>
    </section>
  )
}


function MarqueeRow({ items, direction = "left", speed = 50 }) {
  // Duplicate items for infinite effect
  const doubledItems = [...items, ...items, ...items]

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-6 pr-6"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ width: "fit-content" }}
      >
        {doubledItems.map((item, idx) => (
          <div key={idx} className="w-[280px] flex-shrink-0">
            <AchievementCard item={item} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function AchievementCard({ item }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-sky-500/50 hover:shadow-xl dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            {item.category}
          </span>
          <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            {item.date}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-sky-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[1px]">
          <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-lg transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            Quick View
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 line-clamp-1 group-hover:text-sky-500 transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
          {item.issuer}
        </p>
      </div>
    </div>
  )
}


