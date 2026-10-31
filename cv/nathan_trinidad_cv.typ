// Nathan Trinidad — Software Engineering CV
// Designed for typst.app
// Compile with: typst compile <this-file>.typ

#set page(
  paper: "a4",
  margin: (
    top: 1.5cm,
    bottom: 1.4cm,
    left: 1.7cm,
    right: 1.7cm,
  ),
)

#set text(
  font: "Libertinus Sans",
  size: 9.5pt,
  fill: rgb("252525"),
)

#set par(
  leading: 0.55em,
  spacing: 0.32em,
  justify: false,
)

#let accent = rgb("30343B")
#let muted = rgb("666B73")
#let small = 8.7pt

#show link: set text(fill: accent)
#show link: underline.with(stroke: 0.4pt, offset: 1.5pt)

#set list(indent: 0.6em, body-indent: 0.45em, spacing: 0.4em)

#let section(title) = {
  v(0.8em)
  text(size: 10.2pt, weight: "bold", fill: accent)[#title]
  v(0.18em)
  line(
    length: 100%,
    stroke: (paint: accent, thickness: 0.5pt),
  )
  v(0.5em)
}

#let bullet(body) = list(body)

#let entry(title, date, meta, body) = {
  block(above: 0pt, below: 0.85em)[
    #text(weight: "bold")[#title]
    #h(1fr)
    #text(size: small, fill: muted)[#date] \
    #if meta != none [
      #text(size: small, fill: muted)[#meta]
    ]
    #v(0.15em)
    #body
  ]
}

#align(center)[
  #text(size: 21pt, weight: "bold")[Nathan Trinidad]
  #v(0.08em)
  #text(size: small, fill: muted)[Software Engineering Undergraduate]
  #v(0.1em)
  #text(size: small, fill: muted)[
    Manila, Philippines ·
    #link("mailto:natetrndd@gmail.com")[natetrndd\@gmail.com] ·
    +63 927 942 1851
  ]
  #v(0.05em)
  #text(size: small)[
    #link("https://github.com/pring-nt")[github.com/pring-nt]
    ·
    #link("https://www.linkedin.com/in/nathan-trinidad-1a4a53381/")[
      linkedin.com/in/nathan-trinidad-1a4a53381
    ]
  ]
]

#section("EDUCATION")

#entry(
  [De La Salle University — Manila],
  [2024 – 2028 (Expected)],
  [B.S. Computer Science, Major in Software Technology],
  [
    #text(weight: "bold")[CGPA: 3.84 / 4.00] · 1st Honor Dean's Lister
  ],
)

#section("ENGINEERING EXPERIENCE")

#entry(
  [Slottle — QA / Engineering Contributor],
  [Aug 2026 – Present],
  [Browser extension · React · TypeScript · Tailwind CSS · Vite · Bun · WebExtensions API],
  [
    #bullet[
      Performed acceptance-criteria-driven QA for a DLSU-focused browser extension that retrieves course offerings and generates conflict-free schedules across Chrome and Firefox.
    ]
    #bullet[
      Reproduced, documented, and tracked feature, bug, and UI/UX issues through a GitHub workflow, validating fixes against predefined acceptance criteria; the extension reached #text(weight: "bold")[1,000+ downloads] across both web stores.
    ]
  ],
)

#entry(
  [BoomBox Gym — QA & Assistant Frontend Developer],
  [Jun 2026 – Present],
  [CSSWENG course project · React · TypeScript · Tailwind CSS · shadcn/ui · TanStack Table],
  [
    #bullet[
      Performed frontend QA for a client-facing gym management application supporting member, coach, and administrative workflows; created reusable GitHub issue templates and suggested development workflows.
    ]
    #bullet[
      Refactored the frontend from an unstructured codebase into a #text(weight: "bold")[Feature-Sliced Design] architecture to improve separation of concerns and maintainability.
    ]
  ],
)

#entry(
  [NATS (LABLABAI Hackathon) — Frontend Developer],
  [May 2026],
  [Notes-to-Action Task Synthesizer · React · TypeScript],
  [
    #bullet[
      Developed and shaped the React/TypeScript frontend of an AI-powered application that transforms meeting notes and transcripts into structured engineering tasks and repository-ready GitHub issues.
    ]
    #bullet[
      Proposed the GitHub issue-generation workflow feature, influenced application flow and component design, introduced persisted client-side state, and refined a responsive dark-mode-first interface during a two-day implementation sprint.
    ]
  ],
)

#section("SELECTED PROJECTS")

#entry(
  [KaraokeDex — Song Code Search for Platinum Karaoke],
  [],
  [Independent project · SvelteKit · TypeScript · Tailwind CSS · SQLite · Zod · #link("https://github.com/pring-nt/karaokedex")[GitHub] · #link("https://karaoke-dex.vercel.app")[Live site]],
  [
    #bullet[
      Independently designed and developed a phone-first, open-source search app as an alternative to outdated printed songbooks and poorly designed song list apps.
    ]
    #bullet[
      Built a parsing pipeline that turns 393 published PDF songlists into static catalogs for 10 machine lines and #text(weight: "bold")[80,000+ song listings], with all search running on the device in a web worker.
    ]
  ],
)

#entry(
  [Nockr — Academic GPA, GWA & Honors Tracker Application],
  [],
  [Independent project · SvelteKit · TypeScript · Tailwind CSS · Zod · #link("https://github.com/pring-nt/nockr")[GitHub]],
  [
    #bullet[
      Independently designed and developed a university-agnostic application for tracking grades, setting GPA goals, projecting grade trajectories, and planning future terms.
    ]
    #bullet[
      Evolved a personal grade-image generator into an academic planning tool with configurable grading policies, presets for four major Philippine universities, and GPA/CGPA, honors, and unit-planning logic.
    ]
  ],
)

#entry(
  [Wi-Fi Evolution — Interactive Wi-Fi Visualization],
  [],
  [DLSU course project · React · MDX · Astro],
  [
    #bullet[
      Served as primary designer and developer, creating the project's React components and authoring the Wi-Fi Evolution MDX page for an interactive educational exhibit.
    ]
  ],
)

#entry(
  [Facebook GraphQL Interceptor],
  [],
  [Independent project · Python · Playwright · asyncio · #link("https://github.com/pring-nt/fb-graphql-interceptor")[GitHub]],
  [
    #bullet[
      Independently developed a browser automation tool that intercepts Facebook GraphQL responses to extract exact engagement metrics unavailable through truncated DOM content.
    ]
    #bullet[
      Built asynchronous workflows for collecting structured engagement and comment data in response to a research requirement where conventional DOM-based scraping was insufficient.
    ]
  ],
)

#section("EXTRA-CURRICULAR & ORGANIZATIONS")

#entry(
  [Peer Tutor Society (PTS) — Peer Tutor],
  [Jul 2026 – Present],
  none,
  [
    #bullet[
      Tutor computer-science-related mathematics courses and provide peer-led academic support for fellow students.
    ]
  ],
)

#entry(
  [CATCH 2T28 — Executive for Finance],
  [Feb 2025 – Sep 2025],
  none,
  [],
)

#section("TECHNICAL SKILLS")

#text(weight: "bold")[Languages:] TypeScript, JavaScript, Python, C, C++, Java, Rust \
#text(weight: "bold")[Frontend:] React, SvelteKit, Vue.js, HTML/CSS, Tailwind CSS \
#text(weight: "bold")[Tools:] Git, GitHub, Vite, Bun, Playwright, MySQL, Zod
