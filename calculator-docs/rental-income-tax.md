# Rental income tax — `/rental-income-tax-calculator`

**Feature:** `src/features/rental-income-tax/`.
**Calculation:** `lib/calculation.ts` → `calcRentalTax`.
**Rates:** `lib/rates.ts` → `RENTAL_RATES`.

## The rule it implements

**Section 155** — the tenant (or the agent paying rent) deducts tax from the rent and pays it to the
FBR in the owner's name — at the rates in **First Schedule, Part III, Division V**.

This is a **withholding** figure, not a final tax. It counts towards the owner's yearly bill and is
reclaimed or topped up on the return.

## What the user enters

| Input | Notes |
|---|---|
| Annual rent (or monthly, converted ×12) | Gross rent, before any expense. |
| Owner type | `individual` (slab) or `company` (flat). |
| On the ATL | Drives the Tenth Schedule uplift. |
| Fiscal year | `2026-2027` back to `2021-2022`. |

## Rate table as shipped

### Individual and AOP — progressive slabs

| Gross annual rent | Tax |
|---|---|
| Up to Rs 300,000 | Nil |
| 300,001 – 600,000 | 5% of the excess over 300,000 |
| 600,001 – 2,000,000 | Rs 15,000 + 10% |
| Above 2,000,000 | Rs 155,000 + 25% |

✅ **Verified** word for word — Ordinance amended to 30 Jun 2026, PDF p. 568 (printed p. 549),
Division V(a). The same four bands appear on every FBR withholding rate card from tax year 2022 to
2026, and the Finance Act 2026 amends Divisions IC, III, IIIAA, IIIAB, IV and IVA of Part III but
leaves Division V alone — so 2026-27 reuses the table.

### Company — flat

**15%** of the gross rent for a filer.

✅ **Verified** — same page, Division V(b): *"The rate of tax to be deducted under section 155, in the
case of company shall be **15%** of the gross amount of rent."* (The words "for filers and 17.5% …
for non-filers" were omitted by the Finance Act 2019, so the split now comes from the Tenth
Schedule instead.)

### Non-filer

Rule 1 of the Tenth Schedule increases the rate by 100%. `doubleBrackets` doubles **both** the rate
and the running fixed amount, which keeps the schedule internally consistent: 10% up to Rs 600,000 is
Rs 30,000, and Rs 30,000 + 20% to Rs 2,000,000 is Rs 310,000. Company non-filer is 30%.

| Gross annual rent | Non-filer tax |
|---|---|
| Up to 300,000 | Nil |
| 300,001 – 600,000 | 10% |
| 600,001 – 2,000,000 | Rs 30,000 + 20% |
| Above 2,000,000 | Rs 310,000 + 50% |

### ⚠️ FY 2021-22 is shipped with **no** non-filer uplift

`NO_UPLIFT_YEAR` gives 2021-22 the filer rates for both statuses, on the stated basis that §155 was
excluded from the Tenth Schedule that year and that the Finance Act **2022** removed the exclusion.

The Ordinance says otherwise. Tenth Schedule rule 10 lists the sections the Schedule does not reach,
and the consolidated text (PDF p. 803, printed p. 784) carries this footnote:

> **5** Clauses (d), (f), (g), (h), (j), (m), (r) and (s) omitted **by the Finance Act, 2021**. The
> omitted clauses read as follows: **(d) tax deducted under section 155;** …

The Finance Act 2021 takes effect for tax year 2022 — which is FY 2021-22. On that reading the
doubling applied to rent from FY 2021-22 onwards and there is no un-uplifted year at all.

⚠️ **This is a probable code defect**, not a documentation one. Recorded in
[open-questions.md](open-questions.md#rental-fy-2021-22-non-filer-uplift).

## The algorithm

```
individual/AOP: tax = calcSlabTax(annualRent, filer ? filerSlabs : nonFilerSlabs)
company:        tax = annualRent × (filer ? 15 : 30) / 100
```

Both the filer and non-filer figures are always computed so the page can show what the ATL is worth.
The marginal bracket is returned for individuals so the result can read "Rs 15,000 + 10% of the rent
above Rs 600,000".

## Two thresholds that are not the same thing

- **Rs 300,000** — `RENTAL_TAX_FREE_LIMIT`. Rent below this is never taxed for an individual or AOP.
  It is the first row of the Division V table.
- **Rs 1,500,000** — `RENTAL_PAYER_THRESHOLD`. §155(3)(vib): an individual or AOP *tenant* only has
  to deduct once the rent they pay reaches this in a year. Companies, government bodies and the
  other listed payers deduct from the first rupee. This constant is used for on-page explanation
  only; it does not change the computed figure.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card | `…WHT-RateCard.pdf` | Correct — Division V, updated to 30 Jun 2025 so it covers FY 2025-26. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it leaves the rent rates unchanged, which the card says. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | §155 and §15A. Points at the 2024 consolidation. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

**Islamic-content note:** the §15A card description says "the costs a landlord can claim". §15A
itself uses the phrase *"profit paid on money borrowed"* — the statute's own halal-compatible
wording, and the reason the page never says "interest". Keep it that way.

## Deliberately not modelled

- **§15A deductions.** A landlord's actual taxable rental income is after repairs (the 20%
  allowance), premiums to cover the building, ground rent, collection charges and the rest. This page
  prices the **withholding on gross rent**, which is what a tenant deducts, not the owner's final
  liability.
- **The final return.** Rent is added to other income and taxed on the ordinary slab; the §155
  deduction is a credit against that. Nothing here computes the balance.
- **Rent for furniture, fittings and amenities**, which §155 also covers.
- **Sub-letting** and non-resident owners.
