# Property capital gains tax — `/property-capital-gains-tax-calculator`

**Feature:** `src/features/property-tax/` (mode `capital-gains`).
**Calculation:** `lib/calculation.ts` → `calcPropertyCapitalGains`.
**Rates:** `lib/rates.ts` → `CGT_FLAT_RATE`, `CGT_FLAT_REGIME_START`, `CGT_HOLDING_BANDS`.

## The rule it implements

**Section 37(1A)**, at the rates in **First Schedule, Part I, Division VIII**, as substituted by the
Finance Act 2024 and unchanged since.

Division VIII splits on **when the property was acquired**:

- **Acquired on or after 1 July 2024** — a flat **15%** for a seller on the ATL, whatever the
  holding period.
- **Acquired on or before 30 June 2024** — the old **holding-period grid**, which still governs
  those properties in every later tax year and differs by property type.

## No fiscal-year dropdown — on purpose

This is the one calculator on the site with no year selector, and it must stay that way. A gain is
taxed in the year its disposal falls in, so the **sale date fixes the year**
(`getPropertyTaxYearForDate`, tax year = 1 July – 30 June) and offering a dropdown as well would let
someone state a contradiction the calculator then prices. `PropertyTaxYearNotice` renders the derived
year where the dropdown would have been.

A derived year can land outside the years we hold rates for, so the resolver returns a `coverage`
flag — `covered` / `before-range` / `after-range` — and the UI warns instead of silently clamping.

## What the user enters

| Input | Job |
|---|---|
| Purchase date | **Picks the regime** — flat 15% or the holding grid. Sticks for the life of the holding. |
| Sale date | **Picks the tax year**, and therefore the §236C rate credited against the gain. |
| Purchase price, sale price | Gain = `max(0, sale − purchase)`. |
| Property type | `open-plot` / `constructed` / `flat` — only used on the grid. |
| Filer status | `filer` / `late-filer` / `non-filer`. |

## The holding grid as shipped (acquired ≤ 30 June 2024)

| Holding period | Open plot | Constructed | Flat |
|---|---|---|---|
| Up to 1 year | 15% | 15% | 15% |
| Over 1 up to 2 | 12.5% | 10% | 7.5% |
| Over 2 up to 3 | 10% | 7.5% | 0% |
| Over 3 up to 4 | 7.5% | 5% | 0% |
| Over 4 up to 5 | 5% | 0% | 0% |
| Over 5 up to 6 | 2.5% | 0% | 0% |
| Over 6 years | 0% | 0% | 0% |

✅ **Verified** — Ordinance amended to 30 Jun 2026, PDF p. 545-546 (printed p. 526-527), columns (3),
(4) and (5) of the current Division VIII table. A dash in the statutory table means the charge has
already fallen to zero for that property type, which is why those cells are `0` here rather than
`null`.

The same page defines `CGT_GUIDE_ROWS` from `CGT_HOLDING_BANDS`, so the on-page rate table cannot
drift from the maths behind it.

## The flat regime as shipped (acquired ≥ 1 July 2024)

Filer: **15%**. Non-filer: **15% treated as a minimum, not a final answer**.

✅ **Verified** — same table, column (6):

> 15% for persons appearing on the Active Taxpayers' List on date of disposal of property and at the
> rates specified in Division I for individuals and association of persons and Division II for
> companies in respect of persons not appearing on the Active Taxpayers' List on the date of
> disposal of property:
> Provided that the rate of tax for individuals and association of persons not appearing on the
> Active Taxpayers' List on the date of disposal, **the rate of tax shall not be less than 15% of the
> gain.**

The code sets `rateIsMinimum = isFlatRegime && isNonFiler` and the UI presents 15% as a floor for
that case, which is the honest reading — a non-filer's real rate is their own slab rate, which the
calculator has no way to know.

## The §236C credit

The seller's §236C collected at transfer is advance tax, so it comes off the gain tax rather than
being paid twice:

```
transferTaxRate   = §236C rate for the derived tax year and the seller's status, banded on salePrice
transferTaxCredit = salePrice × transferTaxRate / 100
netTax            = max(0, grossTax − transferTaxCredit)
```

`fullyCovered` is only reported when the rate behind `grossTax` is **final** — never when 15% is
merely a floor for a non-filer, because the real bill can be higher than the credit.

For the §236C rates and their verification, see
[property-transfer-tax.md](property-transfer-tax.md#236c-sale-as-shipped).

## The algorithm

```
taxYear      = getPropertyTaxYearForDate(saleDate)
gain         = max(0, salePrice − purchasePrice)
isFlatRegime = purchaseDate ≥ 2024-07-01
rate         = isFlatRegime ? 15 : holdingBand.rates[propertyType]
grossTax     = gain × rate / 100
netTax       = max(0, grossTax − §236C credit)
```

`holdingYears` comes from `diffInYears` and is only computed when both dates parse and the sale is
after the purchase; otherwise `datesAreValid` is false and the UI says so rather than pricing a
nonsense holding period.

A sale at or below cost sets `isLoss` and produces a zero gain — the calculator does not model loss
relief.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | §37(1A) and Division VIII. The 2024 consolidation already carries the FA2024 Division VIII, so this citation genuinely covers both regimes — but the 2026 one is still the better link. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it sets the 2.75% §236C credited here. |
| FBR Withholding Tax Rate Card | `…WHT-RateCard.pdf` | Correct — the §236C side. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

## Deliberately not modelled

- **Cost of acquisition as §76 defines it** — improvements, transfer costs and the rest. Purchase
  price is taken at face value.
- **Losses**, and their set-off or carry-forward.
- **A non-filer's actual slab rate** in the flat regime, which is why 15% is presented as a floor.
- **Exemptions** — the reduction for original allottees among ex-servicemen and government
  employees, and clause (104A)'s fifteen-year personal-residence relief from §4C.
- **§7E deemed income**, and the certificate a seller needs for it.
