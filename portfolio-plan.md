# Portfolio Plan — Pring / Natalie

A grounded personal site. No gradient or glow spam, no self-ratings. It shows what I enjoy and what I'm proud of.

## Concept

Two personas over the same content, each with light and dark mode:

|                   | **Pring** (Nathan, `pring-nt`)             | **Natalie**                                |
| ----------------- | ------------------------------------------ | ------------------------------------------ |
| Feel              | Engineering notebook                       | Pastel scrapbook                           |
| Leads with        | Projects + "currently" block               | Art, then things I like                    |
| Projects shown as | Closed issues against the world            | Small taped-on cards                       |
| Type              | Clean sans + monospace accents             | Softer rounded/serif font                  |
| Color             | Flat, one muted accent; charcoal dark mode | Pinks, cream, lavender, pale blue-green    |
| Voice             | Short and plain                            | Marin-energy: excited, unfiltered, gushing |

Inspiration for Natalie: Marin Kitagawa (_Sono Bisque Doll_), Aya (_The Guy She Was Interested In Wasn't a Guy at All_), _Cosmic Princess Kaguya_. Character names and catchphrases are fine. Natalie's side is Pinterest-style scrapbook, so it can use found images and official art (e.g. Sono Bisque Doll art as her profile picture); credit or link the source where practical.

Example Natalie copy:

> ok so nockr exists because every gpa calculator i tried was SO annoying?? like why can't i just plan my next term. so i made one.

## Pring details

**Engineering notebook look**

- Faint graph-paper background, clean type, monospace labels
- A few of my own sketches in the margins (arrows, a doodled cursor, a tiny self-portrait)
- Calm, but clearly made by a person. Quietly hints that Natalie exists.

**Projects as closed issues**

> **#03 every GPA calculator is annoying** · closed by `nockr`
> Couldn't plan future terms, didn't know DLSU's grading. Made my own.

> **#07 sniping GE slots by hand** · closed by `enroll_clicker`

Slottle is listed as "QA'd by me".

**"Currently" block** (edited whenever I feel like it)

- building: my TGPA for this term
- watching: JJBA Part 7
- annoyed by: Nockr's Export Card design

## Palettes (draft, tune in browser)

Shared thread: **navy** shows up in both (Himmel's blues, Marin's blazer), so the personas feel related.

### Pring: muted notebook + Himmel blue

| Token                | Light     | Dark      |
| -------------------- | --------- | --------- |
| bg (paper)           | `#F4F2EC` | `#1C1F24` |
| grid lines           | `#E3E0D8` | `#2A2E35` |
| text (ink)           | `#2A2D33` | `#E4E2DC` |
| muted text           | `#66696F` | `#9A9DA4` |
| accent (Himmel blue) | `#4B6A9E` | `#93AFD6` |
| accent soft          | `#C9D7EA` | `#2E3A57` |

Blue used sparingly: links, issue numbers, the "currently" labels, the odd margin doodle. Muted text and the blue keep at least 4.8:1 against bg and surface (WCAG AA).

### Natalie: Marin pastel

From the references: blush pink, off-white, peach, uniform navy, red bow.

| Token           | Light                       | Dark             |
| --------------- | --------------------------- | ---------------- |
| bg              | `#FBF4EF` (cream)           | `#1F2640` (navy) |
| surface / cards | `#F7D6DE` (blush)           | `#2E3A57`        |
| text            | `#2E3A57` (navy, not black) | `#F3EEE8`        |
| accent pink     | `#E8949F`                   | `#F0A8B4`        |
| peach           | `#F2CFAE`                   | `#E9C4A2`        |
| pop (bow red)   | `#C8323E`                   | `#E0525C`        |
| muted text      | `#555C75`                   | `#BCB6C8`        |
| line / borders  | `#EBBDC9`                   | `#3B4872`        |
| link            | `#B02833` (red)             | `#F0A8B4`        |

Notes:

- Light pink fails contrast as text, so it's for backgrounds and decoration only; links use navy or red
- Background pattern: soft pink gingham/argyle, Natalie's answer to Pring's graph paper
- Red is a small pop only (bows, stickers, highlights)

## Theme switching

- Four themes: `pring-light`, `pring-dark`, `natalie-light`, `natalie-dark`
- Persona switch is slightly hidden. Current favorite: clicking the name in the header (Nathan → Natalie)
  - Alternatives: footer line ("not feeling like Nathan today?"), clicking the avatar
- Light/dark follows the system by default, with a manual toggle
- Choice saved in localStorage and applied before first paint (no flash)
- The switch is the showpiece animation. Other effects (hovers, transitions) are fine; avoid excessive always-running motion like animated backgrounds. Pring stays restrained, Natalie can be playful

## Content

### Main pages (things I'm proud of)

- **Nockr**: GPA/GWA/honors tracker. "I got tired of other people's GPA calculators."
- **enroll_clicker**: "Tired of sniping GE slots?"
- **Slottle**: credited honestly as QA (testing, issue tracking; reached 1,000+ downloads)
- **fb-graphql-interceptor**: optional, the "normal way didn't work so I went around it" story

### Natalie extras

- Art gallery (see Assets)
- Things I like: _Sono Bisque Doll_, _Frieren_
- Optional joke footnote: YuriBetterThanYaoi

### Experience page (for employers, kept off the main pages)

- BoomBox Gym, NATS (hackathon), Wi-Fi Evolution
- Course projects (fantastic-dorms, etc.) only if wanted
- Link to CV

### Links

- Email: natetrndd@gmail.com
- GitHub: github.com/pring-nt
- LinkedIn
- Instagram (personal): _nate.pringles
- Instagram (art): pring.talks_less

## Assets

- Drawings stored in the repo as WebP, ~1200px on the long side
- Each image links to its Instagram post
- Each has alt text and an optional date

## Tech

- **SvelteKit** with `@sveltejs/adapter-static`
- **Tailwind CSS**, with themes as CSS variables on a `data-theme` attribute
- One shared content file (projects, links, likes, art)
- Two layout components (`PringLayout`, `NatalieLayout`) that read from it
- Component and icon libraries are welcome where they help
  - Components: e.g. shadcn-svelte / Bits UI (headless, so restyling to each persona's theme is easy)
  - Icons: e.g. Lucide (`@lucide/svelte`) or Iconify
  - Natalie could use a softer or doodle-style icon set instead of drawing my own (e.g. Phosphor's rounded/duotone weights, or a free hand-drawn set like Doodle Icons; check licenses)
  - Keep them themeable, so neither persona ends up looking like a default component kit

## Deployment

- **Cloudflare Pages**, separate from Nockr's Worker
  - URL: `pring-nt.pages.dev` if available (doesn't depend on the `nockr-app` Workers subdomain)
  - Connect the GitHub repo; build `bun run build`, output `build`
  - Pushes auto-deploy; PRs get preview URLs
- Do **not** rename the `nockr-app` Workers subdomain, since it would move Nockr and wipe users' localStorage
- Later: buy a domain (e.g. `pring.dev`). Add export/import to Nockr first if it ever moves.

## Working rules (for anyone or any AI working on this repo)

- Follow standard git conventions: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`…) and descriptive branch names (`feat/theme-switch`, `fix/gingham-contrast`)
- **Never** commit, push, create branches, or open PRs without my review and approval first
- **Never** add unnecessary comments in code. Comments only to explain non-obvious logic or to document.

## To decide / collect

- [x] Drawings: have them, compile after project setup (with IG post links)
- [x] Palette references (Himmel blue for Pring, Marin refs for Natalie)
- [ ] Tune palette hexes in the browser
- [ ] Final hidden-switch interaction
- [ ] Confirm `pring-nt.pages.dev` is available
- [ ] Copy for both personas
