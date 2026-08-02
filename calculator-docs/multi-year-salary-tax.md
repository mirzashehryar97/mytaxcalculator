# Multi-year salary tax — `/` (Multiple years tab)

**Feature:** `src/features/multi-year-tax/`.
**Calculation:** `lib/calculation.ts` → `calcMultiYearTax`.
**Rates:** none of its own — it calls `calculateTaxForTotalAmount` from `utils/taxCalculator.ts`, so
every slab table and every verification note in [salary-tax.md](salary-tax.md) applies unchanged.

## What it is for

Someone who changed job, got a raise part-way through a year, or worked a fixed contract cannot use
the single-year calculator: their pay was not a constant monthly figure for a clean 1 July –
30 June year. This tab takes any number of **periods** — a start date, an end date, and the monthly
salary that applied across them — and produces one answer per fiscal year.

There is no fiscal-year dropdown, and that is deliberate: the dates decide the years.

## What the user enters

Per period: `start` date, `end` date, `salary` (monthly, PKR). Dates are typed day-first through
`components/calculator/DateInput.tsx`. A period is silently skipped if either date is unparseable,
the salary is not a positive number, or the start is after the end.

## The algorithm

1. **Cut each period at every 30 June it crosses** (`splitPeriodByFiscalYear`). Pakistan's tax year
   runs 1 July – 30 June and each side is assessed separately, so a period spanning the boundary
   becomes two slices.
2. **Pro-rate partial months by the day** (`calculateActualSalary`). A month is paid in full only if
   the slice covers it end to end; otherwise it is `monthlySalary × daysCovered / daysInMonth`,
   using the real length of that calendar month. A slice that starts and ends inside one month is
   `monthlySalary × (endDay − startDay + 1) / daysInMonth`.
3. **Merge slices by fiscal year across all periods** — two jobs in the same year are added
   together before tax, which is the point of the tool.
4. **Tax each year's combined gross** against that year's own slab table, at full annual rates.
5. Totals are the sum of the per-year figures; the overall effective rate is
   `totalTax / totalGross`.

`getMonthsInRange` reports the months figure shown next to each year, counting partial months as a
fraction of their days.

## Worth knowing about step 4

The year's gross is taxed as though it were a full year's income. Someone who worked four months and
earned Rs 800,000 is taxed on Rs 800,000 — they are **not** annualised to Rs 2,400,000 and they are
**not** given four-twelfths of a year's allowance. That is the correct reading of the Ordinance
(tax is charged on the taxable income *of the tax year*, whatever part of the year produced it), and
it is why this calculator gives a lower answer than annualising would.

## Surcharge

**Not applied.** `calcMultiYearTax` calls `calculateTaxForTotalAmount` directly and never routes
through `calculateBudgetYearTax`, so the §4AB surcharge is absent even in FY 2025-26 where the
single-year tab does apply it. A person earning over Rs 10 million in FY 2025-26 gets a different
answer on the two tabs of the same page.

⚠️ Recorded in [open-questions.md](open-questions.md#multi-year-tab-omits-the-4ab-surcharge).

## Official sources

The page shares the home route, so it sits under the same `SALARY_OFFICIAL_SOURCES` grid as the
single-year tab. No source is specific to this tab — every rate it uses is a salary slab already
cited there.

## Deliberately not modelled

Everything the single-year tab leaves out (allowances, credits, pension, provident fund), plus:

- **Overlapping periods are added, not deduplicated.** Two periods covering the same dates produce
  double the gross. That is intentional — someone with two concurrent salaries wants them summed —
  but it means a mis-entered duplicate silently inflates the answer.
- **Employer-side timing.** The tool prices the year, not the month-by-month deduction the employer
  actually made, so it will not reconcile to a payslip.
