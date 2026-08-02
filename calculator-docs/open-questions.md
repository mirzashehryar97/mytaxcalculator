# Open questions, gaps and known conflicts

Everywhere the shipped code and the primary source do not line up, or where a figure could not be
traced. Written 2 August 2026 against the code at that date, and revised the same day — first when
the §4AB surcharge entries below were fixed, then when the Finance Acts 2021 and 2022 were read in
the gazette and settled who removed §155 from the Tenth Schedule (and showed the freelancer entry to
be pointing at the wrong years).

Revised again **3 August 2026**, when FBR's download host came back and the withholding rate cards
for tax years 2022, 2023, 2025 and 2026 were read directly. That closed the rental entry and the
freelancer entry, and left one genuine conflict (§154A from FY 2025-26) recorded rather than
resolved.

Four kinds of entry:

- 🔴 **Defect** — the calculator produces a figure the law does not support.
- 🟡 **Unverified** — the figure is probably right but nothing in this pass confirmed it.
- 🔵 **Deliberate** — a known departure that was decided on purpose. Do not "fix" without reading why.
- ✅ **Resolved** — was a defect, now fixed. Kept so the reasoning is not lost.

---

## 🟡 Surcharge is not itemised on four of the six salary surfaces

**Pages:** [multi-year-salary-tax.md](multi-year-salary-tax.md),
[reverse-salary.md](reverse-salary.md),
[salary-increment-and-job-offer.md](salary-increment-and-job-offer.md),
[budget-comparison](salary-tax.md#every-caller-of-the-salary-engine)

Every salary surface now **charges** the §4AB surcharge, but only the single-year home tab and the
embed **show** it ("Includes Rs. X surcharge"). On the other four it is folded into one tax figure.

Not a wrong number — a number a reader cannot reconcile. Someone above Rs 10 million who checks the
multi-year tab against the published slab table will find the tax higher than the slabs give and no
explanation on the page. The surcharge is also the one part of the bill that behaves like a cliff
rather than a slab, which is exactly what a reader would want flagged.

**Fix:** surface `salaryTaxForYear`'s `surcharge` in those four result shapes and render the same
note the single-year tab uses. The data is already computed; only the view-models drop it.

---

## ✅ §4AB surcharge was applied on some salary pages and not others

**Pages:** [salary-tax.md](salary-tax.md#surcharge--4ab), and every other salary doc ·
**Code:** `src/utils/taxCalculator.ts` → `salaryTaxForYear`

Filed as four separate 🔴 defects, all one bug: **six callers of the salary engine, three of which
applied the surcharge and three of which did not.**

- The multi-year tab, reverse salary and increment/job offer called `calculateTaxForTotalAmount`
  directly, so they charged no surcharge at all. The two tabs of the home page disagreed above
  Rs 10 million, and reverse salary quoted a gross that was **too low** — it told people to ask for
  less than they needed.
- The three that did apply it hard-coded `fiscalYear === '2025-2026'`, so **FY 2024-25 was
  understated everywhere**, including the pages that were otherwise right. §4AB was inserted by the
  Finance Act 2024 — tax year 2025 = FY 2024-25 — at 10% of the tax where taxable income exceeds
  Rs 10 million, for *"every individual and association of persons"*; the salaried proviso cutting it
  to 9% did not arrive until the Finance Act 2025. Source: Income Tax Ordinance 2001 (amended to
  30 Jun 2026), PDF p. 53, §4AB and footnotes 4, 6, 7.
- `features/budget-comparison/lib/calculation.ts` kept its **own** copy of the rate and threshold,
  a second place for the two to drift apart.

**Fixed** by `salaryTaxForYear(annualGross, fiscalYear)` in `utils/taxCalculator.ts`, which owns both
the slab lookup and a per-year `salarySurcharges` table (10% at 2024-25, 9% at 2025-26, absent
thereafter). All six callers go through it; the duplicate constants are gone; and the slab page's
prose figures are read off the same table. The old `calculateTax` wrapper, which returned the
slab tax with no surcharge, was **deleted** rather than left as a second entry point.

Two things fell out of the fix that were not in the original reports:

- **Take-home is not monotonic in gross.** The surcharge lands on the whole slab tax at once, so
  crossing Rs 10 million *drops* take-home by the full surcharge — Rs 7,319,000 at Rs 10,000,000
  becomes Rs 7,077,710 one rupee later, and nothing in between is reachable. Reverse salary's
  bisection assumed monotonicity, so it now searches below the threshold first; see
  [reverse-salary.md](reverse-salary.md#why-step-1-splits-at-the-threshold). The earlier claim that
  "the binary search itself is unaffected" was wrong.
- **The multi-year threshold is per slice, not per career.** §4AB turns on the taxable income of a
  tax year, so each fiscal-year slice is tested on its own.

The **business/AOP calculator was already right** — `BUSINESS_SURCHARGE` is a flat 10% from 2024-25
onwards, which is correct for a non-salaried individual or AOP in every one of those years, because
the FA2025 and FA2026 changes are provisos for salary only. The two tables stay separate.

---

## ✅ Rental FY 2021-22 non-filer uplift

**Page:** [rental-income-tax.md](rental-income-tax.md) · **Code:**
`src/features/rental-income-tax/lib/rates.ts` → `NO_UPLIFT_YEAR`

The code gives FY 2021-22 the filer rates for both statuses, on the basis that §155 was excluded from
the Tenth Schedule that year and that the **Finance Act 2022** removed the exclusion.

**Updated 2 August 2026 — half of this is now settled, and the code's stated reason is false.**
Both Finance Acts were read in the gazette:

- **FA2021 item (104)** (PDF p. 106): *"in the Tenth Schedule, in rule 10, clauses **(d)**, (f), (g),
  (h), (j), (m), (r) and (s) shall be omitted"*. Commencement §1(2) is 1 July 2021, nothing specified
  otherwise → **tax year 2022 = FY 2021-22**.
- **FA2022 item (58)(b)** (PDF p. 102) is its only rule 10 edit: it *inserts* **(ca) §154A** and omits
  **(e), (p), (t)**. **Clause (d) is not mentioned.**

So the Finance Act 2022 never touched §155, and the comment in `lib/rates.ts` — plus the FAQ answer
`nonFilerRent`, which tells users "this has applied to rent since 2022-23" — is wrong on the law
regardless of how the rate question lands. Rule 1 (PDF p. 798) has no §155 carve-out; its only
provisos are §231B and §236K.

**Settled 3 August 2026 — the card was read, and it does not save the code.** TY2022 card now cached
at `docs/tax-sectors/sources/ty2022-wht-card.pdf`, §155 on PDF pp. 24-25. Footnote 17 exists:

> **17** As per **Finance Act, 2019**, the provisions of newly inserted 10th schedule of the Income
> Tax Ordinance, 2001 shall not apply on tax deducted under section 155.

It cites the **Finance Act 2019** — the 2019 position, when clause (d) was still in rule 10. Two
years stale, and contradicted by footnote **18** on the same row (*"Table Substituted through Finance
Act, 2021"*): the card picked up FA2021's Division V change and missed FA2021's rule 10 change. §156
and §156A on the next page both print the *"increased by 100% (Rule-1 of Tenth Schedule)"* line that
§155 lacks.

And the card disclaims itself on every page: *"The original Statue (Income Tax Ordinance, 2001, as
amended) **shall always prevail in case of any contradiction/error herein**."* That is the FBR
resolving the conflict against its own card, so this never became a genuine card-versus-statute
standoff of the NCCPL kind — a facilitation guide expressly yields to the Ordinance.

The **TY2026 card** (cached, PDF p. 7) confirms the other side: every §155 row cites *"Division-V …
**read with R.1 of Tenth Schedule**"*, and company rent is printed **ATL 15.00% / Non-ATL 30.00%**.

**Applied 3 August 2026.** `NO_UPLIFT_YEAR` deleted, `'2021-2022'` mapped to `UPLIFTED_YEAR`, the
now-always-true `nonFilerUpliftApplies` flag removed along with its dead UI branch, and the four
pieces of copy that told users the uplift began in 2022-23 corrected. Non-filer rent for that year was
understated by half and the company rate was 15% instead of 30%.

Full source list with links: [rental-income-tax.md](rental-income-tax.md#sources-this-page-is-verified-against).

**One thing left over:** the on-page official-sources grid does not cite the **Finance Act 2021**,
which is now the source of both the Division V table (all six years) and the FY 2021-22 uplift.
`FBR_DOC_URLS.financeAct2021` already exists. See
[rental-income-tax.md](rental-income-tax.md#official-sources-cited-on-the-page).

---

## ✅ Freelancer FY 2021-22 non-filer rate and PSEB rate

**Applied 3 August 2026.** **Page:** [freelancer-tax.md](freelancer-tax.md) · **Code:**
`src/features/freelancer-tax/lib/rates.ts` → `FA2021_FLAT_FREELANCER_RATE`

FY 2021-22 shipped as 0.25% PSEB / 1% standard with no non-filer increase. Both halves were wrong,
and the statute and the FBR's own card for that year agreed against the code — which is what made it
safe to change.

> ⚠️ **This entry was wrong twice, in opposite directions.** v1 said "rule 10 has never listed
> §154A" — false. v2 (2 Aug 2026) concluded the *current* years were over-charged — also false. The
> rate cards read 3 Aug 2026 settle it. **The current years are correct; do not re-derive them from
> the Ordinance alone.**

**The fix.** Division IVA as inserted by **FA2021** (gazette PDF p. 75, printed p. 283) is a single
sentence — *"The rate of tax to be deducted under section 154A shall be one percent of the proceeds
of the export"* — with **no PSEB row**; the two-row table arrives only when **FA2022** substitutes
the whole Division (PDF p. 88), in force 1 July 2022. Rule 10's `(ca)` is also an FA2022 insertion,
so rule 1's 100% increase still applied in FY 2021-22, and the **TY2022 card** (PDF p. 23) prints
exactly that: *"1% of the proceeds of the export"* plus *"Persons not appearing in the Active
Taxpayers' List: … increased by 100% (Rule-1 of Tenth Schedule)"*.

FY 2021-22 now ships **1% filer / 2% non-filer with no PSEB rate at all** (`psebRateAvailable:
false`), the PSEB-saving panel is replaced by an explanation for that year, and the PSEB control says
registration made no difference.

**The middle years are now verified too, and were already right.** The TY2023 and TY2025 cards came
down on the retry and both print **"No Change"** in the Not-on-ATL column against both §154A rows,
matching rule 10(ca) and the shipped 0.25% / 1%. FY 2023-24's own card (TY2024) is **404 on FBR's
server** despite being listed on their index page; it rests on the Ordinance plus the two cards
either side.

**Still a live conflict, deliberately unresolved: FY 2025-26 and FY 2026-27.** Rule 10(ca) excludes
§154A, but the **TY2026 card** (PDF p. 7) prints PSEB **0.25% / 0.5%** and other **1% / 2%**, each
cited to *"Division-IVA … **read with R.1 of Tenth Schedule**"*. Not sloppiness about rule 10 either:
the row above cites **§154 exports** to *"R.10(c)"* — the exclusion clause, by number — and still
doubles. The code follows the card. Same shape as the NCCPL disagreement in
`investments-capital-gains.md` §4.1.

**And one source not to trust.** FBR's consolidated *"Withholding Tax Rates From Tax Year 2021 to
Tax Year 2025"* spreadsheet prints 0.5% / 2% for §154A in every year from TY2022, contradicting the
contemporaneous cards it consolidates. Its TY2022 row even carries FA2023 wording. Do not cite it.

---

## 🟡 Property FY 2022-23 filer rates

**Page:** [property-transfer-tax.md](property-transfer-tax.md)

§236C at 2% and §236K at 2% for FY 2022-23 could not be confirmed from the 2026 consolidation: its
footnote chain for both Divisions stops at the flat 3% that FA2024 replaced. The 2% figures come from
the historical practitioner rate cards recorded in `docs/tax-sectors/property.md` (Moore Shekha Mufti
TY2023, ICMAP FY2022-23).

The **non-filer** side for that year *is* effectively confirmed, because rule 1's pre-FA2024 proviso
("increased by two hundred and fifty percent" for §236K) is printed in the Ordinance and 2% × 3.5 = 7%
is exactly what ships.

**To settle it:** the Finance Act 2022's First Schedule Part IV amendments.

---

## 🟡 Property §236K FY 2024-25

**Page:** [property-transfer-tax.md](property-transfer-tax.md)

The shipped filer rates are 3 / 3.5 / 4% by value band. The 2026 consolidation's Division XVIII
footnotes jump from the FA2024 substitution (which prints the *pre*-FA2024 flat 3%) straight to the
FA2026 one (which prints the FY 2025-26 banded 1.5 / 2 / 2.5), so the intermediate table FA2024
installed is not reproduced anywhere in that document.

§236C's equivalent row **is** printed and reads 3 / 3.5 / 4, and both Divisions moved together that
year — but that is inference, not a citation.

**To settle it:** the Finance Act 2024's Division XVIII amendment, or the FBR rate card updated to
30 June 2024.

---

## 🟡 Salary slabs FY 2014-15 → FY 2017-18 and FY 2019-20 → FY 2021-22

**Page:** [salary-tax.md](salary-tax.md)

Seven of the thirteen shipped years were not re-verified. The 2026 consolidation prints Division I's
history only as far back as the pre-2019 table (which confirmed FY 2018-19), so each remaining year
needs its own Finance Act.

They have been on the site since launch and no one has reported an error, but "shipped for a long
time" is not a source.

---

## 🟡 Provincial token schedules not re-verified

**Page:** [vehicle-token-tax.md](vehicle-token-tax.md)

The federal §234 half was re-verified against the Ordinance. The five provincial schedules were not
— they were transcribed and verified when the calculator was built, and four of the five sources are
live websites or PDFs that change without notice (Punjab's excise page, Sindh's online calculator,
KP's Finance Act PDF, Balochistan's excise schedule).

Punjab and Balochistan are the ones most worth re-checking each July, since both changed basis
recently.

Note `excise.balochistan.gov.pk` returns **403** to plain fetches; a browser User-Agent works.

---

## 🟡 Provincial agricultural tables not re-verified

**Page:** [agricultural-income-tax.md](agricultural-income-tax.md)

Same position: the federal §4C tables that Punjab's s.3-AA points at were re-verified; the four
provinces' own slab, company, super-tax and per-acre tables were not.

Punjab's per-acre rates additionally carry a live dispute recorded in the original sector notes — the
Amendment Act's s.11(2) lay-before-the-Assembly duty, against a notification issued without it. The
calculator ships the notification's figures.

---

## 🔵 Securities non-filer: statute vs operator

**Page:** [capital-gains-securities.md](capital-gains-securities.md)

Division VII column (4) sets the non-ATL rate for post-1 July 2024 acquisitions by reference to
Division I (individuals/AOP) or Division II (companies), with a **15% floor**. NCCPL — which actually
computes and collects the tax — publishes a flat **doubled** figure.

**The calculator follows the operator**, because that is the number a taxpayer's NCCPL certificate
will show, and because the calculator cannot know a seller's own slab rate.

Both readings are recorded on purpose. Do not resolve this by picking one and deleting the other.
The result's `confidence` field is how the page stays honest about it.

---

## 🔵 Vehicle five-year cut-off is applied to transfers only

**Page:** [vehicle-registration-tax.md](vehicle-registration-tax.md)

§231B(1)'s proviso — "no collection … after five years from the date of first registration" — sits in
the **registration** sub-section, while `calcVehicleRegistrationTax` applies the cut-off only when
`mode === 'transfer'`.

In practice a first registration is of a new vehicle, so no age arises and the two readings give the
same answer. It is a modelling simplification, not a rate error, and left as-is because adding an age
input to the registration path would suggest a case that does not occur.

---

## Documentation-only issues

These do not change any computed figure.

### Salary official sources cite the 2024 Ordinance

`SALARY_OFFICIAL_SOURCES` links `FBR_DOC_URLS.incomeTaxOrdinance` (amended to 30 June 2024). Every
salary figure on the page was verified against the **2026** consolidation, which is already available
as `FBR_DOC_URLS.incomeTaxOrdinance2026` and carries both the current table and the footnote history
for every earlier year. The same applies to the freelancer, business, rental, property and vehicle
grids.

The 2024 link is not *wrong* — it is a real official document — but it cannot be used to check the
FY 2025-26 or FY 2026-27 rows the pages display.

### The Finance Act 2024 is missing from the business *and* salary source grids

`BUSINESS_OFFICIAL_SOURCES` cites Finance Act 2026, the Ordinance and IRIS. The Finance Act 2024 is
where **both** the current slab table and §4AB came from, and it is not in the grid — so the 2024-25,
2025-26 and 2026-27 rows have no Act behind them that a reader can open.

`SALARY_OFFICIAL_SOURCES` has the same gap, and it is **newly load-bearing**: until the surcharge fix
above, the salary pages charged nothing under §4AB in FY 2024-25, so the Act that created it was not
behind any salary figure. Now it is — the 10% surcharge on FY 2024-25 salaries above Rs 10 million
rests on the Finance Act 2024 alone, and neither that Act nor the FA2025 proviso that cut the rate to
9% appears in the grid the six salary surfaces share. The repo's rule is to cite the source of every
year the page computes, so this one is a real omission rather than a nicety.

### Property sources do not cover the older years

`PROPERTY_TRANSFER_OFFICIAL_SOURCES` cites the Finance Act 2026 and the 2025-26 rate card. The
calculator also computes FY 2022-23, 2023-24 and 2024-25, and nothing in the grid covers them. The
repo's own rule is to cite the source of every year the page calculates.

The best-sourced grids on the site are the **corporate**, **cash-withdrawal** and **vehicle
registration** pages, where every offered year has a document behind it. Those are the pattern to
copy.

### `lib/rates.ts` comments cite aggregators

`business-tax/lib/rates.ts` records verification "against the sector spec, PwC, ICMA rate cards and
firm tax handbooks" and "against PwC and taxcalc.pk". Every figure in that file has now been
confirmed against the Ordinance itself, so those cross-checks are no longer load-bearing and the
comments could say so. None of them appears in a published sources grid, which is what the content
policy actually governs — but a stale comment invites the next reader to trust an aggregator.
