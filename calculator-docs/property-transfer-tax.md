# Property purchase & sale advance tax — `/property-purchase-tax-calculator`, `/property-sale-tax-calculator`

**Feature:** `src/features/property-tax/` (modes `purchase` and `sale`).
**Calculation:** `lib/calculation.ts` → `calcPropertyTransferTax`, `resolvePropertyRate`.
**Rates:** `lib/rates.ts` → `TAX_236K_RATES` (purchase), `TAX_236C_RATES` (sale).

Both routes are the same calculator with a different section behind it. Copy is keyed per mode.

## The rules they implement

- **§236K** — advance tax collected from the **buyer** at registration, rates in **Division XVIII of
  Part IV** of the First Schedule, on the **fair market value**.
- **§236C** — advance tax collected from the **seller** at transfer, rates in **Division X of Part
  IV**, on the **gross amount of the consideration received**.

Both are **banded, not progressive**: whichever value band the amount lands in sets one rate for the
whole amount.

Three different places in the law feed one row of these tables, and mixing them up is the fastest way
to publish a wrong figure:

| Status | Where the rate lives |
|---|---|
| Filer (ATL) | First Schedule Part IV — Division X (236C) / Division XVIII (236K) |
| Late filer | **Tenth Schedule rule 1A** — inserted by FA2024, **omitted by FA2026** |
| Non-filer | **Tenth Schedule rule 1** — its own printed tables, *not* a multiple of the filer rate |

## What the user enters

| Input | Notes |
|---|---|
| Declared value | The price on the deed. |
| FBR / DC value | The official valuation. |
| Filer status | `filer` / `late-filer` / `non-filer`. |
| Fiscal year | `2026-2027` back to `2022-2023`. |

The tax base is `max(declaredValue, fbrValue)`. See "not modelled" below.

## §236C (sale) as shipped

| Year | Filer | Late filer | Non-filer |
|---|---|---|---|
| 2026-27 | **flat 2.75%** | — (tier abolished) | flat 11.5% |
| 2025-26 | 4.5 / 5 / 5.5% | 7.5 / 8.5 / 9.5% | flat 11.5% |
| 2024-25 | 3 / 3.5 / 4% | 6 / 7 / 8% | flat 10% |
| 2023-24 | flat 3% | — | flat 6% |
| 2022-23 | flat 2% | — | flat 4% |

Bands, where banded: ≤ Rs 50m / Rs 50m–100m / above Rs 100m.

✅ **2026-27 verified** — Ordinance amended to 30 Jun 2026, PDF p. 581 (printed p. 562): *"The rate
of tax to be collected under section 236C shall be **2.75%** of the gross amount of the consideration
received."*

✅ **2025-26 verified** — same page, footnote 1 ("Division X substituted by the Finance Act, 2026"),
printing 4.5 / 5 / 5.5 against the three value bands.

✅ **2024-25 verified** — Ordinance PDF p. 580, footnote 10, printing 3 / 3.5 / 4 against the same
bands.

✅ **2023-24 verified** — same page, footnote 9: the pre-FA2024 Division X was a flat **3%**.

⚠️ **2022-23 (flat 2%) not verified here.** The 2026 consolidation's footnote chain stops at the
flat 3%. The 2% filer figure rests on the historical FBR/practitioner rate cards recorded in
`docs/tax-sectors/property.md`. See [open-questions.md](open-questions.md#property-fy-2022-23-filer-rates).

### Non-filer side — verified ✅

Ordinance PDF p. 799 (printed p. 780), Tenth Schedule rule 1's final proviso table:

| Section | Description | Tax rate |
|---|---|---|
| 236C | On the gross amount of consideration received on sale or transfer of immovable property | **11.5%** |

with footnote 2: *"The expression '10%' substituted by the Finance Act, 2025."* — so 2024-25 was
**10%** and 2025-26 onwards is **11.5%**, exactly as shipped. Before FA2024 inserted that table
there was no §236C-specific proviso, so rule 1's general "+100%" gave 6% on 3% and 4% on 2%.

## §236K (purchase) as shipped

| Year | Filer | Late filer | Non-filer |
|---|---|---|---|
| 2026-27 | **flat 1.25%** | — (tier abolished) | 10.5 / 14.5 / 18.5% |
| 2025-26 | 1.5 / 2 / 2.5% | 4.5 / 5.5 / 6.5% | 10.5 / 14.5 / 18.5% |
| 2024-25 | 3 / 3.5 / 4% | 6 / 7 / 8% | 12 / 16 / 20% |
| 2023-24 | flat 3% | — | flat 10.5% |
| 2022-23 | flat 2% | — | flat 7% |

✅ **2026-27 verified** — Ordinance PDF p. 585 (printed p. 566): *"The rate of tax to be collected
under section 236K shall be **1.25%** of the fair market value of the immovable property."*

✅ **2025-26 verified** — same page, footnote 5 (substituted by the Finance Act 2026), printing
1.5 / 2 / 2.5.

✅ **2023-24 verified** — same page, footnote 4: the pre-FA2024 Division XVIII was a flat **3%**.

⚠️ **2024-25 (3 / 3.5 / 4%) not directly verified.** The 2026 consolidation's Division XVIII
footnotes jump from the FA2024 substitution straight to the FA2026 one, so the intermediate table
FA2024 installed is not printed. §236C's equivalent row *is* printed and reads 3 / 3.5 / 4, and the
two Divisions moved together that year, but that is inference. See
[open-questions.md](open-questions.md#property-236k-fy-2024-25).

### Non-filer side — verified ✅

Ordinance PDF p. 798 (printed p. 779), Tenth Schedule rule 1, second proviso:

| Fair market value | Tax rate |
|---|---|
| ≤ Rs 50 million | **10.5%** |
| Rs 50m – 100m | **14.5%** |
| above Rs 100m | **18.5%** |

with footnotes 5-7 recording that FA2025 substituted 12%, 16% and 20% respectively — so 2024-25 is
12 / 16 / 20 exactly as shipped, and 2025-26 and 2026-27 are 10.5 / 14.5 / 18.5.

Footnote 4 on the same page prints what FA2024 replaced:

> Provided further that the tax required to be collected under section 236K shall be increased by
> **two hundred and fifty percent** of the rate specified in Division XVIII …

✅ That confirms the 2022-23 and 2023-24 non-filer figures: 2% × 3.5 = **7%**, 3% × 3.5 = **10.5%** —
a much steeper penalty than the seller ever faced, and a genuinely non-obvious multiplier the code
gets right.

### Late-filer tier — verified ✅

Ordinance PDF p. 799, footnote 4: *"Rule 1A omitted by the Finance Act, 2026"*, printing the omitted
rule with 236C at **7.5 / 8.5 / 9.5%** and 236K at **4.5 / 5.5 / 6.5%** — the 2025-26 figures, exactly
as shipped. Footnote 3 records it was inserted by FA2024. Both facts together are why the tier exists
for 2024-25 and 2025-26 and nowhere else, and why `selectStatusRate` falls back to the filer table
rather than reading zero when a stale `late-filer` selection meets a year with no tier.

## Why 2026-27 is flat for filers but still banded for non-filers

Not a bug. The Finance Act 2026 substituted both Divisions with flat rates but left Tenth Schedule
rule 1 alone, so rule 1's own banded §236K table survives untouched. The `isFlatRate` flag on the
result is true only when *both* sides are flat, which is why the purchase page still shows value
bands in 2026-27 and the sale page does not.

## The algorithm

```
taxBase = max(declaredValue, fbrValue)
rate    = resolvePropertyRate(table[status], taxBase)     ← band by value, one rate for all of it
tax     = taxBase × rate / 100
```

Filer and non-filer figures are always computed alongside the chosen one, so the page can show what
being on the ATL is worth.

## Official sources cited on the pages

| Card | Document | Fit |
|---|---|---|
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — 2.75% / 1.25% and the removal of the late-filer tier. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | Divisions X and XVIII plus the Tenth Schedule. Points at the 2024 consolidation; every figure above was checked in the 2026 one, which also carries the footnote history. |
| FBR Withholding Tax Rate Card | `…WHT-RateCard.pdf` | Correct — the 2025-26 card, listing both sections by value band for all three statuses. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

Nothing in the grid covers FY 2022-23 or FY 2023-24, which the calculator still computes. The site's
own rule is to cite the source of every year the page calculates.

⚠️ Recorded in [open-questions.md](open-questions.md#property-sources-do-not-cover-the-older-years).

## Deliberately not modelled

- **The two sections' different bases.** §236K is on *fair market value* as the FBR valuation tables
  set it; §236C is on *consideration received*. Taking `max(declared, FBR)` for both is a practical
  approximation that is right in the common case (FBR value at or below price) and conservative
  otherwise.
- **§7E deemed income** and the §236C(2A) certificate machinery.
- **Exemptions** — the Ordinance carries reliefs for ex-servicemen, government allottees and
  first-sale allotments that this page does not offer.
- **Provincial stamp duty, CVT and registration fee**, which are the larger part of an actual
  transfer bill and are not federal income tax.
- **The capital gain itself.** That is [property-capital-gains-tax.md](property-capital-gains-tax.md),
  and the §236C computed here is credited against it there.
