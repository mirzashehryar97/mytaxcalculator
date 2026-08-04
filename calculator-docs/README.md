# Calculator reference docs

One document per shipped calculator on [mytaxcalculator.pk](https://www.mytaxcalculator.pk),
describing **what the code actually computes** and citing the primary source each figure was
checked against.

These files are tracked in git. They replace the untracked, per-session notes in `docs/tax-sectors/`
(`docs/` is gitignored, so nothing in it survives a fresh clone). Where the two disagree, the
document here is the one that was written against the shipped code and re-verified; the older notes
are not authoritative.

Written and verified: **2 August 2026.**

## Rule of the folder

> A page in this folder describes the calculator **as built**. If the code changes, the page changes
> in the same commit. If a figure here cannot be traced to a primary source, the page says so out
> loud rather than presenting it as settled.

## Index

### Salary

| Doc | Route | Feature |
|---|---|---|
| [salary-tax.md](salary-tax.md) | `/` (Single year tab) | `utils/taxCalculator.ts`, `features/salary-tax` |
| [multi-year-salary-tax.md](multi-year-salary-tax.md) | `/` (Multiple years tab) | `features/multi-year-tax` |
| [reverse-salary.md](reverse-salary.md) | `/reverse-salary-calculator` | `features/reverse-salary` |
| [salary-increment-and-job-offer.md](salary-increment-and-job-offer.md) | `/salary-increment-calculator`, `/job-offer-comparison-calculator` | `features/salary-increment` |
| [embed-salary-tax.md](embed-salary-tax.md) | `/embed/salary-tax` | `features/embed-salary-tax` |

### Business and corporate

| Doc | Route | Feature |
|---|---|---|
| [freelancer-tax.md](freelancer-tax.md) | `/freelancer-tax-calculator` | `features/freelancer-tax` |
| [business-tax.md](business-tax.md) | `/business-tax-calculator` | `features/business-tax` |
| [corporate-tax.md](corporate-tax.md) | `/corporate-tax-calculator` | `features/corporate-tax` |
| [minimum-turnover-tax.md](minimum-turnover-tax.md) | `/minimum-turnover-tax-calculator` | `features/corporate-tax` |
| [super-tax.md](super-tax.md) | `/super-tax-calculator` | `features/corporate-tax` |

### Property and rent

| Doc | Route | Feature |
|---|---|---|
| [property-transfer-tax.md](property-transfer-tax.md) | `/property-purchase-tax-calculator`, `/property-sale-tax-calculator` | `features/property-tax` |
| [property-capital-gains-tax.md](property-capital-gains-tax.md) | `/property-capital-gains-tax-calculator` | `features/property-tax` |
| [rental-income-tax.md](rental-income-tax.md) | `/rental-income-tax-calculator` | `features/rental-income-tax` |

### Investments

| Doc | Route | Feature |
|---|---|---|
| [capital-gains-securities.md](capital-gains-securities.md) | `/capital-gains-tax-calculator` | `features/capital-gains-tax` |
| [mutual-fund-tax.md](mutual-fund-tax.md) | `/mutual-fund-tax-calculator` | `features/capital-gains-tax` |

### Vehicles

| Doc | Route | Feature |
|---|---|---|
| [vehicle-registration-tax.md](vehicle-registration-tax.md) | `/vehicle-tax-calculator` | `features/vehicle-tax` |
| [vehicle-token-tax.md](vehicle-token-tax.md) | `/vehicle-token-tax-calculator` | `features/vehicle-tax` |

### Everyday withholding

| Doc | Route | Feature |
|---|---|---|
| [cash-withdrawal-tax.md](cash-withdrawal-tax.md) | `/cash-withdrawal-tax-calculator` | `features/withholding-tax` |
| [electricity-bill-tax.md](electricity-bill-tax.md) | `/electricity-bill-tax-calculator` | `features/withholding-tax` |
| [mobile-internet-tax.md](mobile-internet-tax.md) | `/mobile-internet-tax-calculator` | `features/withholding-tax` |

### Provincial

| Doc | Route | Feature |
|---|---|---|
| [agricultural-income-tax.md](agricultural-income-tax.md) | `/agricultural-income-tax-calculator` | `features/agricultural-tax` |

### Cross-cutting

- [conventions.md](conventions.md) — tax-year naming, the shared slab engine, filer status, rounding,
  and how a figure gets verified.
- [open-questions.md](open-questions.md) — every place the shipped code and the primary source do
  not line up, or where a figure could not be traced. **Read this before trusting a rate.**

### Researched, not built yet

| Doc | Proposed route | Status |
|---|---|---|
| [pta-mobile-registration-tax.md](pta-mobile-registration-tax.md) | `/pta-tax-calculator` | Rates and per-model customs values verified against primary sources 4 August 2026 (two passes). No feature folder, no route, no `routeMeta` entry yet. Read §5, §7 and §9 before building — official per-model values exist but stop at the Galaxy S23 / iPhone 16, and the CNIC fine has no published schedule. |

## Not built, on purpose

`/commodity-trading-tax-calculator` (PMEX futures, §37A(3), 5%) was removed and must not be
re-added — see the content policy in `CLAUDE.md`. Division VII S.No 8 of the First Schedule is the
row it would have used; the calculators deliberately skip it.

Dividends and §151 profit-on-debt withholding have no calculator either. Nothing in this folder
covers them.
