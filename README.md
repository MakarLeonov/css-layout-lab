# CSS Layout Lab

A developer-grade interactive playground for learning and experimenting with CSS layout systems.

## Features

- **Flexbox Playground** — Full container + item controls, live canvas, CSS/Tailwind output
- **Grid Playground** — Template columns/rows, gap, alignment, column presets
- **Position Playground** — Visualize static/relative/absolute/fixed/sticky
- **Box Model** — Interactive layered margin/border/padding/content visualization
- **Display** — Switch between block/inline/inline-block/flex/grid/none
- **Overflow** — Container overflow modes with adjustable content
- **Z-Index** — Overlapping elements with draggable z-index control
- **Challenge Mode** — 8 challenges across Easy / Medium / Hard difficulty
- **Reverse CSS** — Paste any CSS → controls are applied automatically
- **Shareable URLs** — Full state encoded into URL query parameter
- **Presets** — Navbar, Centered, Card Grid, Sidebar, Holy Grail
- **Export** — One-click export to CodeSandbox or StackBlitz
- **Keyboard shortcuts** — A / D / R / C
- **i18n** — English + Russian, persisted to localStorage
- **Dark / Light theme** — Toggled from header, persisted to localStorage

## Stack

- React 18 + TypeScript
- Vite 5
- Zustand 4 (state management)
- TailwindCSS 3
- React Router 6
- Framer Motion 11
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Project Structure

```
src/
  components/
    layout/        Header, Sidebar, ExportModal, KeyboardModal
    ui/            Select, Slider, Toggle, Button, CodeBlock, …
  features/
    flexbox/
      components/  FlexCanvas, FlexControls, FlexCSSPanel
      store/       flexboxStore.ts  (Zustand)
      utils/       cssGen.ts
    grid/
      components/  GridCanvas, GridControls, GridCSSPanel
      store/       gridStore.ts
    challenge/     challenges.ts
    reverse/       (logic in utils/cssParser.ts)
  hooks/           useTranslation.ts, useUrlState.ts
  store/           uiStore.ts  (theme, lang, sidebar)
  i18n/            en.json, ru.json
  utils/           cssParser.ts, export.ts
  pages/           FlexboxPage, GridPage, PositionPage, …
```

## Keyboard Shortcuts (Flexbox page)

| Key | Action |
|-----|--------|
| A   | Add item |
| D   | Delete selected item |
| R   | Reset layout |
| C   | Copy CSS to clipboard |

## URL State Sharing

The Flexbox playground serialises the full store state into the `?s=` query parameter (Base64 encoded JSON). Clicking **Share Layout** in the header copies the URL to clipboard.

## Export

The Export modal provides:
- Generated CSS
- Full HTML file with embedded styles
- One-click open in CodeSandbox
- One-click open in StackBlitz
