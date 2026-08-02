# Rental income tax — `/rental-income-tax-calculator`

**Feature:** `src/features/rental-income-tax/`.
**Calculation:** `lib/calculation.ts` → `calcRentalTax`.
**Rates:** `lib/rates.ts` → `RENTAL_RATES`.

## The rule it implements

**Section 155** — the tenant (or the agent paying rent) deducts tax from the rent and pays it to the
FBR in the owner's name — at the rates in **First Schedule, Part III, Division V**.

This is a **withholding** figure, not a final tax. It counts towards the owner's yearly bill and is
reclaimed or topped up on the return.

## What the user enters

| Input | Notes |
|---|---|
| Annual rent (or monthly, converted ×12) | Gross rent, before any expense. |
| Owner type | `individual` (slab) or `company` (flat). |
| On the ATL | Drives the Tenth Schedule uplift. |
| Fiscal year | `2026-2027` back to `2021-2022`. |

## Sources this page is verified against

Every rate below is checked against **official FBR / Government of Pakistan documents only**. No
third-party rate card, tax-firm summary or blog is load-bearing anywhere on this page.

| # | Official source | Link | Cached |
|---|---|---|---|
| **S1** | Income Tax Ordinance 2001, amended up to 30 June 2026 (consolidated) | https://download1.fbr.gov.pk/Docs/2026724177725705IncomeTaxOrdinanace2001.pdf | `docs/tax-sectors/sources/IncomeTaxOrdinance2001-upto-30Jun2026.pdf` |
| **S2** | Finance Act 2021 (Act VIII of 2021), Gazette of Pakistan, 30 June 2021 | https://download1.fbr.gov.pk/Docs/2021751375221891FinanceAct2021.pdf | `…/2021751375221891FinanceAct2021.pdf` |
| **S3** | Finance Act 2022, Gazette of Pakistan | https://download1.fbr.gov.pk/Docs/2022711571639532FinanceAct2022.pdf | `…/2022711571639532FinanceAct2022.pdf` |
| **S4** | FBR Withholding Income Tax Rates Card, "Updated up to 30-06-2021" (**TY 2022**) | https://download1.fbr.gov.pk/Docs/20218151182834653202189138454560UPDATEDWHTRateCardupto30thJune2021.pdf | `…/ty2022-wht-card.pdf` |
| **S5** | FBR Withholding Income Tax Rate Card, "Updated up to June 30, 2025 as per Finance Act, 2025" (**TY 2026**) | https://download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf | `…/ty2026-wht-card.pdf` |

Both rate cards carry this disclaimer on every page, which is what settles the one place they
conflict with the statute:

> The original Statue (Income Tax Ordinance, 2001, as amended) **shall always prevail in case of any
> contradiction/error herein**. This card shall never be produced as a legal document before any
> Court of law / legal forum nor can be used for any statutory proceedings.

## Rate table as shipped

### Individual and AOP — progressive slabs

| Gross annual rent | Tax |
|---|---|
| Up to Rs 300,000 | Nil |
| 300,001 – 600,000 | 5% of the excess over 300,000 |
| 600,001 – 2,000,000 | Rs 15,000 + 10% |
| Above 2,000,000 | Rs 155,000 + 25% |

✅ **Verified against official sources**, word for word, in three of them:

- **[S1]** Ordinance, PDF p. 568 (printed p. 549), Division V(a).
- **[S4]** TY2022 card, PDF p. 24 — the same four bands, footnoted *"18 Table Substituted through
  Finance Act, 2021"*.
- **[S5]** TY2026 card, PDF p. 7 — the same four bands again.

**Why this table is right for FY 2021-22, the earliest year offered:** [S1] PDF p. 567 footnote 2
records *"The Table of Division V substituted by the Finance Act, 2021"* and prints the superseded
version — an eight-band scale starting at Rs 200,000 and topping out at 35%. That older scale belongs
to FY 2020-21 and earlier, which this calculator does not offer. The Finance Act 2026 amends
Divisions IC, III, IIIAA, IIIAB, IV and IVA of Part III and leaves Division V alone, so 2026-27
reuses the table. **One table therefore covers all six years, 2021-22 → 2026-27.**

### Company — flat

**15%** of the gross rent for a filer, **30%** for a non-filer.

✅ **Verified against official sources:**

- **[S1]** Ordinance, PDF p. 568, Division V(b): *"The rate of tax to be deducted under section 155,
  in the case of company shall be **15%** of the gross amount of rent."* The words *"for filers and
  17.5% … for non-filers"* were omitted by the Finance Act 2019, so the split now comes from the
  Tenth Schedule instead.
- **[S5]** TY2026 card, PDF p. 7, in explicit columns: company rent **ATL 15.00% / Non-ATL 30.00%**.

### Non-filer

Rule 1 of the Tenth Schedule increases the rate by 100%. `doubleBrackets` doubles **both** the rate
and the running fixed amount, which keeps the schedule internally consistent: 10% up to Rs 600,000 is
Rs 30,000, and Rs 30,000 + 20% to Rs 2,000,000 is Rs 310,000.

| Gross annual rent | Non-filer tax |
|---|---|
| Up to 300,000 | Nil |
| 300,001 – 600,000 | 10% |
| 600,001 – 2,000,000 | Rs 30,000 + 20% |
| Above 2,000,000 | Rs 310,000 + 50% |

✅ **Verified against official sources:**

- **[S1]** Ordinance, PDF p. 798 (printed p. 779), Tenth Schedule rule 1: *"the rate of tax required
  to be deducted or collected, as the case may be, shall be **increased by hundred percent** of the
  rate specified in this Ordinance"*. Its only provisos are for §231B and §236K — **there is no §155
  carve-out**.
- **[S5]** TY2026 card, PDF p. 7 — every §155 row cites *"Division-V of Part-III of First Schedule
  **read with R.1 of Tenth Schedule**"*, R.1 being that uplift rule.

The doubled slab is **derived**, not printed: the cards give the ATL slab and name R.1 rather than
spelling out the doubled bands.

### FY 2021-22 — the uplift applies here too ✅ *(fixed 3 August 2026)*

This year used to ship with **no** non-filer uplift, via a `NO_UPLIFT_YEAR` entry, on the stated basis
that §155 was outside the Tenth Schedule until the **Finance Act 2022** removed the exclusion. That
is wrong on the law and the entry has been deleted; 2021-22 now maps to `UPLIFTED_YEAR` like every
other year.

✅ **Verified against official sources.** Three of them, and they agree:

**[S2] Finance Act 2021**, PDF p. 106, item (104) — the actual amendment:

> (104) in the Tenth Schedule, in rule 10, clauses **(d)**, (f), (g), (h), (j), (m), (r) and (s)
> shall be omitted;

Its commencement, PDF p. 2, §1(2): *"It shall, unless specified otherwise, come into force on the
first day of July, 2021."* Item (104) specifies nothing otherwise, so it bites from **1 July 2021 =
tax year 2022 = FY 2021-22**.

**[S1] Ordinance**, rule 10, PDF p. 803 (printed p. 784), footnote 5 confirms both the Act and the
clause's content:

> **5** Clauses (d), (f), (g), (h), (j), (m), (r) and (s) omitted **by the Finance Act, 2021**. The
> omitted clauses read as follows: **(d) tax deducted under section 155;** …

**[S3] Finance Act 2022**, PDF p. 102, item (58)(b) — its *only* rule 10 amendment, which does **not**
mention §155:

> (b) in rule 10, – (i) after sub-rule (c), the following new sub-rule shall be inserted, namely:-
> **"(ca) tax collected or deducted under section 154A;"** and (ii) sub-rules **(e), (p) and (t)**
> shall be omitted;

(Ordinance footnote 6 is internally inconsistent about that last group — it says (e), (p) and **(t)**
were omitted, then lists the text as (e), (p) and **(q)**. No cached source has the pre-FA2022 text of
(t), so **do not cite a section number for it from this repo.** It makes no difference here: clause
(d) is not in that list on any reading.)

#### Why the TY2022 rate card does not override this

**[S4]** is the one official document that appears to support the old behaviour. Its §155 row (PDF
p. 24) prints no non-ATL line, and carries:

> **17** As per **Finance Act, 2019**, the provisions of newly inserted 10th schedule of the Income
> Tax Ordinance, 2001 shall not apply on tax deducted under section 155.

Three things make that a stale carry-over rather than an FBR position on tax year 2022:

1. **It cites the Finance Act 2019** — the position when the Tenth Schedule was first inserted and
   clause (d) was still in rule 10. It is not a statement about the year the card covers.
2. **Footnote 18, on the same row**, reads *"Table Substituted through Finance Act, 2021"* — so the
   card picked up one FA2021 change to §155 and missed the other.
3. **§156 and §156A on the very next page (PDF p. 25) do print the line §155 lacks**: *"Persons not
   appearing in the Active Taxpayers' List: The applicable tax rate is to be increased by 100%
   (Rule-1 of Tenth Schedule to the Ordinance)"*. The omission is specific to §155 and traceable to
   footnote 17.

And the card disclaims itself in favour of the Ordinance on every page (quoted above). **That is the
FBR resolving the conflict against its own card**, so this never was a card-versus-statute standoff
of the kind in `investments-capital-gains.md` §4.1 — there, NCCPL actually administers the
collection; here, a facilitation guide expressly yields to the statute.

## The algorithm

```
individual/AOP: tax = calcSlabTax(annualRent, filer ? filerSlabs : nonFilerSlabs)
company:        tax = annualRent × (filer ? 15 : 30) / 100
```

Both the filer and non-filer figures are always computed so the page can show what the ATL is worth.
The marginal bracket is returned for individuals so the result can read "Rs 15,000 + 10% of the rent
above Rs 600,000".

## Two thresholds that are not the same thing

- **Rs 300,000** — `RENTAL_TAX_FREE_LIMIT`. Rent below this is never taxed for an individual or AOP.
  It is the first row of the Division V table.
- **Rs 1,500,000** — `RENTAL_PAYER_THRESHOLD`. §155(3)(vib): an individual or AOP *tenant* only has
  to deduct once the rent they pay reaches this in a year. Companies, government bodies and the
  other listed payers deduct from the first rupee. This constant is used for on-page explanation
  only; it does not change the computed figure.

## Official sources cited on the page

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card | `…WHT-RateCard.pdf` | Correct — Division V, updated to 30 Jun 2025 so it covers FY 2025-26. This is **[S5]** above. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it leaves the rent rates unchanged, which the card says. |
| Income Tax Ordinance 2001 | amended to 30 Jun 2024 | §155 and §15A. Points at the 2024 consolidation; the 2026 one **[S1]** carries the Division V and Tenth Schedule footnotes this page relies on. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

⚠️ **The grid is missing the Finance Act 2021 [S2], and it is now load-bearing.** The repo rule is to
cite the source of every year the calculator computes. FA2021 is the source of *two* things on this
page: it substituted the Division V table the calculator uses for all six years, and it omitted §155
from Tenth Schedule rule 10, which is why FY 2021-22 non-filers are charged double. Neither claim is
traceable from the four cards above — the Ordinance card points at the 2024 consolidation, and the
rate card covers FY 2025-26 only.

`FBR_DOC_URLS.financeAct2021` already exists in `src/lib/officialSources.ts`, so this is one card in
`RENTAL_OFFICIAL_SOURCES`, not new research. Not yet added — a source grid is a published claim, so
it is being raised rather than slipped in.

**Islamic-content note:** the §15A card description says "the costs a landlord can claim". §15A
itself uses the phrase *"profit paid on money borrowed"* — the statute's own halal-compatible
wording, and the reason the page never says "interest". Keep it that way.

## Deliberately not modelled

- **§15A deductions.** A landlord's actual taxable rental income is after repairs (the 20%
  allowance), premiums to cover the building, ground rent, collection charges and the rest. This page
  prices the **withholding on gross rent**, which is what a tenant deducts, not the owner's final
  liability.
- **The final return.** Rent is added to other income and taxed on the ordinary slab; the §155
  deduction is a credit against that. Nothing here computes the balance.
- **Rent for furniture, fittings and amenities**, which §155 also covers.
- **Sub-letting** and non-resident owners.

## Verification log

### 3 August 2026 — fix applied

`NO_UPLIFT_YEAR` deleted; `'2021-2022'` now maps to `UPLIFTED_YEAR`. Because every offered year now
carries the uplift, the `nonFilerUpliftApplies` flag could never be false, so it was removed from
`RentalRateYear` and `RentalTaxResult`, along with the dead branch in `RentalFilerComparison` and the
`noUpliftNote` copy it rendered.

Four pieces of user-visible copy in `lib/content.ts` said the uplift began in 2022-23 — `slabNote`,
the `nonFilerRent` and `tax-years` FAQ answers, and `noUpliftNote` — and were corrected or removed.

Checked after the change: at Rs 1,200,000 of rent, every year 2021-22 → 2026-27 now returns
Rs 75,000 filer / Rs 150,000 non-filer for an individual and Rs 180,000 / Rs 360,000 for a company;
rent inside the Rs 300,000 free band is still nil for a non-filer in 2021-22. `lint` and `type-check`
green.

### 2 August 2026 — who removed §155 from Tenth Schedule rule 10

**Read:** Finance Act 2021 (`sources/2021751375221891FinanceAct2021.pdf`, PDF pp. 1-2 for
commencement, p. 106 for item (104)); Finance Act 2022
(`sources/2022711571639532FinanceAct2022.pdf`, PDF p. 2 for commencement, p. 102 for item (58));
Income Tax Ordinance 2001 amended to 30 Jun 2026 (`sources/IncomeTaxOrdinance2001-upto-30Jun2026.pdf`,
PDF p. 798 for rule 1, pp. 803-804 for rule 10 and its footnotes).

**Confirmed:** rule 10 clause (d) was *"tax deducted under section 155"* and was omitted by the
**Finance Act 2021**, in force 1 July 2021. Rule 1's 100% non-ATL uplift has no §155 exception.

**Changed:** the claim — in `lib/rates.ts`, in this doc, in the gitignored
`docs/tax-sectors/rental-income.md`, and in the user-visible FAQ answer `nonFilerRent` — that the
**Finance Act 2022** removed the exclusion. It did not; its only rule 10 edit inserted (ca) §154A and
omitted (e), (p), (t).

**Not resolved that day:** whether the TY2022 FBR rate card really carries a footnote excluding §155.
Settled the next day — see below.

**Negative findings, so nobody re-suffers them:**

- **`download1.fbr.gov.pk` and `fbr.gov.pk` were both unreachable** on 2 Aug 2026 — `curl` timed out
  after 75s on each, and a fetch of the TY2022 card returned `ECONNREFUSED 103.125.60.125:443`. Not a
  headless-blocking interstitial like nccpl.com.pk; the hosts simply did not answer.
- **The cached rate cards referenced by `docs/tax-sectors/rental-income.md` no longer exist.**
  `sources/fbr-wht-ratecard.pdf`, `sources/icmap-ratecard-2022-23.pdf`,
  `sources/moore-shekhamufti-wht-ty2023.pdf` and `sources/karachitaxbar-ratecard-ty2024.pdf` are all
  gone, though `sources/README.md` still tables them.

### 3 August 2026 — the TY2022 and TY2026 rate cards

**Read and now cached:** `sources/ty2022-wht-card.pdf` (39 pp., *"Updated up to 30-06-2021"*, §155 on
PDF pp. 24-25, §154A on p. 23) and `sources/ty2026-wht-card.pdf` (*"UPDATED UP TO JUNE 30, 2025 AS
PER FINANCE ACT, 2025"*, §154A and §155 both on PDF p. 7).

**Confirmed:**

- The Division V four-band table is printed identically on both cards, and the Ordinance
  (PDF p. 567, printed p. 548) footnote 2 shows that table was **substituted by the Finance Act
  2021** — so it is right for FY 2021-22 through FY 2026-27, and the pre-FA2021 eight-band table
  (Rs 200,000 floor, up to 35%) belongs to FY 2020-21 and earlier, which this calculator does not
  offer.
- Company rent **15% ATL / 30% non-ATL** — TY2026 card, explicit columns.
- §155 is uplifted: TY2026 card cites *"Division-V … read with R.1 of Tenth Schedule"* on every rent
  row.

**Settled against the code:** TY2022 footnote 17 attributes the §155 exclusion to the **Finance Act
2019**, two years stale, and the card disclaims itself in favour of the Ordinance on every page. The
FY 2021-22 no-uplift entry is a confirmed defect, not a card-versus-statute standoff.

**Still not verified:** the TY2023, TY2024 and TY2025 cards. FBR's host is **intermittent** — the
TY2022 and TY2026 cards downloaded on the first try, four others timed out at 75s across repeated
attempts in the same session. Retry rather than assume the URL is dead. Those three cards are only
needed for the freelancer question below; nothing on this page depends on them.

**Also found, and it is not about rent — the TY2022 card gives §154A** (PDF p. 23) as *"1% of the
proceeds of the export"* with *"Persons not appearing in the Active Taxpayers' List: … increased by
100% (Rule-1 of Tenth Schedule)"*, and no 0.25% PSEB row at all. The TY2026 card gives §154A as
0.25%/**0.5%** and 1%/**2%**, cited to *"Division-IVA … read with R.1 of Tenth Schedule"*. See
[freelancer-tax.md](freelancer-tax.md#non-filer-column).

**Also found, and it is not about rent:** the same footnote block shows rule 10 **(ca) "tax collected
or deducted under section 154A"**, inserted by the Finance Act 2022 and **still live** in the 2026
consolidation (no omission footnote). That contradicts what
[freelancer-tax.md](freelancer-tax.md#non-filer-column--️-not-verified) says, and it inverts that
page's open question. Recorded in
[open-questions.md](open-questions.md#-freelancer-fy-2021-22-non-filer-rate-and-pseb-rate).
