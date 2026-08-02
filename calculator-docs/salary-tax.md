# Salary income tax — `/` (Single year)

**Feature:** `src/components/SingleYearCalculator.tsx` (legacy, not yet migrated),
`src/features/salary-tax/` for the insights panels, `src/utils/taxCalculator.ts` for the engine.
**Rates:** `src/utils/taxCalculator.ts` → `taxSlabs`.
**Surcharge:** `src/lib/budgetComparison.ts` → `calculateBudgetYearTax`.

## What the user enters

| Input | Notes |
|---|---|
| Monthly gross salary | The only money input. Annual gross = monthly × 12, always. |
| Fiscal year | 13 years, `2026-2027` back to `2014-2015`. Defaults to `2026-2027`. |

There is no input for allowances, pension, gratuity, provident fund, medical exemption, tax credits
or an employer's own deductions. The calculator prices **gross salary against the salaried slab
table**, nothing else.

## The rule it implements

Income Tax Ordinance 2001, **First Schedule, Part I, Division I, clause (2)** — the table that
applies "where the income of an individual chargeable under the head *salary* exceeds seventy-five
per cent of his taxable income". Tax is collected by the employer under §149.

The 75% test is the taxpayer's, not the calculator's: entering a salary is taken as asserting it.
Someone whose salary is under 75% of total income belongs in the business/AOP calculator, which
uses the higher non-salaried table.

## Rate tables as shipped

Progressive slabs via `calcSlabTax`. Each row is *fixed amount + rate on the amount inside the band*.

### FY 2026-27 (Tax Year 2027) — Finance Act 2026

| Taxable income | Tax |
|---|---|
| Up to Rs 600,000 | 0% |
| 600,001 – 1,200,000 | 1% of the excess over 600,000 |
| 1,200,001 – 2,200,000 | Rs 6,000 + 11% |
| 2,200,001 – 3,200,000 | Rs 116,000 + 20% |
| 3,200,001 – 4,100,000 | Rs 316,000 + 25% |
| 4,100,001 – 5,600,000 | Rs 541,000 + 29% |
| 5,600,001 – 7,000,000 | Rs 976,000 + 32% |
| Above 7,000,000 | Rs 1,424,000 + 35% |

✅ **Verified** word for word against the Ordinance (amended to 30 Jun 2026), PDF p. 527-528
(printed p. 508-509).

### FY 2025-26 (TY 2026) — Finance Act 2025

| Taxable income | Tax |
|---|---|
| Up to Rs 600,000 | 0% |
| 600,001 – 1,200,000 | 1% of the excess over 600,000 |
| 1,200,001 – 2,200,000 | Rs 6,000 + 11% |
| 2,200,001 – 3,200,000 | Rs 116,000 + 23% |
| 3,200,001 – 4,100,000 | Rs 346,000 + 30% |
| Above 4,100,000 | Rs 616,000 + 35% |

✅ Verified — Ordinance PDF p. 527, footnote 2 ("Table substituted by the Finance Act, 2026. The
substituted Table read as follows"), which prints exactly this table.

### FY 2024-25 (TY 2025) — Finance Act 2024

| Taxable income | Tax |
|---|---|
| Up to Rs 600,000 | 0% |
| 600,001 – 1,200,000 | 5% of the excess over 600,000 |
| 1,200,001 – 2,200,000 | Rs 30,000 + 15% |
| 2,200,001 – 3,200,000 | Rs 180,000 + 25% |
| 3,200,001 – 4,100,000 | Rs 430,000 + 30% |
| Above 4,100,000 | Rs 700,000 + 35% |

✅ Verified — same page, footnote 1 (substituted by the Finance Act 2025).

### FY 2023-24 (TY 2024) — Finance Act 2023

| Taxable income | Tax |
|---|---|
| Up to Rs 600,000 | 0% |
| 600,001 – 1,200,000 | 2.5% of the excess over 600,000 |
| 1,200,001 – 2,400,000 | Rs 15,000 + 12.5% |
| 2,400,001 – 3,600,000 | Rs 165,000 + 22.5% |
| 3,600,001 – 6,000,000 | Rs 435,000 + 27.5% |
| Above 6,000,000 | Rs 1,095,000 + 35% |

✅ Verified — Ordinance PDF p. 526, footnote 2 (substituted by the Finance Act 2024).

### FY 2022-23 (TY 2023) — Finance Act 2022

| Taxable income | Tax |
|---|---|
| Up to Rs 600,000 | 0% |
| 600,001 – 1,200,000 | 2.5% of the excess over 600,000 |
| 1,200,001 – 2,400,000 | Rs 15,000 + 12.5% |
| 2,400,001 – 3,600,000 | Rs 165,000 + 20% |
| 3,600,001 – 6,000,000 | Rs 405,000 + 25% |
| 6,000,001 – 12,000,000 | Rs 1,005,000 + 32.5% |
| Above 12,000,000 | Rs 2,955,000 + 35% |

✅ Verified — Ordinance PDF p. 526, footnote 1 (substituted by the Finance Act 2023).

### FY 2018-19 (TY 2019) — the hard-coded year

This one is not a slab table at all. It is fixed amounts at the bottom and a minimum-tax proviso, so
`calculateTaxForTotalAmount` branches to `calculateTax2018_2019` instead of the engine:

| Taxable income | Tax |
|---|---|
| Up to 400,000 | Rs 0 |
| 400,001 – 800,000 | Rs 1,000 (flat) |
| 800,001 – 1,200,000 | Rs 2,000 (flat) |
| 1,200,001 – 2,500,000 | 5% of the excess over 1,200,000, **but never less than Rs 2,000** |
| 2,500,001 – 4,000,000 | Rs 65,000 + 15% |
| 4,000,001 – 8,000,000 | Rs 290,000 + 20% |
| Above 8,000,000 | Rs 1,090,000 + 25% |

✅ Verified — Ordinance PDF p. 523, the pre-2019 Division I quoted in footnote 1, including the
proviso "where the taxable income exceeds eight hundred thousand rupees the minimum tax payable
shall be two thousand rupees", which the `Math.max(2000, …)` in the code implements.

### FY 2014-15 through FY 2021-22

Shipped and unchanged since the site launched. **Not re-verified in this pass** against a primary
source — the 2026 consolidated Ordinance only prints back as far as the pre-2019 Division I, so the
2014-15 → 2017-18 and 2019-20 → 2021-22 tables would each need their own Finance Act. Recorded in
[open-questions.md](open-questions.md).

## Surcharge — §4AB

`calculateBudgetYearTax` adds a **9% surcharge on the tax** (not the income) when the annual income
exceeds Rs 10,000,000 — and **only for the fiscal year `2025-2026`**.

The statute, Ordinance PDF p. 53 (printed p. 34):

> **4AB.** Subject to this Ordinance, a surcharge shall be payable by every individual and
> association of persons at the rate of ten percent of the income tax imposed under Division I of
> Part I of the First Schedule where the taxable income exceeds rupees ten million:
> Provided that in case of an individual deriving income chargeable under the head "Salary",
> **no surcharge shall be payable.**

with footnotes recording that §4AB was **inserted by the Finance Act 2024**, that the Finance Act
2025 added the proviso in the form *"a surcharge shall be payable at the rate of nine percent … where
the taxable income exceeds rupees ten million in a tax year"*, and that the Finance Act 2026
substituted that with the flat "no surcharge shall be payable".

So the true position for a salaried individual is:

| Year | Salaried surcharge | Shipped |
|---|---|---|
| FY 2026-27 | none | none ✅ |
| FY 2025-26 | 9% of the slab tax above Rs 10m | 9% ✅ |
| FY 2024-25 | **10%** of the slab tax above Rs 10m (no salaried proviso existed yet) | **none ❌** |
| FY 2023-24 and earlier | none (§4AB did not exist) | none ✅ |

⚠️ **FY 2024-25 is understated for salaries above Rs 10 million.** This is a code defect, not a
documentation one — see [open-questions.md](open-questions.md#salary-fy-2024-25-surcharge).

## What comes out

`calculateTax(monthlySalary, fiscalYear, months = 12)` returns yearly income, yearly tax, monthly
tax (`yearlyTax / 12`), take-home on both cadences, and the effective rate `yearlyTax / totalIncome`.
`SingleYearCalculator` then layers the surcharge on top via `calculateBudgetYearTax` and passes
`{ baseTax, surcharge }` into the insights panels so the tax-band chart can show them separately.

The insights panel (`features/salary-tax/lib/insights.ts`) additionally derives:

- **Active band** — the slab the annual income lands in, with its marginal rate.
- **Per-band contribution** — the tax attributable to each band, computed as the difference between
  cumulative tax at that band's ceiling and at the previous one. Bands the income never reaches
  contribute zero rather than being hidden.
- **Four-year comparison** — the same salary priced against the selected year and its three
  neighbours, using `calculateBudgetYearTax` so the FY 2025-26 surcharge is included in that row.

## Official sources cited on the page

`SALARY_OFFICIAL_SOURCES` in `src/lib/officialSources.ts`, shared with the reverse-salary,
increment and job-offer pages:

| Card | Document |
|---|---|
| Finance Act 2026 | `download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf` |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 — §149 and the First Schedule |
| FBR IRIS Portal | `iris.fbr.gov.pk` |

The Ordinance card points at the **2024** consolidation while the rates above were verified against
the **2026** one. The 2026 consolidation is the better citation for every year on the page and is
already in `FBR_DOC_URLS.incomeTaxOrdinance2026`. Noted in
[open-questions.md](open-questions.md#salary-official-sources-cite-the-2024-ordinance).

## Deliberately not modelled

- **Pension.** The Finance Act 2026 added a proviso to Division I taxing pension received from a
  former employer at 0% up to Rs 10 million and 5% above (Ordinance PDF p. 528). No input exists,
  so a pensioner gets the ordinary salary answer.
- Allowances and exemptions (medical, house rent), §60/§60C deductible allowances, §61-§65 tax
  credits, provident-fund and gratuity treatment, and any employer-side deduction.
- Employees whose salary is 75% or less of taxable income — they are on the non-salaried table.
