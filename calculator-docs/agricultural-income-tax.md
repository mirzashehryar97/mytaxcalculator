# Agricultural income tax — `/agricultural-income-tax-calculator`

**Feature:** `src/features/agricultural-tax/`.
**Calculation:** `lib/calculation.ts` → `calcAgriculturalTax`, `calcLandTax`.
**Rates:** `lib/rates.ts` → `AGRICULTURAL_RATES`.

## The one thing to understand first

**Agricultural income is exempt from federal income tax** (§41 of the Income Tax Ordinance 2001), so
the FBR sets none of this. Every figure on this page comes from a **provincial** Act or gazette
notification, and the official-sources grid cites provincial governments, not the FBR — except for
one deliberate federal card, explained below.

All four provinces moved to a new regime with effect from **1 January 2025** and all four copied the
federal non-salaried slab table, which is why one `FARMER_SLABS` constant serves all of them.

## What the user enters

| Input | Notes |
|---|---|
| Province | Punjab / Sindh / KP / Balochistan. |
| Agricultural income | The base. |
| Taxpayer type | `farmer` (slabs) / `small-company` (20%) / `company` (29%). |
| Cultivated acres | For the per-acre land tax. |
| Mature orchard acres | Charged separately, from the first acre. |
| Orchard irrigation | `irrigated` / `unirrigated`. |
| Tax already paid | Credited. |
| Fiscal year | `2026-2027` and `2025-2026`. |

## Income slabs — identical in all four provinces

| Agricultural income | Tax |
|---|---|
| Up to Rs 600,000 | 0% |
| 600,001 – 1,200,000 | 15% of the excess |
| 1,200,001 – 1,600,000 | Rs 90,000 + 20% |
| 1,600,001 – 3,200,000 | Rs 170,000 + 30% |
| 3,200,001 – 5,600,000 | Rs 650,000 + 40% |
| Above 5,600,000 | Rs 1,610,000 + 45% |

This is the federal non-salaried table, which each province adopted. The federal original is
✅ verified at Ordinance PDF p. 525 — see [business-tax.md](business-tax.md#fy-2024-25-2025-26-and-2026-27--one-table).
The provincial adoption of it rests on each province's own Act/notification, cited in the grid.

Corporate farming: **20%** small company, **29%** company — the federal Division II rates, again
adopted identically in all four provinces.

## Super tax — and why Punjab is different

Charged on the **whole income** once it passes the floor, exactly like federal §4C: every row reads
"N% of the income", so one rupee more steps the entire bill up a band.

**Sindh, KP and Balochistan** each print the same eight-row table:

0% ≤ Rs 150m · 1% · 2% · 3% · 4% · 6% · 8% · 10% above Rs 500m.

**Punjab writes no table of its own.** Section 3-AA of the Punjab Agricultural Income Tax Act 1997
(inserted by the Amendment Act XV of 2024) charges super tax *"at such rate as may be specified in
the Income Tax Ordinance, 2001 for high earning persons"* — so Punjab follows **federal §4C**, which
stopped matching the provincial table the moment the Finance Act 2025 shaved the middle bands:

| Year | Punjab (follows §4C) |
|---|---|
| 2025-26 | 0% · 1% · **1.5%** · **2.5%** · **3.5%** · **5.5%** · **7.5%** · 10% |
| 2026-27 | 0% up to Rs 500m, then **8%** — the two-row table §4C now carries for "any other person" |

✅ Both federal tables verified — Ordinance PDF p. 533; see [super-tax.md](super-tax.md).

This is why the grid carries one FBR card (the Income Tax Ordinance, for §4C and Division IIB): it is
the document Punjab's own Act points at. Every other card is provincial.

## Land tax (per acre)

Levied as **two separate charges**: a band on ordinary cultivated land, and a flat rate on mature
orchards which sit outside those bands.

### Punjab — Punjab AIT Rules 1997, rule 3 (gazette notification 147-2025/233-RS(II), 6 March 2025)

| Holding | Per acre |
|---|---|
| Up to 12.5 acres | Nil |
| 12.5 – 25 acres | Rs 300 |
| 25 – 50 acres | Rs 400 |
| Above 50 acres | Rs 500 |

Mature orchards: **Rs 600** irrigated, **Rs 300** unirrigated.

**Not a minimum tax.** Punjab's Act charges the per-acre tax under s.3(1) and the income tax under
s.3(3) without stating how the two are set off, so the calculator shows it *beside* the income tax
rather than as a floor under it.

**2026-27 is `unconfirmed`.** No Punjab per-acre table for 2026-27 has been located, so the shipped
rule is `{ status: 'unconfirmed' }` and the UI says so instead of reusing 2025-26's figures.

### KP and Balochistan — the same four-zone table, word for word

| Holding | Per acre |
|---|---|
| Up to 12.5 acres | Nil |
| 12.5 – 25 acres | Rs 300 (Zone IV) – Rs 1,200 (Zone I) |
| 25 – 50 acres | Rs 600 – Rs 2,500 |
| Above 50 acres | Rs 900 – Rs 3,500 |

Mature orchards: **Rs 900 – Rs 3,500** irrigated (the "over 50 acres" figure of the zone),
**Rs 450 – Rs 1,750** unirrigated (half of it).

**The result is a range, not a number, and that is deliberate.** The Board of Revenue groups
districts into zones by a separate notification that is **not gazetted with the Act**, so a district
cannot be resolved to a zone in code. The calculator returns `perAcreLow` (Zone IV) and `perAcreHigh`
(Zone I) and the UI shows the range rather than inventing a single answer.

**It is a minimum tax** in both provinces — KP s.3 proviso and Balochistan s.6(2)-(3). So
`payableLow` / `payableHigh` are `max(incomeSideTax, landTax)`.

### Sindh

`{ status: 'none' }` — Sindh levies no per-acre land tax under its 2025 Act.

## Orchards are charged from the first acre

The acreage bands and their Nil row are expressly written to **exclude** mature orchards, so the
12.5-acre floor does not reach them and `calcOrchardCharge` never consults the bands. KP s.2(h)
defines a "mature orchard" as seven years for mango and five for others.

## The algorithm

```
farmer:  incomeTax = calcSlabTax(income, FARMER_SLABS)
company: incomeTax = income × (20 or 29) / 100

superTax = income × band(income).rate / 100      ← the WHOLE income
totalTax = incomeTax + superTax

landTax  = cultivated band × acres  +  orchard rate × orchardAcres
payable  = isMinimumTax ? max(totalTax, landTax) : totalTax
```

`resolveChargedStatus` distinguishes "nothing entered" from "entered, but under the floor" so the
two get different messages rather than both showing Rs 0.

## Official sources cited on the page

| Card | Government |
|---|---|
| Punjab Agricultural Income Tax Act 1997 (as amended 2024) | Punjab |
| Punjab Gazette notification 148-2025 — income rates and the 20% / 29% company rates | Punjab |
| Punjab Gazette notification 147-2025 — per-acre rates and the Rs 600 / Rs 300 orchard pair | Punjab |
| Punjab Agricultural Income Tax (Amendment) Act 2024 (Act XV of 2024) — s.3-AA | Punjab |
| Income Tax Ordinance 2001 (2026 consolidation) — §4C and Division IIB, which Punjab's s.3-AA points at | Federal |
| Sindh Agricultural Income Tax Act 2025 (Sindh Act II of 2025) | Sindh |
| Sindh Revenue Board — farm tax registration and filing | Sindh |
| KP Agricultural Income Tax Act 2025 (KP Act VI of 2025) | KP |
| Balochistan Tax on Land and Agricultural Income (Amendment) Act 2025 (Act VIII of 2025) | Balochistan |

Each provincial card carries its own government's emblem. The single FBR card is there because a
provincial Act incorporates a federal rate by reference, not because the FBR levies anything here.

⚠️ **The provincial figures were not re-verified against the Acts in this pass** — they were
transcribed and verified when the calculator was built. The federal §4C tables Punjab points at
*were* re-verified. Recorded in
[open-questions.md](open-questions.md#provincial-agricultural-tables-not-re-verified).

Two known traps if you do re-verify:

- The **Balochistan Act's** text layer is **character-exploded** — searching for `orchard` finds
  nothing because it extracts as `o r c h a r d`. Squash whitespace first.
- The **Punjab per-acre gazette** is a **CCITT G4 scan with no text layer**. Extract the page images
  and read those; `pypdf`'s `page.images` decodes G4 with no extra work.

## Deliberately not modelled

- **Zone resolution** for KP and Balochistan — see above; this is why the answer is a range.
- **Punjab's per-acre rates for 2026-27**, which do not exist in any located document.
- **How the per-acre and income charges interact in Punjab**, which the Act does not state.
- **Registration, filing and payment mechanics**, which differ by province.
- **Livestock, and the boundary of "agricultural income"** as each provincial Act defines it.
