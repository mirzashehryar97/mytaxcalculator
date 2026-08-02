# Reverse salary calculator — `/reverse-salary-calculator`

**Feature:** `src/features/reverse-salary/`.
**Calculation:** `lib/calculation.ts` → `calcReverseSalary`, `grossForNetAnnual`.
**Rates:** none of its own — it inverts `calculateTaxForTotalAmount` from `utils/taxCalculator.ts`,
so [salary-tax.md](salary-tax.md) is the rate authority for this page too.

## What it answers

"I want Rs X in hand every month — what gross salary do I need to ask for?" It is the salary
calculator run backwards.

## What the user enters

| Input | Notes |
|---|---|
| Desired monthly take-home | Multiplied by 12 to get the annual net target. |
| Fiscal year | Same list as the salary calculator, via `salaryTaxYears`. |

## The algorithm

There is no closed-form inverse worth writing, because the slab table changes shape every year and a
hand-derived inverse would drift from the forward table the moment a rate moved. Instead
`grossForNetAnnual` does a **binary search over gross**:

1. Start with `low = high = targetAnnualNet`, then double `high` until
   `high − tax(high) ≥ target` (capped at `1e15`).
2. Bisect 100 times, keeping `high` as the smallest gross whose after-tax income still clears the
   target.
3. Round to the rupee, then re-run the **forward** calculation on that rounded gross so the tax,
   net and effective rate shown are the real figures for the answer, not the search's intermediates.

Take-home is continuous and strictly increasing in gross under every year's table, so the search
converges; 100 iterations is far past floating-point resolution for any realistic salary.

The reason it inverts the shipped function rather than the statute is that it can never disagree
with the forward calculator — a mismatch between "gross → net" and "net → gross" on the same site
would be the worst possible bug here.

## Surcharge

**Not applied.** Like the multi-year tab, this page calls `calculateTaxForTotalAmount` directly. For
FY 2025-26 targets that imply a gross above Rs 10 million, the required gross comes out **too low**
because the 9% §4AB surcharge is not part of the inversion.

⚠️ Recorded in [open-questions.md](open-questions.md#reverse-salary-omits-the-4ab-surcharge).

## Official sources cited on the page

`SALARY_OFFICIAL_SOURCES` — Finance Act 2026, Income Tax Ordinance 2001, FBR IRIS. Identical to the
salary calculator, which is correct: the page uses no rate the salary calculator does not.

## Deliberately not modelled

- Everything the salary calculator leaves out — this is the same engine.
- **Employer cost.** The answer is gross salary, not cost-to-company: no EOBI, no employer provident
  fund contribution, no benefits loading.
- Deductions the employer makes after tax (advances, society dues). Those belong to the increment
  and job-offer calculators, which do have an input for them.
