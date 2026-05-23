export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) {
  const alignClass =
    align === "center" ? "text-center items-center" : "text-left items-start"

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase dark:text-sky-300">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
      <div className="mt-3 h-1 w-16 rounded bg-sky-500/30" aria-hidden />
    </div>
  )
}
