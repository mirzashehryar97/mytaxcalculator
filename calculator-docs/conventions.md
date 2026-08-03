# Conventions shared by every calculator

## Tax year naming

Pakistan's **Tax Year N** ends on 30 June of year N. So:

| Site label | Runs | Pakistani tax year | Set by |
|---|---|---|---|
| `2026-2027` | 1 Jul 2026 – 30 Jun 2027 | Tax Year 2027 | Finance Act 2026 |
| `2025-2026` | 1 Jul 2025 – 30 Jun 2026 | Tax Year 2026 | Finance Act 2025 |
| `2024-2025` | 1 Jul 2024 – 30 Jun 2025 | Tax Year 2025 | Finance Act 2024 |
| `2023-2024` | 1 Jul 2023 – 30 Jun 2024 | Tax Year 2024 | Finance Act 2023 |
| `2022-2023` | 1 Jul 2022 – 30 Jun 2023 | Tax Year 2023 | Finance Act 2022 |
| `2021-2022` | 1 Jul 2021 – 30 Jun 2022 | Tax Year 2022 | Finance Act 2021 |

Every key in every `lib/rates.ts` uses the left-hand label. This is the single most common way to
read a rate table wrong: a third-party card headed "Tax Year 2026" is our `2025-2026`.

The consolidated Income Tax Ordinance uses a footnote idiom that matters just as much. When it says

> *Table substituted by the Finance Act, 2026. The substituted Table read as follows: …*

the table printed in the footnote is the one that was **replaced** — i.e. the text that governed the
year *before* the Act. That footnote is where the previous year's rates are recovered from, and it
is how most of the historical rows in this repo were confirmed.

## The shared slab engine

`src/utils/slabEngine.ts` holds the only progressive-tax maths in the codebase:

```ts
calcSlabTax(amount, brackets) = bracket.fixed + (amount - bracket.min) * bracket.rate / 100
```

**Bands abut.** A bracket's `min` is the previous bracket's `max`, not one rupee above it:
`{ min: 0, max: 600_000 }` is followed by `{ min: 600_000, max: 1_200_000 }`. `min` is the figure
the band charges the excess *over*, so `amount - min` is literally the statute's "the amount
exceeding Rs 600,000".

`findTaxBracket` selects on the **upper bound alone** — the first bracket where `max === null` or
`amount <= max`. A progressive table is fully determined by its ceilings, so the boundary rupee
falls to the band below: exactly Rs 600,000 is taxed in the band ending there, not the one starting
there.

Two helpers carry the convention into everything else, so no caller does its own `min ± 1`:

- `bandStart(min)` — the **first rupee inside** a band, for labels like "Rs. 600,001 – 1,200,000".
- `isBandReached(bracket, amount)` — true once the amount has *passed* the band's floor, which is
  what "you have reached the 11% band" means.

**Do not write `min` as `600_001`.** That was the convention until 4 August 2026 and it was wrong
twice over.

It left a one-rupee **gap** between every pair of bands. An amount landing inside a gap (any
fractional figure — anything derived by ×12, ÷12 or a percentage) matched no bracket, fell through
`findTaxBracket`'s `brackets.at(-1)` fallback to the **top** band, and returned a large negative tax.
It reached the screen on the increment/job-offer, multi-year, rental, business and agricultural
calculators — a monthly salary of Rs 50,000.04 on the increment page showed **−Rs 4,620,000** for
FY 2021-22. It did **not** reach the salary single-year tab, the embed, budget comparison or reverse
salary, because those round the annual figure before it reaches the slabs. Do not read that as a
reason to relax: the rounding there is incidental (salary is quoted to the rupee), not a guard, and
`grossForNetAnnual`'s bisection was probing gaps internally the whole time. The per-surface counts
are in [open-questions.md](open-questions.md).

It also charged the excess over `600_001` instead of `600_000`, which rounding usually hid but not
always: Rs 600,005 of rent is Rs 15,000.50 in law and the page showed Rs 15,000.

Both were fixed by making the bands abut; the verifier in the 4 August log of
[rental-income-tax.md](rental-income-tax.md) checks all 301 bands.

Users of the engine: salary (`utils/taxCalculator.ts`), business/AOP, rental (§155),
agricultural income.

Calculators that do **not** use it, because their statute is not progressive: company tax, super
tax, §113 minimum turnover tax, all withholding calculators, both capital-gains calculators, and
both vehicle calculators. Several of those use *banded* tables, where the band the amount lands in
sets **one rate for the whole amount** — that is not the same thing as a slab, and mixing them up
overstates or understates the bill badly at a threshold. Each page below says which it is.

## Filer status

Three statuses appear across the site, and they mean specific things:

- **Filer** — appearing on the FBR Active Taxpayer List. The rate in the First Schedule.
- **Late filer** — on the ATL but filed after the due date. Tenth Schedule **rule 1A**, inserted by
  the Finance Act 2024 and **omitted by the Finance Act 2026**. It therefore exists only for
  2024-25 and 2025-26, and only for §236C and §236K. No other calculator offers the tier.
- **Non-filer** — not on the ATL. Tenth Schedule **rule 1**, which raises the rate by 100%
  (i.e. doubles it), with two exceptions the code models:
  - **§231B is raised by 200%** (×3), by rule 1's first proviso — vehicles only.
  - **§236C and §236K have their own printed non-filer tables** in rule 1's later provisos, so the
    non-filer rate is not a multiple of the filer rate at all.

Rule **10** lists the sections the whole Schedule does not touch. The ones that matter here:
`10(a)` §149 (salary), `10(i)` §235 (electricity), `10(l)` §236 (phone and internet). That is why
the salary, electricity-business and phone/internet calculators have no filer toggle affecting the
answer.

Rule **10(y)** — inserted by the Finance Act 2024, omitted by the Finance Act 2026 — excluded
"tax collected under section 37A on disposal of securities acquired on and from 1st day of July,
2025". It is the reason the share and mutual-fund calculators treat the *purchase* date, not the
sale date, as deciding whether a non-filer pays double.

## Rounding

Every `lib/calculation.ts` is pure and returns **full-precision** numbers. Rounding happens once, in
`lib/formatting.ts` or the component that prints the figure. The one exception is
`utils/taxCalculator.ts`, which rounds inside `calculateTaxForTotalAmount` — it predates the
convention and the salary figures are quoted to the rupee everywhere, so the rounding point is
load-bearing there.

## Result colours

Fixed across the site regardless of what any design shows: tax owed is red, money kept or credited
is green, the pre-tax base is neutral. Percentages are not amounts and keep their own tone. See
`CLAUDE.md`.

## How a figure in these docs was verified

The primary document is the **Income Tax Ordinance 2001 as amended up to 30 June 2026**
(`https://download1.fbr.gov.pk/Docs/2026724177725705IncomeTaxOrdinanace2001.pdf`, 839 pages, real
text layer), because it already carries the Finance Act 2026 amendments *and* prints the superseded
tables as footnotes — which is how the historical years get confirmed from a single file.

PDF page numbers cited in these docs are **PDF pages**, not printed page numbers; the two differ by
roughly 19 in that document.

⚠️ **The Ordinance PDF misprints its own folio on some pages.** PDF pages 491, 523 and 550 all print
"535" where the running sequence calls for 472, 504 and 531. Where a printed number is given in these
docs it was read off the page itself; where the page misprints it, the doc says so. **Navigate by PDF
page, not by folio.**

To re-read a page without any external tool:

```bash
python3 -m venv venv && venv/bin/pip install pypdf
venv/bin/python -c "from pypdf import PdfReader; print(PdfReader('IncomeTaxOrdinance2001.pdf').pages[527].extract_text())"
```

Provincial levies (agricultural income tax, vehicle token tax) are **not** in that document and
never can be — they are set by provincial Acts and gazette notifications, cited per page.

`docs/tax-sectors/sources/` caches PDFs locally but is gitignored, so a fresh clone has none of
them. The URLs in each page are enough to re-fetch. Two hosts are known-hostile:
`excise.balochistan.gov.pk` returns 403 to plain fetches (a browser User-Agent works) and
`nccpl.com.pk` returns a Cloudflare interstitial to everything headless.
