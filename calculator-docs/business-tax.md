# Business, self-employed & AOP tax — `/business-tax-calculator`

**Feature:** `src/features/business-tax/`.
**Calculation:** `lib/calculation.ts` → `calcBusinessTax`, `deriveNetIncome`.
**Rates:** `lib/rates.ts` → `BUSINESS_SLABS`, `BUSINESS_SURCHARGE`, `PROFESSIONAL_AOP_MAX_RATE`.

## The rule it implements

**First Schedule, Part I, Division I, clause (1)** — "the rates of tax imposed on income of every
individual and association of persons **except a salaried individual**". Business income itself is
charged under §18. Progressive slabs through the shared engine.

Plus **§4AB**, the 10% surcharge on the tax where taxable income exceeds Rs 10 million.

## What the user enters

| Input | Notes |
|---|---|
| Net taxable income | Or revenue and expenses, which `deriveNetIncome` turns into `max(0, revenue − expenses)`. |
| Taxpayer type | `individual` / `aop` (same table) or `professional-aop` (40% cap). |
| Tax already paid | Advance tax and withholding, credited against the bill. |
| Fiscal year | `2026-2027` back to `2021-2022`. |

## Rate tables as shipped

### FY 2024-25, 2025-26 and 2026-27 — one table

| Taxable income | Tax |
|---|---|
| Up to 600,000 | 0% |
| 600,001 – 1,200,000 | 15% of the excess over 600,000 |
| 1,200,001 – 1,600,000 | Rs 90,000 + 20% |
| 1,600,001 – 3,200,000 | Rs 170,000 + 30% |
| 3,200,001 – 5,600,000 | Rs 650,000 + 40% |
| Above 5,600,000 | Rs 1,610,000 + 45% |

✅ **Verified** word for word — Ordinance amended to 30 Jun 2026, PDF p. 525 (printed p. 506). The
table was substituted by the Finance Act 2024 and neither the Finance Act 2025 nor 2026 touched it,
which is what licenses using one table for three years.

**Professional-firm AOP cap**, immediately below that table:

> Provided that in the case of an association of persons that is a professional firm prohibited from
> incorporating by any law or the rules of the body regulating their profession, the **45% rate of
> tax mentioned against serial number 6 of the Table shall be 40%**.

✅ Verified — Ordinance PDF p. 526. `capBracketsAt(brackets, 40)` implements exactly this: only the
top band exceeds 40%, so capping every band's rate at 40 changes that one row and leaves every
`fixed` amount still correct (each fixed amount is the running total of the bands below it, all of
which are already at or under 40%).

### FY 2023-24

0% / 7.5% / Rs 15,000 + 15% / Rs 75,000 + 20% / Rs 315,000 + 25% / Rs 465,000 + 30% /
Rs 765,000 + 35% above 4,000,000.

✅ Verified — Ordinance PDF p. 525, footnote 1 (substituted by the Finance Act 2024).

### FY 2021-22 and FY 2022-23 — one table

0% / 5% / Rs 10,000 + 12.5% / Rs 60,000 + 17.5% / Rs 270,000 + 22.5% / Rs 405,000 + 27.5% /
Rs 680,000 + 32.5% / Rs 1,330,000 + 35% above 6,000,000.

✅ Verified — Ordinance PDF p. 524, footnote 1 (substituted by the Finance Act 2023). The table is
headed as the one FA2023 replaced, so it governed the two years before it.

## Surcharge — §4AB

10% of the computed slab tax, applied when net income **exceeds** Rs 10,000,000. Shipped for
2024-25, 2025-26 and 2026-27; absent for 2023-24 and earlier.

✅ **Verified** — Ordinance PDF p. 54 (printed p. 34):

> **4AB.** … a surcharge shall be payable by every individual and association of persons at the rate
> of **ten percent of the income tax imposed under Division I of Part I of the First Schedule** where
> the taxable income **exceeds rupees ten million** …

with footnote 4 recording that §4AB was **inserted by the Finance Act 2024** — i.e. from tax year
2025 = FY 2024-25, exactly where the code turns it on. The salaried proviso (9%, then nil) does not
reach this calculator, because a business taxpayer is by definition not "deriving income chargeable
under the head Salary" for this purpose.

Note the surcharge is charged on the **tax**, not the income, and it is a cliff: at
Rs 10,000,000.01 of income the whole slab tax gains 10%.

## The algorithm

```
netIncome  = max(0, revenue − expenses)              (or entered directly)
brackets   = professional-aop ? cappedAt40 : standard
baseTax    = calcSlabTax(netIncome, brackets)
surcharge  = (year has a regime && netIncome > 10,000,000) ? baseTax × 0.10 : 0
totalTax   = baseTax + surcharge
remaining  = max(0, totalTax − advanceTaxPaid)
```

It also returns the marginal bracket (`rate`, `fixed`, `marginalBandStart = min − 1`) so the result
panel can show "Rs 650,000 + 40% of the amount above Rs 3,200,000" rather than only a number.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — the year's Act, which left the slabs alone. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | §18 and the First Schedule. Points at the 2024 consolidation; the 2026 one carries every table on this page including the surcharge footnote. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

The card set does **not** cite the Finance Act 2024, which is where both the current slab table and
§4AB came from. Adding it would make the 2024-25 and later rows checkable at source.

⚠️ Recorded in [open-questions.md](open-questions.md#business-tax-sources-omit-the-finance-act-2024).

### A note on the code comment

`lib/rates.ts` says the tables were "verified against the sector spec, PwC, ICMA rate cards and firm
tax handbooks", and that 2026-27 was "verified against PwC and taxcalc.pk". Every figure has now been
confirmed against the Ordinance itself, so those third-party cross-checks are no longer load-bearing.
The site's own policy is that only official sources may be cited on a page, and none of those
aggregators appear in the grid — the comment is a development note, not a published claim.

## Deliberately not modelled

- **§113 minimum turnover tax**, which overrides this answer for a business with turnover of
  Rs 100 million or more and a low profit. That has its own page —
  [minimum-turnover-tax.md](minimum-turnover-tax.md) — but the two do not talk to each other.
- **§4C super tax**, which is genuinely additional above Rs 150/500 million. See
  [super-tax.md](super-tax.md).
- Which expenses are actually allowable (§20-§31), depreciation, and loss carry-forward. The
  calculator takes the profit figure as given.
- Members' own taxation of an AOP share, and the §92 interaction.
