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

1. In a year that has a §4AB surcharge, check the threshold first: if a gross of exactly
   Rs 10 million already leaves enough take-home, search only the span **below** the threshold.
   Otherwise double `high` from the target until `high − tax(high) ≥ target` (capped at `1e15`).
2. Bisect 100 times, keeping `high` as the smallest gross whose after-tax income still clears the
   target. The lower bound is the target itself — gross is never below the net it leaves.
3. Round to the rupee, then re-run the **forward** calculation on that rounded gross so the tax,
   net and effective rate shown are the real figures for the answer, not the search's intermediates.

100 iterations is far past floating-point resolution for any realistic salary.

The reason it inverts the shipped function rather than the statute is that it can never disagree
with the forward calculator — a mismatch between "gross → net" and "net → gross" on the same site
would be the worst possible bug here.

## Why step 1 splits at the threshold

Take-home rises continuously with gross **except** at the §4AB threshold, where the entire surcharge
lands at once and take-home *drops*. In FY 2025-26 a gross of Rs 10,000,000 leaves Rs 7,319,000; one
rupee more leaves Rs 7,077,710. Nobody can take home anything in between, and a raise across that
line can leave someone worse off.

That breaks the assumption a plain bisection needs. Take-home crosses the target **twice**, so an
unsplit search can converge on either crossing depending on where the midpoints happen to fall — and
the far one quotes a gross hundreds of thousands of rupees higher than the job actually needs.
Trying the span below the threshold first makes the answer the smallest gross that works, always.

## Surcharge

**Applied**, through the shared `salaryTaxForYear` — see
[salary-tax.md](salary-tax.md#surcharge--4ab) for the statute and the per-year rates. The inversion
and the forward calculation use the same function, so they cannot disagree.

## Official sources cited on the page

`SALARY_OFFICIAL_SOURCES` — Finance Act 2026, Income Tax Ordinance 2001, FBR IRIS. Identical to the
salary calculator, which is correct: the page uses no rate the salary calculator does not.

## Deliberately not modelled

- Everything the salary calculator leaves out — this is the same engine.
- **Employer cost.** The answer is gross salary, not cost-to-company: no EOBI, no employer provident
  fund contribution, no benefits loading.
- Deductions the employer makes after tax (advances, society dues). Those belong to the increment
  and job-offer calculators, which do have an input for them.
