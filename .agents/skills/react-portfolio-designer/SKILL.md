---
name: react-portfolio-designer
description: >
  Skill for designing and upgrading premium React/Next.js portfolio websites.
  Triggers when the user asks to redesign, upgrade, restyle, or improve the
  visual design of a portfolio site built with React or Next.js.
---

# React Portfolio Designer

## Goal
Transform a standard portfolio into a **premium, visually stunning** experience
that immediately impresses recruiters and clients. The result should feel
modern, unique, and reflect the developer's personal brand.

## Design Principles

### 1. WOW Factor First
- The Hero section must create an immediate emotional impact
- Use bold typography (Display-size headings, 6xl–8xl)
- Add a signature visual element: particle background, 3D object, gradient mesh, or animated blob
- The first 3 seconds must feel premium

### 2. Consistent Design Token System
Always define a **design token system** in `globals.css` before touching components:
```css
:root {
  --color-primary: ...;
  --color-accent: ...;
  --color-bg: ...;
  --color-surface: ...;
  --color-border: ...;
  --gradient-hero: ...;
  --gradient-accent: ...;
  --shadow-glow: ...;
  --radius-card: ...;
  --font-display: ...;
  --font-body: ...;
}
```

### 3. Typography Hierarchy
- **Display**: Space Grotesk or Outfit — for H1, hero names
- **Body**: Inter — for paragraphs and UI text
- **Mono**: Fira Code or Geist Mono — for tech/code decorations
- Import fonts via `next/font/google` in `layout.js`

### 4. Color Palette Rules
- Never use plain primary colors (no plain red, blue, green)
- Use curated HSL palettes or specific hex values
- Dark theme: bg `#050816` or `#0a0a0f` (near-black, not pure black)
- Accent gradients: always 2–3 color stops, not single color

### 5. Animation Guidelines
- Use `framer-motion` for enter animations (already installed)
- Stagger children with `0.05–0.1s` delay between items
- Hover: `translateY(-4px)` + glow shadow
- Never animate more than 3 properties at once
- Always respect `prefers-reduced-motion`

---

## Section-by-Section Upgrade Checklist

### Hero
- [ ] Full-viewport height (`min-h-screen`)
- [ ] Bold Display font name (6xl–8xl)
- [ ] Animated role/title (TypeAnimation or custom)
- [ ] Signature background effect (particles / mesh / canvas)
- [ ] Status badge ("Open to work" / "Building...")
- [ ] CTA buttons with gradient or glow
- [ ] Social links with icon hover effect
- [ ] Scroll indicator (bouncing chevron or text)

### About
- [ ] Bento grid or split layout
- [ ] Stat cards ("7+ Projects", "5 Awards" etc.)
- [ ] Photo with styled border/glow frame
- [ ] Timeline with icons and gradient connector line
- [ ] Personality/fun-fact micro-cards

### Skills
- [ ] Group by category with visual header
- [ ] Skill cards: icon + name + subtle glow on hover
- [ ] Optional: skill orbit / marquee / bento layout
- [ ] Color-coded by technology brand color
- [ ] No progress bars (use visual weight instead)

### Projects
- [ ] Spotlight layout: 1 featured project large, others in list
- [ ] Or: horizontal scroll card deck
- [ ] Tech tags as colored pills matching stack brand colors
- [ ] Image with smooth gallery/carousel
- [ ] External links: GitHub + Live Demo (styled buttons)
- [ ] "Featured" badge for top projects

### Achievements
- [ ] Stats row: total count, categories, institutions
- [ ] Marquee carousel (keep if already good)
- [ ] Category filter with count badges
- [ ] Card with category badge, date badge, hover zoom
- [ ] Lightbox modal for certificate view

### Contact
- [ ] Two-column layout: info panel (left) + form (right)
- [ ] Floating label inputs (or styled with focus glow)
- [ ] Availability status indicator (green dot + "Available for...")
- [ ] Gradient/glow submit button
- [ ] Social links with hover animation

### Navbar
- [ ] Frosted glass style (backdrop-blur + semi-transparent)
- [ ] Scroll progress bar at top
- [ ] Active indicator: glow pill or dot (not just underline)
- [ ] Resume download button
- [ ] Smooth mobile menu animation

---

## Recommended Tech Stack Additions
These packages are safe to add to an existing Next.js project:

| Package | Purpose |
|---|---|
| `framer-motion` | Animations (likely already installed) |
| `react-type-animation` | Typewriter effect (likely already installed) |
| `@tsparticles/react` + `@tsparticles/slim` | Particle backgrounds |
| `next/font/google` | Google Fonts (built into Next.js) |

---

## Color Palette Reference

### Option A — Deep Space (Violet/Cyan)
```css
--color-bg:       #050816;
--color-surface:  #0d1117;
--color-primary:  #7C3AED;   /* violet-600 */
--color-accent:   #06B6D4;   /* cyan-500 */
--gradient-hero:  linear-gradient(135deg, #7C3AED, #06B6D4);
--shadow-glow:    0 0 40px rgba(124, 58, 237, 0.35);
```

### Option B — Midnight Carbon (Green/Black)
```css
--color-bg:       #000000;
--color-surface:  #0d0d0d;
--color-primary:  #22D3EE;   /* cyan-400 */
--color-accent:   #84CC16;   /* lime-500 */
--gradient-hero:  linear-gradient(135deg, #22D3EE, #84CC16);
--shadow-glow:    0 0 40px rgba(132, 204, 22, 0.3);
```

### Option C — Aurora Glass (Teal/Pink/Purple)
```css
--color-bg:       #060612;
--color-surface:  #0f0f1a;
--color-primary:  #2DD4BF;   /* teal-400 */
--color-accent:   #E879F9;   /* fuchsia-400 */
--gradient-hero:  linear-gradient(135deg, #2DD4BF, #818CF8, #E879F9);
--shadow-glow:    0 0 50px rgba(45, 212, 191, 0.25);
```

---

## Implementation Order (Execution Phase)

1. `globals.css` — Design tokens + utility classes
2. `layout.js` — Font imports + meta
3. `Hero.js` — Biggest impact first
4. `Navbar.js` — Always visible
5. `About.js`
6. `Skills.js`
7. `Projects.js`
8. `Achievements.js`
9. `Contact.js`
10. `Footer.js`

---

## Quality Checklist Before Done
- [ ] Looks premium on first load (no plain white flash)
- [ ] Dark mode works correctly on all sections
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1280px+)
- [ ] No broken images or missing assets
- [ ] Contact form still submits correctly
- [ ] All navigation links scroll to correct sections
- [ ] Animations don't block content loading
- [ ] `prefers-reduced-motion` respected

---

## References — Real Portfolio Repos to Learn From

### 🔥 High-Impact Repos (ดู source code ได้เลย)

---

#### 1. [sanidhyy/modern-portfolio](https://github.com/sanidhyy/modern-portfolio)
⭐ ~263 stars | Stack: **Next.js + Framer Motion + Tailwind CSS**

**ทำไมต้องดู:**
- Hero section ใช้ gradient mesh + typing animation แบบ premium
- Project cards มี hover overlay ที่ smooth มาก
- เป็น reference หลักสำหรับ Next.js + Framer Motion combo

**เรียนรู้จาก repo นี้:**
- วิธีจัด `motion.div` stagger ให้ cards animate ทีละตัว
- Pattern ของ `viewport={{ once: true }}` ใน framer-motion
- Layout ของ Projects section แบบ spotlight

---

#### 2. [sanidhyy/3d-portfolio](https://github.com/sanidhyy/3d-portfolio)
⭐ ~293 stars | Stack: **React + Vite + Three.js + Tailwind CSS + Framer Motion**

**ทำไมต้องดู:**
- ใช้ Three.js + React Three Fiber สร้าง 3D background ใน Hero
- Skills section แสดงแบบ 3D ball sphere (น่าทำมาก)
- มี particle/star field background

**เรียนรู้จาก repo นี้:**
- วิธีใช้ `@react-three/fiber` และ `@react-three/drei`
- pattern ของ `<Canvas>` และ `<OrbitControls>`
- วิธี fallback เมื่อ GPU ไม่รองรับ

---

#### 3. [chronark/chronark.com](https://github.com/chronark/chronark.com)
Stack: **Astro + MDX** | ดีไซน์: Minimalist dark

**ทำไมต้องดู:**
- Dark-first design ที่สะอาดมาก — ไม่ overload
- Typography-first: ใช้ font size และ weight แทน color เพื่อสร้าง hierarchy
- Performance score สูงมาก (Lighthouse 100)
- เป็น benchmark ของ "less is more" design

**เรียนรู้จาก repo นี้:**
- วิธีสร้าง visual hierarchy โดยไม่ต้องพึ่งสีสัน
- Spacing system ที่สม่ำเสมอ
- เหมาะดูถ้าอยากทำ minimal version

---

#### 4. [Evavic44/portfolio-ideas](https://github.com/Evavic44/portfolio-ideas)
⭐ 3,000+ stars | รวม portfolios ดังๆ จากทั่วโลก

**ทำไมต้องดู:**
- ไม่ใช่ template แต่เป็น **คลังรวม portfolio จริงๆ ของ devs ชื่อดัง**
- เรียก inspiration ได้มากที่สุด — มีหลายสไตล์ให้เลือก
- แต่ละ entry มีลิงก์ live demo + GitHub

**วิธีใช้:** เปิดดูอย่างน้อย 10 portfolios แล้วจด "อยากได้ effect แบบนี้" ก่อน implement

---

#### 5. [adrianhajdin/portfolio](https://github.com/adrianhajdin/portfolio)
Stack: **Next.js + Three.js + Framer Motion + Aceternity UI**

**ทำไมต้องดู:**
- ใช้ **Aceternity UI** components — glassmorphism cards, moving border, spotlight effects
- Hero มี 3D globe ที่ interactive
- Bento grid layout ที่สวยที่สุดใน list นี้
- เหมาะดูสำหรับ section About และ Skills

**เรียนรู้จาก repo นี้:**
- Bento grid layout pattern
- `MovingBorder` component จาก Aceternity
- วิธีทำ Globe 3D ใน hero

---

### 🎨 Design Inspiration (ไม่ใช่ open source แต่ดูเป็น reference ได้)

| ชื่อ | URL | สไตล์ | เรียนรู้อะไร |
|---|---|---|---|
| Bruno Simon | [bruno-simon.com](https://bruno-simon.com) | 3D WebGL full-site | การทำ portfolio แบบ interactive game |
| Brittany Chiang | [brittanychiang.com](https://brittanychiang.com) | Clean dark, dev-focused | Layout 2-column + sticky sidebar |
| Josh Comeau | [joshwcomeau.com](https://joshwcomeau.com) | Colorful + educational | Micro-animation ทุก interaction |
| Lee Robinson | [leerob.io](https://leerob.io) | Minimal Next.js | Performance + simplicity |

---

### 📚 Animation & UI Libraries ที่ repos ดังใช้

| Library | GitHub | ใช้ทำอะไร |
|---|---|---|
| **Framer Motion** | [framer/motion](https://github.com/framer/motion) | Enter animation, hover, layout animation |
| **Aceternity UI** | [aceternity/ui](https://ui.aceternity.com) | Glassmorphism, spotlight, moving border |
| **Magic UI** | [magicui.design](https://magicui.design) | Shimmer, particles, animated gradient |
| **GSAP** | [greensock/GSAP](https://github.com/greensock/GSAP) | Complex scroll-based animations |
| **React Three Fiber** | [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | 3D elements ใน React |
| **tsParticles** | [tsparticles/tsparticles](https://github.com/tsparticles/tsparticles) | Particle/starfield backgrounds |
