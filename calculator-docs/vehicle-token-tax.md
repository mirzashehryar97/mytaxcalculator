# Vehicle token tax — `/vehicle-token-tax-calculator`

**Feature:** `src/features/vehicle-tax/` (mode `token`).
**Calculation:** `lib/calculation.ts` → `calcVehicleTokenTax`.
**Rates:** `lib/rates.ts` → `VEHICLE_PROVINCES`, `VEHICLE_ANNUAL_TAX`.

## The two halves of one bill

This is the only calculator on the site where **two different governments** set the numbers, and the
page cites both:

1. **The provincial token** — motor vehicle tax under each province's own Motor Vehicles Taxation
   Act and schedule. The FBR sets none of it, and a provincial rate cited to an FBR document is a
   wrong citation.
2. **The federal charge collected alongside it** — **§234**, at the rates in **First Schedule, Part
   IV, Division III**. §234(1) makes whoever collects motor vehicle tax also collect this.

## What the user enters

| Input | Notes |
|---|---|
| Province | Punjab, Islamabad (ICT), Sindh, KP, Balochistan. |
| Engine size (cc) | Picks the band on both halves. |
| Invoice value | Only used where a province charges a percentage of price. |
| Completed years since registration | Age. Used by Balochistan's bands and the federal cut-off. |
| Pay early | Punjab's discount. |
| On the ATL | Affects the **federal** half only. |
| Fiscal year | `2026-2027` and `2025-2026`. |

## The federal half — §234

### Per-year table (used when the province charges yearly)

| Engine capacity | Tax |
|---|---|
| Up to 1,000 cc | Rs 800 |
| 1,001 – 1,199 cc | Rs 1,500 |
| 1,200 – 1,299 cc | Rs 1,750 |
| 1,300 – 1,499 cc | Rs 2,500 |
| 1,500 – 1,599 cc | Rs 3,750 |
| 1,600 – 1,999 cc | Rs 4,500 |
| 2,000 cc and above | Rs 10,000 |

### Lump-sum table (used when the province's own token is a one-off)

| Engine capacity | Tax |
|---|---|
| Up to 1,000 cc | Rs 10,000 |
| 1,001 – 1,199 cc | Rs 18,000 |
| 1,200 – 1,299 cc | Rs 20,000 |
| 1,300 – 1,499 cc | Rs 30,000 |
| 1,500 – 1,599 cc | Rs 45,000 |
| 1,600 – 1,999 cc | Rs 60,000 |
| 2,000 cc and above | Rs 120,000 |

✅ **Both verified** word for word — Ordinance amended to 30 Jun 2026, PDF p. 573 (printed p. 554),
Division III clauses (3) and (4). No Finance Act from 2023 to 2026 touches Division III, which is
what licenses one table across every year.

✅ **Why picking between them is right** — §234(2): *"If the motor vehicle tax is collected in
instalments or lump sum the advance tax may also be collected in instalments or lump sum in like
manner."* So `federalIsOneOff = levy.frequency === 'lifetime'` is the statute's own rule, not a
convenience.

✅ **Ten-year cut-off** — §234(2A), Ordinance PDF p. 344 (printed p. 325): *"In respect of motor cars
used for more than ten years in Pakistan, no advance tax shall be collected after a period of ten
years."* → `VEHICLE_ANNUAL_TAX_CUTOFF_YEARS = 10`.

✅ **Non-filers pay double** here, not triple: rule 1's ×3 proviso names §231B only, so §234 follows
the general "increased by hundred percent". → `ANNUAL_TAX_NON_FILER_MULTIPLIER = 2`.

✅ **Adjustable** — §234(5).

## The provincial half

Each schedule carries its own `source`, typed `official` or `secondary`. **Every province currently
shipped is `official`** — a `secondary` tier would render a prominent "verified from secondary
sources, not official ones" warning above the result. A year with no schedule is simply absent, and
the UI shows a "not covered" panel rather than guessing.

### Punjab — `excise.punjab.gov.pk/motorvehicle_tax`

| Engine capacity | 2026-27 | 2025-26 | Frequency |
|---|---|---|---|
| Up to 1,000 cc | Rs 20,000 | Rs 20,000 | **lifetime** |
| 1,001 – 2,000 cc | 0.3% of invoice price | 0.2% | annual |
| Above 2,000 cc | 0.4% of invoice price | 0.3% | annual |

10% off for paying the whole year by **31 August**. EVs get 95% off both the registration fee and
the yearly motor vehicle tax (page note; not applied to the computed figure).

### Islamabad (ICT) — Finance Act 2026, Schedule to the West Pakistan Motor Vehicles Taxation Act 1958

**2026-27 only.** Islamabad's token is set by the federal budget, not a province, so the Finance Act
2026 substituted Table 2 of that Schedule as it applies in the Capital Territory. The Act gives only
the new table, so **2025-26 is deliberately left out rather than guessed**.

| Engine capacity | Charge | Frequency |
|---|---|---|
| Up to 1,000 cc | Rs 20,000 | lifetime |
| 1,001 – 2,000 cc | 0.25% of invoice price | annual |
| 2,001 cc and above | 0.35% of invoice price | annual |

(The shipped tiers split 1,001–2,000 into three rows at the same 0.25% and 2,001+ into two at 0.35%,
mirroring the Act's own row structure.)

### Sindh — Excise & Taxation Department four-wheeler calculator

Set yearly amounts; invoice price affects only the registration fee, not the token. No early-payment
discount.

| Engine capacity | Yearly |
|---|---|
| Up to 1,000 cc | Rs 1,500 |
| 1,001 – 1,300 cc | Rs 2,000 |
| 1,301 – 1,600 cc | Rs 4,000 |
| 1,601 – 2,000 cc | Rs 4,500 |
| 2,001 – 2,500 cc | Rs 5,000 |
| Above 2,500 cc | Rs 7,000 |

**2026-27 only** in the shipped config. A car up to 1,000 cc may instead settle once (Rs 20,000 if
not already registered, Rs 15,000 after three but before five years) — the page shows the yearly
figure because which one you pay is a choice at the counter.

### Khyber Pakhtunkhwa — KP Finance Act 2025, Appendix-III (Schedule-II item 4(a))

Private cars, jeeps, pickups and vans seating up to six. Same table for 2025-26 and 2026-27.

| Engine capacity | Yearly |
|---|---|
| Up to 1,000 cc | Rs 2,000 |
| 1,001 – 1,300 cc | Rs 3,000 |
| 1,301 – 1,500 cc | Rs 4,000 |
| 1,501 – 2,500 cc | Rs 5,000 |
| Above 2,500 cc | Rs 8,000 |

Electric four-wheelers pay no token at all until 30 June 2028 (page note).

### Balochistan — Excise Schedule of Taxes and Fees, in force 1 July 2025

The one province where **age changes the basis**, not just the amount. Same table for both years,
which the Balochistan Finance Act 2026 licenses: s.5 of that Act amends the Motor Vehicle Taxation
Act 1958 only at section 13 (an EPZ exemption) and the Schedule's new EV proviso — the rate table is
untouched.

| Band | Charge | Frequency |
|---|---|---|
| Up to 660 cc, under 5 years old | Rs 10,500 | lifetime |
| Up to 660 cc, 5 years or older | Rs 1,000 | annual |
| 661 – 1,000 cc, under 5 years old | Rs 12,000 | lifetime |
| 661 – 1,000 cc, 5 years or older | Rs 1,100 | annual |
| 1,001 – 1,500 cc | Rs 1,400 | annual |
| 1,501 – 2,000 cc | Rs 1,700 | annual |
| Above 2,000 cc | Rs 2,000 | annual |

The schedule also offers a one-off figure at every size that falls with age; the page shows the
yearly figure because taking the one-off is a choice. The Balochistan Finance Act 2026 waives motor
vehicle tax in full on EVs until 30 June 2030 (page note).

⚠️ **The provincial tables were not re-verified against the source documents in this pass** — they
were transcribed and verified when the calculator was built, and four of the five sources are
websites or PDFs that change without notice. See
[open-questions.md](open-questions.md#provincial-token-schedules-not-re-verified).

## The algorithm

```
tier                = band matching engineCc AND the age bounds, if the province sets any
tokenBeforeDiscount = tier.charge.kind === 'amount' ? amount : invoiceValue × percent / 100
discount            = payEarly && tier.frequency === 'annual' && province discount > 0
tokenTax            = tokenBeforeDiscount − discount

federalTiers = tier.frequency === 'lifetime' ? lumpSum : perYear
federalBase  = amount for engineCc
federalTax   = completedYears ≥ 10 ? 0 : federalBase × (filer ? 1 : 2)

total = tokenTax + federalTax
```

The early-payment discount only applies to an **annual** charge — a lifetime token is not a year's
payment, so Punjab's 31 August rule cannot reach it.

## Official sources cited on the page

The page uses its **own** copy (`VEHICLE_TOKEN_SOURCES_COPY`) rather than the site-wide
government-neutral text, because the grid mixes federal and provincial documents:

> Your province sets the token and the FBR sets the charge collected with it, so both are cited here.

| Card | Government |
|---|---|
| FBR Withholding Income Tax Rate Card (§234, Division III Part IV) | Federal |
| Income Tax Ordinance 2001 (§234 — the ten-year cut-off, adjustability) | Federal |
| Finance Act 2026 (Islamabad token table; leaves §234 alone) | Federal |
| Punjab Excise & Taxation Department motor-car token table | Punjab |
| Sindh Excise & Taxation Department four-wheeler calculator | Sindh |
| Khyber Pakhtunkhwa Finance Act 2025, Appendix-III | KP |
| Balochistan Excise Schedule of Taxes and Fees | Balochistan |

Each provincial card carries its own government's emblem rather than the FBR wordmark. That is
deliberate and must stay: attributing a provincial levy to the FBR is the single most common error in
third-party summaries of this tax.

## Deliberately not modelled

- **EV exemptions.** Punjab's 95%, KP's full exemption to 30 June 2028 and Balochistan's to
  30 June 2030 are shown as notes, not applied to the figure.
- **The one-off alternatives** in Sindh and Balochistan.
- **Everything except private cars** — goods transport (§234(1), Rs 2.50 per kg of laden weight),
  passenger transport by seat, motorcycles, and the provincial equivalents.
- **Arrears, penalties and the professional-tax line** that appears on a real token bill.
- **Sindh 2025-26 and ICT 2025-26**, which have no shipped schedule and show a "not covered" panel.
