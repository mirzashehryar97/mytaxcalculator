# Minimum tax on turnover — `/minimum-turnover-tax-calculator`

**Feature:** `src/features/corporate-tax/` (mode `minimum-tax`).
**Calculation:** `lib/calculation.ts` → `calcMinimumTurnoverTax`.
**Rates:** `lib/rates.ts` → `MINIMUM_TAX_RATES`, `MINIMUM_TAX_TURNOVER_FLOOR`.

## The rule it implements

**Section 113** read with **First Schedule, Part I, Division IX**. Where a person's normal tax for
the year is less than a set percentage of turnover — because of losses, brought-forward losses,
exemptions, credits or allowances — turnover is treated as the income and the percentage is charged
instead.

Two things about §113 are routinely got wrong, and the calculator gets both right:

1. **It substitutes, it does not add.** §113(2)(b): the person pays the minimum tax *"instead of the
   actual tax payable under this Ordinance"*. You never pay both. (Super tax under §4C is different —
   that one really is on top.)
2. **Who is inside it.** §113(1) covers a **resident company** and a **permanent establishment of a
   non-resident company** unconditionally, and an **individual or AOP only once turnover reaches
   Rs 100 million** in the tax year.

✅ **Verified** — Ordinance amended to 30 Jun 2026, PDF p. 234-235 (printed p. 215-216). The
Rs 100 million floor is footnoted as the Finance Act 2021's substitution of "ten" with "hundred"
million; the pre-2016 figure was fifty million.

## What the user enters

| Input | Notes |
|---|---|
| Yearly turnover | The base. |
| Normal tax | The tax the person would otherwise pay; used for the comparison. |
| Taxpayer type | `company` (always covered) or individual/AOP (covered from Rs 100m). |
| Sector | Picks the Division IX rate. |
| Fiscal year | `2026-2027` back to `2022-2023`. |

## Rate table as shipped

| Sector key | Rate | Who it is |
|---|---|---|
| `general` | **1.25%** | "In all other cases" |
| `gas-airline-poultry` | **0.75%** | SSGC and SNGPL where turnover exceeds Rs 1 billion; PIA; the poultry industry |
| `fuel-and-motorcycle` | **0.5%** | Oil refineries; motorcycle dealers registered under the Sales Tax Act 1990; oil marketing companies |
| `low-margin-trades` | **0.25%** | Petroleum agents and distributors registered under the STA 1990; rice mills and dealers; Tier-1 FMCG retailers integrated with the Board; e-commerce and online-marketplace turnover; sellers of used vehicles; flour mills |
| `specified-goods-distributor` | **0.5%** for 2026-27, **0.25%** for 2022-23 → 2025-26 | Distributors, dealers, sub-dealers and wholesalers of specified goods |

✅ **Division IX verified** — Ordinance PDF p. 548-550 (printed p. 529-531). The current table reads
0.75% / 0.5% / 0.25% / 1.25% across those four groups, matching the code exactly. Entry 3(a)
("distributors of pharmaceutical products, fast moving consumer goods and cigarettes") was
**omitted by the Finance Act 2026**.

✅ **`specified-goods-distributor` verified** — this rate is *not* in Division IX. It is
**clause (24D) of Part II of the Second Schedule**, Ordinance PDF p. 656 (printed p. 637):

> **(24D)** The rate of minimum tax under subsection (1) of section 113, shall be **0.5%** in the
> case of distributors, dealers, sub-dealers, wholesalers of goods specified in [the following
> Table] …

with footnote 5 recording that the Finance Act 2026 substituted it, and printing the previous
version — **0.25%** for "distributors, dealers, sub-dealers, wholesalers and retailers of fast
moving consumer goods, fertilizer, locally manufactured mobile phones, sugar, electronics excluding
imported mobile phones, cement, steel and edible oil", conditional on appearing on the Sales Tax
and Income Tax active taxpayer lists. That is exactly the 0.25% → 0.5% step the code encodes at
2026-27.

**Islamic-content note:** the FA2026 clause and the omitted Division IX row both name cigarettes.
Neither word appears in the shipped copy — the distributor tooltip lists the goods and ends "and
similar listed goods", which carries the same eligibility meaning. Do not re-add it.

## The algorithm

```
minimumTax        = turnover × rate / 100
isCovered         = taxpayerType === 'company' || turnover ≥ 100,000,000
minimumTaxApplies = isCovered && minimumTax > normalTax
taxPayable        = minimumTaxApplies ? minimumTax : normalTax
carryForward      = minimumTaxApplies ? minimumTax − normalTax : 0
```

`carryForward` is the excess that §113(2)(c) lets a person carry forward against normal tax in later
years. The calculator reports the amount; it does not model the carry-forward window or its use.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| Income Tax Ordinance 2001 (2026 consolidation) | `…IncomeTaxOrdinanace2001.pdf` | Correct — §113 and Division IX, and the right consolidation. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — the 0.25% → 0.5% distributor change. |
| Finance Act 2021 | `…FinanceAct2021.pdf` | Correct — it substituted the whole Division IX table and set the Rs 100 million floor. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

## Deliberately not modelled

- **Turnover as §113(3) defines it** — gross receipts from sales, services and other business
  activity, excluding certain items, and expressly including sale proceeds of immovable property
  taxed as business income. The user supplies a number.
- **The carry-forward mechanics** (§113(2)(c)): how many years, and the order of set-off.
- **Sector overlap.** A person who fits two rows picks one; the statute's own answer where entries
  overlap is not modelled.
- **§4C super tax**, and the Explanation to §113(1) that excludes §4B/§4C tax from "tax payable or
  paid" when testing whether the minimum bites.
