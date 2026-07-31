import { shiftIsoByDays } from '@/utils/calendarDates';

import {
  CAPITAL_GAINS_RESULT_COPY,
  CAPITAL_GAINS_TERMS,
  LISTED_SECURITIES_RESULT_COPY,
  MUTUAL_FUND_RESULT_COPY,
} from '@/features/capital-gains-tax/lib/content';
import {
  formatCapitalGainsFiscalYear,
  formatHoldingPeriod,
  formatPercent,
  formatPkr,
} from '@/features/capital-gains-tax/lib/formatting';
import {
  CAPITAL_GAINS_FISCAL_YEARS,
  findListedLadderBand,
  getCapitalGainsYear,
  LISTED_EXEMPT_BEFORE,
  LISTED_FLAT_15_FROM,
  LISTED_LADDER_FROM,
  NON_FILER_MULTIPLIER,
} from '@/features/capital-gains-tax/lib/rates';
import type {
  CapitalGainsRateRow,
  CapitalGainsResultRow,
  CapitalGainsTaxYearNoticeContent,
  CapitalGainsTaxYearResolution,
  FundClass,
  InvestorType,
  ListedSecuritiesResult,
  MutualFundResult,
} from '@/features/capital-gains-tax/types';

/** Both statuses side by side, so a rate table reads without a second column of prose. */
function ratePair(filerRate: number, nonFilerRate: number) {
  return { filerRate: formatPercent(filerRate), nonFilerRate: formatPercent(nonFilerRate) };
}

export function getFilerStatusLabel(filer: boolean): string {
  return filer ? 'Filer' : 'Non-filer';
}

/**
 * The tax-year panel that stands where a dropdown would normally go. The year is
 * read off the selling date, so it is reported rather than offered — and if the
 * date falls outside what we hold rates for, that is said out loud instead of
 * being clamped silently.
 */
export function getCapitalGainsTaxYearNotice(
  taxYear: CapitalGainsTaxYearResolution,
  saleDate: string,
  saleDateNoun: string,
): CapitalGainsTaxYearNoticeContent {
  const yearLabel = formatCapitalGainsFiscalYear(taxYear.fiscalYear);
  const earliest = formatCapitalGainsFiscalYear(
    CAPITAL_GAINS_FISCAL_YEARS.at(-1) ?? taxYear.fiscalYear,
  );
  const latest = formatCapitalGainsFiscalYear(CAPITAL_GAINS_FISCAL_YEARS[0]);

  if (taxYear.coverage === 'before-range') {
    return {
      yearLabel,
      sourceLine: `Read from the ${saleDateNoun}.`,
      warning: `We only hold rates back to ${earliest}. Your ${saleDateNoun} is earlier than that, so this is priced on the ${earliest} rules and may not match what was charged at the time.`,
    };
  }

  if (taxYear.coverage === 'after-range') {
    return {
      yearLabel,
      sourceLine: `Read from the ${saleDateNoun}.`,
      warning: `Your ${saleDateNoun} is past the ${latest} tax year, and rates for that year are not law yet. This is priced on the ${latest} rules.`,
    };
  }

  return {
    yearLabel,
    sourceLine:
      saleDate === '' ? 'Set the selling date to fix this.' : `Read from the ${saleDateNoun}.`,
    warning: null,
  };
}

/* ------------------------------------------------------------------ */
/* Rate tables under each calculator                                  */
/* ------------------------------------------------------------------ */

/** Reads a date constant like "2024-07-01" back as "1 July 2024". */
function formatCutoff(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const monthName = new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    month: 'long',
    timeZone: 'UTC',
  });
  return `${day} ${monthName} ${year}`;
}

/** The last day before a cutoff, so a window can be written as "X to Y". */
function formatDayBefore(isoDate: string): string {
  return formatCutoff(shiftIsoByDays(isoDate, -1) ?? isoDate);
}

/**
 * Suffix marking the id of a row on the far side of the rule 10(y) cutoff, so the
 * two halves of a split row stay distinguishable when one is highlighted.
 */
const UPLIFT_EXEMPT_ROW_SUFFIX = '-uplift-exempt';

/**
 * Every listed-security rate in one table, keyed by when the shares were bought.
 * The non-filer column is worked out rather than typed, so it can never drift
 * away from the filer column beside it.
 *
 * The bought-from-1-July-2024 rule splits in two while Tenth Schedule rule 10(y)
 * is in force: a purchase it reaches escapes the non-filer doubling, so that year
 * gets a row per window instead of one row carrying only the doubled figure.
 */
export function buildListedRateRows(fiscalYear: string): readonly CapitalGainsRateRow[] {
  const year = getCapitalGainsYear(fiscalYear);
  const exemptFrom = year.nonFilerUpliftExemptFrom;

  const uplift = (rate: number, boughtFrom: string) =>
    exemptFrom !== null && boughtFrom >= exemptFrom ? rate : rate * NON_FILER_MULTIPLIER;

  const rows: CapitalGainsRateRow[] = [
    {
      id: 'pre-2013',
      situation: `Bought before ${formatCutoff(LISTED_EXEMPT_BEFORE)}`,
      ...ratePair(0, 0),
    },
    {
      id: 'flat-12-5',
      situation: `Bought ${formatCutoff(LISTED_EXEMPT_BEFORE)} to 30 June 2022`,
      ...ratePair(year.listed['flat-12-5'], uplift(year.listed['flat-12-5'], LISTED_EXEMPT_BEFORE)),
    },
  ];

  for (const band of year.listedLadder) {
    rows.push({
      id: `ladder-${band.id}`,
      situation: `Bought ${formatCutoff(LISTED_LADDER_FROM)} to 30 June 2024 · ${band.label.toLowerCase()}`,
      ...ratePair(band.rate, uplift(band.rate, LISTED_LADDER_FROM)),
    });
  }

  const flatRate = year.listed['flat-15'];

  if (exemptFrom === null) {
    rows.push({
      id: 'flat-15',
      situation: `Bought on or after ${formatCutoff(LISTED_FLAT_15_FROM)}`,
      ...ratePair(flatRate, uplift(flatRate, LISTED_FLAT_15_FROM)),
    });

    return rows;
  }

  rows.push(
    {
      id: 'flat-15',
      situation: `Bought ${formatCutoff(LISTED_FLAT_15_FROM)} to ${formatDayBefore(exemptFrom)}`,
      ...ratePair(flatRate, uplift(flatRate, LISTED_FLAT_15_FROM)),
    },
    {
      id: `flat-15${UPLIFT_EXEMPT_ROW_SUFFIX}`,
      situation: `Bought on or after ${formatCutoff(exemptFrom)}`,
      ...ratePair(flatRate, uplift(flatRate, exemptFrom)),
    },
  );

  return rows;
}

const FUND_ROW_LABELS: Record<InvestorType, Record<FundClass, string>> = {
  individual: {
    stock: 'A person cashing in a stock fund',
    other: 'A person cashing in any other fund',
  },
  company: {
    stock: 'A company cashing in a stock fund',
    other: 'A company cashing in any other fund',
  },
};

/**
 * The fund table. Division VII sets one filer rate per holder and fund class, and
 * the holding period never moves it — but a non-filer pays double unless Tenth
 * Schedule rule 10(y) reaches the purchase, so while that rule is in force each
 * fund gets a row per buying window rather than a single row that would state the
 * doubled figure for units it does not apply to.
 */
export function buildMutualFundRateRows(fiscalYear: string): readonly CapitalGainsRateRow[] {
  const year = getCapitalGainsYear(fiscalYear);
  const exemptFrom = year.nonFilerUpliftExemptFrom;
  const investorTypes: readonly InvestorType[] = ['individual', 'company'];
  const fundClasses: readonly FundClass[] = ['stock', 'other'];

  const rows = investorTypes.flatMap((investorType) =>
    fundClasses.flatMap((fundClass) => {
      const rate = year.mutualFunds[investorType][fundClass];
      const id = `${investorType}-${fundClass}`;
      const label = FUND_ROW_LABELS[investorType][fundClass];

      if (exemptFrom === null) {
        return [{ id, situation: label, ...ratePair(rate, rate * NON_FILER_MULTIPLIER) }];
      }

      return [
        {
          id,
          situation: `${label} · bought before ${formatCutoff(exemptFrom)}`,
          ...ratePair(rate, rate * NON_FILER_MULTIPLIER),
        },
        {
          id: `${id}${UPLIFT_EXEMPT_ROW_SUFFIX}`,
          situation: `${label} · bought on or after ${formatCutoff(exemptFrom)}`,
          ...ratePair(rate, rate),
        },
      ];
    }),
  );

  return [
    ...rows,
    {
      id: 'six-year',
      situation: 'Units bought on or before 30 June 2024 and held over six years',
      ...ratePair(0, 0),
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Plain-language explanations of a single result                     */
/* ------------------------------------------------------------------ */

/** One sentence naming the rule that produced the rate on screen. */
export function getListedRuleLabel(result: ListedSecuritiesResult): string {
  switch (result.regime) {
    case 'pre-2013':
      return 'Bought before 1 July 2013, so this profit is not taxed at all.';
    case 'flat-12-5':
      return 'Bought between 1 July 2013 and 30 June 2022, which carries one flat rate.';
    case 'holding-ladder':
      return `Bought between 1 July 2022 and 30 June 2024, where the rate falls the longer you hold. ${result.ladderBandLabel ?? ''}`.trim();
    default:
      return 'Bought on or after 1 July 2024, so one flat rate applies however long you held them.';
  }
}

export function getMutualFundRuleLabel(result: MutualFundResult): string {
  if (result.isSixYearExempt) {
    return 'Bought on or before 30 June 2024 and held over six years, so nothing is charged.';
  }

  const holder = result.investorType === 'company' ? 'A company' : 'A person';
  const fund = result.fundClass === 'stock' ? 'a stock fund' : 'an other fund';
  return `${holder} cashing in ${fund}. How long you held the units does not change this.`;
}

/** The "how this was worked out" line under each result. */
export function getListedWorking(result: ListedSecuritiesResult): string {
  if (result.isLoss) {
    return `You sold for ${formatPkr(result.saleProceeds)} after paying ${formatPkr(result.purchaseCost)}, a loss of ${formatPkr(result.lossAmount)}. Nothing is charged on a loss.`;
  }

  return `${formatPkr(result.saleProceeds)} sale less ${formatPkr(result.purchaseCost)} cost is ${formatPkr(result.capitalGain)} profit. ${formatPercent(result.rate)} of that is ${formatPkr(result.tax)}, leaving you ${formatPkr(result.netGain)}.`;
}

export function getMutualFundWorking(result: MutualFundResult): string {
  if (result.isLoss) {
    return `You got back ${formatPkr(result.redemptionProceeds)} after investing ${formatPkr(result.purchaseCost)}, a loss of ${formatPkr(result.lossAmount)}. Nothing is charged on a loss.`;
  }

  return `${formatPkr(result.redemptionProceeds)} back less ${formatPkr(result.purchaseCost)} invested is ${formatPkr(result.capitalGain)} profit. ${formatPercent(result.rate)} of that is ${formatPkr(result.tax)}, leaving you ${formatPkr(result.netGain)}.`;
}

/** How long the investment was held, ready to print. */
export function getHoldingLabel(result: {
  datesAreValid: boolean;
  holdingYears: number;
}): string | null {
  return result.datesAreValid ? formatHoldingPeriod(result.holdingYears) : null;
}

/* ------------------------------------------------------------------ */
/* Result rows                                                        */
/* ------------------------------------------------------------------ */

/**
 * The money rows of a result, in the site's colour convention: the pre-tax
 * profit is neutral, the tax is red, and what the taxpayer keeps is green.
 */
export function buildListedResultRows(
  result: ListedSecuritiesResult,
): readonly CapitalGainsResultRow[] {
  return [
    {
      id: 'cost',
      label: LISTED_SECURITIES_RESULT_COPY.costLabel,
      value: formatPkr(result.purchaseCost),
      tone: 'neutral',
    },
    {
      id: 'proceeds',
      label: LISTED_SECURITIES_RESULT_COPY.proceedsLabel,
      value: formatPkr(result.saleProceeds),
      tone: 'neutral',
    },
    {
      id: 'gain',
      label: CAPITAL_GAINS_RESULT_COPY.gainLabel,
      value: formatPkr(result.capitalGain),
      tone: 'neutral',
      tooltip: CAPITAL_GAINS_TERMS.capitalGain,
    },
    {
      id: 'tax',
      label: CAPITAL_GAINS_RESULT_COPY.taxLabel,
      value: formatPkr(result.tax),
      tone: 'negative',
      highlight: true,
    },
    {
      id: 'net',
      label: CAPITAL_GAINS_RESULT_COPY.netGainLabel,
      value: formatPkr(result.netGain),
      tone: 'positive',
      highlight: true,
      tooltip: CAPITAL_GAINS_TERMS.netGain,
    },
  ];
}

export function buildMutualFundResultRows(
  result: MutualFundResult,
): readonly CapitalGainsResultRow[] {
  return [
    {
      id: 'cost',
      label: MUTUAL_FUND_RESULT_COPY.costLabel,
      value: formatPkr(result.purchaseCost),
      tone: 'neutral',
    },
    {
      id: 'proceeds',
      label: MUTUAL_FUND_RESULT_COPY.proceedsLabel,
      value: formatPkr(result.redemptionProceeds),
      tone: 'neutral',
    },
    {
      id: 'gain',
      label: CAPITAL_GAINS_RESULT_COPY.gainLabel,
      value: formatPkr(result.capitalGain),
      tone: 'neutral',
      tooltip: CAPITAL_GAINS_TERMS.capitalGain,
    },
    {
      id: 'tax',
      label: CAPITAL_GAINS_RESULT_COPY.taxLabel,
      value: formatPkr(result.tax),
      tone: 'negative',
      highlight: true,
    },
    {
      id: 'net',
      label: CAPITAL_GAINS_RESULT_COPY.netGainLabel,
      value: formatPkr(result.netGain),
      tone: 'positive',
      highlight: true,
      tooltip: CAPITAL_GAINS_TERMS.netGain,
    },
  ];
}

/** The rate-table row matching what the form currently says, so it can be highlighted. */
export function getListedActiveRowId(result: ListedSecuritiesResult): string {
  if (result.regime === 'holding-ladder') {
    const { listedLadder } = getCapitalGainsYear(result.fiscalYear);
    return `ladder-${findListedLadderBand(listedLadder, result.holdingYears).id}`;
  }

  // Only the flat-15 regime splits, and only in a year that still has rule 10(y).
  return result.upliftExempt ? `${result.regime}${UPLIFT_EXEMPT_ROW_SUFFIX}` : result.regime;
}

export function getMutualFundActiveRowId(result: MutualFundResult): string {
  if (result.isSixYearExempt) {
    return 'six-year';
  }

  const id = `${result.investorType}-${result.fundClass}`;
  return result.upliftExempt ? `${id}${UPLIFT_EXEMPT_ROW_SUFFIX}` : id;
}
