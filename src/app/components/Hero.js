"use client"

import FadeInWhenVisible from "./FadeInWhenVisible"
import HeroModel from "./hero/HeroModel"

const QUOTE =
  "It does not matter how slowly you go as long as you do not stop."
const AUTHOR = "Confucius"

export default function Hero() {
  return (
    <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <FadeInWhenVisible y={20}>
            <div className="flex flex-col gap-5">
              <p className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                &ldquo;{QUOTE}&rdquo;
              </p>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                — {AUTHOR}
              </p>
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
