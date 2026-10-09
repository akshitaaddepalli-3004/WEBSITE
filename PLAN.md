# Akshita's Personal Website: Build Plan

This file is the plan for my personal website. Read all of it before writing any code, and follow it unless I say otherwise.

Visual reference (the "4 · Combined" artboard): https://claude.ai/artifact/WKqbGcBWNAGEbxgd9N2Qgb

## 1. What we're building

A one-page personal site where the homepage is an illustrated, interactive room. Each object in the room opens a section of the site underneath it. The Projects section is a "build log": a list of projects with status tags and filters.

Who I am: Akshita, sophomore at the University of Illinois Chicago, B.S. Computer Science with a Human-Centered Computing (HCC) concentration, graduating May 2029. Background in interior design (Home Centre internship) and tech (Open Maison internship, AI visualizer).

Goals for the site:
- Memorable first impression (the room) without slowing down recruiters (the skip link).
- Easy to update as I finish projects: content lives in one data file.
- Accessible and responsive, since I'm an HCC student and that's part of what I'm showing.

## 2. How to work with me

- I'm learning, and I want to understand and own this code. Build in the small steps listed in section 9, one phase at a time, and stop after each phase so I can test it.
- Briefly explain new concepts as you introduce them (for example, `aria-pressed`, CSS custom properties, or `hashchange`).
- Keep the code readable and commented. Prefer simple, clear code over clever code.
- Don't add libraries, frameworks, or a build step unless I ask.

## 3. Tech stack and constraints

- Plain HTML, CSS, and vanilla JavaScript only. No React, no Tailwind, no bundler.
- Fonts from Google Fonts only.
- Must work by opening it with the VS Code **Live Server** extension.
- Will be hosted on **GitHub Pages**, so everything must be static files with relative paths.
- No `localStorage` needed except to remember the lights on/off choice (optional, wrap in try/catch).

## 4. File structure

```
personal-website/
├── index.html          # page structure, header, room markup, empty panel
├── css/
│   ├── tokens.css      # colors, fonts, spacing as CSS custom properties
│   ├── base.css        # resets, typography, buttons, focus styles
│   ├── room.css        # the room illustration and its objects
│   └── panel.css       # the content panel and its sections
├── js/
│   ├── content.js      # ALL site text and project data (the only file I edit to update content)
│   ├── panel.js        # renders sections from content.js into the panel
│   ├── room.js         # room object clicks, lights toggle
│   └── main.js         # wires everything together, handles URL hash
├── assets/
│   └── resume.pdf      # added later
└── README.md
```

Keep the room illustration separate from the content so I can redraw the room later (for example, after graduation) without touching anything else.

## 5. Design tokens

### Colors

| Token | Lights on | Lights off | Used for |
|---|---|---|---|
| `--ink` | `#1F2A44` | `#1F2A44` | main text, dark buttons |
| `--ink-soft` | `#3A4560` | `#3A4560` | body text in the panel |
| `--page-bg` | `#F1EEE8` | `#F1EEE8` | page background |
| `--card-bg` | `#FFFDF7` | `#FFFDF7` | content panel |
| `--accent` | `#B4532A` | `#B4532A` | section labels, link hover |
| `--highlight` | `#F2C14E` | `#F2C14E` | "in progress" badge, focus ring |
| `--line` | `#E6E0D4` | `#E6E0D4` | borders, dividers |
| `--wall` | `#A9BFD9` | `#26314D` | room wall |
| `--floor` | `#D9A36F` | `#6B4A30` | room floor |
| `--sky` | `#CFE6F5` | `#121A30` | window glass |
| `--orb` | `#F2C14E` (sun) | `#E8E4D8` (moon) | sun/moon in the window |

Room object colors: wood `#7A5230` / dark wood `#5C3C22`, cork `#C99A62`, teal `#3E7C7B`, coral `#E07A4F`, periwinkle `#A5B8D8`.

Implement lights on/off by toggling a `data-lights="off"` attribute on `<html>` and overriding only the room tokens under that selector. Initial state: lights off if the visitor's system prefers dark mode (`prefers-color-scheme: dark`), otherwise on.

### Type

- **Bricolage Grotesque** (700, 800): logo, the hero heading, and section headings.
- **DM Sans** (400, 500, 700): everything else.
- **JetBrains Mono** (400, 600): only inside the build log (dates, tech stack, status badges, filter buttons) and the "/now" box, so it feels like a log.
- Hero heading 56px (scale down on mobile with `clamp()`), section headings 34px, body 17px with line-height 1.6. Keep line length under about 75 characters.
- Section labels in sentence case (for example "About me", not "ABOUT ME").

### Shape and spacing

Content max-width 1120px, centered, 24px side padding. Room corners 28px radius, panel 24px, cards 16px, buttons fully rounded (999px). Every button and link is at least 44px tall.

## 6. Page layout

```
┌──────────────────────────────────────────────────────────┐
│ akshita.          About  Projects  Experience  Contact  [Lights off] │
├──────────────────────────────────────────────────────────┤
│ Hi, I'm Akshita.                         [Skip the room, │
│ Come on in.                               show me everything] │
│ intro sentence                                            │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────── THE ROOM (560px tall) ───────────────┐ │
│ │ [window]   [corkboard]                  [bookshelf]   │ │
│ │                  [laptop] [mug]                       │ │
│ │ [plant]   ======== desk ========                      │ │
│ └───────────────────────────────────────────────────────┘ │
│ Tip: use Tab to move between objects, Enter to open one.  │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────── CONTENT PANEL ───────────────────────┐ │
│ │ (whichever section is open)                           │ │
│ └───────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## 7. The room

The room is a `position: relative` box (width 100%, height 560px) with the wall as its background and a floor strip covering the bottom 30%. Objects are absolutely positioned using percentages so they scale with the width. Build them from styled HTML elements (or inline SVG inside each button); no image files needed to start.

| Object | Opens | Position (left, top, width, height) | Hover label |
|---|---|---|---|
| Window (with sun/moon) | `about` | 6%, 10%, 18%, 38% | About me |
| Corkboard with two pinned notes ("Home Centre / design", "Open Maison / tech") | `experience` | 31%, 9%, 25%, 32% | Experience |
| Bookshelf, three shelves of books | `skills` | 74%, 6%, 19%, 64% | Skills & courses |
| Laptop on the desk, with colored "code lines" on screen | `projects` | 37%, 39%, 17%, 21% | Projects |
| Mug on the desk | `contact` | 57%, 49%, 6%, 11% | Say hi |
| Desk (decor only) | none | 28%, 60%, 40% wide, with two legs | none |
| Plant (decor only) | none | 8% left, bottom-right area of floor | none |

Rules:
- Every clickable object is a real `<button>` with an `aria-label` (for example `aria-label="Laptop: projects"`). Decorative parts inside have `aria-hidden="true"`. Desk and plant are not focusable.
- Hover and keyboard focus: the object lifts 4px and a small pill label appears above it. Focus ring is a 3px `--highlight` outline.
- Name classes and IDs by purpose, not furniture: `data-section="projects"`, not `laptop`. That way I can swap the laptop for something else later.
- Respect `prefers-reduced-motion`: no lift animation or color transitions.

### Mobile

At narrow widths the room objects get tiny. Below 640px:
- Keep the room, but reduce its height (for example 320px) as a picture.
- Show a row of plain buttons under it ("About me", "Projects", "Experience", "Skills", "Say hi") that do the same thing as the room objects.
- Header nav wraps onto its own line.

## 8. The content panel

One panel below the room. It shows one section at a time.

### Behavior

- On first load, it shows the intro: "Pick something in the room." with one sentence explaining what each object opens.
- Clicking a room object, a nav link, or a mobile button opens that section.
- **"Skip the room, show me everything"** shows every section stacked in this order: About, Projects, Experience, Skills, Contact.
- Clicking the logo goes back to the intro.
- **URL hash support:** opening a section updates the URL (`#projects`, `#all`, and so on). Loading the page with a hash opens that section, and the browser back button works. This lets me send someone a direct link like `mysite.com/#projects`.
- After opening a section, move keyboard focus to the section heading and scroll it into view smoothly (unless reduced motion is on). The panel has `aria-live="polite"`.

### Sections

All text comes from `content.js`. Placeholders in [BRACKETS] are things I'll fill in myself; leave them visible.

**About me:** heading "Designer's eye, engineer's toolkit.", a short paragraph about me, then a dark "/now" box (ink background, mono label "/now · updated [MONTH YEAR]") with one sentence on what I'm working on.

**Projects (the build log):**
- Heading "What's on my laptop" and filter buttons: `all`, `shipped`, `in progress`, `planned`. Filters are `<button>`s with `aria-pressed`. The active one is filled with `--ink`.
- Each project is a row: date on the left (mono), title + one-line description + tech stack (mono, small) in the middle, status badge on the right. Rows wrap on mobile.
- Badge colors: in progress = `--highlight` background, planned = `--line` background, shipped = `--ink` background with light text.
- Empty state (when a filter has no results): "Nothing shipped yet. The first one lands soon, check back."

**Experience:** two cards side by side (stack on mobile), each with company, role, dates, and a short description.

**Skills & courses:** a wrap of pill tags plus one line: "Dean's List, Fall 2025 and Spring 2026."

**Contact:** heading "Grab a coffee with me." and buttons: Email me (filled), GitHub, LinkedIn, Resume (PDF).

### content.js shape

```js
const content = {
  about: {
    heading: "Designer's eye, engineer's toolkit.",
    body: "I'm a sophomore at the University of Illinois Chicago studying Computer Science with a concentration in Human-Centered Computing, graduating May 2029. I started out designing real rooms and now I build tools that help people plan them. [A LINE OR TWO ABOUT WHAT YOU LOVE OUTSIDE OF CLASS]",
    now: { updated: "[MONTH YEAR]", text: "Building the dorm room planner, learning C++ data structures, and hand-coding this site in VS Code." }
  },
  projects: [
    { when: "Fall 2026", title: "UIC Dorm Room Planner", desc: "Drag furniture onto real UIC housing floor plans so students can plan their room before move-in.", stack: ["html", "css", "javascript"], status: "in-progress", link: null },
    { when: "Fall 2026", title: "This website", desc: "Hand-coded from scratch in VS Code and deployed with GitHub Pages.", stack: ["html", "css", "javascript"], status: "in-progress", link: null },
    { when: "Next", title: "UIC Redesign Case Study", desc: "Research, sketches and a prototype for a better UIC student experience.", stack: ["figma", "user research"], status: "planned", link: null },
    { when: "Later", title: "Study & Habit Tracker", desc: "A low-pressure tracker for study sessions and daily routines.", stack: ["[STACK TBD]"], status: "planned", link: null }
  ],
  experience: [
    { company: "Home Centre", role: "Design intern", dates: "[DATES]", desc: "[What you designed, who it was for, and one thing you learned.]" },
    { company: "Open Maison", role: "Tech intern · AI visualizer", dates: "[DATES]", desc: "[What you built or contributed to, and the tools you used.]" }
  ],
  skills: ["HTML & CSS", "JavaScript", "C", "C++", "Interior & spatial design", "User research", "[MORE TOOLS]"],
  honors: "Dean's List, Fall 2025 and Spring 2026.",
  contact: { email: "[EMAIL]", github: "[GITHUB URL]", linkedin: "[LINKEDIN URL]", resume: "assets/resume.pdf" }
};
```

When `link` is set on a project, the title becomes a link. When a project's status is `shipped`, it shows under the "shipped" filter.

## 9. Build phases

Stop after each phase so I can test in Live Server and commit to Git.

1. **Setup:** folder structure, `index.html` skeleton with semantic landmarks (`header`, `nav`, `main`, `footer`), linked CSS/JS files, Google Fonts, `tokens.css`. Initialize Git.
2. **Header and hero:** logo, nav, lights button (not working yet), hero heading and intro, skip button.
3. **Static room:** wall, floor, and all objects positioned and styled. No JavaScript yet.
4. **Room interaction:** hover/focus labels, lights toggle (with system dark-mode default).
5. **Content panel:** `content.js`, rendering each section, opening sections from room objects and nav, the intro state, and "show everything."
6. **Build log filters:** filter buttons, badges, empty state.
7. **URL hash and focus management:** shareable links, back button, focus moves to section heading.
8. **Responsive and accessibility pass:** mobile buttons under the room, wrapping, reduced motion, check keyboard-only navigation and color contrast (4.5:1 for body text).
9. **Deploy:** push to GitHub, turn on GitHub Pages, test the live URL on my phone.

## 10. Deploying to GitHub Pages

1. Create a GitHub repo (named `<my-username>.github.io` if I want the site at that address).
2. Push the project with `index.html` at the root.
3. In the repo: Settings → Pages → deploy from the `main` branch, root folder.
4. Optional later: a custom domain (check the GitHub Student Developer Pack for a free one).

## 11. Things I'll fill in myself

- Internship dates and descriptions
- A line or two about what I love outside class
- "/now" month and text
- Email, GitHub, LinkedIn links and `resume.pdf`
- Any extra skills or tools
