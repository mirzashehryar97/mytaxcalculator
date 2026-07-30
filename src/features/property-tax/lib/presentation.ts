import { parseIsoDate } from '@/utils/calendarDates';

import {
  calcPropertyTransferTax,
  resolvePropertyRate,
} from '@/features/property-tax/lib/calculation';
import {
  formatCompactPkr,
  formatIsoDate,
  formatPercent,
  formatPkr,
  formatPropertyFiscalYear,
} from '@/features/property-tax/lib/formatting';
import { resolveStatusForYear } from '@/features/property-tax/lib/input';
import { getPropertyTransferRates, PROPERTY_FISCAL_YEARS } from '@/features/property-tax/lib/rates';
import type {
  PropertyCapitalGainsResult,
  PropertyFilerStatus,
  PropertyFiscalYear,
  PropertyMode,
  PropertyRateGuideRow,
  PropertyTaxYearNoticeContent,
  PropertyTaxYearResolution,
  PropertyTransferResult,
  PropertyType,
} from '@/features/property-tax/types';

const STATUS_LABELS: Record<PropertyFilerStatus, string> = {
  filer: 'Filer',
  'late-filer': 'Late filer',
  'non-filer': 'Non-filer',
};

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  'open-plot': 'Open plot',
  constructed: 'Constructed property',
  flat: 'Flat',
};

const MODE_SECTION_LABELS: Record<PropertyMode, string> = {
  purchase: 'Section 236K',
  sale: 'Section 236C',
  'capital-gains': 'Capital gains tax',
};

export function getPropertyStatusLabel(status: PropertyFilerStatus): string {
  return STATUS_LABELS[status];
}

export function getPropertyTypeLabel(propertyType: PropertyType): string {
  return PROPERTY_TYPE_LABELS[propertyType];
}

export function getPropertySectionLabel(mode: PropertyMode): string {
  return MODE_SECTION_LABELS[mode];
}

/** Representative value inside each statutory band, used to read its rate. */
const BAND_SAMPLES = [
  { id: 'up-to-50m', label: 'Up to Rs. 50M', value: 10_000_000 },
  { id: '50m-to-100m', label: 'Rs. 50M – Rs. 100M', value: 75_000_000 },
  { id: 'above-100m', label: 'Above Rs. 100M', value: 150_000_000 },
];

/**
 * The selected year's rate table as display rows. Years that charge one rate on
 * every value collapse to a single row, so the table shows the shape of the law
 * rather than three identical lines.
 */
export function buildPropertyRateGuideRows(
  mode: 'purchase' | 'sale',
  fiscalYear: string,
): PropertyRateGuideRow[] {
  const rates = getPropertyTransferRates(mode, fiscalYear);
  const lateFilerCell = (value: number) =>
    rates.lateFiler === null ? '—' : formatPercent(resolvePropertyRate(rates.lateFiler, value));

  const isEntirelyFlat =
    rates.filer.kind === 'flat' &&
    rates.nonFiler.kind === 'flat' &&
    (rates.lateFiler === null || rates.lateFiler.kind === 'flat');

  if (isEntirelyFlat) {
    return [
      {
        id: 'any-value',
        band: 'Any property value',
        filerRate: formatPercent(resolvePropertyRate(rates.filer, 0)),
        lateFilerRate: lateFilerCell(0),
        nonFilerRate: formatPercent(resolvePropertyRate(rates.nonFiler, 0)),
      },
    ];
  }

  return BAND_SAMPLES.map((band) => ({
    id: band.id,
    band: band.label,
    filerRate: formatPercent(resolvePropertyRate(rates.filer, band.value)),
    lateFilerRate: lateFilerCell(band.value),
    nonFilerRate: formatPercent(resolvePropertyRate(rates.nonFiler, band.value)),
  }));
}

/** Plain-language description of how the advance tax figure was reached. */
export function getPropertyTransferWorking(result: PropertyTransferResult): string {
  const base = formatPkr(result.taxBase);
  const rate = formatPercent(result.rate);

  if (result.isFlatRate) {
    return `${rate} of ${base}. This year charges one rate whatever the property is worth.`;
  }

  return `${rate} of ${base}. The rate is set by the band the value falls into, and applies to the whole amount — not just the part above the band.`;
}

/** Plain-language description of which capital gains regime applied and why. */
export function getPropertyCapitalGainsWorking(result: PropertyCapitalGainsResult): string {
  if (result.gain <= 0) {
    return 'You did not sell for more than you paid, so there is no capital gain to tax.';
  }

  if (result.regime === 'flat-15') {
    if (result.rateIsMinimum) {
      return `You bought on or after 1 July 2024, so the holding period no longer matters. A seller who is not on the Active Taxpayer List pays their normal slab rates on the gain, and never less than ${formatPercent(result.rate)}.`;
    }
    return `You bought on or after 1 July 2024, so the holding period no longer matters — sellers on the Active Taxpayer List pay a flat ${formatPercent(result.rate)} of the gain.`;
  }

  return `You bought before 1 July 2024, so the older holding-period scale still applies. ${getPropertyTypeLabel(
    result.propertyType,
  )} held for ${result.holdingBandLabel.toLowerCase()} is taxed at ${formatPercent(result.rate)} of the gain.`;
}

/**
 * The derived-tax-year readout that stands in for the year dropdown: which year
 * the sale landed in, the date that put it there, and a warning when that date
 * sits outside the years we hold rates for.
 */
export function getPropertyTaxYearNotice(
  taxYear: PropertyTaxYearResolution,
  saleDate: string,
): PropertyTaxYearNoticeContent {
  const yearLabel = formatPropertyFiscalYear(taxYear.fiscalYear);

  const sourceLine =
    parseIsoDate(saleDate) === null
      ? `Enter a sale date to set the tax year. Until then this uses ${yearLabel}.`
      : `Set by your sale date, ${formatIsoDate(saleDate)}.`;

  if (taxYear.coverage === 'after-range') {
    return {
      yearLabel,
      sourceLine,
      warning: `Your sale falls in a tax year whose rates are not published yet, so the Section 236C credit uses the ${yearLabel} table — the latest one we hold. Treat that part as an estimate.`,
    };
  }

  if (taxYear.coverage === 'before-range') {
    return {
      yearLabel,
      sourceLine,
      warning: `Your sale falls before the earliest year this calculator covers, so the Section 236C credit uses the ${yearLabel} table. Treat that part as an estimate.`,
    };
  }

  return { yearLabel, sourceLine, warning: null };
}

/** How the Section 236C credit under the result was arrived at, and from which year. */
export function getPropertyCapitalGainsCreditNote(result: PropertyCapitalGainsResult): string {
  return `Your sale date falls in tax year ${formatPropertyFiscalYear(
    result.fiscalYear,
  )}, so the Section 236C credit assumes ${formatPercent(
    result.transferTaxRate,
  )} was collected on the sale price of ${formatPkr(result.salePrice)}.`;
}

export interface PropertyYearComparisonRow {
  fiscalYear: PropertyFiscalYear;
  label: string;
  rate: number;
  formattedRate: string;
  tax: number;
  formattedTax: string;
  /** 0–1 share of the largest bill in the set, for the bar width. */
  share: number;
}

/** The same transaction priced under every year we cover, for a quick comparison. */
export function buildPropertyYearComparison(
  mode: 'purchase' | 'sale',
  taxBase: number,
  status: PropertyFilerStatus,
): PropertyYearComparisonRow[] {
  const rows = PROPERTY_FISCAL_YEARS.map((fiscalYear) => {
    const { rate, tax } = calcPropertyTransferTax(
      {
        declaredValue: taxBase,
        fbrValue: taxBase,
        status: resolveStatusForYear(status, mode, fiscalYear),
      },
      mode,
      fiscalYear,
    );

    return {
      fiscalYear,
      label: formatPropertyFiscalYear(fiscalYear),
      rate,
      formattedRate: formatPercent(rate),
      tax,
      formattedTax: formatPkr(tax),
    };
  });

  const maxTax = Math.max(...rows.map((row) => row.tax), 0);
  return rows.map((row) => ({
    ...row,
    share: maxTax > 0 ? row.tax / maxTax : 0,
  }));
}

/** Short summary of the value the rate was applied to, for the tax-base card. */
export function getPropertyTaxBaseNote(result: PropertyTransferResult): string {
  if (result.declaredValue === result.fbrValue) {
    return 'Your declared price and the FBR / DC value match, so that is the amount taxed.';
  }

  const higher = result.declaredValue > result.fbrValue ? 'declared price' : 'FBR / DC value';
  return `The ${higher} is higher, so tax is charged on ${formatCompactPkr(result.taxBase)}.`;
}
