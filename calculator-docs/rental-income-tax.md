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
| **S6** | FBR Withholding Income Tax Rates Card, "as per Finance Act, 2022 — updated up to June 30, 2022" (**TY 2023**) | https://download1.fbr.gov.pk/Docs/20229131493643904WithholdingRatesCardsUpdated30.06.2022.pdf | `…/ty2023-wht-card.pdf` |
| **S7** | FBR Withholding Income Tax Rates Card, "as per Finance Act, 2024 — updated up to June 30, 2024" (**TY 2025**) | https://download1.fbr.gov.pk/Docs/20248211184455183WithholdingTaxRegimeRatesCard2024.pdf | `…/ty2025-wht-card.pdf` |

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

✅ **Verified against official sources**, word for word, in six of them:

- **[S1]** Ordinance, PDF p. 568 (printed p. 549), Division V(a).
- **[S2]** Finance Act 2021, PDF p. 75, Part I item (C)(h) — the enacting text itself: *"in Division
  V, for the TABLE, the following shall be substituted, namely:—"*, followed by these four bands
  verbatim.
- **[S4]** TY2022 card, PDF p. 24 — the same four bands, footnoted *"18 Table Substituted through
  Finance Act, 2021"*.
- **[S6]** TY2023 card, PDF p. 9 — the same four bands.
- **[S7]** TY2025 card, PDF p. 9-10 — the same four bands.
- **[S5]** TY2026 card, PDF p. 7 — the same four bands again.

**Why this table is right for FY 2021-22, the earliest year offered:** [S2] enacts it with effect
from 1 July 2021, and [S1] PDF p. 567 footnote 2 records *"The Table of Division V substituted by the
Finance Act, 2021"* and prints the superseded version — an eight-band scale starting at Rs 200,000
and topping out at 35%. That older scale belongs to FY 2020-21 and earlier, which this calculator
does not offer.

**Why it is still right for FY 2026-27:** [S1] is the consolidation *after* the Finance Act 2026 — it
carries FA2026 amendments (Tenth Schedule rule 10(y) is marked *"omitted by the Finance Act, 2026"*,
PDF p. 804). Its Division V table still traces to FA2021 with no later substitution footnote, so
FA2026 left Division V alone. **One table therefore covers all six years, 2021-22 → 2026-27.**

### Company — flat

**15%** of the gross rent for a filer, **30%** for a non-filer.

✅ **Verified against official sources:**

- **[S1]** Ordinance, PDF p. 568, Division V(b): *"The rate of tax to be deducted under section 155,
  in the case of company shall be **15%** of the gross amount of rent."* The words *"for filers and
  17.5% … for non-filers"* were omitted by the Finance Act 2019, so the split now comes from the
  Tenth Schedule instead.
- **[S5]** TY2026 card, PDF p. 7, in explicit columns: company rent **ATL 15.00% / Non-ATL 30.00%**.
- **[S6]** TY2023 card, PDF p. 9 — company row **15% / 30%**.
- **[S7]** TY2025 card, PDF p. 10 — company row **15% / 30%**.

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
- **[S6]** TY2023 card, PDF p. 9 and **[S7]** TY2025 card, PDF p. 9 — both print, in the *"Not on
  ATL"* column against the individual/AOP rent block, the words **"100% increase"**, cited to
  *"Division V of Part III of First Schedule Read with R.1 of 10th Schedule"*. These two are the
  FBR saying the uplift applies to §155 rent in FY 2022-23 and FY 2024-25 in its own words.

The doubled *bands* are still **derived**, not printed: the cards give the ATL slab and either name
R.1 or say "100% increase" rather than spelling out the doubled figures. Doubling the rate and the
running fixed amount together is the same operation as doubling the whole tax function — for
`tax(x) = fixed + rate × (x − min)`, `2 × tax(x) = 2·fixed + 2·rate × (x − min)` — so the shipped
non-filer figure is exactly twice the filer figure at every rent, which is what "increased by hundred
percent" means.

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

| Finance Act 2021 | `…FinanceAct2021.pdf` | Correct — **added 4 August 2026**. This is **[S2]**. |

**Why the Finance Act 2021 card had to be there.** The repo rule is to cite the source of every year
the calculator computes. FA2021 is the source of *two* things on this page: it substituted the
Division V table the calculator uses for all six years (gazette p. 75), and it omitted §155 from
Tenth Schedule rule 10, which is why FY 2021-22 non-filers are charged double (p. 106). Neither
claim was traceable from the other four cards — the Ordinance card points at the 2024 consolidation,
and the rate card covers FY 2025-26 only.

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

### 4 August 2026 — full audit of the shipped page against the primary sources

Every rate, threshold and legal claim on the page was re-checked against the cached documents rather
than against this doc. **All of them hold.** New citations and four defects came out of it.

**Read:**

| Document | Where | What it settled |
|---|---|---|
| Ordinance to 30 Jun 2026 | PDF p. 568 (printed 549) | Division V(a) four bands and V(b) 15% company, verbatim as shipped. |
| ” | PDF p. 567 (printed 548), fn 2 | Table substituted by FA2021; superseded eight-band Rs 200,000→35% scale printed. |
| ” | PDF p. 798 (printed 779) | Tenth Schedule rule 1, 100% uplift, provisos for §231B and §236K only. |
| ” | PDF p. 803 (printed 784), fn 5 | Rule 10 clause (d) *"tax deducted under section 155"* omitted by FA2021. |
| ” | PDF p. 804, fn 7 | Rule 10(y) *"omitted by the Finance Act, 2026"* — proves this consolidation is post-FA2026. |
| ” | PDF p. 358 (printed 339), fn 5 | §155(2), which made the deduction final, **omitted by the Finance Act 2010** — the statutory basis for the page's "adjustable, not final" claim. |
| ” | PDF p. 359 (printed 340) | §155(3) prescribed persons, incl. **(vib)** *"individuals or association of persons paying gross rent of rupees one and a half million and above in a year"*. |
| ” | PDF pp. 77-79 (printed 58-60) | §15A deductions. Clause **(h)** caps administration and collection at **four** per cent — fn 6: *"The word 'six' substituted by 'four' through Finance Act, 2020"*. The page's 4% is right. Clause (b) is *"any premium … to insure the building"*, clause (e) *"any profit … on any money borrowed"*. |
| ” | PDF p. 77, fns 5-6 | §15A applies to a **person** since FA2021 (it read "company" from FA2016 to FA2021), and §15(6)/(7) were omitted by FA2021 — so from FY 2021-22 an individual landlord genuinely can claim these, which is what the page tells them. |
| ” | PDF p. 157 (printed 138) | **§66 Income of joint owners** — see defect 4 below. |
| Finance Act 2021 | PDF p. 75, item (C)(h) | *"in Division V, for the TABLE, the following shall be substituted"* + the four bands. The enacting text, not just the Ordinance footnote. |
| ” | PDF p. 2 §1(2); PDF p. 106 item (104) | Commencement 1 July 2021; rule 10 clauses (d), (f), (g), (h), (j), (m), (r), (s) omitted. |
| Finance Act 2022 | PDF p. 102 item (58) | (a) adds the rule 1 provisos for §231B and §236K; (b) is its **only** rule 10 edit — inserts (ca) §154A, omits (e), (p), (t). §155 untouched, as recorded 2 Aug. |
| TY2022 card | PDF pp. 24-25 | Four bands, fn 17 (FA2019 exclusion) and fn 18 (FA2021 table), company 15%, no non-ATL line. As recorded 3 Aug. |
| **TY2023 card** | PDF p. 9 | **New.** Four bands; *"Not on ATL"* = **"100% increase"**; company **15% / 30%**; reference *"Division V of Part III of First Schedule Read with R.1 of 10th Schedule"*. |
| **TY2025 card** | PDF pp. 9-10 | **New.** Same again: four bands, **"100% increase"**, company **15% / 30%**, same reference. |
| TY2026 card | PDF p. 7 | Four bands, company 15.00% / 30.00%, R.1 reference on every row. As recorded 3 Aug. |

**Confirmed, nothing changed:** the shipped `FILER_SLABS`, `doubleBrackets`, the 15%/30% company
rates, `RENTAL_TAX_FREE_LIMIT` (300,000), `RENTAL_PAYER_THRESHOLD` (1,500,000), the §15A list
including the 4% cap, the "adjustable not final" framing, and the six-year coverage.

**Changed in this doc:** [S6] and [S7] added to the source table; FA2021 p. 75 added as the direct
authority for the Division V table; the "still not verified" line above corrected; the doubling
argument written out.

**Negative finding, so nobody re-suffers it:** `ty2025-wht-card.pdf` is a **rotated scan with a
garbled OCR text layer** — `get_text()` returns transliterated nonsense and greps on it lie. Render
it (`fitz` → `page.get_pixmap(dpi=170)`) and read the image. `sources/README.md` says the same.

**Defects found. None of them is a wrong rate. All four were fixed the same day — see the
"fixes applied" entry below.**

1. **Slab-gap → negative tax on a fractional rent.** `FILER_SLABS` bands run `max: 300_000` then
   `min: 300_001`, and `findTaxBracket` (`src/utils/slabEngine.ts`) matches on `amount >= min &&
   amount <= max`. A rent strictly inside a gap matches nothing, falls through to `brackets.at(-1)`,
   and `calcSlabTax` returns `155_000 + (amount − 2_000_001) × 0.25` — a large negative. Reachable:
   `NumberInput` is `type="number" step="any" inputMode="decimal"`, so a monthly rent of 25,000.05
   gives an annual 300,000.60 and a "tax taken out" of **−Rs 270,000**; 50,000.05/month gives
   −Rs 195,000. Shared-engine bug, but it surfaces here because rent is entered monthly and ×12.
2. **Band edges are 5-25 paisa light of the statute.** Division V charges *"5 per cent of the gross
   amount exceeding Rs. 300,000"*, but the code computes `(amount − 300_001) × 5%`. Rs 600,000 of
   rent yields 14,999.95 where the statute says 15,000. `formatPkr` rounds it away at most rents, but
   it flips a rupee at a .5 boundary — Rs 600,005 of rent is Rs 15,000.50 in law, and the page shows
   Rs 15,000. Setting the band `min`s to 300,000 / 600,000 / 2,000,000 fixes this **and** defect 1 in
   one edit (band 1 still wins at exactly 300,000 because it is matched first on its `max`), but
   `marginalBandStart` in `lib/calculation.ts` then has to become `marginalBracket.min` instead of
   `min − 1`.
3. **The published review date predates the correction.** `RENTAL_GUIDE_COPY.reviewedLabel` /
   `reviewedDateTime` say 29 July 2026 and `routeMeta['/rental-income-tax-calculator'].dateModified`
   agrees, which also feeds the JSON-LD `dateModified`. The rate model changed on **3 August 2026**
   (commit `b3ca648`): FY 2021-22 non-filer rent doubled and the company non-filer rate went 15% →
   30%. A "last reviewed" date is a published claim and this one is older than the fix.
4. **`RENTAL_TERMS.aop` states the law backwards, and contradicts the page's own FAQ.** The tooltip
   says two or more people owning a property together are an AOP and *"the group is taxed as one"*.
   **§66(1)** (Ordinance PDF p. 157, printed 138) says the opposite where the ordinary case is
   concerned:

   > where any property is owned by two or more persons and their respective shares are definite and
   > ascertainable – (a) the persons **shall not be assessed as an association of persons** in
   > respect of the property; and (b) the share of each person in the income from the property …
   > shall be taken into account in the computation of the person's taxable income

   The `multiple-properties` FAQ on the same page gets it right (*"each owner is taxed on their own
   share of the rent, so enter only your share"*). Changes no figure — individual and AOP share the
   slab — but one of the two statements is wrong and they sit on the same page. AOP treatment is for
   a genuine AOP or where the shares are not definite and ascertainable.

**Also fixed:** the Finance Act 2021 is now in the on-page official-sources grid, closing the item
left open on 3 August.

**Clean:** the Islamic-content sweep over `src/features/rental-income-tax/` returns nothing for
`interest`, `bond`, `money market`, `insurance`, `profit on debt`, `futures`, `PMEX`, `riba`,
gambling, alcohol, pork or tobacco. §15A(1)(b) is rendered as *"Premiums paid to cover the building
against damage or destruction"* and §15A(1)(e) as *"Profit paid on money you borrowed"* — the
statute's own wording in both cases. Icons are `Home`, `Check`, `Info`, `Building2`, `Calculator`,
`Wallet`, `Layers`, `BadgeCheck`, `BarChart3`, `FileText`, `Receipt`, `CheckCircle2` — no
`PiggyBank`, no `CandlestickChart`.

### 4 August 2026 — fixes applied

All five items above are done.

**1 and 2 — the slab bands now abut, site-wide.** Every `min` written as `X + 1` became `X`, in
`utils/taxCalculator.ts` (110 bands), `business-tax` (18), `agricultural-tax` (5) and this
calculator (3). `findTaxBracket` now selects on the **upper bound alone**, so a gap cannot reappear
even if a table is written badly, and `slabEngine.ts` gained `bandStart(min)` (first rupee inside a
band, for labels) and `isBandReached(bracket, amount)` (has the amount passed this band's floor).
Callers that hand-rolled `min - 1` or `>= min` were moved onto those: `SlabsAnswer`,
`lib/budgetComparison`, `agricultural-tax/lib/presentation`, both salary insights modules, and the
`marginalBandStart` in this feature's and business's `calculation.ts`.

Checked, not assumed:

- A 2,013-row **engine-level** probe across every salary year, every rent year × owner × filer
  status, and every business year, at 31 amounts each including band edges and fractional amounts.
  Every row is **identical**, a gap fix, or a ≤1-unit statutory correction — **zero unexplained
  changes**, and **zero** negative results where there were 72 before.
- An **entry-point** probe (8,400 cases) driving each calculator's real exported entry — not
  `calcSlabTax` — with an amount 0.5 above each of the 120 band edges across every year it offers:
  **134 negatives → 0**. It also established that the negative was *not* reachable on four salary
  surfaces, because `calculateBudgetYearTax` and `calcReverseSalary` round before the slabs. The
  per-surface counts are the table in [open-questions.md](open-questions.md). This corrects an
  earlier version of this entry that implied every slab surface was affected.
- Rent now returns the statutory figures exactly: Rs 600,000 → **Rs 15,000** (was 14,999.95),
  Rs 1,200,000 → **Rs 75,000**, Rs 2,000,000 → **Rs 155,000**, Rs 600,005 → **Rs 15,000.50**.
- Every published slab-table label was rendered from a git worktree at the pre-fix commit and
  diffed against the same labels now: **byte-identical**. `bandStart` restores the `600,001 –
  1,200,000` range starts, and the "above/exceeding/over" bases are now plain `min`.
- A gapless verifier over **45 tables / 301 bands** reports 0 problems.
- `lint`, `type-check` and `build` all green.

**3 — review date.** `reviewedLabel` / `reviewedDateTime` and `routeMeta.dateModified` moved to
4 August 2026, so the published date is no longer older than the correction it covers.

**4 — the AOP tooltip** now says an AOP is a partnership or group taxed as one, and that co-owners
holding a fixed, known share are taxed separately on their own share — which is §66 and agrees with
the `multiple-properties` FAQ instead of contradicting it.

**5 — Finance Act 2021** added to `RENTAL_OFFICIAL_SOURCES`, described as what it is: it set the
§155 rent table used for every year here and removed rent from the Tenth Schedule exclusions.
`FBR_DOC_URLS.financeAct2021` already existed.

**Not changed, deliberately:** the grid's Ordinance card still points at the 30 June 2024
consolidation. That text is correct for everything this page claims — Division V, rule 1, rule 10,
§155 and §15A are all unchanged since — and swapping this one page to the 2026 consolidation while
five other grids still cite 2024 would make the site less consistent, not more. It stays tracked as
a site-wide item in [open-questions.md](open-questions.md#salary-official-sources-cite-the-2024-ordinance).

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

**Still not verified that day:** the TY2023, TY2024 and TY2025 cards. FBR's host is **intermittent** —
the TY2022 and TY2026 cards downloaded on the first try, four others timed out at 75s across repeated
attempts in the same session. Retry rather than assume the URL is dead. (TY2023 and TY2025 were
cached later the same day and read on 4 August — see below. TY2024 is still missing: its FBR document
URL 404s, which `src/lib/officialSources.ts` already records, so **FY 2023-24 has no card of its
own** and rests on the Ordinance plus the cards either side of it.)

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
