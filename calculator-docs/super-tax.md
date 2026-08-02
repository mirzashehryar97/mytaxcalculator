# Super tax on high earning persons — `/super-tax-calculator`

**Feature:** `src/features/corporate-tax/` (mode `super-tax`).
**Calculation:** `lib/calculation.ts` → `calcSuperTax`.
**Rates:** `lib/rates.ts` → `SUPER_TAX_YEARS`.

## The rule it implements

**Section 4C**, at the rates in **First Schedule, Part I, Division IIB**. Imposed for tax year 2022
and onwards on "income of every person", where §4C(2) defines that income as the sum of profit on
debt, dividend, capital gains, brokerage and commission; taxable income under §9 excluding those;
imputable income; and income computed under the Fourth, Fifth, Seventh and Eighth Schedules.

**It is charged on the whole income, not on the slice above the threshold.** Every row of Division
IIB reads "*N% of the income*". One rupee over a band boundary re-prices the entire amount. This is
the single most important behaviour of the page and the calculation implements it literally.

It is genuinely **additional** to normal income tax — unlike §113, which substitutes.

## What the user enters

| Input | Notes |
|---|---|
| Income under §4C | Taken as given. |
| Taxpayer type | `other`, `banking`, `petroleum`, `fertilizer`. |
| Export-exempt | Only offered for 2026-27. |
| Fiscal year | `2026-2027` back to `2022-2023`. |

## Rate tables as shipped

### FY 2026-27 (Tax Year 2027)

| Person | Threshold | Rate |
|---|---|---|
| Banking company | above Rs 150 million | 10% of the income |
| Person computed under Part I of the Fifth Schedule (petroleum exploration) | above Rs 150 million | 10% |
| Person deriving income from the sale of any kind of fertilizer | above Rs 150 million | 10% |
| Anyone else | above Rs 500 million | 8% |

✅ **Verified** — Ordinance amended to 30 Jun 2026, PDF p. 533 (printed p. 514). The four rows are
reproduced above almost verbatim from the current Division IIB table.

### FY 2025-26 (TY 2026)

0% ≤150m · 1% · **1.5%** · **2.5%** · **3.5%** · **5.5%** · **7.5%** · 10% above 500m.

✅ Verified — same page, footnote 3 ("Table substituted by the Finance Act, 2026"), whose column (5)
is headed "For tax year 2026 and onwards" and prints exactly these figures. The Finance Act 2025 took
0.5 points off every band from Rs 200m to Rs 500m, as the page copy says.

### FY 2022-23, 2023-24, 2024-25 (TY 2023, 2024, 2025)

0% ≤150m · 1% · 2% · 3% · 4% · 6% · 8% · 10% above 500m.

✅ Verified — same footnote, column (4), headed "For tax year 2023, 2024 and 2025".

### Banking override, FY 2022-23 only

0% ≤150m · 1% · 2% · 3% · then **10% above Rs 300 million**.

✅ Verified — Ordinance PDF p. 533, the proviso under the current table:

> Provided further that in case of banking companies for tax year 2023, the rate of tax shall be
> **10% where the income exceeds Rs 300 million.**

The lower bands still apply below that point, which is why the shipped override keeps rows 1-4 and
replaces only the top.

### Export exemption, FY 2026-27 only

✅ Verified — **clause (104B) of Part IV of the Second Schedule**, Ordinance PDF p. 715
(printed p. 696):

> **(104B)** The provisions of section 4C shall not apply to a person if the export proceeds
> realized for the tax year represent **more than eighty percent of his total turnover** for the tax
> year.

Footnote: *"Clause (104B) inserted by the Finance Act, 2026."* — so it exists for 2026-27 and no
earlier year, exactly as `hasExportExemption` is keyed.

## The algorithm

```
bands     = overrides[taxpayerType] ?? year.bands
band      = first band where income ≤ band.upTo (or the open-ended last row)
rate      = isExportExempt ? 0 : band.rate
superTax  = income × rate / 100        ← the WHOLE income
threshold = the `over` value of the first band with a rate above zero
```

It also returns `nextBandOver` and `nextBandRate` so the page can warn how close the user is to the
next cliff — which, given that the rate applies to everything, is a genuinely useful number.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| Income Tax Ordinance 2001 (2026 consolidation) | `…IncomeTaxOrdinanace2001.pdf` | Correct — §4C, Division IIB, and the footnotes carrying 2022-23 → 2025-26. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — new table plus the export exemption. |
| Finance Act 2025 | `…FInanceAct2025.pdf` | Correct — the 0.5-point reduction. |
| Finance Act 2023 | `…FinanceAct,2023.pdf` | Correct — the eight-band table headed "tax year 2023 and onwards". |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

## Deliberately not modelled

- **Computing §4C income.** The four-limb definition in §4C(2) — including imputable income and the
  Schedule-based computations — is the user's to work out.
- **The tax year 2022 sector proviso** (10% above Rs 300 million for airlines, automobiles,
  beverages, cement, chemicals, fertilizer, iron and steel, LNG terminals, oil marketing, oil
  refining, petroleum and gas exploration and production, pharmaceuticals, sugar, textiles — and
  cigarette and tobacco, which the copy does not name). TY 2022 is outside the offered range.
- **Clause (104A)**, the fifteen-year personal-residence exemption from §4C on one property disposal.
- The §147 advance-tax and §137 payment machinery.
