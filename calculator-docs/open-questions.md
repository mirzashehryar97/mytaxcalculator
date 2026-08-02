# Open questions, gaps and known conflicts

Everywhere the shipped code and the primary source do not line up, or where a figure could not be
traced. Written 2 August 2026 against the code at that date.

Three kinds of entry:

- 🔴 **Defect** — the calculator produces a figure the law does not support.
- 🟡 **Unverified** — the figure is probably right but nothing in this pass confirmed it.
- 🔵 **Deliberate** — a known departure that was decided on purpose. Do not "fix" without reading why.

---

## 🔴 Salary FY 2024-25 surcharge

**Page:** [salary-tax.md](salary-tax.md) · **Code:** `src/lib/budgetComparison.ts`

`calculateBudgetYearTax` applies the §4AB surcharge **only** when `fiscalYear === '2025-2026'`
(9%). For FY 2024-25 it applies none.

§4AB was **inserted by the Finance Act 2024** — i.e. from tax year 2025 = FY 2024-25 — at **10% of
the tax where taxable income exceeds Rs 10 million**, for *"every individual and association of
persons"*. The salaried carve-out did not exist until the Finance Act 2025 added the 9% proviso, and
the Finance Act 2026 replaced that with "no surcharge shall be payable".

Source: Income Tax Ordinance 2001 (amended to 30 Jun 2026), PDF p. 53, §4AB and footnotes 4, 6, 7.

**Effect:** salaries above Rs 10 million in FY 2024-25 are understated by 10% of the slab tax.
**Fix:** add a per-year surcharge config (`{ rate, threshold }` keyed by fiscal year) rather than the
current single hard-coded year, with 10% at 2024-25, 9% at 2025-26 and none at 2026-27.

The **business/AOP calculator gets this right** — `BUSINESS_SURCHARGE` is 10% from 2024-25 onwards,
which is the correct treatment for a non-salaried individual or AOP in every one of those years.

---

## 🔴 Multi-year tab omits the §4AB surcharge

**Page:** [multi-year-salary-tax.md](multi-year-salary-tax.md) · **Code:**
`src/features/multi-year-tax/lib/calculation.ts`

`calcMultiYearTax` calls `calculateTaxForTotalAmount` directly instead of `calculateBudgetYearTax`,
so no surcharge is ever applied. The single-year tab on the **same page** does apply it for
FY 2025-26, so the two tabs disagree above Rs 10 million.

**Fix:** route the per-year tax through `calculateBudgetYearTax` (after the FY 2024-25 fix above), or
extract a single `salaryTaxForYear(annualGross, fiscalYear)` that every salary-engine caller uses.

---

## 🔴 Reverse salary omits the §4AB surcharge

**Page:** [reverse-salary.md](reverse-salary.md) · **Code:**
`src/features/reverse-salary/lib/calculation.ts`

`annualNetFor` inverts `calculateTaxForTotalAmount`, not the surcharged figure. For an FY 2025-26
target implying a gross above Rs 10 million, the required gross comes out **too low** — the user
would be told to ask for less than they need.

**Fix:** invert the same `salaryTaxForYear` the forward calculators use. The binary search itself is
unaffected; take-home stays monotonic with the surcharge in place.

---

## 🔴 Increment and job offer omit the §4AB surcharge

**Page:** [salary-increment-and-job-offer.md](salary-increment-and-job-offer.md) · **Code:**
`src/features/salary-increment/lib/calculation.ts`

`computeSalaryScenario` calls `calculateTaxForTotalAmount` directly. The error partly cancels when
both scenarios are above Rs 10 million, but not when a raise crosses the threshold — which is
exactly the comparison someone would come to the page to make.

**Fix:** same shared helper as above.

> The four entries above are one bug with four faces: **five callers of the salary engine, two of
> which apply the surcharge and three of which do not.** The real fix is a single
> `salaryTaxForYear(annualGross, fiscalYear)` in `utils/taxCalculator.ts` that owns both the slab
> lookup and the surcharge, with every caller going through it.

---

## 🔴 Rental FY 2021-22 non-filer uplift

**Page:** [rental-income-tax.md](rental-income-tax.md) · **Code:**
`src/features/rental-income-tax/lib/rates.ts` → `NO_UPLIFT_YEAR`

The code gives FY 2021-22 the filer rates for both statuses, on the basis that §155 was excluded from
the Tenth Schedule that year and that the **Finance Act 2022** removed the exclusion.

The Ordinance attributes the removal to the **Finance Act 2021**. Tenth Schedule rule 10, PDF p. 803,
footnote 5:

> Clauses (d), (f), (g), (h), (j), (m), (r) and (s) omitted **by the Finance Act, 2021**. The omitted
> clauses read as follows: **(d) tax deducted under section 155;** …

The Finance Act 2021 takes effect for tax year 2022 = FY 2021-22, so on that reading there is no
un-uplifted year in the offered range and `NO_UPLIFT_YEAR` should not exist.

**Before changing it:** check the FBR withholding rate card for tax year 2022 (updated to
30 June 2021). The code comment says that card carries a note that the Schedule "shall not apply on
tax deducted under section 155" — if the card really says that, the conflict is card-versus-statute
and should be recorded both ways rather than silently resolved, per the repo's own rule on
statute/operator conflicts.

**Effect if the statute is right:** FY 2021-22 non-filer rent tax is understated by half.

---

## 🟡 Freelancer non-filer rates before FY 2025-26

**Page:** [freelancer-tax.md](freelancer-tax.md) · **Code:**
`src/features/freelancer-tax/lib/rates.ts` → `VERIFIED_BASE_FREELANCER_RATE`

The shipped table gives FY 2021-22 → FY 2024-25 the **same** rate for filers and non-filers (0.25%
PSEB, 1% standard), and only doubles from FY 2025-26.

Tenth Schedule rule 10 has never listed §154A, so rule 1's "+100%" applies on the face of the
Ordinance in **every** one of those years. Nothing in the 2026 consolidation supports an
un-uplifted period.

**To settle it:** read the §154A row on the FBR withholding rate cards for tax years 2022, 2023,
2024 and 2025. If they print a single rate, record the card-versus-statute conflict; if they print
two, the code is simply wrong for four years.

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

### Business tax sources omit the Finance Act 2024

`BUSINESS_OFFICIAL_SOURCES` cites Finance Act 2026, the Ordinance and IRIS. The Finance Act 2024 is
where **both** the current slab table and §4AB came from, and it is not in the grid — so the 2024-25,
2025-26 and 2026-27 rows have no Act behind them that a reader can open.

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
