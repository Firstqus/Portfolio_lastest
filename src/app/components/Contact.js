"use client"

import { useState } from "react"
import FadeInWhenVisible from "./FadeInWhenVisible"

export default function Contact() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState({ type: "", text: "" })
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = message.trim()
    if (!trimmed) {
      setStatus({ type: "error", text: "Please type a message first." })
      return
    }

    try {
      setIsSending(true)
      setStatus({ type: "", text: "" })

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to send message.")

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
            className="rounded-3xl border border-slate-200/70 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex-1">
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                />
                {status.text && (
                  <p
                    className={`mt-3 text-sm ${
                      status.type === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {status.text}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-4 text-slate-600 dark:text-slate-300">
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
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-white"
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
          </form>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}