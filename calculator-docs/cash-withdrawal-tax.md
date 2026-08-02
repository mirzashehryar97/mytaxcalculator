# Cash withdrawal tax — `/cash-withdrawal-tax-calculator`

**Feature:** `src/features/withholding-tax/` (mode `cash-withdrawal`).
**Calculation:** `lib/calculation.ts` → `calcCashWithdrawalTax`.
**Rates:** `lib/rates.ts` → `CASH_WITHDRAWAL_RATES`.

## The rule it implements

**Section 231AB.** Every banking company deducts advance adjustable tax from a person **not
appearing on the Active Taxpayer List**, on the day's cash withdrawals once they pass Rs 50,000.

✅ **Verified** word for word — Ordinance amended to 30 Jun 2026, PDF pp. 491-492 (printed
pp. 472-473):

> **231AB.** Advance tax on cash withdrawal. — (1) Every banking company shall deduct advance
> adjustable tax at the rate of **0.8%** of the cash withdrawal from a person whose name is not
> appearing in the active taxpayers' list on the **sum total of the payments for cash withdrawal in
> a day, exceeding fifty thousand rupees.**
>
> **Explanation.** – For removal of doubt, it is clarified that the said fifty thousand rupees shall
> be **aggregate cash withdrawals in a single day.**

with footnote 7 (*inserted by the Finance Act, 2023*) and footnote 8 (*the expression "0.6%"
substituted by the Finance Act 2025*).

## Three things this gets right that summaries usually get wrong

1. **It is the day's total, not a single withdrawal.** The Explanation says so in as many words —
   three withdrawals of Rs 20,000 from the same day are inside the section.
2. **The rate applies to the whole day's cash**, not the part above Rs 50,000. The section puts the
   rate on "the cash withdrawal", and FBR Circular No. 1 of 2025-26 para 3 says the same. So
   Rs 60,000 withdrawn costs Rs 480, not Rs 80.
3. **A filer pays nothing at all.** There is no filer rate to double or halve — the section only ever
   reaches someone off the ATL.

## What the user enters

| Input | Notes |
|---|---|
| Total cash withdrawn in a day | The base, if it passes the threshold. |
| On the ATL | A filer's answer is always zero. |
| Fiscal year | `2026-2027` back to `2023-2024`. |

## Rate table as shipped

| Year | Daily threshold | Non-filer rate |
|---|---|---|
| 2026-27 | Rs 50,000 | **0.8%** |
| 2025-26 | Rs 50,000 | **0.8%** |
| 2024-25 | Rs 50,000 | 0.6% |
| 2023-24 | Rs 50,000 | 0.6% |

✅ Verified as above. The Finance Act 2023 created the section at 0.6% and the Finance Act 2025
raised it to 0.8% with effect from 1 July 2025 — which is the 2024-25 → 2025-26 step in the table.
The Finance Act 2026 touches Part IV of the First Schedule only at Division X, so nothing moves for
2026-27.

## The algorithm

```
aboveThreshold = dailyWithdrawal > 50,000        ← strictly greater, per "exceeding"
nonFilerTax    = aboveThreshold ? dailyWithdrawal × rate / 100 : 0
tax            = filer ? 0 : nonFilerTax
```

`saving` is the whole non-filer figure, because that is exactly what being on the ATL is worth here.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card (2026) | `…WHT-RateCard.pdf` | Correct — the 2025-26 card. |
| FBR Circular No. 1 of 2025-26 (Income Tax) | `…CircularNo01of2025-26IncomeTax.pdf` | Correct, and the source for "0.8% **of the amount withdrawn**" — the whole-amount reading. |
| Finance Act 2025 | `…FInanceAct2025.pdf` | Correct — the 0.6% → 0.8% change. |
| Finance Act 2023 | `…FinanceAct,2023.pdf` | Correct — created §231AB at 0.6%, with the Rs 50,000 daily total in the section. |
| FBR Withholding Rates Card (2024) | `…WithholdingRatesCards.pdf` | Correct — covers 2023-24. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — nothing changed. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

Every year the page computes has a document behind it.

## Deliberately not modelled

- **Who is exempt.** The old §231A carried carve-outs for the federal and provincial governments,
  foreign diplomats and diplomatic missions, and holders of a Commissioner's exemption certificate.
  §231AB is written without them; the page does not offer an exemption input either way.
- **Multiple banks.** The Explanation aggregates a day's withdrawals; whether that is per bank or
  across all of them is a question the calculator sidesteps by taking one number from the user.
- **Recovering it.** The tax is adjustable and comes off the yearly bill on the return; nothing here
  models that.
