import { SOCIAL_LINKS } from "../constants/social"
import SocialIcon from "./SocialIcon"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/70 bg-white/40 dark:border-white/10 dark:bg-slate-950/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-8 py-10 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            First — Patawee Kimhia
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            © {year} · Built with Next.js &amp; Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 transition hover:border-sky-500/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <SocialIcon icon={icon} className="text-base" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
