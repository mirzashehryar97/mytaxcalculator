# Embeddable salary calculator — `/embed/salary-tax`

**Feature:** `src/features/embed-salary-tax/`.
**Calculation:** `lib/calculation.ts` → `calcEmbedSalaryTax`, a thin wrapper over
`calculateBudgetYearTax` from `src/lib/budgetComparison.ts`.

## What it is

A stripped-down, iframe-friendly version of the salary calculator: monthly salary in, monthly and
annual gross/tax/take-home plus the effective rate out. No insights panels, no charts, no navigation
chrome.

## Rate behaviour

Identical to the main salary calculator, **including the §4AB surcharge**, because it routes through
`calculateBudgetYearTax` and so through the shared `salaryTaxForYear` — 9% above Rs 10 million in
FY 2025-26 and 10% in FY 2024-25. See [salary-tax.md](salary-tax.md#surcharge--4ab).

This matters more here than anywhere else on the site: the embed is the copy that runs on **someone
else's page**, where a wrong figure is not ours to correct after the fact. All six salary surfaces
now share one code path, so the embed cannot fall behind the calculator it mirrors.

## Rates

None of its own. See [salary-tax.md](salary-tax.md) for the slab tables and their verification
against the Income Tax Ordinance 2001 (amended to 30 June 2026).

## Official sources

The embed renders no official-sources grid — it is designed to sit inside someone else's page. The
rates behind it are the ones cited on `/`.

## Who has embedded it

`hooks/useEmbedHostTracking.ts` fires one `embed_calculator_load` event per framed page load,
carrying `host` — the hostname of the site the iframe is sitting in. The event is allowlisted in
`src/lib/analytics.ts` so it reaches **both** Google Analytics and Vercel Web Analytics (most custom
events go to GA only). In Vercel: **Analytics → Events → `embed_calculator_load`**, broken down by
the `host` property.

Top-level visits to `/embed/salary-tax` — our own preview, and the page the "Embed this calculator"
button lives on — are skipped via `window.self === window.top`, so the event counts publishers
rather than us.

`lib/embedHost.ts` resolves the host from two signals, in order:

1. `location.ancestorOrigins`, last entry — the top-level page of the frame chain. Chromium and
   WebKit only, but it survives `<iframe referrerpolicy="no-referrer">` and reports the outermost
   page rather than whoever framed us directly (so a nested embed is attributed to the real site).
2. `document.referrer` — the Firefox fallback. The default `strict-origin-when-cross-origin` policy
   already trims a cross-origin referrer to its origin, which is the granularity we want.

Where neither resolves — a sandboxed frame reporting an opaque `"null"` origin, or a publisher
suppressing the referrer on Firefox — the event still fires with `host: 'unknown'`, deliberately:
an unmeasurable embed should show up as a number rather than vanish from the total.

The one thing this cannot see is a site that copies our markup instead of iframing us; nothing
client-side can.

## Deliberately not modelled

Everything the salary calculator leaves out. The embed is intentionally a strict subset: if it ever
diverges from `/` for the same input and year, that is a bug in one of them.
