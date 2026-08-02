# Vehicle registration & transfer tax — `/vehicle-tax-calculator`

**Feature:** `src/features/vehicle-tax/` (modes `registration` and `transfer`).
**Calculation:** `lib/calculation.ts` → `calcVehicleRegistrationTax`.
**Rates:** `lib/rates.ts` → `VEHICLE_REGISTRATION_RATES`, `VEHICLE_TRANSFER_RATES`.

## The rule it implements

**Section 231B** — the excise office collects advance tax when a vehicle is registered (subsections
(1) and (3)) or when registration or ownership is transferred (subsection (2)) — at the rates in
**First Schedule, Part IV, Division VII**.

The tax is **adjustable**: it counts towards the owner's yearly income tax bill and is claimed on
the return.

## What the user enters

| Input | Notes |
|---|---|
| Mode | `registration` (new) or `transfer` (used). |
| Engine size (cc) | Picks the band. |
| Engine type | `combustion` or `electric` (no engine size). |
| Vehicle value | Invoice / assessed value. |
| Completed years since first registration | Transfer mode only. |
| On the ATL | Filer or not. |
| Fiscal year | `2026-2027` back to `2023-2024`. |

## Registration — FY 2024-25, 2025-26, 2026-27 (percentage of value)

| Engine capacity | Rate |
|---|---|
| Up to 850 cc | 0.5% of the value |
| 851 – 1,000 cc | 1% |
| 1,001 – 1,300 cc | 1.5% |
| 1,301 – 1,600 cc | 2% |
| 1,601 – 1,800 cc | 3% |
| 1,801 – 2,000 cc | 5% |
| 2,001 – 2,500 cc | 7% |
| 2,501 – 3,000 cc | 9% |
| Above 3,000 cc | 12% |

✅ **Verified** word for word — Ordinance amended to 30 Jun 2026, PDF p. 578 (printed p. 559). The
Finance Act 2026 amends Part IV only at Divisions X, XVIII, XXVII and XA, so the table carries into
2026-27 unchanged.

**Which value.** The proviso on the same page: an imported vehicle uses the customs-assessed import
value increased by customs duty, federal excise duty and sales tax; a locally manufactured or
assembled vehicle uses the invoice value inclusive of all duties and taxes; an auctioned vehicle uses
the auction value inclusive of duties. ✅ Verified, and matches the on-page FAQ.

**No engine size** (electric): the second proviso charges **3% of the value where the vehicle is
worth Rs 5,000,000 or more**, and nothing below that. ✅ Verified —
`VEHICLE_HIGH_VALUE_THRESHOLD = 5_000_000`, `noEngineSizePercent: 3`.

## Registration — FY 2023-24 (fixed amounts, then percentages)

| Engine capacity | Charge |
|---|---|
| Up to 850 cc | Rs 10,000 |
| 851 – 1,000 cc | Rs 20,000 |
| 1,001 – 1,300 cc | Rs 25,000 |
| 1,301 – 1,600 cc | Rs 50,000 |
| 1,601 – 1,800 cc | Rs 150,000 |
| 1,801 – 2,000 cc | Rs 200,000 |
| 2,001 – 2,500 cc | 6% of the value |
| 2,501 – 3,000 cc | 8% |
| Above 3,000 cc | 10% |

✅ **Verified** — same page, footnote 1: *"Table substituted by the Finance Act 2024. The substituted
Table read as follows"*, printing exactly this mixed-basis table. The Finance Act 2024 is what moved
registration onto a share of the price.

## Transfer — one table for every year shown

| Engine capacity | Charge |
|---|---|
| Up to 850 cc | — (nil) |
| 851 – 1,000 cc | Rs 5,000 |
| 1,001 – 1,300 cc | Rs 7,500 |
| 1,301 – 1,600 cc | Rs 12,500 |
| 1,601 – 1,800 cc | Rs 18,750 |
| 1,801 – 2,000 cc | Rs 25,000 |
| 2,001 – 2,500 cc | Rs 37,500 |
| 2,501 – 3,000 cc | Rs 50,000 |
| Above 3,000 cc | Rs 62,500 |

✅ **Verified** — Ordinance PDF p. 579 (printed p. 560), Division VII clause (2), with both provisos:

> Provided that in cases where engine capacity is not applicable and the value of vehicle is Rupees
> five million or more, the rate of tax collectible shall be **Rupees twenty thousand**:
> Provided further that the rate of tax to be collected under this clause shall be **reduced by ten
> percent each year** from the date of first registration in Pakistan.

✅ Both match `noEngineSizeAmount: 20_000` and `VEHICLE_TRANSFER_REDUCTION_PER_YEAR = 10`.

## The five-year cut-off

Nothing is collected once the vehicle is past five years from first registration.

✅ **Verified** — Ordinance PDF p. 492 (printed p. 473), §231B(1):

> Provided that no collection of advance tax under this sub-section shall be made **after five years
> from the date of first registration** as specified in clauses (a), (b) and (c) of sub-section (6).

Note the proviso sits in **sub-section (1)** (registration) while the code applies it only in
**transfer** mode (`pastFiveYears = isTransfer && completedYears >= 5`). In practice a first
registration is of a new vehicle, so no age arises there and the two readings give the same answer;
it is a modelling simplification, not a rate error. Recorded in
[open-questions.md](open-questions.md#vehicle-five-year-cut-off-is-applied-to-transfers-only).

## Non-filers pay three times, not twice

✅ **Verified** — Ordinance PDF p. 798 (printed p. 779), Tenth Schedule rule 1, first proviso:

> Provided that the tax required to be collected under **section 231B** shall be increased by **two
> hundred percent** of the rate specified in First Schedule in case of persons not appearing in the
> active taxpayers' list.

"Increased by 200%" means ×3, which is `REGISTRATION_NON_FILER_MULTIPLIER = 3` — against rule 1's
general "increased by hundred percent" (×2) everywhere else.

## The algorithm

```
charge   = tier for engineCc, or the no-engine-size rule for an electric vehicle
base     = charge.kind === 'amount' ? charge.amount : vehicleValue × charge.percent / 100
nonFiler = base × 3
reduction    = isTransfer ? min(100, completedYears × 10) %
keptShare    = pastFiveYears ? 0 : 1 − reduction/100
tax          = (filer ? base : nonFiler) × keptShare
```

The age reduction and the non-filer multiplier are applied in that order, so a non-filer's reduction
comes off the tripled amount — which is what the provisos say, since rule 1 raises "the rate
specified in the First Schedule" and the 10%-a-year reduction is applied to the resulting collection.

An engine size that matches no band (`unrated`) produces zero and the UI says the vehicle is out of
scope rather than showing Rs 0 as an answer.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card | `…WHT-RateCard.pdf` | Correct — Division VII, Part IV. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | §231B — the five-year cut-off and scope. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it leaves the bands unchanged. |
| Finance Act 2024 | `…FinanceAct-2024.pdf` | Correct — it substituted the table onto a share of the price. |
| Finance Act 2023 | `…FinanceAct,2023.pdf` | Correct — the fixed-amount table used for 2023-24. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

Every year the page computes has a document behind it.

## Deliberately not modelled

- **§231B(1A) leasing**, which charges 4% of the value where a leasing company, bank, NBFI,
  investment bank, modaraba or DFI leases a vehicle — "whether shariah compliant or under
  conventional mode" — to someone not on the ATL. Ijara is expressly inside it. Out of scope: the
  calculator prices a purchase, not a lease.
- **§231B(3)** (registration of an imported or auctioned vehicle by someone other than the
  manufacturer's buyer) is folded into the same table, which is correct, but the sub-section (2A)
  table of Rs 100,000 / 200,000 / 400,000 is not offered.
- **Who is out of scope entirely** — federal, provincial and local government, foreign diplomats and
  diplomatic missions.
- **Provincial registration fee, number-plate charges and withholding on the token**, which are a
  separate bill; the token side is [vehicle-token-tax.md](vehicle-token-tax.md).
