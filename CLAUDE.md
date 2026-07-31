# Project conventions & agent instructions

This file provides guidance to AI coding agents (Claude Code, Codex, and other `AGENTS.md`/`CLAUDE.md`-aware tools) when working with code in this repository. It is the single source of truth: `AGENTS.md` is a symlink to this file.

## Project

`my-tax-calculator` — a stateless, client-side Pakistan income tax calculator and SEO content site (Next.js 15.3 App Router). No backend, no database, no auth: every calculation runs in the browser. Live at https://www.mytaxcalculator.pk. Today it is salary-tax-only and is being expanded into a multi-sector calculator platform (freelancer/IT, rental/property, business/AOP, withholding, etc.) — see `TAX_PLATFORM_TASK_PLAN.md` and `docs/tax-sectors/`.

## Content policy — Islamic compliance (hard constraint)

The site serves a Pakistani Muslim audience and must contain **no un-Islamic financial references anywhere**, **regardless of whether the tax genuinely applies to them**. This is a settled decision about the site's identity, not a tax-accuracy question — a correct rate is not a reason to name a haram instrument. It outranks completeness: where the two conflict, drop the reference.

**Speak up — do not silently comply.** If an instruction, a rate doc, a mockup or a copy suggestion would put something un-Islamic into the site, **say so plainly before building it**, name what the problem is (riba, gharar, maysir, a haram good, haram imagery), and propose the compliant alternative. Assume it was unintentional — the FBR's own material is full of these, so they arrive by default in any faithful transcription of the law. Flagging it is required even when the request is explicit and even when it is legally correct; the user decides after being told, but they must be told.

**Scope is everything user-visible, not just prose:** page copy, tooltips, `disabledReason` text, FAQ answers, option labels, `lib/content.ts` blocks, SEO keywords and descriptions in `src/lib/seo.ts`, OG/social-card copy, lucide icons and any imagery in `public/`. A clean sentence with a pig on it still fails.

### How to apply, in order of preference

1. **Rewrite around the rule when the tax survives without the haram example.** The mutual-fund stock/other split is a real legal test (§2(61A), >70% in shares), so "money market, income and bond funds" became "any fund that keeps less than 70% of its money in shares" — same rule, same rates, nothing haram named.
2. **Prefer the statute's own halal-compatible wording.** §15A literally says "profit paid on money borrowed" — the Ordinance's phrase is both more accurate and compliant than "interest". Same for premiums "to cover the building" rather than "insurance", which also covers takaful.
3. **Swap example lists rather than arguing the concept.** Payroll deductions moved from "loan repayments or insurance" to "a salary advance being recovered, welfare fund contributions or society dues".
4. **Drop the item from a statutory enumeration.** "cigarettes" sat in the §113 minimum-turnover distributor tooltip because the FA2026 table names it; the list already ended "and similar listed goods", so removing the word cost no rate or eligibility meaning.
5. **Delete the whole route when the instrument itself is the problem and cannot be relabelled.** PMEX futures (gharar, no qabd, leverage, cash settlement) could not be reworded, so `/commodity-trading-tax-calculator` was removed entirely — route, view, components, hook, mode config, rate, nav entry, `routeMeta`, guide cards and prose. Do not re-add it, and do not "convert" a regime you cannot relabel: §37A(3) welds that 5% to PMEX member futures specifically, and physical spot commodity trading is ordinary business income (§18) already covered by the business calculator.

### Deliberately kept — do not "fix" these

Dividends and share capital gains (profit on equity is permissible), approved pension funds, provident fund, the term "mutual fund" itself (Shariah-compliant funds exist), and **"banking company"** in the corporate calculator — a First Schedule taxpayer category that Islamic banks fall under too, so removing it would break a real rate group rather than remove a haram reference. The test is whether the term *names* something haram, not whether something haram can be done with it.

### Before finishing any content change

Sweep the touched files for: `interest`, `bond`, `money market`, `insurance`, `profit on debt`, `futures`, `PMEX`, `riba`, `usury`, gambling/lottery/casino, alcohol/pork/tobacco. Then check the `lucide-react` import list — `PiggyBank` (pig imagery) and `CandlestickChart` (speculative-trading shorthand, and the old PMEX icon) are both banned; use `Wallet` and `Coins`. Expect false positives on `credit` (tax credit), `margin` (marginal rate, CSS), `lend` (calendar), `instalments` (advance tax) and `lease` (ijarah-compatible, and only ever used to exclude leased vehicles from scope).

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

**The one exception — a calculator that already knows its year.** Where the form asks for a *date* that fixes the tax year by law, the year is derived from that date and the `<select>` is dropped: offering both lets the user state a contradiction the calculator then prices. Property capital gains is the case in the repo — a gain is taxed in the year its disposal falls in, so `getPropertyTaxYearForDate(saleDate)` (`features/property-tax/lib/rates.ts`, tax year = 1 July–30 June) drives both the regime year and the §236C credit, and `PropertyTaxYearNotice` renders the derived year where the dropdown used to sit so it stays visible rather than hidden. Do not "restore" the dropdown there. A derived year can land outside the years we hold rates for, so the resolver returns a `coverage` flag and the UI must warn on `before-range` / `after-range` instead of silently clamping.

### Dropdowns (all calculators)

Every dropdown is `components/calculator/SelectInput.tsx` — our own trigger and option list, **never a native `<select>`**, and there is no `.form-select` class any more. The native control hands its list to the platform: unstyleable on desktop, a full-screen wheel on mobile, and an `<option>` can hold nothing but plain text (so it can't say *why* it is unavailable). `SelectInput` keeps what the native one gave us — arrow keys, Home/End, type-to-jump, Escape, and focus returning to the trigger — in `useSelectInput.ts`, with the class maps in `selectStyles.ts` and the pure bits (`SelectOption`, typeahead matching) in `select.ts`.

- `size`: `md` (a normal form field), `sm` (a tight row of fields, e.g. the multi-year day/month/year trio), `inline` (inside a line of text). Every container is a `<span>` so the field is legal inside a `<p>`.
- An option with `disabledReason` stays visible and reachable but can't be picked; the reason shows on hover, focus or tap via `SelectOptionTooltip`. Use it instead of dropping the option.
- Fiscal-year fields go through `FiscalYearSelect`, which wraps `SelectInput`. Build option arrays in a `lib/` module — `toSelectOptions` / `toLabelledOptions` from `components/calculator/options.ts` — never map them inline in a component.

### Date fields (all calculators)

Every date input is `components/calculator/DateInput.tsx` — our own field and calendar, never `<input type="date">`. The native control reads the visitor's locale (so it rendered `MM/DD/YYYY` here) and buries the year in a scrolling list, which is useless for a purchase date twenty years back. The replacement is typed **day-first** (`DD/MM/YYYY`, digits auto-grouped, `1/6/2025` also accepted) with a calendar that steps day → month → year: `DatePickerPanel` + `DatePickerHeader`/`DatePickerDayGrid`/`DatePickerMonthGrid`/`DatePickerYearGrid`/`DatePickerActions`, driven by `useDatePicker.ts`, with the calendar maths in `src/utils/calendarDates.ts` and the typing mask in `src/utils/dateMask.ts`.

Pass `min`/`max` as ISO dates and the picker blocks the rest — greyed days, disabled arrows, and a message naming the bound when a *typed* value falls outside it. Half-typed text is never pushed into the calculator (it snaps back to the held date on blur); clearing the field clears the value.

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

### Read an official source → write it down (hard rule)

**Any time you open a primary document — a Finance Act, the Ordinance, a provincial Act, a gazette notification, an FBR rate card or circular — the finding goes into that sector's `docs/tax-sectors/*.md` before the task is finished.** Not into the chat, not only into a code comment: into the file. Each sector doc keeps a **`## Verification log`** section at the end; add a dated entry. `docs/` is gitignored, so these files are the only durable record — a session that verifies a rate and doesn't write it down has destroyed the work, and the next session re-downloads an 839-page PDF to learn the same thing.

An entry records:

- **The document, its URL, and where in it you looked** — PDF page *and* printed page, because they differ by ~18 in the consolidated Ordinance. A page reference is what makes the next check cheap.
- **The operative text verbatim**, as a blockquote, wherever a rate or a cutoff turns on the wording. Paraphrase drifts; quotes do not. This is how "which Act narrowed rule 10(y)" and "is the FA2025 cut from Rs 200m or Rs 250m" got settled.
- **What it confirmed, and what it changed** — including "confirmed, nothing changed", which is worth writing so nobody re-verifies it next month.
- **What you deliberately did not model**, and why (missing input data, needs a form field). Otherwise it reads as an oversight later.
- **Anything that contradicts what the doc already said** — correct the doc inline *and* note it in the log. A stale doc is worse than no doc: it gets trusted.

Also log **negative findings**, they are cheap to re-suffer: a source that is a scan with no text layer, a host that blocks headless fetches (nccpl.com.pk returns a Cloudflare interstitial), a URL that has moved. Cache the PDF into `docs/tax-sectors/sources/` and add it to that folder's README table.

**Where the statute and an operator/practice figure disagree, say so in the doc and ship neither silently.** Record both readings and which one the code follows. See `investments-capital-gains.md` §4.1 — Division VII sets the non-ATL rate for post-1 July 2024 acquisitions by reference to Division I/II with a 15% floor, while NCCPL publishes a flat doubled figure; the calculator follows the operator and the doc says why. Do not resolve that class of conflict by picking one and deleting the other.

**Keep the doc and the shipped code honest about each other.** `docs/tax-sectors/*.md` describes what is *built*, not what was once planned. If the implementation deviates from the doc's advice, update the doc and explain the reason (see `investments-capital-gains.md` §4.4); if a route was deleted, mark the section rather than leaving a spec that reads like a to-do. Rates that are correct in `lib/rates.ts` but wrong in the on-page rate guide are still wrong — the guide table is a published rate claim and gets verified against the calculator, not eyeballed.

**"Official sources" section (every calculator):** each calculator ends — after its FAQ, above the footer — with an `<XxxOfficialSources/>` wrapper around the shared `components/calculator/OfficialSourcesSection.tsx` (eyebrow + heading + `OfficialSourcesGrid` card grid + "Last reviewed" date). The cards come from a `*_OFFICIAL_SOURCES` array in the feature's `lib/content.ts`, typed `OfficialSource[]`; shared URLs, logos and the section copy live in `src/lib/officialSources.ts` (`FBR_DOC_URLS`, `FBR_LOGO`, `IRIS_LOGO`, `OFFICIAL_SOURCES_COPY`), and the salary-slab pages (`/`, reverse-salary, increment, job-offer) all reuse `SALARY_OFFICIAL_SOURCES` from there rather than redefining it.

Those cards must cite **only official government sources, and must cite every official source the page actually uses**. "Official" follows **whichever government levies the tax**, not the FBR specifically:

- **Federal taxes** → the Finance Act / Income Tax Ordinance the rates come from, official FBR rate cards, and the FBR IRIS portal for filing.
- **Provincial and territorial levies** (vehicle token tax, and any provincial levy added later) → **that province's own** published schedule, excise-department page or calculator, or the **provincial Finance Act** that sets it. A provincial rate cited only to an FBR document is a wrong citation — the FBR does not set it. Note the rates are often *not* on the excise website: KP's token table lives in the KP Finance Act, and Sindh's is only exposed through its excise department's own calculator.
- **Cite the source of every year the calculator computes**, not just the current one. If the page still calculates 2023-24 under an older table, the Act that set that table belongs in the grid too.

Do **not** add third-party summaries (PwC, ICMA, TaxationPK, TaxToday, blogs, etc.), even as a secondary link — aggregators routinely mislabel provincial levies as federal withholding and vice versa. Only cite a source that applies to *that* calculator's regime: a withholding rate card belongs on a withholding-regime calculator (e.g. freelancer §154A), not on a net-profit slab calculator (business/AOP). Each card's one-line `description` must be verifiable in `docs/tax-sectors/*.md` — never invent a section number or a "what changed this year" claim.

`OFFICIAL_SOURCES_COPY` is deliberately government-neutral ("Straight from the source"). A page mixing federal and provincial sources should define its own copy next to its `*_OFFICIAL_SOURCES` array and pass it through — see `VEHICLE_TOKEN_SOURCES_COPY`.

**Where a rate cannot be sourced officially:** do not ship it silently. The vehicle token schedules carry a `source: { tier: 'official' | 'secondary', label, url }`; a `secondary` tier renders a prominent "verified from secondary sources, not official ones" warning above the result. Prefer omitting the year entirely (a missing key means "not covered" and shows an explicit panel) over shipping an unlabelled guess.

## Stack facts

Next.js 15.3 App Router · React 18.3 · TypeScript strict · Tailwind CSS 3 · Biome/ultracite (lint + format, 2-space indent, 100-col; CSS files are excluded from Biome) · `lucide-react`, `recharts` (`react-datepicker` is still in `package.json` but nothing imports it since the multi-year calculator moved to its own day/month/year dropdowns). Charts belong to the feature that uses them — `src/features/<feature>/components/<Xxx>Chart.tsx`, lazy-loaded with `next/dynamic` and `ssr: false`, colours in the feature's `lib/chartColors.ts` (see `features/multi-year-tax`). The legacy single-year charts still live in `src/components/single-year-charts/` (dispatcher + `colors.ts` + `types.ts`) until that calculator is migrated. Shared CSS component classes are defined in `src/app/globals.css` (`.surface-card`, `.form-input`, `.form-label`, `.btn-calculate`, `.stat-card`, `.chip`, `.section-divider`, `.no-spinner`).

## Out of scope (Phase 3, parked)

User accounts/auth, dashboards, payroll CSV tooling, consultant marketplace, and premium/pricing were in the design mockups but are deliberately **not** being built — they'd require auth, a database, and a backend. Keep the calculator build stateless and free of those dependencies. Empty placeholder routes (`/login`, `/pricing`, `/get-started`, `/businesses`, `/calculators`, `/deadlines`, `/guides`) currently render `EmptyRouteBody`.
