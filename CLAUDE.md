# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

An animated VS Code IDE mock-up that demonstrates an AI agent scanning code for GDPR compliance violations in real-time. This is a **demo/presentation artifact**, not a functional IDE. All code displayed in the editor, file trees, and terminal output is hardcoded and animated on timers — nothing is interactive or connects to a real backend.

## Commands

- `pnpm dev` — Start dev server (uses Next.js Turbopack)
- `pnpm build` — Production build (TypeScript errors are ignored via `next.config.mjs`)
- `pnpm lint` — Run Next.js ESLint

## Tech Stack

- **Next.js 16** (App Router) with React 19, TypeScript
- **Tailwind CSS v3** with CSS variables for theming (dark-only, VS Code-inspired palette)
- **shadcn/ui** components in `components/ui/` (Radix primitives, `lucide-react` icons)
- **pnpm** as package manager

## Architecture

Single-page app (`app/page.tsx`) composing all IDE panel components. The page is `"use client"` — there is no server-side data fetching.

### IDE Components (`components/ide/`)

All components are stateless visual shells or timer-driven animations. The animation timeline is coordinated through `delay` properties (in seconds) defined as constants within each file:

| Component | Purpose |
|---|---|
| `title-bar.tsx` | macOS-style window chrome |
| `activity-bar.tsx` | Left icon sidebar (VS Code activity bar) |
| `file-explorer.tsx` | Collapsible file tree with warning indicators |
| `editor-tabs.tsx` | Tab bar with warning badges |
| `code-editor.tsx` | Syntax-highlighted code with progressive violation highlighting. Contains `codeLines` (tokenized source) and `violations` array that controls scan timing |
| `terminal-panel.tsx` | Animated terminal output showing scanner results |
| `ai-activity-panel.tsx` | Right sidebar showing scan step progress |
| `gdpr-alert-overlay.tsx` | Toast-style alert cards that appear over the editor |
| `ai-cursor.tsx` | Animated cursor that moves across the editor to simulate AI agent interaction |
| `status-bar.tsx` | Bottom bar with violation count that updates as scan progresses |

### Animation Coordination

Each component independently schedules its animations via `useEffect` + `setTimeout` with hardcoded `delay` values. There is no shared state or event bus — the components are synchronized by having their delay values manually aligned. When modifying animation timing, you need to update delays across multiple files to keep the demo coherent.

### Theming

Dark-only theme defined entirely via CSS custom properties in `app/globals.css`. Colors use raw HSL values (`220 14% 10%`) consumed as `hsl(var(--background))` in Tailwind config. Custom keyframe animations (`typingCursor`, `slideInFromRight`, `fadeInHighlight`, `glowPulse`, etc.) are also in `globals.css`.
