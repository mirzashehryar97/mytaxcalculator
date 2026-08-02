# Electricity bill tax — `/electricity-bill-tax-calculator`

**Feature:** `src/features/withholding-tax/` (mode `electricity`).
**Calculation:** `lib/calculation.ts` → `calcElectricityTax`, `findElectricityBand`.
**Rates:** `lib/rates.ts` → `ELECTRICITY_RATES`.

## The rule it implements

**Section 235**, at the rates in **First Schedule, Part IV, Division IV**. The electricity company
collects the tax with the bill.

Two completely different rules sit inside one section:

- A **shop, office or factory** meter is charged from a band table, and pays the same whether or not
  the owner is on the ATL.
- A **home** meter is charged only where the owner is a **non-filer**, and only from a threshold
  bill upwards.

## Why filer status barely matters here

Tenth Schedule **rule 10(i)** keeps *"tax deducted under section 235"* out of the non-filer regime
entirely. ✅ Verified — Ordinance amended to 30 Jun 2026, PDF p. 802 (printed p. 783). So the business
side is `sameForEveryone: true` and there is nothing to double. The domestic charge is not an uplift
of a filer rate — it is written into Division IV as applying only to a person not on the ATL.

## What the user enters

| Input | Notes |
|---|---|
| Bill amount | Gross amount of the bill. |
| Connection | `commercial` / `industrial` / `domestic`. |
| On the ATL | Only changes the answer on a domestic meter. |
| Fiscal year | `2026-2027` back to `2023-2024`. |

## Rate table as shipped — one table for every year

### Commercial and industrial

| Gross amount of bill | Commercial | Industrial |
|---|---|---|
| Up to Rs 500 | Rs 0 | Rs 0 |
| Rs 501 – Rs 20,000 | 10% of the amount | 10% of the amount |
| Above Rs 20,000 | Rs 1,950 + **12%** of the amount exceeding Rs 20,000 | Rs 1,950 + **5%** of the amount exceeding Rs 20,000 |

### Domestic

- **0%** where the monthly bill is **less than Rs 25,000**
- **7.5%** where it is **Rs 25,000 or more** — and only for a person not on the ATL

✅ **Both verified** word for word — Ordinance amended to 30 Jun 2026, PDF p. 574 (printed p. 555),
Division IV clauses (1) and (2). Both FBR rate cards carry an identical table and no Finance Act from
2023 to 2026 amends Division IV, which is what licenses one table across all four years.

Note the band structure: the first two rows are shared between commercial and industrial and only the
top row differs — which is exactly how `ELECTRICITY_SHARED_BANDS` is composed.

## The algorithm

```
business:  tax = band.fixed + max(0, bill − band.rateAppliesAbove) × band.rate / 100
domestic:  tax = bill < 25,000 ? 0 : (filer ? 0 : bill × 7.5 / 100)
```

`rateAppliesAbove` is what makes the top row a *marginal* charge (Rs 1,950 plus a percentage of the
excess) rather than a flat percentage of the whole bill — the middle row has `rateAppliesAbove: 0`,
so its 10% does apply to the whole amount. Getting these two the same way round would misprice every
bill above Rs 20,000.

The domestic 7.5% applies to the **whole** bill once the threshold is met, not just the excess —
which is what "7.5% if the amount of monthly bill is Rs 25,000 or more" says.

`totalPayable` is `bill + tax`, because this tax is added to the bill rather than taken out of it.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card (2026) | `…WHT-RateCard.pdf` | Correct — the 2025-26 card. |
| FBR Withholding Rates Card (2024) | `…WithholdingRatesCards.pdf` | Correct — covers 2023-24. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | §235 and Division IV. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — nothing changed. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

## Deliberately not modelled

- **§235(4)** — for a commercial consumer, the tax up to a bill of Rs 360,000 a year is minimum tax
  on income from business; above that it is adjustable. For an industrial consumer it is adjustable
  throughout. The page reports the collection, not its character.
- **The §99A / §235(1A) retailer regime** (the Rs 3,000 / 5,000 / 10,000 fixed table), which was
  omitted by the Tax Laws (Amendment) Act 2023.
- **Agricultural, bulk-supply and street-light connections**, and prepaid meters.
- **Sales tax, FED, TV licence fee, fuel adjustment and the rest of a real bill** — none of which is
  income tax.
