import { ELECTRICITY_RESULT_COPY } from '@/features/withholding-tax/lib/content';
import {
  formatPercent,
  formatPkr,
  formatPkrExact,
  formatWithholdingFiscalYear,
} from '@/features/withholding-tax/lib/formatting';
import {
  CASH_WITHDRAWAL_RATES,
  getElectricityYear,
  getTelecomYear,
} from '@/features/withholding-tax/lib/rates';
import type {
  CashWithdrawalResult,
  ElectricityBand,
  ElectricityResult,
  TelecomResult,
  WithholdingFiscalYear,
  WithholdingRateRow,
} from '@/features/withholding-tax/types';

const CONNECTION_LABELS = {
  domestic: 'home',
  commercial: 'shop or office',
  industrial: 'factory',
} as const;

export function getElectricityConnectionLabel(connection: ElectricityResult['connection']): string {
  return CONNECTION_LABELS[connection];
}

export function getFilerStatusLabel(filer: boolean): string {
  return filer ? 'Filer' : 'Non-filer';
}

/** Plain-language sentence explaining the cash withdrawal figure. */
export function getCashWithdrawalWorking(result: CashWithdrawalResult): string {
  if (result.filer) {
    return `You are a filer, so nothing comes off. A non-filer taking out the same ${formatPkr(
      result.dailyWithdrawal,
    )} would lose ${formatPkr(result.nonFilerTax)}.`;
  }

  if (!result.aboveThreshold) {
    return `Today’s cash of ${formatPkr(result.dailyWithdrawal)} has not passed ${formatPkr(
      result.dailyThreshold,
    )}, so the bank deducts nothing. Pass that figure and the rate applies to the whole amount, not just the part above it.`;
  }

  return `Today’s cash of ${formatPkr(result.dailyWithdrawal)} is above ${formatPkr(
    result.dailyThreshold,
  )}, so the bank takes ${formatPercent(result.rate)} of the whole amount: ${formatPkr(
    result.tax,
  )}. That leaves ${formatPkr(result.cashInHand)} in your hand.`;
}

/** Plain-language sentence explaining the electricity figure. */
export function getElectricityWorking(result: ElectricityResult): string {
  const connection = getElectricityConnectionLabel(result.connection);

  if (result.connection === 'domestic') {
    if (result.filer) {
      return `A ${connection} meter is only charged when the owner is a non-filer. You are a filer, so nothing is added — a non-filer would pay ${formatPkr(
        result.nonFilerTax,
      )} on the same bill.`;
    }
    if (result.belowDomesticThreshold) {
      return `A ${connection} meter is charged from ${formatPkr(
        result.domesticThreshold,
      )} a month upwards. This bill of ${formatPkr(result.billAmount)} is below that, so nothing is added.`;
    }
    return `This ${connection} bill of ${formatPkr(result.billAmount)} is at or above ${formatPkr(
      result.domesticThreshold,
    )} and you are a non-filer, so ${formatPercent(
      result.rate,
    )} of the bill is added: ${formatPkr(result.tax)}.`;
  }

  if (result.tax === 0) {
    return `A ${connection} bill of ${formatPkr(
      result.billAmount,
    )} falls in the band that carries no income tax.`;
  }

  if (result.fixed > 0) {
    return `A ${connection} bill above ${formatPkr(result.rateAppliesAbove)} carries ${formatPkr(
      result.fixed,
    )} plus ${formatPercent(result.rate)} of the ${formatPkr(
      result.billAmount - result.rateAppliesAbove,
    )} above it, which comes to ${formatPkr(result.tax)}.`;
  }

  return `A ${connection} bill in this band carries ${formatPercent(
    result.rate,
  )} of the whole bill, which is ${formatPkr(result.tax)} on ${formatPkr(result.billAmount)}.`;
}

/** Why an electricity bill came out at nought, in one sentence. */
export function getElectricityNoTaxReason(result: ElectricityResult): string {
  if (result.connection !== 'domestic') {
    return ELECTRICITY_RESULT_COPY.smallBillBody;
  }
  return result.filer
    ? ELECTRICITY_RESULT_COPY.filerHomeBody
    : ELECTRICITY_RESULT_COPY.belowThresholdBody;
}

/** Short chip label naming the kind of telecom payment being priced. */
export function getTelecomTransactionLabel(result: TelecomResult): string {
  if (result.service === 'landline') {
    return 'Landline';
  }
  return result.payment === 'top-up' ? 'Prepaid load' : 'Monthly bill';
}

/** Plain-language sentence explaining the phone or internet figure. */
export function getTelecomWorking(result: TelecomResult): string {
  if (result.service === 'landline') {
    if (result.tax === 0) {
      return `A landline is only taxed on the part of the bill above ${formatPkr(
        result.landlineThreshold,
      )}. This bill of ${formatPkr(result.amount)} is not above it, so nothing is added.`;
    }
    return `Only the ${formatPkr(result.taxableAmount)} above ${formatPkr(
      result.landlineThreshold,
    )} is taxed, at ${formatPercent(result.rate)}. That is ${formatPkrExact(
      result.tax,
    )}, taking the bill to ${formatPkr(result.totalPayable)}.`;
  }

  if (result.payment === 'top-up') {
    return `${formatPercent(result.rate)} of the ${formatPkr(
      result.amount,
    )} you load is income tax — ${formatPkrExact(result.tax)}. That leaves ${formatPkrExact(
      result.amountReceived,
    )} before your operator takes its own sales tax and charges.`;
  }

  return `${formatPercent(result.rate)} of the ${formatPkr(
    result.amount,
  )} bill is added as income tax — ${formatPkrExact(result.tax)} — taking what you owe to ${formatPkr(
    result.totalPayable,
  )}.`;
}

/** One row per tax year, so the change from 0.6% to 0.8% is visible. */
export function buildCashWithdrawalRateRows(): readonly WithholdingRateRow[] {
  return Object.entries(CASH_WITHDRAWAL_RATES).map(([fiscalYear, year]) => ({
    id: fiscalYear,
    situation: formatWithholdingFiscalYear(fiscalYear),
    charge: `${formatPercent(year.nonFilerRate)} of the day’s cash, once it passes ${formatPkr(
      year.dailyThreshold,
    )}`,
  }));
}

/** "Rs. 1,950 + 12% of the amount above Rs. 20,000", or "Nothing" on a free band. */
function formatElectricityBandCharge(band: ElectricityBand): string {
  if (band.fixed > 0) {
    return `${formatPkr(band.fixed)} + ${formatPercent(band.rate)} of the amount above ${formatPkr(
      band.rateAppliesAbove,
    )}`;
  }
  if (band.rate > 0) {
    return `${formatPercent(band.rate)} of the bill`;
  }
  return 'Nothing';
}

/** The whole section 235 table for one year, home meters included. */
export function buildElectricityRateRows(
  fiscalYear: WithholdingFiscalYear,
): readonly WithholdingRateRow[] {
  const year = getElectricityYear(fiscalYear);
  const { threshold, nonFilerRate } = year.domestic;

  const bandRows = year.business.commercial.map((band, index) => {
    const industrial = year.business.industrial[index];
    const commercialCharge = formatElectricityBandCharge(band);

    const industrialCharge =
      industrial && industrial.rate !== band.rate
        ? ` · Factory: ${formatPkr(industrial.fixed)} + ${formatPercent(
            industrial.rate,
          )} of the amount above ${formatPkr(industrial.rateAppliesAbove)}`
        : '';

    return {
      id: `business-${band.id}`,
      situation: `Shop, office or factory — ${band.label}`,
      charge: `${commercialCharge}${industrialCharge}`,
    };
  });

  return [
    {
      id: 'domestic-below',
      situation: `Home meter — under ${formatPkr(threshold)}`,
      charge: 'Nothing',
    },
    {
      id: 'domestic-above',
      situation: `Home meter — ${formatPkr(threshold)} or more`,
      charge: `${formatPercent(nonFilerRate)} of the bill, and only for a non-filer`,
    },
    ...bandRows,
  ];
}

/** The whole section 236 table for one year. */
export function buildTelecomRateRows(
  fiscalYear: WithholdingFiscalYear,
): readonly WithholdingRateRow[] {
  const year = getTelecomYear(fiscalYear);

  const rows: WithholdingRateRow[] = [
    {
      id: 'mobile-internet',
      situation: 'Mobile, internet and prepaid loads',
      charge: `${formatPercent(year.mobileInternetRate)} of the bill or the amount loaded`,
    },
    {
      id: 'landline-free',
      situation: `Landline — bill up to ${formatPkr(year.landlineThreshold)}`,
      charge: 'Nothing',
    },
    {
      id: 'landline-taxed',
      situation: `Landline — bill above ${formatPkr(year.landlineThreshold)}`,
      charge: `${formatPercent(year.landlineRate)} of the part above ${formatPkr(
        year.landlineThreshold,
      )}`,
    },
  ];

  if (year.namedDefaulterRate !== null) {
    rows.push({
      id: 'named-defaulter',
      situation: 'People the FBR has named for not filing a return',
      charge: `${formatPercent(year.namedDefaulterRate)} on mobile, internet and prepaid loads`,
    });
  }

  return rows;
}
