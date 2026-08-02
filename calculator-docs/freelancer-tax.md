# Freelancer / IT export tax — `/freelancer-tax-calculator`

**Feature:** `src/features/freelancer-tax/`.
**Calculation:** `lib/calculation.ts` → `calcFreelancerTax`.
**Rates:** `lib/rates.ts` → `FREELANCER_RATES`.

## The rule it implements

**Section 154A, Export of Services.** Every authorised dealer in foreign exchange deducts tax from
the proceeds at the time the foreign exchange is realised, at the rates in **Division IVA of Part
III of the First Schedule**. Under §154A(2) the deduction is a **final tax** once a return has been
filed and the other listed conditions are met — so this is not an advance payment against a slab
bill, it is the whole liability on that income.

It is a **flat percentage of gross receipts**, not of profit. Expenses, platform fees and currency
conversion costs do not reduce it.

## What the user enters

| Input | Notes |
|---|---|
| Monthly amount | Annualised by ×12. |
| Currency | `PKR` or `USD`. Anything else yields zero. |
| Exchange rate | Only used when currency is `USD`. |
| PSEB registered | Drives the concessional rate. |
| On the ATL | Drives the non-filer uplift. |
| Fiscal year | `2026-2027` back to `2021-2022`. |

## Rate table as shipped

| Year | PSEB + ATL | PSEB, not ATL | No PSEB, ATL | No PSEB, not ATL |
|---|---|---|---|---|
| 2026-27 | 0.25% | 0.5% | 1% | 2% |
| 2025-26 | 0.25% | 0.5% | 1% | 2% |
| 2024-25 | 0.25% | 0.25% | 1% | 1% |
| 2023-24 | 0.25% | 0.25% | 1% | 1% |
| 2022-23 | 0.25% | 0.25% | 1% | 1% |
| 2021-22 | 0.25% | 0.25% | 1% | 1% |

### Filer column — verified ✅

Division IVA as it now stands (Ordinance amended to 30 Jun 2026, PDF p. 566, printed p. 547):

| Receipt | Rate |
|---|---|
| Export proceeds of computer software / IT services / IT-enabled services **by persons registered with and duly certified by the Pakistan Software Export Board** | 0.25% of proceeds, **for tax years 2024 up to tax year 2029** |
| Any other case | 1% of proceeds |

The "2029" is the Finance Act 2026's substitution of "2026" — footnote 12 on that page. So the code
comment that FA2026 extended the PSEB rate through TY 2029 without touching the rate matrix is
correct.

Note the sunset: the 0.25% concession is written as running **to tax year 2029**. Nothing in the
code encodes that end date, because no offered year reaches it. It will matter for FY 2029-30.

### Non-filer column — ⚠️ not verified

The Tenth Schedule's **rule 10** lists the sections the non-filer regime does not reach.
§154A is **not** in that list, and never has been. On the face of the Ordinance, rule 1's
"increased by hundred percent" therefore applies to §154A in **every** year this calculator offers —
which would make the 2021-22 → 2024-25 non-filer rates 0.5% and 2%, not 0.25% and 1%.

The shipped table only doubles from 2025-26. That may reflect what the FBR withholding rate cards
for the earlier years actually printed, but it could not be confirmed in this pass.

⚠️ Recorded in [open-questions.md](open-questions.md#freelancer-non-filer-rates-before-fy-2025-26).

## The algorithm

```
grossPkr = monthlyAmount × 12 × (currency === 'USD' ? exchangeRate : 1)
rate     = psebRegistered ? (atl ? psebAtl : psebNonAtl)
                          : (atl ? standardAtl : standardNonAtl)
tax      = grossPkr × rate / 100
net      = grossPkr − tax
```

It also computes `concessionTax` (always at the PSEB+ATL rate) and `standardTax` (always at the
plain ATL rate) so the page can show what PSEB registration is worth. `taxSavings` is only non-zero
when the user is actually eligible — PSEB **and** ATL; `potentialTaxSavings` shows the same figure
to someone who is not, as an incentive.

Negative, non-finite and zero inputs all collapse to zero rather than producing `NaN`.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card | `download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf` | Correct — updated to 30 Jun 2025, so it covers FY 2025-26. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it is the Act that extended 0.25% to TY 2029. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | Points at the 2024 consolidation; the 2026 one is the better citation and is already available as `FBR_DOC_URLS.incomeTaxOrdinance2026`. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

No source on this page covers FY 2021-22 → FY 2024-25 specifically. The rate did not move across
those years, so the current card is not misleading, but a reader checking 2022-23 has nothing to
open.

## Deliberately not modelled

- **The 75%-of-turnover super-tax exemption** and any other interaction with §4C — a freelancer at
  this scale is nowhere near Rs 150 million.
- **Mixed income.** Someone with both export receipts and local income has only the export half
  priced here; the local half belongs in the business calculator.
- **The banking-channel condition.** §154A only bites on proceeds realised through an authorised
  dealer; the calculator assumes that is how the money arrived and says so in its eligibility list
  rather than gating the result.
- **Provincial sales tax on services**, which several provinces charge on IT services and which is
  not income tax at all.
