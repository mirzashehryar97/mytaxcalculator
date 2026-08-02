# Mobile, internet & landline tax — `/mobile-internet-tax-calculator`

**Feature:** `src/features/withholding-tax/` (mode `phone-internet`).
**Calculation:** `lib/calculation.ts` → `calcTelecomTax`.
**Rates:** `lib/rates.ts` → `TELECOM_RATES`.

## The rule it implements

**Section 236**, at the rates in **First Schedule, Part IV, Division V**. The operator collects the
tax on a phone or internet payment.

## No filer toggle — on purpose

Tenth Schedule **rule 10(l)** keeps *"tax collected under section 236"* out of the non-filer regime
entirely. ✅ Verified — Ordinance amended to 30 Jun 2026, PDF p. 802 (printed p. 783). Filers and
non-filers pay the same, so the page offers no toggle rather than offering one that changes nothing.

## What the user enters

| Input | Notes |
|---|---|
| Amount | Bill or load. |
| Service | `mobile` / `internet` / `landline`. |
| Payment | `bill` or `load` — forced to `bill` for a landline, which is always billed monthly. |
| Fiscal year | `2026-2027` back to `2023-2024`. |

## Rate table as shipped

| Service | Rate | Base |
|---|---|---|
| Mobile, internet, prepaid cards and loads | **15%** | the **whole** amount |
| Landline (telephone subscriber other than mobile) | **10%** | only the part **above Rs 1,000** a month |
| Named in a §114B general order (mobile/internet only) | **75%** | the whole amount |

✅ **Verified** — Ordinance amended to 30 Jun 2026, PDF pp. 575-576 (printed pp. 556-557),
Division V:

> (a) in the case of a telephone subscriber (other than mobile phone subscriber) where the amount of
> monthly bill exceeds Rs. 1000 — **10% of the exceeding amount of bill.**
>
> (b) in the case of subscriber of internet, mobile telephone and pre-paid internet or telephone
> card — **15%** of the amount of bill or sales price of internet pre-paid card or prepaid telephone
> card or sale of units through any electronic medium or whatever form:
> Provided that in the case of persons mentioned in income tax general order issued under
> **section 114B**, the rate of collection of tax shall be **75%** …

with footnote 4: *"Colon inserted and Proviso added by the Finance Act 2024"* — which is why the
75% rate exists for 2024-25 onwards and is `null` for 2023-24 in the shipped table.

The 15% itself is footnoted as the Finance (Supplementary) Act 2022's substitution of "10% for tax
year 2022 and 8% onwards", so it has been 15% throughout the range this calculator offers.

The two bases are genuinely different and the code keeps them apart:

```
landline: taxableAmount = max(0, amount − 1,000)
otherwise: taxableAmount = amount
```

## The §114B rate

Section 114B lets the FBR issue a general order naming people who have not filed a return, with
consequences including a punitive collection rate on their phone and internet. The calculator shows
what that would cost (`namedDefaulterTax`) beside the ordinary figure — it does not decide whether
the user is named, because only an FBR order can.

It is offered for mobile and internet only; a landline has no such proviso, so `namedDefaulterRate`
is `null` there.

## The algorithm

```
isLandline     = service === 'landline'
rate           = isLandline ? 10 : 15
taxableAmount  = isLandline ? max(0, amount − 1,000) : amount
tax            = taxableAmount × rate / 100
totalPayable   = amount + tax          ← a bill: the tax is added
amountReceived = max(0, amount − tax)  ← a load: the tax comes out of it
effectiveRate  = tax / amount          ← against the full amount, so a landline's shows below 10%
```

Both `totalPayable` and `amountReceived` are returned because the same section works in opposite
directions depending on whether you are paying a bill or loading a card — the page picks which to
show from the `payment` input.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card (2026) | `…WHT-RateCard.pdf` | Correct — the 2025-26 card. |
| FBR Withholding Rates Card (2024) | `…WithholdingRatesCards.pdf` | Correct — covers 2023-24. |
| Finance Act 2024 | `…FinanceAct-2024.pdf` | Correct — added the 75% §114B rate from 2024-25. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | §236 and Division V. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — nothing changed. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

## Deliberately not modelled

- **Provincial sales tax on telecom services** (PRA, SRB, KPRA, BRA — typically 19.5%), which is the
  larger line on a real mobile bill and is not income tax. Adding the two together is the most common
  mistake in "how much tax on a Rs 100 load" content.
- **Federal excise duty** in Islamabad.
- **Whether the collection is adjustable or final**, and the return-time credit.
- **Corporate and government subscribers**, and connections exempt under §236(4).
