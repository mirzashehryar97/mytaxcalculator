import { bandStart } from '@/utils/slabEngine';

import { TAXPAYER_TYPE_OPTIONS } from '@/features/agricultural-tax/lib/content';
import { formatPkr, formatPkrRange } from '@/features/agricultural-tax/lib/formatting';
import { AGRICULTURAL_PROVINCES } from '@/features/agricultural-tax/lib/provinces';
import {
  AGRICULTURAL_RATES,
  DEFAULT_AGRICULTURAL_FISCAL_YEAR,
  LAND_TAX_EXEMPT_ACRES,
} from '@/features/agricultural-tax/lib/rates';
import type {
  AgriculturalFiscalYear,
  AgriculturalLandTaxRule,
  AgriculturalRateRow,
  AgriculturalTaxpayerType,
} from '@/features/agricultural-tax/types';

export function getTaxpayerTypeLabel(taxpayerType: AgriculturalTaxpayerType): string {
  return (
    TAXPAYER_TYPE_OPTIONS.find((option) => option.value === taxpayerType)?.label ??
    TAXPAYER_TYPE_OPTIONS[0].label
  );
}

/** '0' for the first band, otherwise the rupee figure the band starts above. */
function formatBand(min: number, max: number | null): string {
  if (max === null) {
    return `Over ${formatPkr(min)}`;
  }
  return min === 0 ? `Up to ${formatPkr(max)}` : `${formatPkr(bandStart(min))} – ${formatPkr(max)}`;
}

function formatSlabRate(rate: number, fixed: number, min: number): string {
  if (rate === 0) {
    return 'No tax';
  }
  const base = `${rate}% of the amount over ${formatPkr(min)}`;
  return fixed === 0 ? base : `${formatPkr(fixed)} + ${base}`;
}

/**
 * The slab table for the rate guide. Every province shares one table, so this
 * reads the default province's rows rather than taking a province argument.
 */
export function buildSlabRows(
  fiscalYear: AgriculturalFiscalYear = DEFAULT_AGRICULTURAL_FISCAL_YEAR,
): AgriculturalRateRow[] {
  return AGRICULTURAL_RATES[fiscalYear].punjab.slabs.map((slab, index) => ({
    id: `slab-${index}`,
    band: formatBand(slab.min, slab.max),
    rate: formatSlabRate(slab.rate, slab.fixed, slab.min),
  }));
}

export interface AgriculturalProvinceRow {
  id: string;
  province: string;
  law: string;
  land: string;
  note: string;
  authority: string;
  authorityUrl: string;
}

/** One row per province for the "what each province charges" cards. */
export function buildProvinceRows(fiscalYear: AgriculturalFiscalYear): AgriculturalProvinceRow[] {
  return AGRICULTURAL_PROVINCES.map((config) => ({
    id: config.province,
    province: config.label,
    law: config.law,
    land: describeLandTax(AGRICULTURAL_RATES[fiscalYear][config.province].landTax),
    note: config.note,
    authority: config.authority,
    authorityUrl: config.authorityUrl,
  }));
}

function describeLandTax(rule: AgriculturalLandTaxRule): string {
  if (rule.status === 'none') {
    return 'None — scrapped in 2025';
  }
  if (rule.status === 'unconfirmed') {
    return 'Charged, but this year’s figures are not confirmed';
  }

  const paying = rule.bands.filter((band) => band.perAcreHigh > 0);
  const low = Math.min(...paying.map((band) => band.perAcreLow));
  const high = Math.max(...paying.map((band) => band.perAcreHigh));
  const freeAcres = LAND_TAX_EXEMPT_ACRES.toString().replace('.5', '½');

  // The orchard figure is quoted too: it sits outside these bands and gets no
  // free acres, so quoting the bands alone would overstate what an orchard
  // owner keeps.
  const orchard = formatPkrRange(rule.orchard.unirrigatedLow, rule.orchard.irrigatedHigh);

  return `${formatPkrRange(low, high)} an acre above ${freeAcres} acres; mature orchards ${orchard} an acre from the first`;
}
