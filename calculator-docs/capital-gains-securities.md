# Capital gains on listed securities — `/capital-gains-tax-calculator`

**Feature:** `src/features/capital-gains-tax/` (mode `listed-securities`).
**Calculation:** `lib/calculation.ts` → `calcListedSecuritiesTax`.
**Rates:** `lib/rates.ts` → `CAPITAL_GAINS_RATES`, `getListedRegime`, `applyNonFilerUplift`.

## The rule it implements

**Section 37A**, at the rates in **First Schedule, Part I, Division VII**, as substituted by the
Finance Act 2024. The tax is worked out and collected by NCCPL.

Two rules do all the work:

1. **Division VII charges by when the security was bought**, not by the tax year. The regime is
   fixed at purchase and sticks for the life of the holding.
2. **A non-filer pays double** (Tenth Schedule rule 1), and the only escape was rule 10(y).

## No fiscal-year dropdown — on purpose

Same reasoning as the property CGT page: a gain is taxed in the year it is realised, so the
**disposal date fixes the year** (`getCapitalGainsTaxYearForDate`). Dates outside the covered range
come back with a `coverage` flag (`before-range` / `after-range`) and the UI warns rather than
silently pricing the wrong year.

Only **2025-26 and 2026-27** are covered. Earlier disposals are out of range by design.

## What the user enters

| Input | Job |
|---|---|
| Acquisition date | **Picks the regime**, and decides the non-filer question. |
| Disposal date | **Picks the tax year.** |
| Purchase cost, sale proceeds | Gain = `max(0, proceeds − cost)`. |
| On the ATL | Filer or not. |

## Regimes as shipped

| Bought | Filer rate |
|---|---|
| Before 1 July 2013 | **0%** — never taxed |
| 1 Jul 2013 – 30 Jun 2022 | flat **12.5%** |
| 1 Jul 2022 – 30 Jun 2024 | the **holding ladder** below |
| On or after 1 July 2024 | flat **15%** |

An empty acquisition date is treated as a recent buy (flat 15%), which is the regime almost every
visitor is in.

### The holding ladder (bought 1 Jul 2022 – 30 Jun 2024)

| Holding period | Rate |
|---|---|
| Up to 1 year | 15% |
| 1 – 2 years | 12.5% |
| 2 – 3 years | 10% |
| 3 – 4 years | 7.5% |
| 4 – 5 years | 5% |
| 5 – 6 years | 2.5% |
| Over 6 years | 0% |

✅ **All of the above verified** — Ordinance amended to 30 Jun 2026, PDF p. 542-543 (printed
p. 523-524). Column (3) of the current Division VII table is headed "securities acquired between
1st day of July, 2022 and 30th June, 2024 (both dates inclusive)" and prints exactly this ladder;
column (4) is headed "acquired on or after 1st day of July, 2024" and reads 15%. The two provisos
below the table read:

> (i) the rate of **12.5%** tax shall be charged on capital gain arising on disposal where the
> securities are acquired on or after the first day of July, **2013** but on or before the 30th day
> of June, **2022**; and
> (ii) the rate of **0%** tax shall be charged … where the securities are acquired **before the
> first day of July, 2013**.

## The non-filer side

`applyNonFilerUplift` returns `filerRate × 2` unless rule 10(y) reaches the purchase.

✅ **Rule 10(y) verified** — Ordinance PDF p. 803 (printed p. 784):

> **7** Sub-rule (y) **omitted by the Finance Act, 2026.** The omitted sub-rule read as follows:
> "(y) tax collected under section 37A on disposal of securities **acquired on and from 1st day of
> July, 2025**;"

with footnote 6: *"New sub-rule (y) inserted by the Finance Act, 2024."*

So:

| Year | Rule 10(y) | Non-filer |
|---|---|---|
| 2025-26 | in force | pays the **filer** rate on anything bought on or after 1 Jul 2025; double on everything older |
| 2026-27 | omitted | double on everything |

That is exactly `nonFilerUpliftExemptFrom: '2025-07-01'` for 2025-26 and `null` for 2026-27, and it
is why NCCPL's published 2025-26 table shows one rate for both statuses on recent buys.

### ⚠️ The doubling is a deliberate departure from the statute

Division VII column (4) does **not** say "double" for post-1 July 2024 acquisitions. It says:

> … and at the rates specified in **Division I** for individuals and association of persons and
> **Division II** for companies in respect of persons not appearing on the Active Taxpayers' List …
> Provided that the rate of tax for individuals and association of persons not appearing on the
> Active Taxpayers' List, the rate of tax **shall not be less than 15%** in any case.

i.e. the seller's own slab rate with 15% as a floor. NCCPL — the operator that actually computes and
collects the tax — publishes a flat doubled figure instead. **The calculator follows the operator**,
because that is the number a taxpayer's NCCPL certificate will show.

This is a known, recorded conflict, not an oversight. Do not "fix" it by switching to the statutory
reading without also deciding what to do about the fact that the calculator cannot know a seller's
slab rate. Recorded in [open-questions.md](open-questions.md#securities-non-filer-statute-vs-operator).

The result carries a `confidence` field for this: a filer's figure is always `confirmed` (it is the
enacted Division VII rate), a nil rate is `confirmed` either way, and a non-filer figure for
2026-27 is `pending-operator-table` — so the page warns rather than presenting a quiet number while
NCCPL's table for the new year is unpublished.

## The algorithm

```
taxYear      = getCapitalGainsTaxYearForDate(disposalDate)
gain         = max(0, saleProceeds − purchaseCost)
regime       = getListedRegime(acquisitionDate)
filerRate    = flat rate for the regime, or the ladder rung for the holding period
nonFilerRate = isExemptFromNonFilerUplift ? filerRate : filerRate × 2
tax          = gain × (filer ? filerRate : nonFilerRate) / 100
```

A disposal at or below cost sets `isLoss` and reports the loss amount; the gain is zero.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| Income Tax Ordinance 2001 (2026 consolidation) | `…IncomeTaxOrdinanace2001.pdf` | Correct, and the right consolidation — §37A, Division VII and the Tenth Schedule. |
| Finance Act 2024 | `…FinanceAct-2024.pdf` | Correct — it substituted Division VII and set the 1 July 2024 cut-off. |
| Finance Act 2025 | `…FInanceAct2025.pdf` | Correct for the fund page; on this page its relevance is the rule 10(y) window. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it left the rates alone and removed rule 10(y). |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

**NCCPL is deliberately not cited.** It is a licensed company, not a government body, so it can never
appear in an official-sources grid — it is only ever an operator cross-check, and its site returns a
Cloudflare interstitial to headless fetches anyway.

## Deliberately not modelled

- **PMEX future commodity contracts** — S.No 8 of Division VII, 5%. The route was removed and must
  not return; see the content policy in `CLAUDE.md`.
- **Debt securities held by a company**, which Division VII's proviso sends to the Division II
  company rate.
- **Loss set-off** under §37A(5), and the §100B/Eighth Schedule machinery by which NCCPL actually
  computes and collects.
- **Disposals before FY 2025-26.** The rate tables only cover two years.
