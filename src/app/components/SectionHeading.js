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
      {eyebrow && <span className="eyebrow-pill">{eyebrow}</span>}
      <h2 className="font-display headline-tight mt-5 text-4xl font-medium text-white sm:text-5xl md:text-[3.4rem]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.5)] ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
