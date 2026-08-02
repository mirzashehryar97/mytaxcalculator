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

## Sources this page is verified against

✅ Every rate below was read out of one of these. All are FBR / Government of Pakistan
publications — no third-party rate cards, per [conventions.md](conventions.md).

| # | Official source | URL | Cached |
|---|---|---|---|
| **S1** | Income Tax Ordinance 2001, amended to 30 June 2026 | https://download1.fbr.gov.pk/Docs/2026724177725705IncomeTaxOrdinanace2001.pdf | `sources/IncomeTaxOrdinance2001-upto-30Jun2026.pdf` |
| **S2** | Finance Act 2021 (gazette, 30 June 2021) | https://download1.fbr.gov.pk/Docs/2021751375221891FinanceAct2021.pdf | `sources/2021751375221891FinanceAct2021.pdf` |
| **S3** | Finance Act 2022 (gazette, 30 June 2022) | https://download1.fbr.gov.pk/Docs/2022711571639532FinanceAct2022.pdf | `sources/2022711571639532FinanceAct2022.pdf` |
| **S4** | FBR WHT Rates Card, **TY2022** — "updated up to 30-06-2021" | https://download1.fbr.gov.pk/Docs/20218151182834653202189138454560UPDATEDWHTRateCardupto30thJune2021.pdf | `sources/ty2022-wht-card.pdf` |
| **S5** | FBR WHT Rate Card, **TY2026** — "as per Finance Act, 2025" | https://download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf | `sources/ty2026-wht-card.pdf` |
| **S6** | FBR WHT Rates Card, **TY2023** — "as per Finance Act, 2022 — updated up to June 30, 2022" | https://download1.fbr.gov.pk/Docs/20229131493643904WithholdingRatesCardsUpdated30.06.2022.pdf | `sources/ty2023-wht-card.pdf` |
| **S7** | FBR WHT Rates Card, **TY2025** — "as per Finance Act, 2024 — updated up to June 30, 2024" | https://download1.fbr.gov.pk/Docs/20248211184455183WithholdingTaxRegimeRatesCard2024.pdf | `sources/ty2025-wht-card.pdf` |
| **S8** | FBR consolidated "Withholding Tax Rates From Tax Year 2021 to Tax Year 2025" (xlsx) | https://download1.fbr.gov.pk/Docs/20259112911573292b_WHT-Rates-2021-2025-Consolidated.xlsx | `sources/wht-rates-2021-2025-consolidated.xlsx` |

S1–S5 are numbered to match [rental-income-tax.md](rental-income-tax.md#sources-this-page-is-verified-against),
which shares those documents. **S8 is cited only to be disbelieved** — see
[§ The consolidated spreadsheet contradicts the cards](#the-consolidated-spreadsheet-contradicts-the-cards-it-consolidates).

**A card is missing and it is FBR's fault, not ours.** The TY2024 card (updated to 30 June 2023)
is still listed on FBR's rate-card index page, but its document URL —
`https://download1.fbr.gov.pk/Docs/20238215830342WithholdingRatesCards.pdf` — returns **404** over
both http and https. FY 2023-24 therefore has no contemporaneous card, and is verified from the
statute plus the cards either side of it.

## Rate table as shipped

| Year | PSEB + ATL | PSEB, not ATL | No PSEB, ATL | No PSEB, not ATL | Verified from |
|---|---|---|---|---|---|
| 2026-27 | 0.25% | 0.5% | 1% | 2% | S1, S5 |
| 2025-26 | 0.25% | 0.5% | 1% | 2% | S5 |
| 2024-25 | 0.25% | 0.25% | 1% | 1% | S1, S7 |
| 2023-24 | 0.25% | 0.25% | 1% | 1% | S1 (no card exists) |
| 2022-23 | 0.25% | 0.25% | 1% | 1% | S1, S3, S6 |
| **2021-22** | **n/a — 1%** | **n/a — 2%** | **1%** | **2%** | S1, S2, S4 |

FY 2021-22 has no PSEB column at all: `psebRateAvailable: false` on that year's rate object, so the
calculator charges the flat rate whatever the toggle says, hides the PSEB-saving comparison, and
tells the user why.

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

### Non-filer column

> ⚠️ **This section has been wrong twice, in opposite directions.** It first said §154A "is not
> in rule 10, and never has been" (false — it is). Corrected 2 Aug 2026 to conclude that the current
> years were therefore *over*-charged. **Also wrong**, and the rate cards read on 3 Aug 2026 are what
> settled it. The current years are right. Do not re-derive this from the Ordinance alone.

**The statute and the FBR's own cards disagree about §154A from FY 2025-26 onwards**, and the code
follows the cards. Before that they agree, and the shipped rates follow both.

✅ **Verified against official sources.** Rule 10 (**[S1]** PDF p. 803, printed p. 784) reads *"4[(ca) tax collected or
deducted under section 154A;]"*, footnoted *"New sub-rule (ca) inserted by the Finance Act, 2022"*,
with **no omission footnote** — so on the face of the Ordinance §154A has sat *outside* the Tenth
Schedule since 1 July 2022 and no uplift should apply.

The two cards that fall inside that window agree with the Ordinance, and print **"No Change"** in
the Not-on-ATL column against both §154A rows:

| Card | Covers | §154A rows | Not on ATL |
|---|---|---|---|
| **S6** TY2023 (PDF pp. 8-9) | FY 2022-23 | PSEB 0.25% · any other case 1% | *No Change* |
| **S7** TY2025 (PDF p. 9) | FY 2024-25 | PSEB 0.25% · any other case 1% | *No Change* |

Both still print the reference *"Division IVA of Part III of First Schedule, Read with R.1 of 10th
Schedule"* while showing no increase, so the reference line alone proves nothing about the rate.

The **TY2026 rate card** (**[S5]**, PDF p. 7) then says the opposite, in a table with explicit ATL
and non-ATL columns:

| §154A Export of Services | ATL | Non-ATL | Reference printed on the card |
|---|---|---|---|
| PSEB-registered software / IT / ITeS | 0.25% | **0.5%** | Division-IVA of Part-III of First Schedule **read with R.1 of Tenth Schedule** |
| Any other case | 1.00% | **2.00%** | Division-IVA of Part-III of First Schedule **read with R.1 of Tenth Schedule** |

R.1 is the 100% uplift rule. The card cites it by name for a section rule 10 excludes.

**The shipped FY 2025-26 and FY 2026-27 rates match that card exactly**, so they are the
best-supported figures available and should not be changed on the strength of rule 10 alone. Recorded
as a live conflict rather than resolved silently, per
[conventions.md](conventions.md) — the same shape as the NCCPL disagreement in
`investments-capital-gains.md` §4.1.

Note the card is not simply sloppy about rule 10: on the row above, it cites **§154 exports** to
*"R.10(c) of Tenth Schedule"* — the exclusion clause, by number — and still prints 1% ATL against 2%
non-ATL. Whatever the FBR is doing there, it is doing it deliberately and consistently.

#### FY 2021-22 was a different matter — fixed 3 August 2026

✅ **Verified against official sources**, and here the statute and the card **agreed with each other
and against the code**, which is why this one was safe to change.

**Two things were wrong, and both are now fixed.**

**1. There was no PSEB rate that year.** Division IVA as the Finance Act 2021 inserted it (**[S2]**,
PDF p. 75 = gazette printed p. 283) is one sentence, with no table:

> "Division IVA — Exports of Services — The rate of tax to be deducted under section 154A shall be
> **one percent of the proceeds of the export**."

The two-row PSEB table only appears when the **Finance Act 2022** substitutes the whole Division
(**[S3]**, PDF p. 88): *"for Division IVA, the following shall be substituted"* → *"1. Export
proceeds of Computer software or IT services or IT Enabled services by persons registered with
Pakistan Software Export Board — 0.25% of proceeds; 2. Any other case — 1% of proceeds"*. That
commences 1 July 2022, i.e. **FY 2022-23**. The *"for tax years 2024 up to tax year 2029"* qualifier
on the PSEB row came later still, from FA2023 as amended by FA2026 (**[S1]** PDF p. 566, footnotes
9-12).

The **TY2022 card** (**[S4]**, PDF p. 23) matches: a single §154A row reading *"1% of the proceeds of
the export"*, with **no PSEB row anywhere on the page**, footnoted *"Inserted through Finance Act,
2021"*.

**2. Non-filers paid double.** The same card row continues:

> **Persons not appearing in the Active Taxpayers' List:** The applicable tax rate is to be increased
> by 100% (Rule-1 of Tenth Schedule to the Ordinance)

Rule 10's `(ca)` did not exist yet — it arrives with FA2022 on 1 July 2022 — so rule 1 applied on
the statute as well. Card and Ordinance agree.

**What shipped:** `FA2021_FLAT_FREELANCER_RATE` in `lib/rates.ts` carries `psebRateAvailable: false`
and 1% / 2%. `calcFreelancerTax` refuses PSEB eligibility for the year, so the badge cannot claim the
concessional rate; `FreelancerPsebComparison` swaps the "tax saved with PSEB registration" panel for
a note explaining the concession did not exist yet; and the PSEB control's help text says the same.
The FY 2021-22 figures were 0.25% / 1% before this and are 1% / 2% now.

#### The consolidated spreadsheet contradicts the cards it consolidates

⚠️ **Do not use S8.** FBR publishes a workbook titled *"Withholding Tax Rates From Tax Year 2021 to
Tax Year 2025"*, linked from the same rate-card index page as the PDFs. For §154A it prints
**0.25% / 0.5% and 1% / 2% in every one of tax years 2022 through 2025** — which contradicts the
contemporaneous TY2023 (**S6**) and TY2025 (**S7**) cards it is supposedly consolidating, both of
which say *No Change*.

It is demonstrably back-propagated rather than compiled: its **tax-year-2022** row already carries
the description *"Export proceeds for tax year 2024 up to tax year 2026"*, wording that did not exist
until FA2023, and describes a PSEB row that did not exist in TY2022 at all. Its TY2021 row is
self-inconsistent on its face (1% ATL against 0.5% non-ATL).

**Where a retrospective FBR compilation and a contemporaneous FBR card disagree about a past year,
this page follows the contemporaneous card.** Recorded rather than silently discarded, per
[conventions.md](conventions.md).

**Every offered year now has an official source.** FY 2023-24 is the weakest: its own card is 404 on
FBR's server, so it rests on **[S1]** (Division IVA unchanged between FA2023 and FA2024, rule 10(ca)
live) plus the cards on either side of it, **S6** and **S7**, which agree with each other.

✅ Resolved in [open-questions.md](open-questions.md#-freelancer-fy-2021-22-non-filer-rate-and-pseb-rate).

## The algorithm

```
grossPkr = monthlyAmount × 12 × (currency === 'USD' ? exchangeRate : 1)
rate     = psebRegistered ? (atl ? psebAtl : psebNonAtl)
                          : (atl ? standardAtl : standardNonAtl)
tax      = grossPkr × rate / 100
net      = grossPkr − tax
```

In FY 2021-22 the `psebAtl`/`standardAtl` pair and the `psebNonAtl`/`standardNonAtl` pair hold the
same numbers, so the branch above is a no-op that year — correct by construction rather than by a
special case in the formula.

It also computes `concessionTax` (always at the PSEB+ATL rate) and `standardTax` (always at the
plain ATL rate) so the page can show what PSEB registration is worth. `taxSavings` is only non-zero
when the user is actually eligible — PSEB **and** ATL **and** a year that had a PSEB rate;
`potentialTaxSavings` shows the same figure to someone who is not, as an incentive. Both are zero in
FY 2021-22, which is why `FreelancerPsebComparison` hides that panel rather than showing "Rs. 0".

Negative, non-finite and zero inputs all collapse to zero rather than producing `NaN`.

## Official sources cited on the page

Updated 3 August 2026 so the grid covers every year the calculator computes, per
[conventions.md](conventions.md).

| Card | Document | Fit |
|---|---|---|
| FBR Withholding Income Tax Rate Card | **S5** | Correct — updated to 30 Jun 2025, so it covers FY 2025-26 and FY 2026-27. |
| Finance Act 2026 | `…FinanceAct2026.pdf` | Correct — it is the Act that extended 0.25% to TY 2029. |
| **Finance Act 2022** (added) | **S3** | It substituted Division IVA with the 0.25% / 1% table used from FY 2022-23. |
| **Finance Act 2021** (added) | **S2** | It created §154A and set the flat 1% the calculator uses for FY 2021-22. |
| **FBR WHT Rate Card 2022** (added) | **S4** | Updated to 30 Jun 2021 — the card behind the FY 2021-22 figures, including the 100% non-filer increase. |
| Income Tax Ordinance 2001 | **S1** (was the 30 Jun 2024 consolidation) | Repointed at `incomeTaxOrdinance2026`, which is the version carrying the current Division IVA and rule 10 footnotes. |
| FBR IRIS Portal | `iris.fbr.gov.pk` | Correct. |

FY 2023-24 remains uncited on-page because **no official document for it exists to link** — the
TY2024 card is 404 and no Finance Act moved the rate that year. It is covered by the Ordinance card.

### A dead link found while doing this

`FBR_DOC_URLS.whtRateCard2023` pointed at the 404'd TY2024 card and was rendered live in the
**withholding-tax** calculator's official-sources grid, described as "updated to 30 June 2023,
behind the 2023-24 and 2024-25 figures". Replaced with `whtRateCardTy2025` (**S7**, updated to
30 June 2024) and the description narrowed to the year it actually evidences. The key is now one of
four named by tax year — `whtRateCard` (TY2026), `whtRateCardTy2025`, `whtRateCardTy2023`,
`whtRateCardTy2022` — with a comment warning that the TY2024 URL is dead.

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
- **The 0.25% concession's sunset.** Division IVA writes the PSEB rate as running *"up to tax year
  2029"* (**[S1]** PDF p. 566, footnote 12 — FA2026 substituting FA2023's "2026"). Nothing encodes
  that end date because no offered year reaches it. It will matter for FY 2029-30.

## Verification log

### 3 August 2026 — the rate cards, read directly

FBR's download host was unreachable on 2 August; it came back on 3 August, though intermittently
(three files downloaded first try, one 404s permanently). Cached **S6**, **S7** and **S8**.

| Source | What it settled |
|---|---|
| **S2** FA2021 PDF p. 75 | Division IVA started as one sentence: flat 1%, no PSEB row. **Changed FY 2021-22.** |
| **S3** FA2022 PDF p. 88 | *"for Division IVA, the following shall be substituted"* → the 0.25% / 1% table, in force 1 Jul 2022. Same Act inserts rule 10(ca). |
| **S4** TY2022 card PDF p. 23 | Flat 1%, no PSEB row, *"increased by 100% (Rule-1 of Tenth Schedule)"*. Card and statute agree. **Changed FY 2021-22.** |
| **S6** TY2023 card PDF pp. 8-9 | 0.25% / **No Change**, 1% / **No Change**. **Confirmed FY 2022-23; nothing changed.** Also disproves this doc's earlier guess that FY 2022-23 might have had no PSEB rate — it did. |
| **S7** TY2025 card PDF p. 9 | Identical. **Confirmed FY 2024-25; nothing changed.** |
| **S5** TY2026 card PDF p. 7 | 0.25% / 0.5% and 1% / 2%. **Confirmed FY 2025-26 and FY 2026-27; nothing changed.** Still conflicts with rule 10(ca); still followed. |
| **S8** consolidated xlsx | Contradicts S6 and S7 about their own years. **Rejected**, and recorded so nobody re-derives from it. |

**The methodological lesson, since this page got it wrong twice.** S6 and S7 both print the reference
*"Division IVA … Read with R.1 of 10th Schedule"* while showing **no** increase in the Not-on-ATL
column. **The reference line on an FBR card is not a rate claim** — only the ATL / Not-on-ATL columns
are. Both earlier wrong conclusions came from reasoning about rule 1 and rule 10 instead of reading
the columns.

**Extraction notes.** S7's text layer is garbled OCR (`pypdf` returns mojibake, and a bare grep for
"154A" finds nothing on a page that plainly shows it). Render with `pymupdf` at 170 dpi and read the
image. S4 and S6 extract cleanly. Same trap as the FBR gazette PDFs noted in
`capital-gains-tax-calculators`.

**Also fixed while here:** `FBR_DOC_URLS.whtRateCard2023` pointed at the 404'd TY2024 card and was
live in the withholding-tax page's source grid. See
[§ A dead link found while doing this](#a-dead-link-found-while-doing-this).
