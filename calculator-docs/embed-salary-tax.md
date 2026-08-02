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

## Deliberately not modelled

Everything the salary calculator leaves out. The embed is intentionally a strict subset: if it ever
diverges from `/` for the same input and year, that is a bug in one of them.
