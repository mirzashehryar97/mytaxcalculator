# PTA mobile device registration tax — research, not yet built

**Status:** research only. Nothing in `src/` implements this yet — there is no feature folder, no
route, no `routeMeta` entry. Every other page in this folder describes a calculator *as built*; this
one describes what the law says **before** the calculator exists, so that the build starts from
primary sources instead of from the SEO tables that dominate the search results.

**Proposed route:** `/pta-tax-calculator` — that is the phrase people actually type. Longer variants
("mobile registration tax", "DIRBS tax") should be keywords, not the slug.

**Researched and verified: 4 August 2026**, against the Finance Act 2026, the Income Tax Ordinance
amended to 30 June 2026, the Sales Tax Act amended to 2025-26, the Pakistan Customs Tariff 2025-26,
the Fifth Schedule to the Customs Act 2025-26, SRO 1063(I)/2026, SRO 1064(I)/2026, CGO 01 of 2019 as
amended by CGO 01 of 2024, PTA's DIRBS FAQ of 14 October 2025, and — in a second pass the same day —
Valuation Rulings 1834/2023, 1999/2025 and 2070/2026 enumerated from FBR's own valuation database.
**The second pass overturned §5**: an official per-model C&F table does exist. Read §5 and §10 before
trusting any earlier summary of this document.

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

## 2. Content policy check

Nothing in this regime is un-Islamic and nothing needed rewriting. There is no profit-on-debt, no
insurance, no speculative instrument. Two traps to avoid when drafting copy:

- **Do not transcribe the Baggage Rules' duty-free list.** Rule 3A of the Baggage Rules 2006 runs
  "…(v) two hundred cigarettes or fifty cigars or half kilogram of manufactured tobacco; … (viii) one
  mobile phone…". Only clause (viii) is relevant; quoting the surrounding list would drop tobacco
  into the page for no reason. Cite the mobile-phone clause alone.
- **Icons.** This page wants `Smartphone`, `ShieldCheck`, `Receipt`, `Coins`. `CandlestickChart` and
  `PiggyBank` remain banned site-wide.

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

Serial 99 of Part-III is **not** in the exclusion list, so a smartphone imported under the Fifth
Schedule escapes ACD; and the passport route escapes it a second time under (iv). ✅ Verified,
`SRO1063-2026-ACD.pdf` p. 2. ACD is therefore **zero on both routes for a smartphone** and the
calculator should not model it at all — but the doc records why, because "we forgot ACD" and "ACD is
nil here" look identical in the output.

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
at 100 and serial 3 starts *above 101*; serial 3 ends at 200 and serial 4 starts *above 201*. A C&F
value of exactly US$ 100.50, 200.50, 350.50, 500.50 or 700.50 falls in **no band**. The RD and §148
tables are contiguous ("above 100 and up to 200"), so this is the levy table's own drafting defect.
Decide the fill rule deliberately and say so on the page — the safe reading is to treat each gap as
belonging to the *lower* band, which is the reading that does not charge tax the statute never
imposed. Also note serial 7 reads "Above 701 **and above**", which is a typo for "and above" as an
open top band; treat it as everything over 700.

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

The PKR/USD rate is a second moving part: the sales tax is a percentage of a dollar-denominated
value, so the answer changes daily. Whatever the page does, it must show the rate it used and the
date, and never cache a figure that looks authoritative a month later.

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
- **A model lookup for phones no ruling covers.** A picker *is* defensible for the ~1,200 models in
  VR 1834/2023, VR 1999/2025 and VR 2070/2026 — those are official §25A values and can be cited. It
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

Per `CLAUDE.md`, only government sources, and every source the page actually uses. This regime is
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
| Pakistan Customs Tariff FY 2025-26 | FBR | Heading 85.17 |
| Fifth Schedule to the Customs Act 1969 (2025-26) | FBR | Serial 99 — smartphones at 0% |
| SRO 1064(I)/2026 | FBR | Regulatory duty |
| SRO 1063(I)/2026 | FBR | ACD, and the exemptions that zero it |
| Customs General Order 01 of 2019, as amended by CGO 01 of 2024 | FBR | The registration procedure, the fine, the 120-day scheme |
| Valuation Ruling 1834/2023 | Directorate General of Customs Valuation | New-phone C&F values, all brands — **cite if the model picker ships** |
| Valuation Ruling 1999/2025 | Directorate General of Customs Valuation | New iPhone C&F values, supersedes VR 1834 for Apple |
| Valuation Ruling 2070/2026 | Directorate General of Customs Valuation | Old/used-phone C&F values (replaces the rescinded VR 2035/2026) |
| WeBOC Mobile Device Duty Information | FBR / PRAL | The official per-IMEI duty lookup — where a user gets their real figure |
| FBR IRIS / e-payment | FBR | Paying the PSID |

Do **not** add PriceOye, WhatMobile, any "PTA tax calculator" site, PwC or ICMA, even as secondary.
The entire first page of search results for this topic is aggregators, and they are wrong about who
levies the tax.

## 9. Open questions

Carry these into [open-questions.md](open-questions.md) when the calculator is built.

- 🟡 **The sales-tax base.** Reading A (§25 customs value) vs reading B (§2(46)(d): value + customs
  duties, and possibly + RD). ~Rs 4,400 apart on a US$ 600 phone. Not resolved by any document read.
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
- 🟡 **Does VR 2070/2026 reach individual registrations?** It says "in commercial quantity", and adds
  a condition that the handset was *"activated at least six (06) months"* before export. Neither fits
  a traveller registering one phone. VR 1834/2023 and VR 1999/2025 carry no such restriction, so the
  new-phone tables are the safer basis for a personal registration.
- 🟡 **What values a phone no ruling covers?** Galaxy S24/S25, iPhone 17, Pixel 9/10 as new devices
  have no §25A value in force. WeBOC is presumably assessing them on declared/transaction value or on
  an internal reference not published as a ruling. Which, is unknown — and it is the gap every
  competitor fills by inventing a number.
- 🟡 **RD SRO 1064(I)/2026 rate column** — read via an 80% cross-check against SRO 1152(I)/2025, not
  off a clean text layer. Re-read before shipping.
- 🟡 **FY 2026-27 Customs Tariff and Fifth Schedule** not yet published; 2025-26 carried forward on
  the strength of the Finance Act 2026 containing no 85.17 amendment.
- 🟡 **ACD on a non-smart cellular phone (8517.1419) under the CNIC route.** SRO 1063(I)/2026 sets
  ACD by *tariff slab* (2% on the 20% slab, and so on); 8517.1419 carries a specific duty of
  Rs 250/set, which is not a slab. Which ACD rate attaches, if any, is undetermined. Immaterial for
  smartphones, which are the overwhelming majority of registrations.

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
