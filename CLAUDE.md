# Project conventions & agent instructions

This file provides guidance to AI coding agents (Claude Code, Codex, and other `AGENTS.md`/`CLAUDE.md`-aware tools) when working with code in this repository. It is the single source of truth: `AGENTS.md` is a symlink to this file.

## Project

`my-tax-calculator` — a stateless, client-side Pakistan income tax calculator and SEO content site (Next.js 15.3 App Router). No backend, no database, no auth: every calculation runs in the browser. Live at https://www.mytaxcalculator.pk. Today it is salary-tax-only and is being expanded into a multi-sector calculator platform (freelancer/IT, rental/property, business/AOP, withholding, etc.) — see `TAX_PLATFORM_TASK_PLAN.md` and `docs/tax-sectors/`.

## Commands

```bash
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build
npm run analyze      # production build + bundle analyzer (ANALYZE=true)
npm start            # serve the production build

npm run lint:fix     # Biome autofix — format + import ordering + safe fixes
npm run lint         # Biome verify — fails on error-level diagnostics
npm run type-check   # tsc --noEmit (strict)
```

There is no test runner configured in this repo — no `test` script and no test files exist. Do not invent a test command; verify changes with `type-check`, `lint`, and by running the app.

**Quality gate — run after every code change, in this order, and don't finish until all three are green:** `npm run lint:fix` → `npm run lint` → `npm run type-check`. This is enforced (`.cursor/rules/quality-checks.mdc`); do not skip it even for small edits.

## Architecture

`docs/ARCHITECTURE.md` is the **single source of truth** for how `src/` is organized. It governs all of `src/` and overrides both the git history and the pre-existing file layout. Read it before adding or moving files. The `.cursor/rules/*.mdc` files (`feature-architecture`, `one-component-per-file`, `quality-checks`) are `alwaysApply` condensations of it.

### Layering (one direction, no upward skips)

```
app/<route>/page.tsx  →  <Feature>View  →  feature components  →  shared primitives
   routing only          composition only     one job each          dumb & reusable
```

- **`page.tsx` is routing only** — a **server component** that exports `metadata` (usually `getMetadata('/<slug>')`), renders `<JsonLd data={routeStructuredData('/<slug>')} />` + exactly one `<FeatureView/>`. No state, handlers, or data shaping.
- **Views compose, they don't compute** — arrange sections; delegate rendering to feature components and all computation to hooks/`lib`.
- **`'use client'` lives on interactive leaves only** (forms, toggles, charts), pushed as low as possible. Never on `page.tsx` or a pure view.

### Where a thing goes (decision order)

1. Used by one feature only → `src/features/<feature>/` (self-contained: `<Feature>View.tsx`, `components/`, `hooks/use<Xxx>.ts`, `lib/{calculation,rates}.ts`, `types.ts`).
2. Shared UI across features → `src/components/{calculator,layout,ui}/`.
3. Shared non-UI logic/data → `src/lib/` (app concerns: `seo.ts`, formatting) or `src/utils/` (generic pure helpers).
4. Routing → `src/app/` and nothing else lives there.

### Enforced conventions

- **One component per file** — filename = PascalCase component name = default export. Never two component functions in one `.tsx` (small non-component helpers/formatters are fine). See `.cursor/rules/one-component-per-file.mdc`.
- **No logic in component files** — anything nameable as map/format/calc/build/parse/transform/helper/util goes to `lib/` (feature) or `utils/` (generic) and is imported. Only tiny single-use inline handlers may stay.
- **No data literals in components** — rate tables (`Record<fiscalYear, …>`), option lists, and large copy blocks live in their own module (`rates.ts` / `content.ts`).
- **Hooks own stateful logic** — `use<Xxx>.ts`, `'use client'`, no JSX.
- **DRY on second occurrence** — repeated markup → shared primitive; repeated logic → `lib`/`utils`. Split any component over ~150 lines or rendering 2+ distinct sections.
- **Imports use the `@/` alias** (`@/*` → `src/*`). Don't hand-order imports — Biome owns ordering/formatting.

### Migration reality (important)

The repo is **mid-migration** to the feature-first layout. New/feature-first code lives in `src/features/{home,salary-tax}/` and `src/components/{calculator,layout,ui}/`. Legacy code still powers most routes: flat `src/components/*.tsx` and `src/views/*.tsx` (imported by pages under `src/app/`). Only the home and salary-tax routes currently follow the target structure.

- New and **touched** code follows `docs/ARCHITECTURE.md` exactly. Do **not** add new screens to `src/views/` or drop new components in flat `src/components/`.
- `docs/tax-sectors/_architecture.md` still documents the *old* route recipe (`src/views/`, `src/components/HeaderNav.tsx`) — that placement is **superseded** by `docs/ARCHITECTURE.md`. Its shared-calculator-layer spec (`slabEngine`, `FiscalYearSelect`, `FilerToggle`, `ResultCard`, `CalculatorLayout`) is still the plan of record.

## Adding a new calculator / route

1. `src/features/<xxx>/` — `XxxView.tsx`, `components/XxxForm.tsx` + `components/XxxResultSummary.tsx` (built from `components/calculator/` primitives), `hooks/useXxx.ts`, `lib/calculation.ts` (`calcXxx(inputs, fiscalYear)` — pure), `lib/rates.ts` (`Record<fiscalYear, …>`), `types.ts`.
2. `src/app/<slug>/page.tsx` — thin server component: `metadata` + `<JsonLd/>` + `<XxxView/>`.
3. Register the route in `src/lib/seo.ts` → add an entry to `routeMeta`. Sitemap (`src/app/sitemap.ts`), robots, breadcrumbs, and OG/Twitter metadata all derive from it automatically.
4. Add the nav link in `src/components/layout/navigation.ts`.

Every sector calculator is **data + a thin wrapper**, never copy-pasted markup. The fiscal-year `<select>` (driven by `Object.keys(rates)`, defaulting to the current year, recomputing on change) is the cross-cutting requirement on every calculator.

### Result colour convention (all calculators)

Money in every result is coloured by meaning, **regardless of what a design mockup shows**. This mirrors the salary calculator (`SingleYearCalculator`) and freelancer `TaxBreakdownCard`, where gross is grey, tax is red, and net is green:

- **Tax you owe is red** (`text-red-600` / `ResultCard tone="negative"`) — slab/base tax, surcharge, total tax, tax still to pay.
- **Money the taxpayer keeps or is credited is green** (`text-emerald-600` / `ResultCard tone="positive"`) — net / after-tax income (take-home), and a credit that reduces the bill such as tax already paid/withheld (it counts in the taxpayer's favour, so it is not red).
- **The pre-tax income base is neutral/black** (`text-gray-900` / `ResultCard tone="neutral"`) — gross income and taxable income (net profit *before* tax).
- Percentages (effective rate, marginal-band rate) are **not** amounts — leave them on their existing tone (`info`/themed), don't force them red.

Use the shared `ResultCard` tones so this stays consistent; don't hand-code result colours per calculator.

## SEO system

`src/lib/seo.ts` is the central registry. `routeMeta` (keyed by pathname) drives `getMetadata()`, sitemap entries, breadcrumb trails, and Article structured data. Reusable JSON-LD blocks (`organizationLd`, `websiteLd`, `webApplicationLd`, `faqLd`, HowTo, etc.) and `routeStructuredData(pathname)` are rendered through the `<JsonLd>` component. Site-wide constants: `SITE_URL`, `SITE_NAME`, `LAST_UPDATED`, `SITE_KEYWORDS`.

## Tax calculation engine

`src/utils/taxCalculator.ts` holds `taxSlabs: Record<fiscalYear, TaxBracket[]>` (fiscal years like `'2026-2027'`, back to `'2014-2015'`) and the progressive slab formula: `fixed + (amount - min) * rate/100`. FY `'2018-2019'` is a hard-coded special case (fixed-amount slabs). The multi-sector plan extracts the pure core into `src/utils/slabEngine.ts` (`calcSlabTax(amount, brackets)`) with `taxCalculator.ts` delegating to it — preserve salary-calc behavior when doing so.

**Tax rate source of truth:** the verified per-sector docs in `docs/tax-sectors/*.md` (and the PDFs in `docs/tax-sectors/sources/`). The full-page mockups in `screenshots/calculator-redesign-2026-current-design/` (one subfolder per calculator) are **UI direction only** — every rate, section number, and date in them is hallucinated placeholder content. Never copy a rate from a mockup.

**"Sources used" card (every calculator):** the `*_SOURCE_LINKS` list in each feature's `lib/content.ts` must **lead with the primary official FBR source** — the Finance Act / Income Tax Ordinance the rates actually come from (e.g. `Finance Act 2026 (FBR)`) — before any secondary summary (PwC, ICMA, etc.). Only cite a source that applies to *that* calculator's regime: a withholding rate card belongs on a withholding-regime calculator (e.g. freelancer §154A), not on a net-profit slab calculator (business/AOP). Keep `sourcesDescription` consistent with the links, official source named first.

## Stack facts

Next.js 15.3 App Router · React 18.3 · TypeScript strict · Tailwind CSS 3 · Biome/ultracite (lint + format, 2-space indent, 100-col; CSS files are excluded from Biome) · `lucide-react`, `recharts`, `react-datepicker`. Charts live in `src/components/{single-year,multi-year}-charts/` (dispatcher + `colors.ts` + `types.ts`, lazy-loaded — clone the folder per calculator that needs charts). Shared CSS component classes are defined in `src/app/globals.css` (`.surface-card`, `.form-input`, `.form-select`, `.form-label`, `.btn-calculate`, `.stat-card`, `.chip`, `.section-divider`, `.no-spinner`).

## Out of scope (Phase 3, parked)

User accounts/auth, dashboards, payroll CSV tooling, consultant marketplace, and premium/pricing were in the design mockups but are deliberately **not** being built — they'd require auth, a database, and a backend. Keep the calculator build stateless and free of those dependencies. Empty placeholder routes (`/login`, `/pricing`, `/get-started`, `/businesses`, `/calculators`, `/deadlines`, `/guides`) currently render `EmptyRouteBody`.
