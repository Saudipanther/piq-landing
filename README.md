# Panther IQ — Landing Page

Single-page marketing site for **Panther IQ (PIQ)**, the research, engineering, and internal IP studio of Saudi Panther. Dark, editorial, "liquid glass" aesthetic, bilingual (English primary, Arabic accents).

## Stack

- **Vite 5** + **React 18** (plain JSX, no TypeScript)
- **Tailwind CSS 3** (design tokens in `tailwind.config.js`)
- **lucide-react** icons
- **vite-plugin-singlefile** — production build inlines JS, CSS, and images into one `dist/index.html` (self-contained, opens with no server)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # -> dist/index.html (single self-contained file)
npm run preview  # serve the built file
```

## Structure

```
src/
├── App.jsx                 # composition + hooks (reveal, glass pointer)
├── main.jsx
├── index.css               # design tokens, glass system, all keyframes
├── hooks/
│   ├── useReveal.js         # IntersectionObserver scroll-reveal
│   ├── useCountUp.js        # number count-up on scroll
│   └── useGlassPointer.js   # global cursor glare + 3D tilt on glass tiles
├── components/
│   ├── Nav.jsx  Hero.jsx  Dashboard.jsx  ClaudeSession.jsx
│   ├── Pillars.jsx  Capabilities.jsx  Personas.jsx  PersonaMocks.jsx
│   ├── Traction.jsx  TechnicalIP.jsx  ContactCTA.jsx  Footer.jsx
└── assets/                 # PIQ logos (bundled + base64-inlined at build)
```

## Design system

**Palette (in `tailwind.config.js`):**

| Token | Hex | Use |
|---|---|---|
| `forest` | `#435449` | mid-forest, buttons + active accents |
| `forest-deep` | `#0b1712` | page base (deep near-black forest) |
| `panel` | `#11211b` | elevated dark section surface |
| `sage` | `#7C967A` | accent ONLY, never actionable text |
| `gold` | `#D4A054` | highlights, number accents, cursor glare |
| `crimson` | `#B22234` | alerts |
| `paper` | `#F4F1E9` | primary text on dark |

**Type:** Fraunces (display/serif, headlines + numbers) + Inter (body), loaded from Google Fonts in `index.html`.

**Liquid glass:** `.glass` (light) and `.glass-dark` (terminals/sidebar) in `index.css`. A single global listener (`useGlassPointer`) writes CSS vars so a brand-gold glare follows the cursor and light tiles tilt in 3D. Ambient drifting `.orb`s sit behind each section so the blur has something to refract.

**Motion:** scroll reveals, count-ups, radar sweep, live-feed slide-ins, typing Claude terminals, sheen sweeps. Everything honors `prefers-reduced-motion`.

## Content rules (keep these)

- English numerals only (0-9), never Arabic-Indic.
- No em dashes; use commas, periods, semicolons.
- Forest is primary; Sage is accent only.
- Arabic is first-class: keep the Arabic accents and the Arabic-primary text inside the mockups.

## Known follow-ups

- No ESLint config yet — add `eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-jsx-a11y`.
- Persona mockups are CSS-built, not real screenshots — swap in real SP Hub captures when available.
- Stacked `backdrop-blur` + tilt is GPU-heavy; cap blur radius if it stutters on weaker machines.
