# Salary increment & job offer comparison — `/salary-increment-calculator`, `/job-offer-comparison-calculator`

**Feature:** `src/features/salary-increment/` — two views, `SalaryIncrementView.tsx` and
`JobOfferComparisonView.tsx`, over one calculation module.
**Calculation:** `lib/calculation.ts` → `computeSalaryScenario`, `compareSalaryScenarios`,
`applyIncrement`.
**Rates:** none of its own — `calculateTaxForTotalAmount` from `utils/taxCalculator.ts`. See
[salary-tax.md](salary-tax.md).

## What they answer

Both pages price **two salary scenarios side by side in the same fiscal year** and report what
actually lands in the pocket. They differ only in how the second scenario is described:

- **Increment** — "current salary" plus a percentage raise. `applyIncrement(base, percent)` gives
  `base × (1 + percent/100)`.
- **Job offer** — two independently entered offers.

The `mode` (`'increment' | 'job-offer'`) is carried through `compareSalaryScenarios` and only
changes copy.

## What the user enters, per scenario

| Input | How it is treated |
|---|---|
| Base monthly salary | Taxable. |
| Monthly bonus | **Taxable** — added to base before tax. |
| Monthly deduction | **Post-tax** — subtracted from take-home, does *not* reduce taxable income. |

Plus one fiscal year for both scenarios, and (increment only) the increment percentage.

The bonus/deduction split is the substantive modelling decision on these pages. A bonus is salary
under §12 of the Ordinance and is taxed; a deduction of the kind a payroll actually makes — a salary
advance being recovered, welfare-fund contributions, society dues — comes out of net pay and has no
effect on the tax. Getting this backwards would make every "is this raise worth it" answer wrong.

## The algorithm

Per scenario (`computeSalaryScenario`):

```
grossMonthly  = base + bonus
annualGross   = grossMonthly × 12
annualTax     = calculateTaxForTotalAmount(annualGross, fiscalYear)
monthlyTax    = annualTax / 12
netMonthly    = grossMonthly − monthlyTax − deduction
annualNet     = netMonthly × 12
effectiveRate = annualTax / annualGross
```

Then `compareSalaryScenarios` reports the deltas: gross increase, take-home increase (monthly and
annual), and extra tax (monthly and annual).

The take-home delta is the number the page exists for. Because the slabs are progressive, a raise
that pushes across a band boundary converts a larger share of itself into tax, and the gap between
`grossIncreaseMonthly` and `takeHomeIncreaseMonthly` is exactly that effect.

## Surcharge

**Not applied** — this module calls `calculateTaxForTotalAmount` directly. For FY 2025-26 scenarios
above Rs 10 million a year, both sides of the comparison are understated. Because the error applies
to *both* scenarios it partly cancels in the delta, but not cleanly: if one scenario crosses
Rs 10 million and the other does not, the comparison is wrong in the direction that matters most.

⚠️ Recorded in [open-questions.md](open-questions.md#increment-and-job-offer-omit-the-4ab-surcharge).

## Official sources cited on the pages

`SALARY_OFFICIAL_SOURCES` — Finance Act 2026, Income Tax Ordinance 2001, FBR IRIS. Correct: no rate
is used that the salary calculator does not also use.

## Deliberately not modelled

- **Non-cash and one-off components.** Annual bonus paid as a lump sum is modelled only if the user
  divides it by 12 themselves; equity, gratuity, car and fuel allowances, and notice-period buyouts
  have no input.
- **Different fiscal years for the two scenarios.** One dropdown governs both, so an offer starting
  next tax year is priced under this year's slabs.
- Everything the salary calculator leaves out (allowances, credits, pension).
