# Mutual fund capital gains — `/mutual-fund-tax-calculator`

**Feature:** `src/features/capital-gains-tax/` (mode `mutual-fund`).
**Calculation:** `lib/calculation.ts` → `calcMutualFundTax`.
**Rates:** `lib/rates.ts` → `MUTUAL_FUND_RATES`, `qualifiesForSixYearExemption`.

Shares the feature, the tax-year resolver and the non-filer logic with
[capital-gains-securities.md](capital-gains-securities.md). Read that page for the tax-year
derivation and the rule 10(y) window; only the differences are covered here.

## The rule it implements

The **mutual fund proviso to Division VII** of Part I of the First Schedule: a mutual fund,
collective investment scheme or REIT scheme charges and deducts capital gains tax at its own table
on redemption of units. Holding period does not move the rate.

## What the user enters

| Input | Job |
|---|---|
| Acquisition date | Decides the six-year relief, and the non-filer question. |
| Redemption date | **Picks the tax year.** |
| Purchase cost, redemption proceeds | Gain = `max(0, proceeds − cost)`. |
| Investor type | `individual` (individual or AOP) / `company`. |
| Fund class | `stock` / `other`. |
| On the ATL | Filer or not. |

## Rate table as shipped

| Investor | Stock fund | Other fund |
|---|---|---|
| Individual / AOP | **15%** | **15%** |
| Company | **15%** | **25%** |

✅ **Verified** word for word — Ordinance amended to 30 Jun 2026, PDF p. 544 (printed p. 525):

| Category | Rate |
|---|---|
| Individual and association of persons | 15% for stock funds / 15% for other funds |
| Company | 15% for stock funds / 25% for other funds |

## Six-year relief

Units bought **on or before 30 June 2024** and held **more than six years** are not charged at all.

✅ **Verified** — same page:

> Provided also that no capital gain shall be deducted, if the holding period of the security
> **acquired on or before 30th day of June 2024** is more than six years.

The Finance Act 2025 is what narrowed it to that acquisition window; anything bought later has no
long-hold relief. `qualifiesForSixYearExemption` requires a non-empty acquisition date,
`acquisitionDate <= '2024-06-30'` and `holdingYears > 6`.

## Non-filer

Same `applyNonFilerUplift` as the securities page: `filerRate × 2` unless rule 10(y) reaches the
purchase (bought on or after 1 July 2025, and only while the rule was in force — i.e. FY 2025-26).
The relief runs first, so a six-year-exempt filer rate of 0% doubles to 0%.

Also inherits the `confidence` reporting: `pending-operator-table` for a non-filer in 2026-27.

## What the fund class means, and the Islamic-content line

Division VII's fund split follows **§2(61A)**: a fund is a "stock fund" if more than 70% of its
investment is in shares of listed companies. The on-page copy therefore describes the other side as
*"any fund that keeps less than 70% of its money in shares"* rather than naming money-market, income
or bond funds. Same rule, same rates, nothing haram named — this is a settled rewrite, not a gap.

The term **"mutual fund"** itself stays: Shariah-compliant funds exist, and the word names the
vehicle rather than anything impermissible.

## The algorithm

```
taxYear      = getCapitalGainsTaxYearForDate(redemptionDate)
gain         = max(0, redemptionProceeds − purchaseCost)
tableRate    = mutualFunds[investorType][fundClass]
filerRate    = isSixYearExempt ? 0 : tableRate
nonFilerRate = isExemptFromNonFilerUplift ? filerRate : filerRate × 2
tax          = gain × (filer ? filerRate : nonFilerRate) / 100
```

## Official sources cited on the page

The same `CAPITAL_GAINS_OFFICIAL_SOURCES` grid as the securities page — Ordinance 2026, Finance Acts
2024 / 2025 / 2026, IRIS. The Finance Act 2025 card is the load-bearing one here: it is what raised
the fund rates to 15% and narrowed the six-year relief, which is exactly what its description says.

## Deliberately not modelled

- **The stock-fund dividend test.** Division VII carries a further proviso: in the case of a stock
  fund, if the fund's dividend receipts are less than its capital gains, the deduction rate is 15%.
  With the individual rate already at 15% this changes nothing for an individual, but it can matter
  for a company on a stock fund.
- **REIT schemes**, which the same proviso covers.
- **§100B and the Eighth Schedule** machinery — the fund computes and deducts; the investor does not.
- **Redemptions before FY 2025-26.**
