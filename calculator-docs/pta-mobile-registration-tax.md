# PTA mobile device registration tax — `/pta-tax-calculator`

**Feature:** `src/features/pta-tax/`.
**Calculation:** `lib/calculation.ts` → `calcPtaTax`.
**Rates:** `lib/rates.ts` → `PTA_RATES`.
**Per-model customs values:** `lib/phoneCatalogue.ts` → `PTA_NEW_PHONES`, `PTA_USED_PHONES`.

**Status: built and shipped 4 August 2026; corrected and re-reviewed 5 August 2026.** Sections 1 to
10 below are the research this was built from and remain the record of *why* each figure is what it
is; **§11 describes the calculator as it actually ships** and is the section to read first if you
are changing the code.

**Researched and verified through 5 August 2026**, against the Finance Act 2026, the Income Tax Ordinance
amended to 30 June 2026, the Sales Tax Act amended to 2025-26, the Pakistan Customs Tariff 2025-26,
the Fifth Schedule to the Customs Act 2025-26, SRO 1151(I)/2025, SRO 1063(I)/2026,
SRO 1064(I)/2026, CGO 01 of 2019 as amended by CGO 01 of 2024, PTA's DIRBS FAQ of 14 October 2025,
and Valuation Rulings 1834/2023, 1999/2025 and 2070/2026 enumerated from FBR's own valuation database.
**The second pass overturned §5**: an official per-model C&F table does exist. Read §5 and §10 before
trusting any earlier summary of this document.

---

## 0. Before you change a rate: re-read everything

**This document is a map of the sources, not a substitute for them.** Do not type a figure from these
tables into `rates.ts` without re-opening the document §10 cites it to. Read this file end to end
first — §5, §7, §9 and §11 are the load-bearing sections, but the traps are spread through §4, and a
selective read is how the rescinded VR 2035 survived a whole pass.

The build pass on 4 August 2026 did re-open every source below and transcribed all 1,160 valuation
serials from the rendered pages. That does not retire this checklist: it resets the clock on it.

Two reasons the caution is not boilerplate here. **This regime moved four times in the twelve months
before it was researched** — FA2026 cut the levy's serial 3 and §148's serial 3, SRO 1064(I)/2026
replaced the RD schedule, and a valuation ruling was rescinded mid-year by an Order-in-Revision that
no press coverage numbered correctly. And **half the primary sources are scans**, so a figure that
extracted cleanly is not the same as a figure that was read.

Re-open at minimum, before writing any rate:

- **SRO 1064(I)/2026, p. 24** — §4.3's RD column was reconstructed by an 80% cross-check against
  SRO 1152(I)/2025, not read off a clean text layer. That is an inference, not a verification.
- **Ordinance p. 553, not p. 551** — the superseded §148 table is printed on the facing page as
  footnote text and looks exactly like a live one (§4.5).
- **The Fifth Schedule and the Customs Tariff** — FY 2026-27 editions were unpublished on 4 August
  2026 and the 2025-26 tables were carried forward (§4.1). Check whether they have since appeared.
- **The valuation rulings, from the rendered page** (§5 caveat 3), and **re-run the enumeration in
  §10** — a ruling newer than VR 2070/2026 may have superseded any of the three, and a new-phone
  ruling covering the S24/S25 generation would close the biggest gap in the whole build.
- **The PTA DIRBS FAQ** — the copy read here is dated 14 October 2025; PTA reissues it.
- **Any Finance Act later than 2026.** Everything below states the law as at 4 August 2026.

The build pass closed the two used-phone questions in §9 and nothing else. Every remaining 🟡 there was
still open on 4 August 2026, and none should be assumed closed now.

---

## 1. The thing people call "PTA tax" is not a PTA tax

This is the single most important fact for the page's copy, and every third-party calculator gets it
wrong.

**PTA levies nothing.** PTA runs DIRBS (Device Identification, Registration and Blocking System),
checks that an IMEI is GSMA-valid and not reported stolen or cloned, and blocks the handset from the
network if it is not registered. The money is **FBR's**, assessed by Customs through WeBOC, paid
against a PSID at a bank branch.

PTA says this in its own FAQ (14 October 2025), and the page should say it too:

> **Q12. Is there any custom duty on device(s)?**
> Answer: Yes, the user is liable to pay all applicable duties and taxes, as assessed by
> FBR/Customs officials. For detailed information regarding duties and taxes, please contact FBR
> directly or visit their official website.

> **Q6. How can I know the duty of my mobile device? …**
> Answer: Duties/taxes are assessed and collected directly by the Federal Board of Revenue (FBR).

So the one PSID is really **five separate federal levies** under **four different statutes**:

| # | Levy | Statute | Shape |
|---|---|---|---|
| 1 | Customs duty (CD) | First Schedule to the Customs Act 1969 (Pakistan Customs Tariff), read with the Fifth Schedule | Rs/set — **but 0% for smartphones** |
| 2 | Additional customs duty (ACD) | SRO 1063(I)/2026 under §18(5), Customs Act 1969 | % of value — **not levied here** |
| 3 | Regulatory duty (RD) | SRO 1064(I)/2026 under §18(3), Customs Act 1969 | Rs/set, banded by C&F value |
| 4 | Sales tax | Ninth Schedule, Table-II, Sales Tax Act 1990 | **ad valorem**, 18% or 25% |
| 5 | Mobile handset levy | §10, Finance Act 2018 | Rs/set, banded by C&F value |

Only #4 is a percentage; #3 and #5 are fixed rupee amounts that **step** at C&F thresholds, and — the
part that matters for the code — **their bands are not the same bands**. See §6.

**The table above is the five *import* levies, and the calculator prints six lines.** Advance income
tax under §148 (Income Tax Ordinance 2001 — a fifth statute) is the sixth, and it is the whole
computable difference between the two routes: exempt on the passport route under clause (60E),
charged on the CNIC route. It is set out in §4.5 rather than in this table. **Say six, not five,
in any user-facing copy that enumerates the breakdown** — the panel shows six rows and a reader can
count them. The page said "five" in five places until 4 August 2026, with two different memberships
between them; see the sixth-pass log entry.

## 2. Content policy check

Nothing in this regime is un-Islamic and nothing needed rewriting. There is no profit-on-debt, no
insurance, no speculative instrument. Two traps to avoid when drafting copy:

- **Do not transcribe the Baggage Rules' duty-free list.** Rule 3A of the Baggage Rules 2006 runs
  "…(v) two hundred cigarettes or fifty cigars or half kilogram of manufactured tobacco; … (viii) one
  mobile phone…". Only clause (viii) is relevant; quoting the surrounding list would drop tobacco
  into the page for no reason. Cite the mobile-phone clause alone.
- **Icons.** This page uses `Smartphone`, `ShieldCheck`, `Landmark`, `Receipt`, `FileText` and `Coins`.
  `CandlestickChart` and `PiggyBank` remain banned site-wide.

## 3. The two routes, and what actually separates them

Every published table has two columns — "passport" and "CNIC" — and every third-party site explains
the gap as a discount for registering early. **It is not.** PTA is explicit:

> **Q8. I have heard that if I apply within 60 days of grace period, shall I get reduced Tax?**
> Answer: As per information provided by FBR, **there is no discount on device registration within
> 60 days**. However, an applicant who wants to register a device after 60 days of traveling into
> Pakistan or is a local applicant and wants to register a device with CNIC **will have to pay fine
> as per FBR assessment procedure**.

So the difference is two real things, one of which we can compute and one of which we cannot:

| | Passport route | CNIC route |
|---|---|---|
| Who | International traveller, device in accompanied baggage, **within 60 days** of arrival | Local applicant, or a traveller past the 60 days |
| Legal character | Import under the **Baggage Rules 2006** | Ordinary import assessment |
| Income tax §148 | **Exempt** — Second Schedule Part IV clause (60E) | **Payable** — the Part II table |
| ACD | Exempt — SRO 1063(I)/2026 para 3(iv) | Exempt anyway for smartphones — para 3(iii) |
| Fine | None | **Yes, and the amount is not published** |

The §148 exemption is the whole of the computable gap:

> **(60E)** The provisions of section 148 shall not apply on mobile phones brought in personal
> baggage under Baggage Rules, 2006.

✅ Verified — Income Tax Ordinance amended to 30 June 2026, **PDF p. 712**, Second Schedule Part IV.
Footnote 4 on that page: *"New clause (60E) added through Finance Act, 2019."* Still in force; no
Finance Act between 2020 and 2026 touches it.

That is corroborated by FBR's own clarification on over-charged DIRBS registrations, which blames a
WeBOC change where *"the exemption of withholding tax was also deleted"* and puts the normal
passport-versus-CNIC gap on a high-end phone at *"about Rs. 9,000"* — the right order of magnitude
for the §148 line.

### The 120-day temporary registration (free, and worth its own section on the page)

CGO 01 of 2019, para 2AA, inserted for overseas Pakistanis and foreign nationals on short visits:

> This temporary/registration facilitation module … will be applicable for only **one (1) mobile
> handset device**. … On lapse of **120 days**, the IMEI(s) utilized under this facility shall be
> blacklisted and shall not be allowed local network services.

No duty, no taxes, but the IMEI is paired to one declared SIM and the same IMEI cannot use the
facility twice on a different passport. This is genuinely useful and almost nobody publishes it.

### Limits and deadlines worth surfacing

- **60 days** from the day the SIM is first inserted before the device stops receiving service
  (PTA FAQ Q14). Revisiting Pakistan does not renew it.
- **Five devices per person per calendar year** (PTA FAQ Q15; the same figure appears in the Note to
  CGO 01 of 2019). ⚠️ FBR's clarification notice states passengers *"could previously register up to
  5 mobile phones on passports, now limited to 1"* — undated, and it contradicts PTA's October 2025
  FAQ. Do **not** put a number on the page until this is settled. See §9.
- **PSID is valid 7 days**, then the application is auto-deleted and must be re-filed.
- Registration is not a filer/non-filer question. PTA FAQ Q4: *"all individuals have to pay custom
  duties regardless of being a filer / non filer."* **The page must not carry a filer toggle.**

## 4. The rates, component by component

All bands are on **C&F value in US dollars**, which is *not* the retail price. See §5.

### 4.1 Customs duty — 0% for a smartphone

Pakistan Customs Tariff FY 2025-26, heading 85.17:

| PCT | Description | CD |
|---|---|---|
| 8517.1310 | Smartphones, in CKD/SKD condition | Rs 250/set |
| 8517.1390 | Smartphones, other (i.e. CBU) | Rs 250/set |
| 8517.1411 | Cellular mobile phone, in CKD/SKD condition | Rs 250/set |
| 8517.1419 | Cellular mobile phone, other | Rs 250/set |
| 8517.1430 | Satellite mobile phone | 10% |

✅ Verified — `Tariff-2025-26.pdf`, **PDF p. 249**.

**But the Fifth Schedule overrides it.** Fifth Schedule to the Customs Act 1969 (updated 2025-26),
Part-III ("Raw Materials/Inputs for Poultry and Textile Sector; Other Goods"), **PDF p. 66**:

| Sr. | Description | PCT | CD | Condition |
|---|---|---|---|---|
| 99 | Smartphones | 8517.1390 | **0%** | **Nil** |
| 99A | Smartphones in CKD/SKD condition | 8517.1310 | 0% | PTA-certified local assemblers, IOCO quota, type-approval certificate |

Serial 99 carries the condition "**Nil**" — unconditional. Serial 99A, immediately below it, spells
out three conditions, which is what makes the blank on 99 meaningful rather than an omission.

**So: a smartphone pays Rs 0 customs duty. A non-smart cellular phone (8517.1419) pays Rs 250/set.**
"Smartphone" is defined in Chapter 85, Note 5 of the Tariff:

> telephones for cellular networks, equipped with a mobile operating system designed to perform the
> functions of an automatic data processing machine such as downloading and running multiple
> applications simultaneously, including third-party applications…

⚠️ The 2026-27 Tariff and Fifth Schedule were **not published on fbr.gov.pk as of 4 August 2026** —
the Customs Tariff page still tops out at FY 2025-26. The Finance Act 2026 contains no amendment to
heading 85.17 or to Fifth Schedule serials 99/99A (grep of the whole Act for `8517` and `handset`
returns nothing), which is why the 2025-26 tables are carried into 2026-27 here. Re-check when FBR
posts the new tariff.

### 4.2 Additional customs duty — not levied on this transaction

SRO 1063(I)/2026 (30 June 2026, supersedes SRO 1151(I)/2025), para 3:

> The additional customs duty shall not be levied on the following, namely: …
> (iii) import under the Fifth Schedule to the Customs Act, 1969, excluding — (a) serial numbers 30,
> 33 and 35 of the Table of Part-I, (b) serial numbers 102, 111, 116 (except xvi), 117 and 118 of the
> Table of Part-III;
> (iv) import under the Baggage Rules, 2006;

The superseded notification used for tax year 2025-26 says the same thing. SRO 1151(I)/2025,
official FBR PDF p. 2 (the second and final page; no separate printed page number), paragraph 3:

> The additional customs duty shall not be levied on the following, namely: -
> (iii) import under the Fifth Schedule to the Customs Act, 1969 (IV of 1969),
> excluding, -
> (1) serial numbers 30, 33 and 35 of the Table of Part-I,
> (2) serial numbers 102, 110, 111, 116(except xvi), 117 and 118 of the
> Table of Part III;
> (iv) import under the Baggage Rules, 2006;

Serial 99 of Part-III is **not** in the exclusion list, so a smartphone imported under the Fifth
Schedule escapes ACD; and the passport route escapes it a second time under (iv). ✅ Verified,
`SRO1063-2026-ACD.pdf` p. 2. ACD is therefore **zero on both routes for a smartphone** and the
calculator should not model it at all — but the doc records why, because "we forgot ACD" and "ACD is
nil here" look identical in the output.

⚠️ **The two exemptions are not the same width, and the page must not blur them.** Paragraph 3(iv)
covers anything under the Baggage Rules, so the *passport* route is out whatever the handset is.
Paragraph 3(iii) covers imports under the Fifth Schedule, and the Fifth Schedule entry is
**smartphones** — a basic cellular phone is not in it. That leaves exactly one uncovered cell:
**a basic phone on the CNIC route**, where §9's open question about which ACD rate attaches to a
specific Rs 250/set duty actually bites. The calculation stores zero only as a non-additive
placeholder, gives the line an explicit `unknown` status, renders **Not included** in amber and labels
the headline total and comparison as a minimum. It must never be rendered as Rs 0 or **Exempt**. Do
not simplify that back into "handsets are exempt" — that sentence was in the code until 5 August 2026
and it was wrong for one real combination the form can produce.

### 4.3 Regulatory duty — the biggest line on a cheap phone

SRO 1064(I)/2026, in force **1 July 2026**, supersedes SRO 1152(I)/2025.

| C&F value (US$) | RD 2026-27 | RD 2025-26 |
|---|---|---|
| CKD/SKD (8517.1310, 8517.1411) | 4% | 5% |
| Up to 30 | **Rs 240/set** | Rs 300/set |
| Above 30 – 100 | **Rs 2,400/set** | Rs 3,000/set |
| Above 100 – 200 | **Rs 6,000/set** | Rs 7,500/set |
| Above 200 – 350 | **Rs 8,800/set** | Rs 11,000/set |
| Above 350 – 500 | **Rs 12,000/set** | Rs 15,000/set |
| Above 500 | **Rs 17,600/set** | Rs 22,000/set |

✅ Verified — SRO 1152(I)/2025 **PDF p. 31**, serials 553-559, extracts cleanly. SRO 1064(I)/2026
**PDF p. 24**, serials 549-555, is a poor scan whose text layer interleaves the rate column with the
row below it; the reading above was resolved by cross-check: **every 2026-27 figure is exactly 80% of
its 2025-26 predecessor** (300→240, 3,000→2,400, 7,500→6,000, 11,000→8,800, 15,000→12,000,
22,000→17,600, and 5%→4%). A uniform 20% cut across the whole heading is a coherent budget measure
and no other alignment of the OCR fragments reproduces it. Re-read from a clean copy before shipping.

### 4.4 Sales tax — 18% / 25% ad valorem, and this is where the money is

Ninth Schedule to the Sales Tax Act 1990, **Table-II**, substituted by the **Finance Act 2024**:

> **Table-II — Cellular mobile phones in CKD/CBU form**
>
> | | Sales tax on CBUs at the time of import **or registration (IMEI number by CMOs)** | Sales tax on import in CKD/SKD condition | Sales tax on supply of locally manufactured mobile phones in CBU condition |
> |---|---|---|---|
> | A. Not exceeding US$ 500 | **18% ad valorem** | 18% ad valorem | 18% ad valorem |
> | B. exceeding US$ 500 | **25% ad valorem** | 18% ad valorem | 18% ad valorem |

✅ Verified — Sales Tax Act updated to 2025-26, **PDF p. 218**, footnote 991: *"Table-II substituted
by Finance Act, 2024."* The column-3 heading naming **registration of an IMEI number** is what makes
this table the DIRBS table and not merely the commercial-import table.

Two things follow:

1. **The old fixed per-set sales tax is gone.** Any source quoting "Rs 650 per set" or "Rs 1,500 per
   set" is pre-FA2024 and wrong for every year this calculator would cover. So is the Rs 130 / 200 /
   1,680 / 1,740 / 5,400 / 9,270 table, which is the FA2020-era version.
2. **Only two bands.** Sales tax steps once, at US$ 500, and it is a cliff: at US$ 500.01 the whole
   value is taxed at 25%, not just the excess. Worth an explicit callout on the page — it is the one
   place where a dollar of extra value costs thousands of rupees.

The **Finance Act 2026 did not change the rates**. It added a payment facility, and this is new and
worth a section of its own on the page:

> (20) in the Ninth Schedule, after Table-II, under the heading "LIABILITY, PROCEDURE AND CONDITIONS"
> after omitted sub-clause (v), the following new sub-clause (vi) shall be added, namely:—
> "**(vi) An individual liable to pay tax on imported mobile phone device through Device
> Identification, Registration and Blocking System of Pakistan Telecommunication Authority, may be
> allowed to pay tax in instalments as may be prescribed, subject to the condition that all the
> instalments shall be paid before the end of the financial year in which the import is made.**"

✅ Verified — Finance Act 2026, **PDF p. 28** (gazette p. 554). Note "**as may be prescribed**": the
instalment rules had not been notified as of 4 August 2026, so the page may describe the facility but
must not invent a schedule.

#### The value the percentage applies to — unresolved

§2(46)(d) of the Sales Tax Act defines the value of imported goods as:

> the value determined under section 25 of the Customs Act, including the amount of customs-duties and
> federal excise duty levied thereon

Table-II instead says the tax is "charged on the basis of **import value per set**". Two readings:

- **A —** import value = the §25 customs value alone (the C&F figure the bands are drawn on).
- **B —** import value = §2(46)(d) value, i.e. customs value **+ customs duties**. Then whether
  "customs-duties" pulls in regulatory duty (levied under §18(3) of the same Act) is a further
  question.

On a US$ 600 phone at Rs 280/US$ the gap between A and B is about Rs 4,400 — small next to the
Rs 42,000 tax, but not nothing. **Ship neither silently.** Model reading A, state it on the page, and
record the alternative here. See §9.

**Federal excise duty is nil**, so it drops out of the base either way: ✅ verified by reading the
Federal Excise Act 2005 amended to 30 June 2026 end to end — the only telecom entry in the First
Schedule is heading **98.12, telecommunication *services*** (19.5%, plus 75 paisa per mobile call).
No handset entry anywhere. That 75-paisa call duty belongs to the existing
[mobile-internet-tax.md](mobile-internet-tax.md) page's "not modelled" list, not to this one.

### 4.5 Income tax under §148 — CNIC route only

First Schedule, Part II, second proviso, Income Tax Ordinance 2001:

| S.No | C&F value of mobile phone (US$) | CBU, PCT 8517.1219 | CKD/SKD, PCT 8517.1211 |
|---|---|---|---|
| 1 | Up to 30 **except smart phones** | Rs 70 | 0 |
| 2 | Above 30 – 100, **and smart phones up to 100** | Rs 100 | 0 |
| 3 | Above 100 – 200 | **Rs 100** | 0 |
| 4 | Above 200 – 350 | Rs 970 | 0 |
| 5 | Above 350 – 500 | Rs 5,000 | Rs 3,000 |
| 6 | Above 500 | **Rs 11,500** | Rs 5,200 |

✅ Verified — Ordinance amended to 30 June 2026, **PDF p. 553** (printed p. 534). Footnote 1 on that
page: *"The figure '930' substituted by the Finance Act, 2026."* So S.No 3 fell from **Rs 930 to
Rs 100** for 2026-27. Footnote 2 records that S.Nos 5 and 6 were substituted by the Finance Act 2022.

⚠️ **Read this table off PDF p. 553, not p. 551.** The extractor interleaves the live Part II table
with the footnote that reprints the *superseded* version, and the superseded one also has six rows
over the same six bands with a single "Tax (in Rs.)" column — 70 / 100 / 930 / 970 / 3,000 / 5,200.
It looks exactly like a current table and it is not one.

⚠️ **Serials 1 and 2 are a device-type test, and the calculator has to model it.** Serial 1 is "Up to
30 **except smart phones**" at Rs 70; serial 2 is "Above 30 – 100, **and smart phones up to 100**" at
Rs 100. So the Rs 70 row reaches a *basic* phone only, and a smartphone worth US$ 30 or less pays
Rs 100. There is no other place in this regime where §148 moves with device type — from US$ 100 up
the table is common to both. The shipped code carries the table twice for that reason
(`PtaIncomeTax148Bands`: `smartphone` collapses serials 1-2 into one 0-100 band at Rs 100,
`featurePhone` keeps both rows), and the on-page rate guide prints the smartphone column with a
footnote naming the Rs 70 row. **Corrected 5 August 2026** — the code previously charged Rs 70 to
everything under US$ 30 regardless, understating a CNIC-route basic-value smartphone by Rs 30, and
the comment above the table wrongly claimed the two lowest rows "share a rate for every phone this
calculator prices". They do not: 70 ≠ 100.

⚠️ **The Ordinance still cites dead PCT codes.** It says 8517.1219 (CBU) and 8517.1211 (CKD/SKD);
the Customs Tariff has used the HS-2022 codes 8517.13xx / 8517.14xx since FY 2022-23. Nobody has
tidied this up. It does not change the rate — the bands are stated in dollars — but a reader
comparing the two documents will think one of them is about a different product.

### 4.6 Mobile handset levy — §10 of the Finance Act 2018

The levy has been re-tabled twice and trimmed once:

- **Finance Act 2018, s.10** — original table, banded on *import value in rupees including duties and
  taxes*: Nil / Rs 1,000 / Rs 3,000 / Rs 5,000.
- **Finance Act 2019, s.16** — substituted the whole table, re-banding it on **C&F value in US
  dollars**: Nil / Nil / 400 / 1,200 / 2,800 / 5,600.
- **Finance Act 2022, s.7** — substituted it again, this time with **seven** bands.
- **Finance Act 2026, s.7** — *"in section 10, in sub-section (1), in the Table, in column (1), in
  Serial No. 3, in column (3), for the figure '600', the figure '200' shall be substituted."*

Which leaves, for the two years a calculator would cover:

| S.No | C&F value (US$) | Levy 2026-27 | Levy 2025-26 |
|---|---|---|---|
| 1 | Up to 30 | Rs 100 | Rs 100 |
| 2 | Above 30 and up to 100 | Rs 200 | Rs 200 |
| 3 | Above 101 and up to 200 | **Rs 200** | Rs 600 |
| 4 | Above 201 and up to 350 | Rs 1,800 | Rs 1,800 |
| 5 | Above 351 and up to 500 | Rs 4,000 | Rs 4,000 |
| 6 | Above 501 and up to 700 | Rs 8,000 | Rs 8,000 |
| 7 | Above 701 and above | Rs 16,000 | Rs 16,000 |

✅ Verified — Finance Act 2018 **PDF p. 133**; Finance Act 2019 **PDF p. 123** (gazette p. 223);
Finance Act 2022 **PDF p. 111**; Finance Act 2026 **PDF p. 76**. Greps of the Finance Acts 2019,
2020, 2021, 2023, 2024 and 2025 for `handset`, `smart phone`, `levy per set` and `Finance Act, 2018`
found no other amendment, so the FA2022 table stands except for serial 3.

⚠️ **The FA2022 bands have holes in them, and the statute has never been corrected.** Serial 2 ends
at 100 and serial 3 starts *above 101*; serial 3 ends at 200 and serial 4 starts *above 201*. The RD
and §148 tables are contiguous ("above 100 and up to 200"), so this is the levy table's own drafting
defect. Decide the fill rule deliberately and say so on the page — the safe reading is to treat each
gap as belonging to the *lower* band, which is the reading that does not charge tax the statute never
imposed. Also note serial 7 reads "Above 701 **and above**", which is a typo for "and above" as an
open top band; treat it as everything over 700.

⚠️ **The hole is an interval, not a decimal curiosity — and US$ 101 is inside it.** It is easy to
write the defect up as "US$ 100.50 falls in no band" and stop there, which is how it was first
recorded here and how the code was first written. But serial 2 ends *at* 100 and serial 3 begins
*above* 101, so **everything above 100 and up to and including 101** is uncovered, and likewise
(200, 201], (350, 351], (500, 501] and (700, 701]. The integer endpoint is not a hypothetical:
**three handsets in the shipped catalogue are valued at exactly US$ 101** — Samsung Galaxy-A3 (2017),
Xiaomi Redmi 5 3 GB, Infinix Hot 20I 6 GB + 128 GB. Under the fill rule they take serial 2's Rs 200,
not serial 3's, which for 2025-26 is a **Rs 400 difference** on a real, pickable phone.

This also fixes what every band bound in this regime means. All four tables are drafted with an
**exclusive lower bound and an inclusive upper one** — "Up to 30", then "Above 30 and up to 100" — so
a value sitting exactly on a printed threshold belongs to the *lower* band. On the contiguous tables
either convention happens to give the same answer, because the lower band's ceiling is the same
figure; on the levy table it is the whole difference between honouring the gap and papering over it.
`findAmountBand` compares the lower bound with `>` for that reason, with `0` the one inclusive floor.

## 5. The input problem: C&F value is not the price

Every band above keys off **C&F value in US dollars**, which is a customs valuation, not what the
phone costs in Karachi and not what it costs on apple.com. A calculator that asks for a retail price
and silently treats it as C&F will be wrong by a factor.

FBR **does** publish per-model C&F values, under §25A of the Customs Act, as Valuation Rulings from
the Directorate General of Customs Valuation. There are **three live rulings** covering handsets, and
they are read together — each supersedes the previous one only to the extent of its own scope:

| Ruling | Dated | Scope | Size | Newest model in it |
|---|---|---|---|---|
| **VR 1834/2023** | 5 Dec 2023 | Mobile phones, **all brands, new** | **1,160 serials**, 26-page annexure | Galaxy S23 / Z Fold 5 |
| **VR 1999/2025** | 22 Apr 2025 | **New iPhone (Apple) only** — supersedes VR 1834 *"to the extent of New IPhone (Apple) Mobile Phones"* | ~8 pp | iPhone 16 / 16e |
| **VR 2070/2026** | 20 Apr 2026 | **Old and used**, without packing or accessories, in commercial quantity | 62 serials | iPhone 15 Pro Max / Galaxy S23 Ultra |

The column headings are exactly what a calculator needs — `S. No | BRAND | MODEL | Custom Value C&F
in US$/Piece` — and the values are per variant, so storage tiers price separately. From VR 1999/2025:
IPHONE 16 128GB **666** · 16 256GB **764** · 16 512GB **955** · 16e 128GB **591** · 16e 256GB **688** ·
16 PLUS 128GB **764** · 16 PLUS 256GB **868** · 16 PLUS 512GB **1050** · 16 PRO 128GB **878** ·
16 PRO 256GB **977**. From VR 1834/2023: IPHONE 15 128GB 825 · 15 PRO 128GB 1100 · 15 PRO MAX 256GB
1300 · GALAXY S23 8+256GB 766 · GALAXY Z FOLD 5 12+512GB 1489.

VR 2070/2026 raised the used-phone values sharply over the ruling it replaced (iPhone 15 Pro Max
505 vs 460; Galaxy S23 Ultra 305 vs 255).

> ⚠️ **VR 2035/2026 is dead and must not be used.** The Director General rescinded it by
> **Order-in-Revision No. 05/2026 dated 3 April 2026**, and VR 2070/2026 replaced it. An earlier draft
> of this document cited VR 2035 as current; that was correct on 4 August 2026 only by accident of not
> having checked the successor. Press coverage calling the replacement "VR 2076/2026" is wrong — FBR's
> own database says 2070.

### The coverage gap, which is the real problem

The rulings exist; they are just **old for everything except Apple**. Nothing official values a
Samsung Galaxy S24 or S25, an iPhone 17, or a Pixel 9/10 **as a new phone** — the newest non-Apple
new-phone values in force were set in **December 2023**, and the newest Apple ones in **April 2025**.
A grep of VR 1834/2023 for `S24` and `S25` returns **zero** hits.

So a model picker is honest **only for models that appear in a ruling**, and it must say "not
officially valued — enter the value your assessment used" for everything else. That is the opposite
of what every competitor does, and it is the whole difference between citing a source and inventing
one.

⚠️ **Three caveats before transcribing any of this.**

1. **"In commercial quantity"** on VR 2070/2026 is unresolved (see §9) — whether WeBOC applies it to
   a one-off DIRBS registration is unconfirmed. VR 1834 and VR 1999 carry no such restriction.
2. **Declared value wins when higher.** VR 1834 para: *"In cases, where declared values are higher
   than the Customs values determined in this Ruling, the assessing officers shall apply those values
   in terms of Sub-Section (1) of Section 25."* So the ruling is a **floor**, not a fixed price.
3. **The text layer is OCR and it is bad.** Real extracted strings include `IPHONE I6 5I2GB`,
   `256G8`, `2t5` for 215, `I 050` for 1050, and one iPhone 15 Pro value rendered as `1 two-`. Every
   figure must be read off the **rendered page**, not the text layer, before it is typed into
   `rates.ts`. This is the single largest transcription risk in the whole calculator.
   Budget a working day for the 1,160 rows, and once they are in `rates.ts` re-read a random sample
   of ~50 against the rendered annexure as a **deliberate** step. A scripted dump looks finished when
   it isn't: a phone priced at 2 instead of 215 sits there being wrong for whoever picks that model,
   because nobody eyeballs 1,160 rows incidentally. Every other unknown in this build is one we know
   we have.

The PKR/USD rate is a second moving part: the sales tax is a percentage of a dollar-denominated
value, so the answer changes with the assessment rate. The page must show the rate it used, identify
Rs 280 only as an editable default and tell the visitor to use the assessment rate. At the user's
direction it does **not** attach a date to that default; the important safeguard is that the copy
never presents it as current or automatic.

## 6. Why this cannot reuse the shared calculator plumbing

`calcSlabTax` is useless here. None of the five components is progressive — each is a **banded**
table where the band sets one amount (or one rate) for the whole value. That is the same shape as
the vehicle and withholding calculators, and [conventions.md](conventions.md) already warns not to
confuse the two.

Worse, the components do not share bands:

| Threshold (US$) | RD | Sales tax | §148 | Levy |
|---|---|---|---|---|
| 30 | ✔ | | ✔ | ✔ |
| 100 | ✔ | | ✔ | ✔ (gap 100–101) |
| 200 | ✔ | | ✔ | ✔ (gap 200–201) |
| 350 | ✔ | | ✔ | ✔ (gap 350–351) |
| **500** | ✔ | **✔ (the only one)** | ✔ | ✔ (gap 500–501) |
| 700 | | | | ✔ (gap 700–701) |

So `lib/rates.ts` needs **four independent band tables** keyed by fiscal year, each resolved
separately, not one shared band list with four columns. Writing it as one table is the obvious
mistake and it silently mis-charges anything between 500 and 501, and anything over 700.

## 7. What the calculator can and cannot honestly produce

**Can:** given a C&F value in US$, a fiscal year, a route (passport / CNIC) and a device class
(smartphone / non-smart cellular phone), compute CD + RD + sales tax + §148 + levy, itemised, with the
FX rate stated.

**Cannot, and must say so:**

- **The CNIC fine.** CGO 01 of 2019 para 2B has the local applicant paying "duty/taxes **and
  prescribed fine**", and para 2A the same for a traveller past 60 days. The fine is "as per FBR
  assessment procedure" and **no published schedule for it was found**. The CNIC figure is therefore a
  **floor**, and the page must label it one. Publishing a CNIC total that omits an unknown fine and
  calling it "the tax" would be the same class of error as the aggregators.
- **A model lookup for phones no ruling covers.** A new-phone picker is defensible for the **1,087
  published value rows across 870 model families** assembled from VR 1834/2023 plus the Apple rows
  superseded by VR 1999/2025. VR 2070/2026 is commercial-used context only and never prices the
  selected phone. It
  is **not** defensible for a Galaxy S24/S25, an iPhone 17 or a Pixel 9/10 as a new phone, because no
  ruling values them (§5). Those must fall through to a "not officially valued" state that asks for
  the value, never to a guess. Note also that a ruling value is a **floor** — a higher declared value
  displaces it — so even a covered model yields a minimum, not a certainty.
- **Years before 2025-26.** Sales tax has been 18%/25% only since the Finance Act 2024, RD needs the
  FY 2024-25 SRO which was not read in this pass, and the levy and §148 tables both moved. Ship
  `2026-2027` and `2025-2026` only — two years, exactly like the token-tax calculator — and show the
  "not covered" panel rather than guessing an older year.

### A worked FY 2026-27 example, for the implementer to test against

US$ 600 smartphone, FX Rs 280/US$, customs value Rs 168,000, sales-tax reading A:

| Line | Passport | CNIC |
|---|---|---|
| Customs duty (Fifth Sch. S.No 99) | 0 | 0 |
| Additional customs duty | 0 | 0 |
| Regulatory duty (above 500) | 17,600 | 17,600 |
| Sales tax (25% of 168,000) | 42,000 | 42,000 |
| Income tax §148 (above 500, CBU) | **0** (clause 60E) | 11,500 |
| Mobile handset levy (501–700) | 8,000 | 8,000 |
| **Total** | **Rs 67,600** | **Rs 79,100 + unpublished fine** |

⚠️ This assembled total looks far lower than the figures circulating on third-party "PTA tax" sites,
which quote six figures for a flagship. **That gap is an artefact of the example, not a defect in the
tables** — see the reconciliation below. A flagship at US$ 1,200 C&F (Rs 336,000 at Rs 280/US$) comes
out at RD 17,600 + ST 84,000 + levy 16,000 = **Rs 117,600** on the passport route, which is the six
figures those sites quote. **Before shipping, one real PSID assessment should still be compared line
by line against this table**, because a competitor agreeing with us is not the same as FBR agreeing
with us.

### Cross-check against a third-party calculator — 4 August 2026

Not a source, and it must never appear in the official-sources grid. Recorded because it is the only
independent arithmetic this research could be tested against, and it tests well.

`taxcalculator.pk`'s PTA page returns, for a Samsung Galaxy S24 FE: **Rs 75,500 passport /
Rs 95,700 CNIC**. Solving the passport figure against §4 with a sales-tax base of `V` rupees:

```
RD (above 500, FY 2025-26)  22,000
levy (501–700)               8,000
sales tax  0.25 × V         45,500   → V = 182,000  ( = US$ 650 at Rs 280/US$ )
                            ------
                            75,500   ← exactly their figure
```

**What that confirms.** The RD table in §4.3, the levy table in §4.6, the 25% cliff in §4.4 and — the
one that mattered most — **customs duty at zero**. A Rs 250/set CD would put the total at 75,750 and
force `V` to an unclean 181,000. Reading A of the sales-tax base also survives: reading B would add
CD + RD to the base and overshoot. So an independently-built calculator lands on the same five lines
this doc derived from the statutes.

**What it does not confirm, and where they diverge from us.** US$ 650 is the S24 FE's **US retail
launch price**, not a customs valuation — precisely the substitution §5 warns against, and C&F
normally sits *below* MSRP. Their model picker is MSRP-as-C&F with the label filed off. The proof is
that the **Galaxy S24 FE appears in no valuation ruling at all** (§5): the newest non-Apple new-phone
values in force date from December 2023 and stop at the S23. There is no official number for that
phone, so theirs cannot be one. Their CNIC
column is Rs 20,200 above the passport one, of which §4.5 accounts for Rs 11,500 (§148, above 500,
CBU); the residual **Rs 8,700 is unexplained**. It is the right order of magnitude for the fine FBR's
own clarification hints at, but a competitor's undocumented constant is **not evidence** and does not
close the open question in §9. Their page is also headed "as per 2024-2025 budget" while computing on
the FY 2025-26 RD table, and offers no year selector at all.

## 8. Official sources for the page

Per `CLAUDE.md`, only government sources, **every source the page actually uses, and every year the
calculator computes**. The last clause was missed twice: the grid first shipped without SRO
1152(I)/2025 or the Finance Act 2022, then cited SRO 1151(I)/2025 in the breakdown without giving it
a card. A year the dropdown offers is a rate claim like any other. This regime is
entirely federal, so `OFFICIAL_SOURCES_COPY` can be used unchanged — no provincial emblem problem
like the token page has. But **PTA is not FBR**, and the grid must show both, with PTA's own mark on
the PTA cards:

| Card | Government body | What it supports |
|---|---|---|
| PTA DIRBS Device Registration System (`dirbs.pta.gov.pk/drs`) | PTA | Where you actually register |
| PTA DIRBS FAQs (14 Oct 2025) | PTA | 60 days, 120-day temporary registration, no filer discount, PSID validity |
| Income Tax Ordinance 2001, amended to 30 Jun 2026 | FBR | §148 table; Second Schedule Part IV cl. (60E) |
| Finance Act 2026 | FBR | Ninth Schedule instalments; levy serial 3 cut to Rs 200; §148 serial 3 cut to Rs 100 |
| Sales Tax Act 1990, updated 2025-26 | FBR | Ninth Schedule Table-II, 18%/25% |
| Finance Act 2018 (as amended) | FBR | §10, the mobile handset levy itself |
| Finance Act 2022 | FBR | The seven-band levy table still in force |
| SRO 1152(I)/2025 | FBR | Regulatory duty for the 2025-26 tax year |
| SRO 1151(I)/2025 | FBR | Additional customs duty and its exemptions for the 2025-26 tax year |
| Pakistan Customs Tariff FY 2025-26 | FBR | Heading 85.17 |
| Fifth Schedule to the Customs Act 1969 (2025-26) | FBR | Serial 99 — smartphones at 0% |
| SRO 1064(I)/2026 | FBR | Regulatory duty |
| SRO 1063(I)/2026 | FBR | Current ACD rules and the baggage / Fifth Schedule exemptions |
| Customs General Order 01 of 2019, as amended by CGO 01 of 2024 | FBR | The registration procedure, the fine, the 120-day scheme |
| Valuation Ruling 1834/2023 | Directorate General of Customs Valuation | New-phone C&F values, all brands — **cite if the model picker ships** |
| Mobile-phone Valuation Advice (November 2021) | Directorate General of Customs Valuation | **Superseded for valuation**; used only for the exact W4003 part number behind VR 1834's ambiguous `itel-14 Max` label |
| List of Approved MDM Authorization Holders (2023) | Engineering Development Board | Brand-level corroboration only: X Tell and Sea Shark are recorded as 2G; it does not classify their individual models |
| Valuation Ruling 1999/2025 | Directorate General of Customs Valuation | New iPhone C&F values, supersedes VR 1834 for Apple |
| Valuation Ruling 2070/2026 | Directorate General of Customs Valuation | Old/used-phone C&F values (replaces the rescinded VR 2035/2026) |
| WeBOC Mobile Device Duty Information | FBR / PRAL | The official per-IMEI duty lookup — where a user gets their real figure |
| FBR IRIS / e-payment | FBR | Paying the PSID |

Do **not** add PriceOye, WhatMobile, any "PTA tax calculator" site, PwC or ICMA, even as secondary.
The entire first page of search results for this topic is aggregators, and they are wrong about who
levies the tax.

## 9. Open questions

Carry these into [open-questions.md](open-questions.md). Every one of them below is still open; where
the shipped page takes a position anyway, the position is named and shown to the visitor.

- ✅ **CLOSED — does a used phone get the lower old-and-used values?** Not for a traveller. **VR
  1834/2023 Note 1**, on the final page of the annexure, settles it:

  > Used/refurbished mobile phones imported by bonafide passengers shall also be assessed on the
  > customs values given in Annexure-I as allowance for their depreciation is also incorporated in
  > the above-tabulated values.

  So a passenger's used handset is assessed on the **new-phone** table, and VR 2070/2026's much lower
  figures belong to commercial-quantity imports. The calculator implements this: the New/Used control
  does not change the value, and selecting Used raises a note explaining why and showing the VR 2070
  figure alongside, labelled commercial-only. Found on the build pass, 4 August 2026 — it was the
  open question immediately below, and the answer had been sitting on annexure page 26 all along.
- 🟡 **The sales-tax base.** Reading A (§25 customs value) vs reading B (§2(46)(d): value + customs
  duties, and possibly + RD). ~Rs 4,400 apart on a US$ 600 phone. Not resolved by any document read.
  **The calculator follows reading A and says so on the page**, in a panel under the breakdown.
- 🟡 **The CNIC fine.** Referred to by CGO 01 of 2019 and PTA FAQ Q8; no published schedule found.
  Until it is, the CNIC total is a floor.
- 🟡 **Devices per person per year: 5 or 1?** PTA's October 2025 FAQ and the Note to CGO 01 of 2019
  both say five. FBR's clarification notice says passport registrations are "now limited to 1" but
  carries no date. Both are official and they conflict.
- 🟡 **Does the Baggage Rules' free mobile phone still exist?** Rule 3A(viii) and rule 6(viii) of
  SRO 666(I)/2006 both allow "one mobile phone" duty-free, and FBR's posted copy still prints them.
  But that copy is amended only to September 2006, and PTA's FAQ says the free baggage exemption was
  withdrawn on **30 June 2019**. The withdrawal is presumably in SRO 50 & 51(I)/2019, which is a scan
  with no text layer. The passport tables charge money at every band, so in practice the allowance
  does not apply to a DIRBS registration — but the *why* is unverified.
- ✅ **CLOSED — does VR 2070/2026 reach individual registrations?** No. It says "in commercial
  quantity" and requires the handset to have been *"activated at least six (06) months"* before
  export; VR 1834 Note 1 (above) independently directs a passenger's used phone to Annexure-I. The
  shipped calculator never prices from VR 2070 — it only quotes it as labelled context.
- 🟡 **What values a phone no ruling covers?** Galaxy S24/S25, iPhone 17, Pixel 9/10 as new devices
  have no §25A value in force. WeBOC is presumably assessing them on declared/transaction value or on
  an internal reference not published as a ruling. Which, is unknown — and it is the gap every
  competitor fills by inventing a number.
- 🟡 **Does the Tenth Schedule double §148 for a non-ATL person on the CNIC route?** On the text, it
  should. Rule 1 increases *any* collection under the Ordinance by 100% for a person not on the
  active taxpayers' list, and **rule 10's exclusion list does not name section 148** — it names 149,
  152, 154, 154A, 231AB, 234, 235 and 236, and nothing else survives the omissions. Nor does any
  Part IV Second Schedule clause disapply §100BA for imports: (111A), (111AB) and (111AC) cover
  dividends to non-residents, foreign-currency accounts, and POC/NICOP holders under §236C/236K. So
  a literal reading puts a non-filer's CNIC-route income tax at **Rs 23,000** above US$ 500, not
  Rs 11,500.
  Against that: **no official source publishes two figures for phone registration.** PTA FAQ Q4 says
  everyone pays the same, but it says it about *custom duties* and PTA is not the income tax
  authority, so it does not settle this. FBR's own WeBOC lookup returns one amount. **The calculator
  follows the single published figure and the page now says the point is unresolved** rather than
  asserting parity — see the FAQ answer and the `no-filer-toggle` highlight. Do not add a filer
  toggle to resolve this: a toggle has to state a second number, and no document states one.
  To close it, look for an FBR clarification on §148 mobile-phone collections and the ATL, or a
  WeBOC/PSID output for a known non-filer.
- 🟡 **RD SRO 1064(I)/2026 rate column** — read via an 80% cross-check against SRO 1152(I)/2025, not
  off a clean text layer. Re-read before shipping. **Now disclosed on the page** rather than left in
  this file: `PTA_PROVENANCE_NOTE` renders under the breakdown whenever 2026-27 is selected and says
  in as many words that these two figures are a reconstruction and a carry-forward. "Government
  figures only" is true of the *sourcing* and was reading as a claim about the *certainty*.
- 🟡 **FY 2026-27 Customs Tariff and Fifth Schedule** not yet published; 2025-26 carried forward on
  the strength of the Finance Act 2026 containing no 85.17 amendment. Disclosed in the same note.
- 🟡 **ACD on a non-smart cellular phone (8517.1419) under the CNIC route.** SRO 1063(I)/2026 sets
  ACD by *tariff slab* (2% on the 20% slab, and so on); 8517.1419 carries a specific duty of
  Rs 250/set, which is not a slab. Which ACD rate attaches, if any, is undetermined. Immaterial for
  smartphones, which are the overwhelming majority of registrations — but the form *can* produce that
  combination, so as of 5 August 2026 the line says the exemption reaches smartphones only and that
  the total is a floor. See §4.2.
- 🟡 **Is §148 on a personally-registered handset adjustable against a return?** The page used to
  say it "is claimed back on your return", which nothing read for this page establishes. §148 is an
  advance collection, but the adjustability machinery is written around an importer with income
  arising from the import, and a traveller registering one phone for their own use has none. Neither
  the Ordinance passes read here nor the PTA/FBR material settles it. The copy now stops at what
  §148 *is* — collected in advance of the tax year — and points the reader at a tax adviser. To
  close it, look for FBR guidance on §148 collections against DIRBS registrations, or the treatment
  of a §148 credit claimed by a salaried non-importer.
- 🟡 **Do the Ninth Schedule instalments exist in practice?** Sub-clause (vi) says a person "**may be
  allowed** to pay tax in instalments **as may be prescribed**". Both phrases are conditional: it is
  an enabling power, and the rules prescribing it were unpublished as of 4 August 2026. The page said
  "You can pay this in instalments", which promised a facility nobody can currently invoke; it now
  quotes the conditionality. Re-check whether the rules have been notified before strengthening it.

## 10. Verification log

### 4 August 2026 — first pass, all primary sources

**Income Tax Ordinance 2001, amended to 30 June 2026** —
`https://download1.fbr.gov.pk/Docs/2026724177725705IncomeTaxOrdinanace2001.pdf`, 839 pp.
- p. 553 (printed 534): §148 mobile-phone table, current. Footnote 1 records FA2026 substituting 930
  → 100 at serial 3. Footnote 2 records FA2022 substituting serials 5 and 6.
- p. 551: the *superseded* version of the same table, printed as footnote text. Confusable with the
  live one — noted in §4.5.
- p. 712: Second Schedule Part IV clause (60E), §148 disapplied for baggage phones. Footnote 4:
  added by Finance Act 2019.
- **Confirmed, nothing changed:** clause (60E) survives the Finance Act 2026.

**Sales Tax Act 1990, updated to 2025-26** —
`https://download1.fbr.gov.pk/Docs/202586148252375SalesTaxActupdatedupto2025-26.pdf`, 229 pp.
- p. 218: Ninth Schedule Table-II, 18% / 25% ad valorem, "at the time of import **or registration
  (IMEI number by CMOs)**". Footnote 991: substituted by Finance Act 2024.
- p. 217: Table-I (SIM cards, Rs 250) is dead — a proviso inserted by the Finance Act 2021 disapplies
  Table-I from 1 July 2020 onwards. Not modelled, and it is not part of this tax.
- p. 25: §2(46)(d), value of imported goods. Source of the reading-A/reading-B question.
- **Negative finding:** the word "baggage" does not appear anywhere in the Sales Tax Act. There is no
  sales-tax baggage exemption; the passport route pays the same 18%/25% as the CNIC route.

**Finance Act 2026** — `https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf`, 256 pp.
- p. 28 (gazette 554): Ninth Schedule new sub-clause (vi) — DIRBS instalments. Quoted in full in §4.4.
- p. 76: s.7 amends §10 of the Finance Act 2018, serial 3, Rs 600 → Rs 200.
- **Confirmed, nothing changed:** no occurrence of `8517`, `handset`, or `regulatory duty` anywhere in
  the Act. Ninth Schedule Table-II rates untouched; heading 85.17 untouched.

**Finance Acts 2018, 2019, 2022** — mobile handset levy chain. FA2018 p. 133 (original rupee-banded
table), FA2019 p. 123 (substituted, re-banded to US$), FA2022 p. 111 (substituted, seven bands, the
one still in force). Greps of FA2019, FA2020, FA2021, FA2023, FA2024, FA2025 for `handset`,
`smart phone`, `levy per set`, `Finance Act, 2018` found no further amendment.

**Pakistan Customs Tariff FY 2025-26** —
`https://download1.fbr.gov.pk/Docs/20258111683941732Tariff-2025-26.pdf`, p. 249. Heading 85.17 rates
transcribed in §4.1. FBR's Customs Tariff page has no FY 2026-27 file as of this date.

**Fifth Schedule to the Customs Act 1969, updated 2025-26** —
`https://download1.fbr.gov.pk/Docs/202585238495687Fifth-Schedule.pdf`, p. 66, Part-III serials 99 and
99A. Smartphones 8517.1390 at 0%, condition "Nil". Part-III begins at p. 62; its chapeau conditions
name only serials 24, 29 and 35, so they do not reach serial 99.

**SRO 1064(I)/2026 (regulatory duty)**, `…/SROs/202663017637155381064-2026.pdf`, p. 24 — and
**SRO 1152(I)/2025**, `…/SROs/202572975650649SRO.1152of2025.pdf`, p. 31. Tables in §4.3.
- **Negative finding:** the 2026 SRO's text layer is a bad scan; the rate column extracts one row out
  of alignment. The 2025 SRO extracts cleanly and was used to disambiguate it.

**SRO 1063(I)/2026 (additional customs duty)**, `…/SROs/20266301763307131063-2026.pdf`, p. 2, para 3 —
exemptions (iii) and (iv). Quoted in §4.2.

**Federal Excise Act 2005, amended to 30 June 2026** —
`https://download1.fbr.gov.pk/Docs/20267171373633512FEDAct2005updatedupto30-06-2026.pdf`, 103 pp.
- **Negative finding, deliberately recorded:** a full scan for `8517`, `mobile phone`, `telephone set`,
  `smartphone` and `handset` hits **one page only** — p. 83, First Schedule Table II serials 6 and 6A,
  telecommunication *services* at 19.5% plus 75 paisa per mobile call. **There is no federal excise
  duty on a handset**, so FED is zero in the §2(46)(d) sales-tax base. Worth having written down: the
  absence is otherwise indistinguishable from not having looked.

**CGO 01 of 2019 as amended by CGO 01 of 2024** —
`https://download1.fbr.gov.pk/Docs/20243221135610629CGO-01-2024.pdf`, 7 pp. Paras 2A (traveller,
60 days, fine thereafter), 2AA (120-day temporary registration, one handset), 2B (local applicant,
duty/taxes **and prescribed fine**), 2C (postal/courier), 2D (local traders), 2E (commercial CoC).
Note at the end: five devices per individual per year.

**PTA DIRBS FAQs, 14 October 2025** —
`https://www.pta.gov.pk/assets/media/2025-10-14-FAQs_updated.pdf`, 18 pp. Q5, Q8, Q12–Q15 and the
PSID section. Q8 is the one that kills the "60-day discount" story. **Negative finding:** WebFetch
fails on pta.gov.pk with `Parse Error: Missing expected CR after header value`; `curl` with a browser
User-Agent works.

**Valuation Ruling 2035/2026, 16 January 2026** —
`https://download1.fbr.gov.pk/VALUATIONS/20261191314224474VR2035-Old&UsedMobilePhone.pdf`, 5 pp.
Supersedes VR 893/2024. Values determined under §25(7) after the transaction-value, identical-goods
and similar-goods methods were each found inapplicable. Scope is "commercial quantity".
- ⚠️ **Superseded — see the second pass below.** Rescinded by Order-in-Revision No. 05/2026 of
  3 April 2026 and replaced by VR 2070/2026. Do not use its values.

**Baggage Rules 2006 (SRO 666(I)/2006)** —
`https://download1.fbr.gov.pk/SROs/2024129141213475172006sro666.pdf`, 6 pp. Rule 3A(viii) and rule
6(viii) both allow one mobile phone duty-free.
- **Negative finding:** despite a 2024 filename, this copy's amendment list ends at
  *"S.R.O.___(I)/2006 dated 15.09.2006"*. It does not reflect the 2019 withdrawal PTA describes. FBR
  is hosting a twenty-year-old text as current.

**Negative findings — sources that could not be read**

- `https://download1.fbr.gov.pk/Docs/20193191531629929ApplicableDutyDribs.pdf` ("Mobile Phone having
  C&F Value") — **image-only, no text layer.**
- `https://download1.fbr.gov.pk/Docs/2021971492927623DutyRatesMobilePhones.pdf` — **image-only.**
- `https://download1.fbr.gov.pk/SROs/20191161314111109SRO50&51of2019Customs.pdf` (the DIRBS SROs
  themselves) — **image-only.** This is the one that probably settles the Baggage Rules question.
- `https://www.fbr.gov.pk/mobile-device-duty-information/152585` and `…/duty-calculator/51149/152538`
  — JavaScript-rendered; WebFetch returns navigation chrome only. FBR publishes **no machine-readable
  consolidated passport/CNIC table** for a current year that this pass could find.
- The only consolidated FBR table with a text layer is
  `https://download1.fbr.gov.pk/Docs/2022121151057381Rateofdutyonmobile.pdf`, **FY 2021-22**, which
  is five years stale (it still shows 17% sales tax). Useful only as evidence of the two-column
  passport/CNIC *shape*; **do not take a rupee figure from it.**

**A note on that 2021-22 table, since someone will try.** Subtracting its passport column from its
CNIC column gives 120 / 1,123 / 1,981 / 2,461 / 5,620 / 9,407. Subtracting the then-current §148
amounts (70 / 100 / 930 / 970 / 3,000 / 5,200) leaves 50 / 1,023 / 1,051 / 1,491 / 2,620 / 4,207 —
which is neither a flat fine nor a clean percentage of anything. The residual was **not** resolved
and is not evidence for any fine formula.

### 4 August 2026 — second pass, hunting a per-model valuation source

Triggered by comparing the doc against a competitor's model-picker UI. **It overturned §5 of the
first pass**, which asserted no official new-phone valuation table exists. One does.

**How to enumerate the rulings — the method, because it is not discoverable from the page.**
`https://www.fbr.gov.pk/showvaluations` renders an empty shell; the table is a server-side DataTables
grid. `POST https://www.fbr.gov.pk/Home/LoadVALUATIONs` returns JSON with **926 rulings**, each with
`VALUATIONNumber`, `Title`, `CreationDate` and a direct `UploadedFile1` PDF URL. It requires the full
DataTables parameter set — `draw`, `start`, `length`, and `columns[n][data]` **plus `columns[n][name]`**
for all three columns, `order[0][column]`, `order[0][dir]`, `search[value]`, `department=Customs` —
with `X-Requested-With: XMLHttpRequest` and a `Referer`. **Negative findings:** dropping the
`columns[n][name]` keys returns a 49-byte error body; `length` above ~100 does the same, so page
through in hundreds; and `POST /LoadVALUATIONs` without the `/Home` prefix 302s to an ASP.NET error
path. Filtering all 926 titles for handset terms yields exactly **13** rulings, three of them live
device rulings.

**Valuation Ruling 1834/2023, 5 December 2023** —
`https://download1.fbr.gov.pk/VALUATIONS/2023121214121119988ValuationRuling1834-2023.pdf`, 29 pp.
Supersedes VR 1732/2023 of 23-01-2023. Annexure-I is *"twenty six (26) number of pages having Serial
No. 01 to Serial No. 1160"*, columns `S. No | BRAND | MODEL | Custom Value C&F in US$/Piece`. Brands
present: Nokia, Apple, Samsung, OnePlus, Infinix, Oppo, Xiaomi, Huawei, Vivo, Tecno, Realme.
- **What it changed:** the first pass's claim that no new-phone table exists is **withdrawn**. §5 and
  §7 rewritten.
- **Coverage ceiling, verified by grep:** `S24` and `S25` return **zero** hits; the newest Samsung is
  GALAXY S23 8-256GB at 766 and GALAXY ZFOLD5 12-512GB at 1489.
- Values are a **floor**: *"In cases, where declared values are higher than the Customs values
  determined in this Ruling, the assessing officers shall apply those values in terms of Sub-Section
  (1) of Section 25."*

**Valuation Ruling 1999/2025, 22 April 2025** —
`https://download1.fbr.gov.pk/VALUATIONS/20254251041448873VR1999.pdf`, 8 pp. Scope note in its own
summary box: *"This Valuation Ruling supersedes Valuation Ruling No. 1834/2023 dated 06-12-2023 to the
extent of New IPhone (Apple) Mobile Phones."* Triggered by a letter of 16-01-2025 from the
Collectorate of Customs (Airport), Islamabad seeking inclusion of iPhone 16 variants.
- Sample: IPHONE 16 128GB 666 · 256GB 764 · 512GB 955 · 16e 128GB 591 · 16e 256GB 688 · 16 PLUS 128GB
  764 · 256GB 868 · 512GB 1050 · 16 PRO 128GB 878 · 256GB 977.
- **Ceiling: iPhone 16.** No iPhone 17 in any ruling as of this date.

**Valuation Ruling 2070/2026, 20 April 2026** —
`https://download1.fbr.gov.pk/VALUATIONS/20264221242011915UsedMobilePhone.pdf`, ~12 pp. Old and used
phones, 62 serials, brands Apple / Samsung / Google Pixel / OnePlus / Sharp.
- **What it changed:** *"The Director General, vide Order-in-Revision No. 05/2026 dated 03-04-2026,
  rescinded the Valuation Ruling No. 2035/2026 dated 16-01-2026"*, and this ruling *"supersedes earlier
  Valuation Ruling No. 2035/2026 dated 16.01.2026."* The doc's §5 was citing a rescinded ruling.
- Values rose sharply: USED IPHONE 15 PRO MAX 505 (was 460) · 15 PRO 472 (390) · 15 PLUS 390 (320) ·
  15 378 (310) · 14 PRO MAX 413 (360) · SAMSUNG GALAXY S23 ULTRA 305 (255) · S23+ 260 (160) ·
  S23 250 (140).
- Note 2 adds a condition absent from VR 2035: the handset must have been *"activated at least six
  (06) months"* before export to Pakistan.
- **Ceiling: iPhone 15 / Galaxy S23**, same as the new-phone tables.
- **Contradiction with press reporting, recorded deliberately:** propakistani and several outlets call
  the replacement ruling "**2076**/2026". FBR's own database and the PDF itself say **2070/2026**.
  Follow the database.

**WeBOC Mobile Device Duty Information** —
`https://www.weboc.gov.pk/Shared/MobileDeviceDutyInformation.aspx`, reachable without a session token.
- **Finding:** the official duty lookup is keyed by **IMEI only** — a single 16-digit field posting
  back to an ASP.NET form. FBR resolves IMEI → model → customs value → duty server-side. There is no
  model-name search and no published mapping, so this **cannot** be mirrored; it is a place to send
  the user, not a data source. It belongs in the official-sources grid for exactly that reason.

**FBR "Rate of Duty and Taxes on Mobile Phones"**, linked from the DIRBS page as
`https://fbr.gov.pk/Downloads/?id=25810&Type=Docs`.
- **Negative finding, now with a chain:** that link 301s to
  `…/Docs/2022121151057381Rateofdutyonmobile.pdf` — the **FY 2021-22** table the first pass already
  flagged as stale. So FBR's *current* DIRBS page is still handing out a five-year-old rate sheet
  showing 17% sales tax. This is very likely the origin of the wrong figures circulating on every
  aggregator, and it is worth one sentence of page copy.

**Still not found, after enumerating all 926 rulings:** any published schedule for the **CNIC fine**.
It is not a valuation ruling, so the database was never going to hold it, but the enumeration at least
rules the whole corpus out. The §9 open question stands.

### 4 August 2026 — third pass, the build

Transcribed the valuation rulings in full and shipped the calculator. Everything below was read off
the **rendered pages**, not the text layer, exactly as §5 caveat 3 demands.

**Valuation Ruling 1999/2025** — all 8 pages rendered at 170 dpi and read. Annexure-I runs to **187
serials**, Apple only, iPhone 6S through iPhone 16. Colour variants price identically within a
storage tier, so they collapse to one catalogue row each; **104 rows** result.
- **One anomaly, recorded rather than smoothed:** serial 146, `IPHONE 11 PRO,MAX -256GB SPACE GREY`,
  prints **618** where serials 147-149 (silver, midnight green, gold) all print **578**. Nothing else
  in the ruling prices a colour differently. The catalogue carries **578**, the majority figure.
- Confirms the §5 samples: iPhone 16 128GB **666**, 16e 128GB **591**, 16 Plus 512GB **1050**. Also
  fills a gap the first pass could not read: **iPhone 16e 512GB = 890**.

**Valuation Ruling 1834/2023** — all 26 annexure pages rendered and read, serials 1 to 1160.
Serials 1-171 are Apple and are superseded by VR 1999, so **989 non-Apple rows** were transcribed;
the serial numbers are contiguous and 1160 − 171 = 989 exactly, which is the integrity check that
nothing was skipped. Brands present: Apple, Huawei, Infinix, itel, Lenovo, Meizu, Motorola, Nokia,
Oppo, Samsung, Sony, Tecno, vivo, Xiaomi, realme, OnePlus, Honor, TCL, Alcatel, Sea Shark, X Tell,
ZTE, Sharp.
- **VR 1834 Note 1, annexure page 26 — the find of this pass**, quoted in §9. It closes the
  used-phone question and it is on the same page as Note 2, which sends unlisted commercial models to
  section 81 of the Customs Act.
- **Five serials are duplicated within the ruling itself**, at two different values in three cases.
  The catalogue keeps the first (lowest-serial) listing and the conflicts are recorded here:
  Nokia 130 DS serials 448/458 (both 7) · Nokia 105 DS serials 450/457/487 (6, 5, 6 → **6**) ·
  Tecno Camon 19 Neo 6+128 serials 768/776 (119, 111 → **119**) · Tecno WX4 Pro serials 805/819
  (both 32) · Tecno Pop 4 serials 835/844 (32, 33 → **32**).
- **One value is almost certainly a typo in the ruling and is shipped as printed:** serial 655,
  `GALAXY S22 ULTRA 12GB+1TB`, prints **420** — below the 512GB variant at 856 and the 128GB at 772.
  A ruling value is a floor that a higher declared value displaces, so shipping the printed figure
  cannot understate what Customs will actually assess; inventing a corrected one would be worse.

**Valuation Ruling 2070/2026** — all 4 pages rendered. **62 serials**, Apple / Samsung / Google Pixel
/ OnePlus / Sharp, no storage tiers. Note 2 (six-month activation) and paragraph 5 (declared value
wins where higher) transcribed verbatim into the code comments.

**Negative finding worth the ink:** `pdftotext`, `qpdf`, `pdfimages` and `tesseract` are all absent
from this machine and `pip install` is blocked by PEP 668. The route that worked was a throwaway
venv with **PyMuPDF**, rendering each page to PNG at 170 dpi and reading the images. Dumping the text
layer first was still worth doing — not to transcribe from, but to map which brand sits on which page
so the reading could skip the four Apple pages VR 1999 supersedes.

**What the build changed in this document:** §9 gained two closed questions; the header, §0 and §11
were rewritten from "not yet built" to "as built". No rate in §4 moved.

### 4 August 2026 — fourth pass, the SEO audit (PTA DIRBS FAQs re-read in full)

**Document:** *DIRBS Frequently Asked Questions*, PTA, revision dated 14 October 2025 —
`https://www.pta.gov.pk/assets/media/2025-10-14-FAQs_updated.pdf`, 18 pages, 4.9 MB. This is already
cited on the page; earlier passes had only pulled Q8 (no 60-day discount) out of it. Read cover to
cover this time, because an SEO pass needs the questions people actually ask and this is the only
official document that is *written* as questions.

**Method note (positive finding):** unlike every valuation ruling, this PDF has a clean text layer.
`fitz` `get_text()` on it is reliable — no rendering to PNG needed. Do not assume every pta.gov.pk
PDF is a scan. It still needs a browser `User-Agent` on `curl`; WebFetch fails on this host with a
header parse error, as recorded on the first pass.

**What it confirmed (nothing changed):**

- **Q4, p. 4 — filer parity.** *"According to FBR policies, all individuals have to pay custom duties
  regardless of being a filer / non filer."* Same question adds *"Will I get tax exemption as this is
  my first mobile device of the year?"* — answer *"No."* This is the third independent confirmation
  of the no-filer-toggle decision, and it now also rules out a first-device-of-the-year exemption.
- **Q8, p. 5 — the 60-day myth and the fine.** Verbatim as already recorded in §3.
- **Q14, p. 4 — the 60-day clock.** *"if you plan to visit Pakistan again with the same mobile, its
  60 days period will not be renewed."* Confirms §3's leaving-and-returning line.
- **Q1, p. 4 — PSID validity 7 days**, auto-deleted on non-payment, re-application required.

**What it added (new, now on the page):**

- **Q1 and Q2, p. 2 — how a visitor checks a device.** IMEI via `*#06#`, the box, or Settings; for a
  feature phone, under the battery. Status via **SMS of the 15-digit IMEI to 8484**, via
  `https://dirbs.pta.gov.pk/`, or via the **DVS** Android/iOS app. The preamble on p. 1 adds that
  every programmed IMEI must be checked separately on a dual-SIM or eSIM handset, and that the model
  the lookup returns should match the handset in hand. Shipped as FAQ `check-status`.
- **Q4, p. 9 — DIRBS is geo-fenced.** *"No, DIRBS registration Website is only accessible in
  Pakistan."* An overseas Pakistani cannot pre-register before flying. Shipped in the same FAQ.
- **Q3 and Q10, p. 9, and Q9, p. 5 — no discount for a student, a government employee, or someone
  working abroad with the Pakistani missions.** Shipped in FAQ `how-many-devices`.
- **Q16, p. 4** — an application can be deleted up to five times; the counter is reset by a CMS
  request with a valid reason. Not shipped; noted here because it looks like the "5 devices" rule
  and is a different limit entirely.

**What it did *not* settle, against expectation:**

- **Devices per year is still 5-vs-1.** Q15, p. 4 is unambiguous — *"Up to five (05) mobile devices
  can be registered by individual users in a calendar year"* — and Q6, p. 9 assumes the same ceiling
  (*"I have already registered five (05) devices, can I register sixth phone?"*). But this is the
  same PTA FAQ the second pass already read against FBR's undated "limited to 1" clarification, so it
  is one more voice on a side already counted, not a resolution. **§9 stays 🟡.** The shipped FAQ
  states both readings and recommends treating one as the safe assumption on a passport — it does not
  pick a winner.
- **The free baggage allowance.** Q4, p. 2 repeats *"As of June 30, 2019, the Federal Board of Revenue
  (FBR) has withdrawn the free baggage exemption rule"*, which is the claim §9 already records. The
  instrument doing the withdrawing is still unverified — SRO 50 & 51(I)/2019 remain text-layer-less
  scans. **§9 stays 🟡.**

**What was deliberately not shipped:** the cloning/duplicate-IMEI material on pp. 11-14 and the
one-slot-registered troubleshooting on pp. 10-11. Both are real and official, but they are device
support, not tax, and a tax calculator that starts answering them stops being one.

### 4 August 2026 — fifth pass, normalising the memory config out of VR 1834 model names

**No source was re-opened and no value moved.** This is a transcription-shape correction to what the
third pass already wrote down, recorded because the shape itself is a finding about the ruling.

**VR 1834/2023 Annexure-I writes the memory configuration six different ways.** Most serials put it
in its own column, which is where the catalogue's `variant` field comes from. **29 serials instead
fold it into the model name**, in five further notations:

| Notation | Serial example | Brands affected |
| --- | --- | --- |
| `MODEL-<storage>` | `GALAXY S10 PLUS-128`, `GALAXY A30S-64` | Samsung |
| `MODEL <ram>GB` | `GALAXY A-51 8GB` | Samsung |
| `MODEL <ram>-<storage>GB (alias)` | `GALAXY A042 3-32GB (A42)` | Samsung |
| `MODEL <ram>+<storage>` | `12 8+256`, `6 4+128GB`, `90 12+512 GB`, `HOT 30I 8+128 X669C` | Xiaomi, realme, Honor, Infinix |
| `MODEL (<ram>/<storage> GB)` | `3.2 (3/32 GB)`, `REDMI NOTE 8 (4GB / 64GB)`, `XT1925-5 (G6 64GB)` | Nokia, Xiaomi, Motorola |

Left as printed in the picker, each of those was a **separate entry in the model dropdown**, so one
handset appeared two or three times under cryptic names (`Galaxy S10 Plus-128`, `Galaxy S10
Plus-512`) while every other phone grouped its tiers under one model. All 29 were rewritten to
`model` + `variant` in the house `4 GB + 64 GB` form. Model count in the picker drops from 881 to
**870**; row count is unchanged at 1,087 new + 61 used, and the sum of all new-phone C&F values is
unchanged at **226,904**, which is the integrity check that no figure moved.

**Nothing was invented to fill a gap.** A serial printed with storage only (`S10 PLUS-128`) becomes
`128 GB` and does **not** gain a RAM figure, even where the handset's real RAM is well known — the
ruling does not state it, and the catalogue is transcription-only. Same for `GALAXY A-51 8GB`, which
states RAM and no storage and so becomes `8 GB RAM`.

**Hyphens that are part of a name were left alone** — Nokia `X2-01`, `C5-00`, `C2-03` and the rest of
that series, plus `Galaxy ALPHA-015`, `Galaxy ALPHA-71`, `Note-20 Ultra`, `Galaxy Note-10 Lite`,
`Galaxy S-10 Lite`, `Galaxy A-013 Core`, `itel-14 Max` and `Value-100`. 21 rows match a naive
"digits after a hyphen" search and are all genuine model identifiers. A scripted pass would have
mangled every one of them; the split list was built by reading all 51 candidates.

**A latent bug this uncovered, present since the build pass.** Four models are listed at *two*
serials — once unqualified, once with a configuration, at different values:

| Model | Unqualified | Configured |
| --- | --- | --- |
| Honor 90 | US$ 290 | 12 GB + 512 GB → US$ 370 |
| Xiaomi Redmi 9C | US$ 54 | 2+32 → 64 · 3+64 → 74 · 4+128 → 62 |
| Xiaomi Poco M3 | US$ 79 | 4+64 → 75 · 4+128 → 80 |
| Huawei Y7 Prime 2019 | US$ 65 | 64 GB → 79 |

**This was fixed on this pass — the paragraph below is history, not a live defect.** (An SEO audit on
4 August 2026 re-reported it as a current bug off this paragraph alone; a sweep of all 1,087 rows
confirmed zero unreachable values. If you are about to "fix" it, run the sweep first.)

`getVariantOptions` filtered on `variant !== ''`, so the unqualified row was **unreachable** — its
value was dead data and the storage dropdown offered only the configured tiers. Three of these
(Redmi 9C, Poco M3, Y7 Prime 2019) were already shipping that way. The Honor 90 case was created by
this pass, and was the worse one: before the split its two rows were two selectable models, so the
split would have quoted every base Honor 90 at **370 instead of 290**. `getVariantOptions` now keeps
the blank row in the list under `PTA_FORM_COPY.variantUnstatedLabel` (**"Not stated"**), in ruling
order, which puts it first and makes it the default. Models whose rows are *all* blank still return
an empty list and still hide the field.

The label is deliberately not "Base" or "Standard": the ruling states no configuration for those
serials and we are not guessing one.

**Left open by this pass, closed by the sixth:** `findUsedPhone` normalisation did not reconcile
`Plus` with `+`, so VR 1834's `Galaxy S10 Plus` failed to match VR 2070's `Galaxy S10+` and the
used-value note stayed blank for that handset. The split *did* fix `Galaxy S10-128` → `Galaxy S10`,
which now matches VR 2070's `Galaxy S10` at US$ 54.

### 4 August 2026 — sixth pass, auditing an audit of the shipped page

A separate session produced an SEO/consistency audit of the live page. **Seven of its eight findings
were real and are fixed below; one was a misreading of this document.** Nothing in `rates.ts`,
`phoneCatalogue.ts` or the band logic changed, and the §7 worked examples re-verify unchanged:
US$ 600 → Rs 67,600 / Rs 79,100, US$ 666 → Rs 72,220 / Rs 83,720, US$ 1,200 → Rs 117,600.

**Primary document read: Income Tax Ordinance 2001, amended to 30 June 2026**
(`docs/tax-sectors/sources/IncomeTaxOrdinance2001-upto-30Jun2026.pdf`, 839 pages, clean text layer —
`fitz.get_text()` is enough, no OCR).

- **Tenth Schedule, rule 1 — PDF p. 798, printed p. 779.** Read because the page asserted that filer
  status changes nothing here, and that claim was sourced only to PTA:

  > Where tax is required to be deducted or collected under any provision of this Ordinance from
  > persons not appearing in the active taxpayers' list, the rate of tax required to be deducted or
  > collected, as the case may be, shall be increased by hundred percent of the rate specified in
  > [ ] this Ordinance

  The footnote records that FA2024 **omitted** "the First Schedule to" from that phrase, so it is not
  confined to First Schedule rates.
- **Tenth Schedule, rule 10 — PDF pp. 802-804, printed pp. 783-785.** The exclusion list, read in
  full including every omission footnote. It names 149, 151B (non-resident), 152 (bar certain
  sub-sections), 154, 154A, 231AB, 234 (transport, 2022-23 window), 235 and 236. **Section 148 is not
  in it**, and sub-rule (y) — §37A securities — was omitted by FA2026.
- **Second Schedule Part IV, clauses (111A)/(111AB)/(111AC) — PDF p. 730, printed p. 711.** The only
  clauses disapplying §100BA and Tenth Schedule rule 1. They cover dividends to non-residents,
  FCVA/FCBVA/NRVA/NRBVA accounts, and POC/NICOP holders under §236C and §236K. **None reaches §148.**
- **What this changed:** the page's flat "filers and non-filers pay exactly the same" claim, in the
  `filer` FAQ and the `no-filer-toggle` highlight, is not supportable for the CNIC route's §148 line.
  PTA FAQ Q4 — the only source ever cited for it — says it about *"custom duties"*, and PTA does not
  administer income tax. Both texts now scope the parity claim to the duties, sales tax and levy, and
  name the §148 uncertainty. **No rate and no toggle changed:** no official source publishes a second
  figure, so the calculator still shows the single published amount, and §9 carries the open question.
- **Confirmed, nothing changed** on the way past: clause **(60E)** verbatim at PDF p. 712 — *"The
  provisions of section 148 shall not apply on mobile phones brought in personal baggage under
  Baggage Rules, 2006"* — and the **First Schedule Part II** mobile table at PDF p. 553, printed
  p. 534, still reading 70 / 100 / 100 / 970 / 5,000 / 11,500 CBU with the FA2026 footnote on
  serial 3. Both match `rates.ts`.

**Copy defects found and fixed (all in `lib/content.ts` unless noted).**

- **The rate guide's gap note was wrong for three of its four columns.** It said, unqualified, that a
  value landing in a statutory gap takes "the cheaper bracket below it" — true only of the handset
  levy. Regulatory duty, sales tax and §148 have **unbroken** bands, so at US$ 500.50 the calculator
  charges RD 17,600 / 25% / §148 11,500, i.e. the row *above*, while the note promised
  12,000 / 18% / 5,000. A published rate claim contradicting the engine. Now scoped to the levy, and
  it says what the other three do instead. The in-calculator `PTA_LEVY_GAP_NOTE` was already correct.
- **`PTA_TERMS.totalDue` omitted §148** from the headline total's tooltip — up to Rs 11,500 of the
  CNIC figure, itemised directly below it.
- **"Five charges" was stated in five places with two different memberships** over a six-row
  breakdown. Now six everywhere, enumerated identically; §1 above records the rule.
- **Two places named a button that does not exist** — "I know the value" for a control reading
  "Enter the value" (`PTA_COVERAGE_NOTE`, and the `no-official-value` FAQ, which also ships in the
  FAQPage structured data).
- **`formatPlainBand` said "under US$ 500" for a band that includes 500** (`lib/formatting.ts`). A
  handset at exactly US$ 500 is taxed at 18%, so the sentence put the reader's phone outside the band
  it had just been priced in — with `formatUsdBand`'s correct "up to US$ 500" printed underneath it.
  Now "US$ 500 or less". Same defect at the US$ 30 boundary.
- **The hero badge claimed "1,000+ phone models"** for 870 models. It is now derived from
  `PTA_NEW_PHONES.length` and reads **1,087 official phone values**, which is the number that is
  actually 1,000+.
- **`findUsedPhone` now folds `+` to `plus`** (`lib/phoneLookup.ts`), closing the fifth pass's known
  gap. Galaxy S23+/S22+/S21+/S20+/S10+ in VR 2070 now match VR 1834's `… Plus`, taking the used-value
  note from 39 to 43 of 62 used rows. Verified the fold does **not** merge a plus model into its base:
  S23 → 250 vs S23 Plus → 260, S22 → 130 vs S22 Plus → 180, S21 → 110 vs 150, S20 → 75 vs 94,
  S10 → 54 vs 60. The three used rows claimed by two new models each are the intended 5G/hyphen folds
  (`Note-20`, `Note 20 Ultra 5G`, `S10 5G`), not new collisions.

**The finding that was not real.** The audit reported three catalogue rows (Redmi 9C US$ 54, Poco M3
US$ 79, Y7 Prime 2019 US$ 65) as unreachable because `getVariantOptions` filters `variant !== ''`.
It does not — the fifth pass removed that filter, and the paragraph it was read from says so two
lines later. A sweep of all 1,087 rows through `getModelOptions`/`getVariantOptions` returns **zero**
unreachable values. The fifth-pass section now opens by saying it is history. **Lesson worth keeping:
this document narrates fixed bugs in the past tense, and a reader who greps rather than reads will
report them as live.**

**Also corrected in §11:** the "storage is absent for the 747 models the rulings price only once"
bullet, which named a figure matching nothing measurable and described behaviour the code does not
have. Measured: 870 models, 548 with the field hidden, 178 with a deliberate one-option dropdown,
726 priced once.

### 4 August 2026 — seventh pass, making the model list typeable

No document was opened and no value moved. Recorded because it changes a **shared** control that
every calculator uses, and because the reason it was needed is a property of this catalogue.

**The problem.** `SelectInput`'s type-to-jump (`findTypeaheadIndex` in `components/calculator/
select.ts`) matches `label.startsWith(term)`, which is what a native `<select>` does. Every Samsung
model here is labelled `Galaxy …`, so typing anything reaches the same 128 entries in the same order
and the only way to a specific phone was the scrollbar. The fifth pass made this worse in one narrow
sense by folding variants together: the list got shorter, but the entries a user could previously
land on by their storage suffix (`Galaxy S10 Plus-128`) stopped existing.

**What was added.** An opt-in `searchable` prop on `SelectInput`, wired on the PTA **model** field
only. Brand (23 options) and storage (at most a handful) keep the old behaviour — a filter box there
raises a keyboard on mobile in exchange for nothing.

- `filterOptions` (`components/calculator/select.ts`) strips punctuation and spacing from **both**
  sides, then requires every whitespace-separated term to appear somewhere in the label. Order does
  not matter, adjacency does not matter. This is not tidiness: VR 1834 spells one handset several
  ways, so `Galaxy A-51` is typed "a51", `Galaxy NOTE8` is typed "note 8", and a substring test on
  the raw label finds neither. Verified on the real catalogue — "s10 plus" and "plus s10" both →
  `Galaxy S10 Plus`; "note8" and "note 8" both → `Galaxy NOTE8`; "a51", "a-51" and "A 51" all →
  `Galaxy A51` + `Galaxy A-51` (two genuinely different serials at different values, correctly both
  shown); "16pro" → `iPhone 16 Pro` + `iPhone 16 Pro Max`.
- **`+` is deliberately preserved** where every other symbol is dropped. 18 catalogue rows carry it
  and it is never decorative: `Galaxy S8` is US$ 250 and `Galaxy S8+` is US$ 274, `Redmi Note 12 Pro`
  is not `Redmi Note 12 Pro+ 5G`. Verified "s8" → both, "s8+" → only the plus, "note 12 pro" → 3
  hits, "note 12 pro+" → 1. Collapsing it would have made the cheaper handset unreachable by search,
  which is the same class of defect as the fifth pass's Honor 90.
- Known and accepted false positive: a dot collapses, so Nokia "3.2" also matches `C32`. Both are
  listed, the exact match is present, and a filter is not a lookup.

**Accessibility.** A listbox cannot hold focus and be typed into at once, so a searchable panel
keeps focus in the filter box and moves the highlight through `aria-activedescendant`; options drop
to `tabIndex={-1}`. The consequence worth noting: the tooltip that explains a `disabledReason` used
to fire on an option's `focus`, which now never happens in this mode, so `useSelectInput` raises it
from the active-index effect instead. No PTA option carries a `disabledReason` today — this is for
the other calculators that do.

**Non-searchable dropdowns are untouched.** `searchable` defaults to `false`, so arrow keys,
Home/End, type-to-jump, Escape and focus-returns-to-trigger behave exactly as before everywhere
else. New file: `components/calculator/SelectSearchField.tsx`.

### 5 August 2026 — eighth pass, a code-versus-doc audit, and two real rate errors

Another agent audited the shipped feature **against this document** rather than against the primary
sources, and found things the sixth pass's copy audit could not: the sixth pass compared the page
with itself, this one compared the page with the record. Every finding was re-verified in code before
anything moved. **Two of them were arithmetic, not wording**, which is the first time that has
happened on this page.

**Rate error 1 — §148 charged Rs 70 to a cheap smartphone.** `INCOME_TAX_148_*` carried serial 1
(Rs 70) as a flat 0-30 band with no device-type test, while First Schedule Part II qualifies it "Up
to 30 **except smart phones**" and puts smartphones in serial 2 "up to 100" at Rs 100. The comment
sitting above the table asserted the two lowest rows "share a rate for every phone this calculator
prices" — they differ by Rs 30, which is what a comment stating a conclusion instead of the data will
do. 100 of the 1,087 catalogue rows are valued at US$ 30 or less and a good number are Android
handsets (Galaxy J1 Mini Prime 24, Oppo A3S 30, Meizu C9 30, Lenovo K320 29, Sharp Aquos R 26), so
this was reachable from the picker, not only from manual entry. Now two tables (§4.5). A US$ 20
smartphone on CNIC at Rs 280/US$ moved **Rs 1,418 → Rs 1,448**; a basic phone at the same value is
Rs 1,668, the Rs 250 customs duty being the rest of the difference.

**Rate error 2 — the levy gap stopped one dollar short.** Re-read the operative table off
**Finance Act 2022, PDF p. 111**, section 7 ("Amendment in Finance Act, 2018"), verbatim:

> | Sr. No | Mobile Phones having C&F Value (US Dollars) | Rate of levy per set in Pak Rupees |
> |---|---|---|
> | 1. | Up to 30 | 100 |
> | 2. | Above 30 and up to 100 | 200 |
> | 3. | Above 101 and up to 200 | 600 |
> | 4. | Above 201 and up to 350 | 1800 |
> | 5. | Above 351 and up to 500 | 4000 |
> | 6. | Above 501 and up to 700 | 8000 |
> | 7. | Above 701 and above | 16000 |

Serial 3 begins **above** 101, so US$ 101 itself is inside the hole — not just the 100.50 this file
had been using as the example. `findAmountBand` compared `cnfUsd >= band.minUsd`, which pulled 101
*up* into serial 3 while 100.50 fell *down* into serial 2: the page advertised one fill rule and the
engine ran two. **Three shipped catalogue handsets are valued at exactly US$ 101** (Galaxy-A3 (2017),
Redmi 5 3 GB, Infinix Hot 20I), so for tax year 2025-26 they were charged Rs 600 where the statute
imposes nothing and the stated rule gives Rs 200 — **Rs 400** on a real, pickable phone. The
comparison is now `>`, with `0` the one inclusive floor, and the gap notice fires at 101 as it should.
Regression-checked that the contiguous tables do not move at a threshold: US$ 30, 100, 200, 350 and
500 return identical RD, §148 and sales-tax figures before and after, and §7's three worked examples
(600 → 67,600 / 79,100; 666 → 72,220 / 83,720; 1,200 → 117,600 / 129,100) are unchanged.

**Claims that ran ahead of the sources** — each cut back to what was actually read, and each now an
open question in §9 rather than a silently softened sentence:

- **"It is claimed back on your return."** Nothing read for this page establishes that a traveller
  registering one handset can adjust a §148 collection; the adjustability machinery assumes an
  importer with income arising from the import. Now stops at "collected in advance of the tax year".
- **"You can pay this in instalments."** The Ninth Schedule sub-clause says "**may be allowed** …
  **as may be prescribed**", and the rules are unpublished. Now quotes the conditionality, in the
  note and in the FAQ.
- **"You cannot use this option twice for the same phone."** CGO 01 of 2019 records the narrower
  restriction — the same IMEI cannot come back on a *different passport*. Now says that.
- **"Handsets are exempt" on the ACD line.** True via the Fifth Schedule for smartphones and via the
  Baggage Rules for the passport route, and true of neither for a basic phone on CNIC. See §4.2.
- **"Government figures only" beside a reconstructed rate.** The RD 2026-27 column came off an 80%
  cross-check against a poor scan and the 2026-27 tariff was never published. Both were recorded here
  and nowhere the visitor could see. `PTA_PROVENANCE_NOTE` now says so under the breakdown whenever
  2026-27 is selected. The badge is about *sourcing*, but it was reading as a claim about *certainty*.

**Sources the grid was missing.** Selecting tax year 2025-26 prices entirely off **SRO 1152(I)/2025**
and the **Finance Act 2022**, neither of which had a card — the grid cited only the current year.
Both added (URLs in §10's first-pass entry and `PTA_DOC_URLS`; both re-checked live, HTTP 200). The
ACD citation was hard-coded to SRO 1063(I)/2026 on both years and is now `sources.additionalCustomsDuty`,
so 2025-26 cites SRO 1151(I)/2025, the notification 1063 supersedes. Two card descriptions were also
wrong: **IRIS** was described as where the payment slip is *created* (DIRBS issues the PSID; IRIS is
e-payment), and **VR 1834** as "1,160 models" when 1,160 is its serial count and its Apple entries are
superseded by VR 1999.

**Structured data claimed more than the page shows.** The WebApplication `featureList` said "1,087
handsets" where 1,087 is published *values* across 870 models, and enumerated five charges where the
page itemises six. Both now derive from the catalogue rather than being typed. Google requires
structured data to represent visible content; an inflated count is the kind of thing that is invisible
until it is not.

**Exchange-rate wording here was superseded by the thirteenth-pass follow-through below.** At this
point `PTA_EXCHANGE_RATE_DATE` existed and was rendered only in the popular-phones basis line, so the
main field's Rs 280 default carried no date and read as live. The field later gained help text, then
the date was removed from both places at the user's direction while retaining the warning that Rs
280 is only an editable default. `usePtaTax` also computed `usedPhone` from
`brand`/`model` regardless of value source, so a visitor in "Enter the value" mode who selected Used
was shown a bulk-import figure for whatever the picker's untouched defaults happened to be; it is now
gated on `valueSource === 'model'`.

**Historical decision, superseded by the thirteenth pass below.** This pass declined to derive device
type because VR 1834 does not carry a classification field. The later pass did the missing external
platform research, recorded the uncertainty explicitly and added a guarded taxonomy instead of
pretending that the valuation ruling itself supplies the answer.

**Quality gate:** `lint:fix` → `lint` (821 files, clean) → `type-check` clean; production build
succeeded at **20 kB / 139 kB**; content-policy sweep over `src/features/pta-tax/` clean.

### 5 August 2026 — ninth pass, closing the re-audit

The current feature was checked again against the eighth-pass record. This pass corrected the
remaining presentation and provenance mismatches rather than changing a tax amount:

- **Unknown ACD is now a real state, not a zero with exemption styling.** `PtaTaxLine.status`
  distinguishes `charged`, `exempt` and `unknown`. A basic phone on CNIC shows **Not included** in
  amber; the headline and both route cards say the known subtotal is a minimum and separately name
  the fine. The model picker also warns that the valuation ruling does not classify device type.
- **Every printed band names its endpoint semantics.** Middle rows now say “above US$ X and up to
  US$ Y”. This removes the false implication that US$ 30 or US$ 101 belongs to the upper row while
  preserving the downward fallback for the levy’s genuine drafting gaps.
- **Source attribution was narrowed.** The Income Tax Ordinance is the source of the complete §148
  table and its footnotes; the Finance Act 2022 card now claims only the seven-band handset-levy
  rewrite. The source intro now covers tax rates and published customs values, not the editable
  Rs 280 exchange-rate assumption.

One primary source was opened and cached during this pass:

- **SRO 1151(I)/2025**, official FBR PDF,
  `https://download1.fbr.gov.pk/SROs/202572975414701SRO1151OF2025.pdf`, **PDF p. 2** (the second and
  final page; no separate printed page number). The operative text is:

  > The additional customs duty shall not be levied on the following, namely: -
  > (iii) import under the Fifth Schedule to the Customs Act, 1969 (IV of 1969),
  > excluding, -
  > (1) serial numbers 30, 33 and 35 of the Table of Part-I,
  > (2) serial numbers 102, 110, 111, 116(except xvi), 117 and 118 of the
  > Table of Part III;
  > (iv) import under the Baggage Rules, 2006;

  This confirms that tax year 2025-26 uses the same two relevant exemptions as the successor
  notification: the passport route is covered by the Baggage Rules; the Fifth Schedule reaches
  smartphones but does not establish the treatment of a basic phone on CNIC. The PDF is cached as
  `docs/tax-sectors/sources/SRO1151-2025-ACD.pdf` and recorded in that folder’s README. It was missing
  from the official-source grid even though the year-specific breakdown cited it; a card was added.

**Deliberately not modelled in this pass:** no ACD percentage was invented for a basic phone on CNIC,
and no model was classified from the undifferentiated valuation annexure alone. The thirteenth pass
later adds a separately sourced model taxonomy; the unresolved ACD remains unresolved. The catalogue
sweep count was also corrected from 1,084 to **1,087** lookup rows, making the combined documented
sweep **9,783**, not 9,780. Page review and structured-data modification dates now record 5 August
2026.

**Verification after the fixes:** `lint:fix` → `lint` → `type-check` all passed; the production build
completed at **20.3 kB / 139 kB** for this route. A direct compiled-module sweep covered all 1,087
catalogue rows × 2 years × 2 routes × 2 device types (**8,696 calculations**), including the explicit
unknown-ACD state, all six line statuses, the US$ 101 gap and the three worked examples.

### 5 August 2026 — tenth pass, official DIRBS identity

The live PTA Device Registration System was opened at `https://dirbs.pta.gov.pk/drs`. Its application
bundle `https://dirbs.pta.gov.pk/drs/static/js/main.183537f8.js` identifies and renders this image as
the DIRBS header logo:

`https://dirbs.pta.gov.pk/drs/static/media/dirbs.864c516c1922970b878f.jpg`

The asset is the multicolour **DIRBS Pakistan** wordmark and is served directly by PTA's official
`dirbs.pta.gov.pk` host. It was cached unchanged at
`public/images/official/dirbs-logo.jpg` (4,160 × 2,339 px) and now appears on both PTA cards in the
official-sources grid; the generic phone and globe icons were removed. No tax rate, procedure or
calculator behaviour changed. The source image includes generous white margins, so the card clips
only that surrounding whitespace through the existing logo presentation rather than altering the
official artwork. `lint:fix`, `lint`, `type-check` and the production build all passed; the built
route contains the local logo twice, once for each PTA card.

### 5 August 2026 — eleventh pass, shorter exchange-rate help (superseded in part)

The exchange-rate field still identifies Rs 280/US$ as a default and tells the visitor to use the
rate on their assessment, but no longer puts a date in that field-level message. The concise shipped
copy is: **“Default: Rs 280/US$. Use the rate on your assessment.”** The thirteenth-pass follow-through
later removed the date constant and date wording from the popular-phone examples as well.

### 5 August 2026 — twelfth pass, temporary manual-only basic mode (superseded)

**Superseded by the researched taxonomy in the thirteenth pass below.** This was the safe interim
behaviour while the catalogue had no independently verified device-class field.

Selecting **Basic phone** now switches the customs-value input to manual mode and removes the
brand, model, storage and value-source controls. The published valuation annexure mixes basic phones
and smartphones without identifying either class; leaving the full catalogue visible under a
basic-phone selection displayed obvious smartphones, while filtering it would require inventing a
device-type field across 870 models. The form therefore asks for the C&F value from the visitor's
PSID or assessment. Switching back to **Smartphone** restores the model picker.

This is enforced both in the state transition and in the pure input layer: `usesManualPtaValue()`
treats every basic-phone state as manual even if a stale caller supplies `valueSource: 'model'`.
No tax rate or device classification was added. A direct invariant check confirmed that such a stale
state ignores the catalogue and declared value, uses the manual C&F figure and exposes no official
model value. `lint:fix`, `lint`, `type-check` and the production build all passed.

### 5 August 2026 — thirteenth pass, researched device taxonomy and filtered picker

The manual-only basic mode above was replaced after a separate model-classification audit. VR 1834
still supplies **only** brand, model, configuration and C&F value; it does not become evidence of
device class merely because the code now carries one. `phoneClassification.ts` records the researched
taxonomy, and `phoneCatalogue.ts` attaches the resulting `deviceKind` to every value row.

#### Controlling test and research method

The customs test is a capability test, not a retail segment, price, keypad or model-name test. The
World Customs Organization's HS 2022 Chapter 85 Note 5 says:

> For the purposes of heading 85.17, the term “smartphones” means telephones for cellular networks,
> equipped with a mobile operating system designed to perform the functions of an automatic data
> processing machine such as downloading and running multiple applications simultaneously,
> including third-party applications, and whether or not integrating other features such as digital
> cameras and navigational aid systems.

Source: WCO Trade Tools, Chapter 85 legal notes,
`https://www.wcotradetools.org/en/harmonized-system/2022/en/168517`, Note 5. FBR's Pakistan Customs
Tariff FY 2025-26 then separates **8517.13 Smartphones** from **8517.14 Other telephones for cellular
networks** at **PDF p. 249**. The tariff PDF is cached as
`docs/tax-sectors/sources/Tariff-2025-26.pdf`.

The WCO's published proposal history is useful on a common source of false positives. At **PDF p. 30
(printed p. 23)** it describes input devices as “normally including a touch screen”, while the final
legal Note 5 states no touch requirement. The implementation therefore treats a keypad alone as
insufficient to make an otherwise app-capable, multitasking phone basic; that is an inference from
the final test and its proposal history, not additional operative wording. The PDF is cached as
`docs/tax-sectors/sources/WCO-Creating-HS-Change-Proposals-2023.pdf`.

The taxonomy covers all **870 distinct brand + model keys** mechanically, but it is not a claim that
870 separate model-specific evidence records survive. Clear modern product families were assigned by
their known platform families; the likely basic set and ambiguous complement entries were researched
against manufacturer specifications, platform documentation, exact part numbers and, where no
manufacturer record survived, Pakistani tariff-coded trade records. Dollar value and keywords were
not used as automatic classifiers. The result is:

| Customs class | Value rows | Distinct models | Brands |
|---|---:|---:|---:|
| Smartphone | **1,003** | **786** | **21** |
| Basic / other cellular phone | **84** | **84** | **5** |
| Total | **1,087** | **870** | **23** |

The basic-phone brands are Samsung, Nokia, itel, Sea Shark and X Tell. Samsung, Nokia and itel also
contain smartphones, so filtering must continue through model and configuration rather than stopping
at brand. Sea Shark and X Tell are basic-only in this implementation taxonomy; VR 1834 itself gives
no device class. All 84 basic models have a blank
configuration in VR 1834, so the storage selector naturally disappears for them; it is not hidden by
a special device-type rule.

#### Edge decisions

- **Android, iOS, HarmonyOS and Symbian models are smartphones.** The catalogue's Nokia C5-00,
  E5-00, E52, E72 and N73 are Symbian smartphones, not basic phones. Conversely, the old Series 30 /
  Series 40 families in the allowlist below stay basic. Microsoft's archived Nokia Devices pages
  list C5-00, E5, E52 and E72 under Symbian 3.2 and describe N73 as an S60 smartphone with
  downloadable applications (`https://blogs.windows.com/devices/2011/06/29/updates-to-symbian-3-2-and-5-0/`,
  `https://blogs.windows.com/devices/2009/05/08/nokia-n73/`). HMD's Nokia 105 4G specification
  identifies Series 30+ (`https://www.hmd.com/en_int/nokia-105-4g-2021/specs`), while Microsoft's
  archived Nokia Devices material expressly describes Series 40 as not a smartphone
  (`https://blogs.windows.com/devices/2011/06/14/five-days-with-an-s40-phone-day-two/`).
- **Four KaiOS Nokias are classified as smartphones for this customs calculation:** `8110 DS`,
  `2720`, `6300 4G DS` and `8000 4G DS`. HMD markets the 6300 and 8000 as members of its “feature
  phone family”, but the same manufacturer page says KaiStore provides hundreds of downloadable apps
  (`https://www.hmd.com/en_int/press/new-nokia-feature-phones-nokia-6300-4g-and-nokia-8000-4g`).
  KaiOS's own store material says users download apps and any developer may submit one
  (`https://www.kaiostech.com/apps-feature-phones-everything-need-know-kaistore/`). Its version 2.5
  permissions — the relevant platform generation — include background services and out-of-process
  windows (`https://developer.kaiostech.com/docs/getting-started/main-concepts/permissions/`). Those
  capabilities support 8517.13 under the legal Note 5 even though the retail label says “feature
  phone”. The trade record is **not** one-way corroboration: an exact Nokia 6300 4G was declared under
  8517.13 in February 2024, while exact 6300 4G variants were declared under 8517.14 in February 2023;
  exact 2720 Flip and 8110 shipments also appear under 8517.14. See
  `https://www.volza.com/p/used-mobile-phone/export/export-from-united-states/`,
  `https://www.volza.com/p/nokia-6300/export/export-from-vietnam/`,
  `https://www.volza.com/p/nokia-phone/export/export-from-vietnam/hsn-code-85171400/` and
  `https://www.volza.com/p/box-pallet/export/hsn-code-8517140000/`. Customs/logistics practice is
  therefore conflicting, not settled. The shipped tag is a documented application of the legal
  capability test, and the UI directs the visitor to follow a different class on the actual Customs
  assessment.
- **VR 1834's bare `2720` label is itself ambiguous.** Nokia also sold a 2009 Series 40 `2720 Fold`.
  The US$ 38 value and placement among modern HMD models make the 2019 KaiOS `2720 Flip` the more
  likely identity, but VR 1834 supplies no part number. That model remains in the four-phone KaiOS
  inference above rather than being presented as a model-specific Customs determination.
- **`itel-14 Max` is a smartphone.** VR 1834's shortened label is ambiguous, so the older official
  Customs Valuation Advice was used to recover its exact part number. **PDF p. 6, Annex-I serial 224**
  says:

  > 224 … ITEL ITEL-14 MAX W4003 24

  Third-party archived manual and firmware records identify W4003 as an Android 8.1 handset. The
  official valuation PDF is cached as
  `docs/tax-sectors/sources/Mobile-Phone-Valuation-2021.pdf`; supporting exact-model records are
  `https://www.libble.eu/itel-a14-max---w4003/online-manual-955356/?page=0004` and
  `https://www.hovatek.com/forum/thread-28337.html`. Because the official Customs record supports the
  part-number mapping used by the shipped classification, it was also added to the on-page
  official-source grid, prominently labelled **superseded for valuation** and not used for its old
  prices.
- **`Sharp Aquos ZERO5G BASIC` is a smartphone.** “BASIC” is part of that Android model's commercial
  name, not a customs classification. This is why the implementation contains no keyword classifier.
- **Sea Shark and X Tell carry the lowest-confidence assignments.** No durable manufacturer platform
  page was found for all seven exact names. One Pakistani trade record supports exact Sea Shark
  `S700` under non-smart PCT 8517.1411, but it is secondary evidence rather than a Customs ruling.
  The record containing `Music ka badshah` says **Zee Tell**, not X Tell; the `Big Boss` record gives
  no brand; and no exact-model record was located for `S112`, `X2 King`, `X4 King` or `Big Power`.
  They therefore do not prove those six assignments. The official **Engineering Development Board
  List of Approved MDM Authorization Holders**, PDF p. 2 (no printed page number), supplies only
  brand-level corroboration:

  > 30 DB Link PTA/MDM-32/10094/2022 30-Nov-22 X TELL 2G
  >
  > 31 MOBO Mobile Pvt Ltd PTA/MDM-33/10095/2022 30-Nov-22 Mobo, Sea Shark 2G

  The seven stay basic as explicitly low-confidence, reasoned assignments from the 2G brand record,
  catalogue brand grouping and the partial exact trade record—not as settled model-specific Customs
  classifications. The UI directs a visitor to use the class on their assessment if it differs.
  Sources: `https://www.volza.com/p/cellular-mobile/import/coo-hong-kong/`,
  `https://www.volza.com/p/music/import/import-in-pakistan/hsn-code-8517/`,
  `https://www.volza.com/p/phone-chargers/export/hsn-code-85171411/` and
  `https://engineeringpakistan.com/wp-content/uploads/2023/01/Mobile-phone.pdf`. The EDB PDF is cached
  as `docs/tax-sectors/sources/EDB-Mobile-Phone-Technology-List-2023.pdf` and, because it supports a
  shipped brand-level decision, is now cited honestly in the on-page official-source grid.

**Negative finding:** Nokia's indexed software-strategy PDF distinguishes Symbian as its smartphone
platform from Series 30/40 mobile-phone platforms, but both `prod.nokia.com` and `www.nokia.com`
returned HTTP 403 to the local cache request. The URL is
`https://www.nokia.com/sites/default/files/2019-08/12-software-strategy-white-paper-pdf.pdf`; it was
not falsely listed as cached. The official Microsoft/Nokia archive and model specifications above
were retained as readable primary evidence.

#### Complete basic-phone allowlist

Every model not listed here is tagged `smartphone` in this fixed catalogue version. The model count
and a fingerprint of every `brand + model + deviceKind` assignment make an addition, deletion, rename
or class change throw at module load until this audit is repeated, so the complement cannot silently
absorb a future phone and the curated basic set cannot silently shrink.

- **Samsung (3):** `SM-B310E`; `GT-E1200R/E1200`; `GT-E1205`.
- **Nokia (60):** `105 - 2022`; `1280`; `105 4G`; `125`; `X1-01`; `6310`; `101`; `220`; `225`;
  `C1-02`; `107`; `215 4G`; `206`; `100`; `110 4G`; `1616`; `103`; `1600`; `1800`; `112`;
  `X2-05`; `X2-02 (2011)`; `X2-01`; `X2-00`; `1110`; `C2-01`; `1209`; `1202`; `1100`; `C3-00`;
  `301`; `1112`; `C2-00`; `6090`; `200`; `1650`; `5130`; `6230`; `202`; `6303`; `2700`; `515`;
  `C2-03`; `130 DS`; `105 SS`; `105 DS`; `108 DS`; `215 DS`; `222 DS`; `150 DS`; `216 DS`;
  `230 DS`; `3310 DS`; `3310 3G`; `106 DS`; `210 DS`; `110 DS`; `150 DS 2020`; `5310 DS`;
  `225 4G DS`.
- **itel (14):** `Value 400`; `itel-Power 400`; `Muzik 410`; `itel-Value 110`; `Muzik 110`;
  `itel-IT5092`; `Value-100`; `Power 700`; `Magic 2`; `Magic 2 Max`; `Muzik 400 Core`;
  `Power 410`; `IT5026`; `IT2192T`.
- **Sea Shark (2):** `S112`; `S700`.
- **X Tell (5):** `X2 King`; `X4 King`; `Music ka badshah`; `Big Power`; `Big Boss`.

#### Shipped filtering and invariants

Both device types again offer **Pick my phone** and **Enter the value**. In model mode, brand, model
and storage queries all require the selected `deviceKind`; `findPhone` repeats that requirement so a
stale UI state cannot price a phone through the wrong tax class. Changing device type preserves the
brand only when that brand has the new class, then resets model, storage and the higher declared
value. Manual entry remains the escape hatch for an unlisted phone or a Customs assessment that
classifies a borderline model differently.

The current test record in §11 pins the complete class-filter and opposite-class lookup invariants.

#### SEO and exchange-rate follow-through

Two SEO leftovers from the earlier pass were removed rather than retained for site-wide consistency.
Google Search Central says HowTo rich results have been deprecated since 13 September 2023 and that
the `meta keywords` tag has no effect on indexing or ranking:

- `https://developers.google.com/search/blog/2023/08/howto-faq-changes`
- `https://developers.google.com/search/docs/crawling-indexing/special-tags`

The route therefore no longer emits `HowTo` JSON-LD or a keyword meta tag. The root metadata and
shared page-metadata builder were cleaned at the same time, so the unsupported tag is removed
consistently site-wide rather than merely hidden on this route; route keyword lists remain available
only to legitimate internal/structured-data consumers. Its visible, server-rendered rate and
popular-phone sections remain unchanged, and its structured data now consists of BreadcrumbList,
WebApplication and FAQPage. FAQPage remains valid markup for visible FAQ content; Google says it does
not cause a search problem even where a non-government site is not regularly eligible for the rich
result.

The exchange-rate copy now identifies Rs 280 only as an editable default and tells the visitor to use
the rate on the assessment. `PTA_EXCHANGE_RATE_DATE` was removed, and neither the form helper nor the
popular-phone basis line mentions a date.

Final verification after all taxonomy, source, copy and SEO follow-through: `lint:fix` → `lint` →
`type-check` passed; the production build passed at **21.4 kB / 140 kB** for this route. A compiled
lookup audit resolved all 1,087 rows only through their assigned class and rejected every
opposite-class lookup. The generated route HTML contains the local official DIRBS logo twice and the
date-free default-rate helper once, with no keyword meta tag, HowTo block or exchange-rate date.

## 11. The calculator as built

### Route and files

`/pta-tax-calculator`, registered in `src/lib/seo.ts` → `routeMeta` and in
`src/components/layout/navigation.ts` under the **withholding** ("Everyday withholding") category.
`src/features/pta-tax/` holds the whole feature; `src/app/pta-tax-calculator/` is the thin server
page plus its OG image.

### What the user enters

| Input | Notes |
|---|---|
| Tax year | `2026-2027` or `2025-2026`. Every band table moves between them. |
| Exchange rate | Rs per US$, defaulted to 280. Editable, because we call no rate API and must not pretend the default is current. The field identifies it as a default and directs the visitor to use the rate on their assessment; at the user's request, that field-level message does not include a date. |
| Registration route | Passport / CNIC. Drives §148 and the fine note. |
| Device type | Smartphone / Basic phone. Drives customs duty (nil vs Rs 250), the §148 floor below US$ 30 (Rs 100 vs Rs 70), and whether the ACD line can claim an exemption. The valuation ruling itself does not classify models, so the picker uses the separately researched Chapter 85 taxonomy in the thirteenth-pass log. The visitor still chooses the class and can follow a different class on their assessment by using direct value entry. |
| Device condition | New / Used. Deliberately does **not** move the value — see §9. |
| Customs value | For either class: "Pick my phone" (class-filtered brand → model → storage) or "Enter the value". Basic mode currently exposes 84 listed models across five brands; none has a stated storage tier. |
| Higher declared value | Optional, model mode only. Wins where higher, per §25(1). |

### Live calculation, and the placeholder that stands in

There is **no Calculate button**: `usePtaTax` recomputes on every keystroke through `useMemo`, the
same as every other calculator here. The result panel is withheld entirely until both deciding
figures are present, and `PtaAwaitingInput` names the missing one rather than hinting at it. This
matters more here than on most pages: **all four band tables start at US$ 0**, so a blank value
otherwise lands in the cheapest band of each and prints a confident **Rs 340**.

The guard is in two layers on purpose. `isPtaFormValid` decides whether the UI renders a result, and
`calcPtaTax` independently zeroes every line when the C&F value or the exchange rate is missing — so
a future caller that forgets the first check still cannot publish a bill for a phone nobody
described. A zero exchange rate is guarded for the same reason: the three fixed-rupee lines would
otherwise still total up while sales tax silently came to nothing.

### Only what is relevant to the combination shows

- **Device type filters the complete picker.** Brand, model and storage lookups all require
  `deviceKind`. Basic mode shows only the 84 researched basic models; smartphone mode shows only the
  other 786 model families. Mixed brands (Samsung, Nokia and itel) are filtered again at model level,
  and basic-only brands (Sea Shark and X Tell) cannot appear in smartphone mode. `findPhone` also
  checks the class, so filtering is a calculation invariant rather than a visual convenience.
- **Storage** is absent, not disabled, for the **548** models the rulings price without stating any
  configuration at all — `getVariantOptions` returns `[]` and `PtaValuePicker` drops the field. A
  dropdown holding no real choice asks a question the ruling never posed. It is *not* keyed on
  "priced only once": **726** models have a single row, and the **178** of those whose row does carry
  a configuration still render a one-option dropdown, deliberately — the ruling states that storage,
  so showing it tells the reader which configuration their value came from. (Corrected 4 August 2026:
  this bullet previously claimed 747, which is neither figure and described behaviour the code does
  not have.)
- **Device type → brand → model → storage cascade**: changing class retains a brand only if that
  brand contains the new class, then resets model and storage. Changing brand resets model and
  storage, changing model resets storage, and all three clear any declared value. Otherwise a stale
  smartphone model could survive under Basic phone even if the visible lists were filtered.
- **The model field is searchable**; brand and storage are not. Smartphone mode alone lists 125
  Samsung models,
  the shared `SelectInput`'s type-to-jump matches the *start* of a label only, so nothing typed
  reaches "Galaxy S10 Plus" except "galaxy" — the list was only navigable by scrolling. 23 brands
  exist across the full catalogue, but one selection shows at most 21 smartphone brands or five
  basic brands; those and the handful of storage tiers do not need another search field.
- **"Pick my phone" vs "Enter the value"** are offered for both device types and swap the whole value
  block; the model pickers and official-value badge do not exist in manual mode, and the
  declared-value override does not exist either (there is no published floor to override).
- **The used-phone note** renders only when condition is Used, and its VR 2070 figure only when that
  ruling actually lists the handset.
- **The levy band-gap warning** renders only when a value genuinely lands in one of the five holes.
- **The declared-value note** renders only when a typed value actually displaced the published one.
- **No filer toggle at all** — PTA is explicit that filer status changes nothing for the duties, and
  no official schedule publishes a second figure. But the page no longer says filer status changes
  nothing *full stop*: see the Tenth Schedule open question in §9, and the sixth-pass log entry.

### Colour

Site convention, not the mockup. Every quantified charge is tax owed, so both route totals are red
(`text-red-600`) including the cheaper passport one; the mockup showed passport in green, which would
read as money the taxpayer keeps. Exempt lines are green, while an amount the sources do not establish
is amber and excluded from the labelled minimum. The C&F and customs values stay neutral.

### Responsive

Every grid is single-column below `sm`. Each flex and grid child carries `min-w-0` and each amount
`amount-wrap` (`overflow-wrap: anywhere`), so no figure can push a row off a 320 px screen. The
headline total steps `text-2xl` → `sm:text-3xl`. The breakdown rows stack label-over-amount on mobile
and go side by side at `sm`, and the amount column holds a short status — an exempt line prints
**Exempt**, while the unresolved ACD cell prints **Not included** in amber, with the reason in the
basis line above it.

### What it deliberately will not do

- **Quote a value for a phone no ruling covers.** The catalogue stops at the Galaxy S23 and the
  iPhone 16; anything newer falls through to "Enter the value" with an on-page explanation. This is
  the whole difference between citing a source and inventing one.
- **Present a CNIC total as final.** Every CNIC figure is suffixed "+ fine". A basic-phone CNIC result
  also says **minimum** because its additional customs duty is unquantified, and both omissions are
  named under the headline and in the comparison card.
- **Price from VR 2070/2026.** See §9.
- **Cover years before 2025-26**, where sales tax, RD, the levy and §148 all sat differently.

### Testing

`calcPtaTax` and the lookup layer were swept over **9,783 cases** for arithmetic compatibility: every
one of the 1,087 brand → model → storage combinations resolves to a value, and the earlier engine
sweep deliberately prices both device classes at every value to exercise the device-specific tax
branches. The picker now has a stricter semantic sweep as well: all **1,087 assigned rows** resolve in
their tagged class, all **1,087 opposite-class lookups** return `null`, every kind-specific brand and
model option set exactly matches its assigned rows, and all 84 basic rows suppress storage because
VR 1834 states no configuration for them. On top of that, targeted checks pin the worked example in
§7 (Rs 67,600 / Rs 79,100), the mockup example (iPhone 16
128 GB at Rs 72,220 / Rs 83,720), the US$ 500 sales-tax cliff at 500 vs 500.01, all five levy band
gaps resolving downward in both years, the year-over-year moves in RD / §148 / levy, the declared
value overriding only when higher, and blank / negative / non-numeric inputs producing no bill.

Two boundary families were added on the eighth pass and are the ones to re-run after any band edit,
because they are where the previous two rate errors lived:

- **Exactly on a printed threshold.** US$ 30, 100, 200, 350, 500, 700 must stay in the *lower* band
  on every table, and US$ 101, 201, 351, 501, 701 must fall into the levy gap rather than jumping up.
  A single `>=` in `findAmountBand` broke the second group while leaving the first intact, which is
  why testing one of them proves nothing about the other.
- **Device type against the §148 floor.** Below US$ 30 a smartphone pays Rs 100 and a basic phone
  Rs 70; from US$ 30 up they are identical. A sweep that only prices smartphones cannot see this, and
  the original 8,696-case sweep did cover both device types — but only checked that lines were finite
  and cited, not that they held the right *amount*.

### Search surface (added on the 4 August 2026 SEO pass)

Two sections were added below the calculator, both **server-rendered**, because neither takes any
state. **20.3 kB / 139 kB first load** as of the ninth pass; this figure goes stale on almost every
pass, so re-read it off the build output rather than trusting it.

- **`PtaRateGuide` + `PtaRateTable` — `#pta-tax-rates`.** Every band, both years, printed. This is
  the convention every other calculator on the site already followed and this one did not; a page
  that charges 2025-26 as readily as 2026-27 and prints neither table leaves its own answers
  unsourced. Rows are built by `buildPtaRateGuideRows()` **from `PTA_RATES` itself**, which prevents
  duplicated amounts from drifting. It does not make labels infallible: the eighth-pass formatter
  printed exclusive lower bounds like inclusive ranges until the ninth pass made every **above** /
  **up to** endpoint explicit. Rate-guide copy remains part of the calculation audit.

  Rows follow the **handset levy's** bands, which are the finest split: the levy separates
  US$ 501-700 from above 700, where RD and §148 both stop at 500. The coarser tables are then looked
  up at the top of each levy band, which reproduces them exactly instead of merging them away — so
  the last two rows correctly repeat RD Rs 17,600 and §148 Rs 11,500 while the levy steps 8,000 →
  16,000. Customs duty is deliberately **not** a column: it is nil on every smartphone and a flat
  Rs 250 on a basic phone, so a column of zeroes would only invite the reader to look for a band.

- **`PtaPopularPhones` — `#pta-tax-popular-phones`.** 17 named handsets with their totals on both
  routes. Rows are computed by **`calcPtaTax` at build time**, not typed in, so the table cannot
  quote a figure the calculator above would contradict; two rows (iPhone 16 128 GB at Rs 72,220 /
  Rs 83,720 and iPhone 15 128 GB at Rs 67,600 / Rs 79,100) reproduce §7's worked examples exactly,
  which is the check that this is the same engine.

  The list is chosen to straddle the cliff on purpose: **iPhone 14 at US$ 490 pays 18%, iPhone 15 at
  US$ 600 pays 25%**, adjacent rows in the same table. Every total is stamped with the tax year, the
  device class and *"at the default Rs 280 to the US dollar"* in an amber panel above — sales
  tax is the one percentage in the assessment, so these are the only figures on the page that move
  with the rupee, and they must never read as fixed.

### Structured data and metadata

`PTA_STRUCTURED_DATA` = BreadcrumbList (via `routeStructuredData`) + WebApplication + FAQPage. The
earlier `HowTo` block was removed after the 5 August follow-through checked Google's deprecation
notice. The route-specific keyword array was removed and the shared metadata system stopped emitting
the unsupported meta tag site-wide. Title 55 chars, description 155 — both inside the truncation
limits.

The route was also missing from **`TAX_GUIDE_SEARCH_ENTRIES`** (`src/features/tax-guides/lib/content.ts`),
which is the site's own search index and an internal link from `/tax-guides`. Added.
`/salary-increment-calculator`, `/job-offer-comparison-calculator` and `/reverse-salary-calculator`
were missing from it too, and were added in the same pass on the user's instruction.

### Language: official terms in the form and the result, plain English everywhere else

The first attempt at this over-corrected. It rewrote the *labels* as well as the prose —
"Registration route" became "How are you registering it?", "C&F value" became "Value we are using",
"Exempt" became "Nothing to pay" — and that was wrong for a reason worth writing down:

> A field label is not an explanation, it is a **handle**. The visitor meets these same words again
> on the PSID, at the bank counter and in every FBR document. Renaming them on this page saves a few
> seconds of confusion here and costs the visitor the ability to recognise the charge anywhere else.

So the split now runs along a line, not a mood:

- **Inputs and results keep the official name.** Registration route · Passport / CNIC. Device type.
  Device condition. Customs value. C&F value. Exchange rate. Higher declared value. Estimated FBR
  duties & taxes. Customs duty · Additional customs duty · Regulatory duty · Sales tax · Income tax
  (section 148) · Mobile handset levy. A legally nil line reads **Exempt**; an amount the sources do
  not establish reads **Not included**, never Exempt or Rs 0.
- **The explanation rides in an info icon** beside each of those, never in place of it. Sixteen
  tooltips, fifteen distinct: seven on the form (route, device type, condition, how the value is
  found, the official-value badge, declared value, exchange rate) and nine on the result (C&F value,
  customs value, the headline total, and one per levy line). Each gives the plain meaning first and
  the statutory hook last — "…Officially, section 148" — so a reader who wants the citation finds it
  and a reader who does not is never made to read it first.
- **Everything below the calculator stays plain.** The FAQ, the notes, the highlights, the value-basis
  steps, the rate-guide and worked-example prose, and the one-line descriptions in the sources grid.
  That is where a visitor is reading rather than filling something in.

`PTA_TERMS` is the glossary that makes this work: 4 entries before, 15 now, plus `PTA_LINE_TERMS`
mapping each `PtaTaxLine.id` to its explanation so `PtaResultSummary` can hang one off every line.
The tooltip's accessible name states the question ("What is the C&F value?"), so a screen-reader user
hears the term rather than a bare "info".

**Info icons are confined to input and output values.** An earlier draft put them on the four charge
columns of both rate tables; because the mobile layout repeats every column as a card, that produced
**80 tooltip buttons for 15 distinct explanations** — 56 of them the same four texts repeated across
28 rows. They were removed. The rate guide's three notes underneath already carry that material, and
the same explanations are one scroll up on the result itself.

**The structural change survives, and is the part that mattered.** `PtaTaxLine` still carries
`basis` and `reference` separately: `basis` is a sentence about the money — *"25% of the customs
value — the rate for handsets over US$ 500. The only charge here that is a percentage, so the only
one that moves with the rupee."* — and `reference` is the citation, printed under it in grey at 11px
behind "Source:". `formatPlainBand` serves those sentences; `formatUsdBand` prints every nonzero lower
bound as **above** and every finite upper bound as **up to**, so an exact threshold cannot be assigned
to the wrong row by an inclusive-looking label.

**Where formal language deliberately stayed elsewhere:** the `Source:` citations, and the *titles* of
documents in the official-sources grid — "Fifth Schedule to the Customs Act 1969", "Valuation Ruling
1834/2023". Those are the documents' real names; renaming them would make them unfindable. Their
descriptions underneath are plain, because that is the part a visitor reads.
