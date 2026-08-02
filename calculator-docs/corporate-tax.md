# Company income tax — `/corporate-tax-calculator`

**Feature:** `src/features/corporate-tax/` (mode `company-tax`).
**Calculation:** `lib/calculation.ts` → `calcCompanyTax`.
**Rates:** `lib/rates.ts` → `COMPANY_TAX_RATES`.

Two sibling calculators share this feature: [minimum-turnover-tax.md](minimum-turnover-tax.md) and
[super-tax.md](super-tax.md).

## The rule it implements

**First Schedule, Part I, Division II** — one flat rate per class of company on the whole taxable
profit. There are no bands to step through; a company does not get a tax-free slice.

## What the user enters

| Input | Notes |
|---|---|
| Taxable profit | Taken as given. |
| Company type | `standard` / `small` / `banking`. |
| Tax already paid | Advance tax and withholding, credited against the bill. |
| Fiscal year | `2026-2027` back to `2022-2023`. |

## Rate table as shipped

| Year (tax year) | Standard | Small | Banking |
|---|---|---|---|
| 2026-27 (TY 2027) | 29% | 20% | **42%** |
| 2025-26 (TY 2026) | 29% | 20% | **43%** |
| 2024-25 (TY 2025) | 29% | 20% | **44%** |
| 2023-24 (TY 2024) | 29% | 20% | 39% |
| 2022-23 (TY 2023) | 29% | 20% | 39% |

✅ **Verified** — Ordinance amended to 30 Jun 2026, PDF p. 530 (printed p. 511). Division II now
reads:

| Type of Company | Rate of Tax |
|---|---|
| Banking Company | Tax Year 2025 → **44%**; Tax Year 2026 → **43%**; Tax Year 2027 and onwards → **42%** |
| Small Company | 20% |
| Any other company | 29% |

and footnote 1 on the same page records that this table was **substituted by the Income Tax
(Amendment) Act, 2025 (Act No. XIII of 2025)**, replacing:

> Small company 20% / Banking company **39%** / Any other company 29%

which is the table the calculator uses for TY 2023 and TY 2024. Both halves of the shipped table
therefore come out of one page of one primary document, and the tax-year mapping in the statute is
explicit rather than inferred.

The Finance Act 2026 did not touch Division II — consistent with the page copy.

## The algorithm

```
tax           = taxableProfit × rate / 100
remainingTax  = max(0, tax − taxAlreadyPaid)
profitAfterTax = max(0, taxableProfit − tax)
```

Flat multiply, nothing else. Negative and non-finite inputs collapse to zero.

## "Banking company" is deliberate

The site's content policy removes un-Islamic financial references, but **banking company** stays: it
is a First Schedule taxpayer class that Islamic banks fall under too. Removing it would delete a
real rate group rather than a haram reference. Do not "fix" it.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| Income Tax Ordinance 2001 (2026 consolidation) | `…2026724177725705IncomeTaxOrdinanace2001.pdf` | Correct, and the right consolidation — Division II plus the footnote history. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it left the rates unchanged, which the card says. |
| Income Tax (Amendment) Act 2025 (Act XIII of 2025) | `na.gov.pk/uploads/documents/684fdf39d1571_301.pdf` | Correct, and correctly attributed to the **National Assembly**, not the FBR — it is not an FBR publication. Its own text layer is bad OCR; the page images are clean. |
| Finance Act 2022 | `…FinanceAct2022.pdf` | Correct — the source of the 39% banking rate used for 2022-23 and 2023-24. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

This is the best-sourced grid on the site: every year the calculator computes has an Act behind it.

## Deliberately not modelled

- **What makes a company "small"** (§2(59A): incorporated on or after 1 July 2005, paid-up capital
  plus undistributed reserves ≤ Rs 50 million, ≤ 250 employees, turnover ≤ Rs 250 million, not
  formed by splitting an existing company, not an SME). The user asserts it; the FAQ explains it.
- **The Seventh Schedule** rules that actually compute a bank's taxable income, including rule
  6C(6A) — the advances-to-deposit charge retired from tax year 2025 by Act XIII of 2025.
- **§113 minimum tax** and **§4C super tax**, which have their own pages and can override or add to
  this figure.
- Group taxation, §59AA/§59B, and the Fourth/Fifth Schedule regimes (insurance-type business,
  petroleum exploration).
