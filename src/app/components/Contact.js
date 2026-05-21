"use client"

import { useState } from "react"
import FadeInWhenVisible from "./FadeInWhenVisible"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState({ type: "", text: "" })
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMsg = message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMsg) {
      setStatus({ type: "error", text: "Please fill in all fields." })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({ type: "error", text: "Please enter a valid email address." })
      return
    }

    try {
      setIsSending(true)
      setStatus({ type: "", text: "" })

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMsg,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send message.")

      setName("")
      setEmail("")
      setMessage("")
      setStatus({ type: "success", text: "Message sent successfully." })
    } catch (err) {
      setStatus({
        type: "error",
        text: err?.message || "Something went wrong while sending.",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-8 py-24">
      <FadeInWhenVisible>
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Let&apos;s Stay In Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            I am currently focused on building side projects that address tangible,
            real-world challenges. My goal is to apply a rigorous problem-solving
            mindset across software engineering, AI engineering and data engineering
            to create impactful solutions. Whether you have a project to connect,
            or just want to collaborate, I&apos;d love to hear from you.
          </p>
        </div>
      </FadeInWhenVisible>

      <div className="mx-auto mt-10 max-w-3xl">
        <FadeInWhenVisible delay={0.08}>
          <form
            className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 md:p-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6">
              {/* Name & Email Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full resize-none rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                  required
                />
              </div>

              {status.text && (
                <p
                  className={`text-sm ${
                    status.type === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {status.text}
                </p>
              )}

              {/* Bottom Row */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
                <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                  <a
                    href="https://github.com/Firstqus"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 transition hover:bg-white dark:border-white/10 dark:bg-white/5"
                    aria-label="GitHub"
                  >
                    <i className="devicon-github-original text-base" />
                  </a>
                  <a
                    href="https://discord.com/users/859669470368890920"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 transition hover:bg-white dark:border-white/10 dark:bg-white/5"
                    aria-label="Discord"
                  >
                    <i className="devicon-discord-original text-base" />
                  </a>
                  <a
                    href="mailto:patawee.kim@gmail.com"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 transition hover:bg-white dark:border-white/10 dark:bg-white/5"
                    aria-label="Email"
                  >
                    <i className="devicon-google-plain colored text-base" />
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98] dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-white"
                >
                  {isSending ? "Sending..." : "Send Message"}
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
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}