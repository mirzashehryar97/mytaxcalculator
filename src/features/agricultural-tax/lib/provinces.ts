import { toLabelledOptions } from '@/components/calculator/options';

import type { AgriculturalProvince } from '@/features/agricultural-tax/types';

export const AGRICULTURAL_TAX_ROUTE = '/agricultural-income-tax-calculator';

export interface AgriculturalProvinceConfig {
  province: AgriculturalProvince;
  /** Full name, used in headings and prose. */
  label: string;
  /** Short name for chips and table cells. */
  shortLabel: string;
  /** The law the province charges under, written for a reader who is not a lawyer. */
  law: string;
  /** Office that assesses and collects it. */
  authority: string;
  authorityUrl: string;
  /** One line on what is different about this province. */
  note: string;
}

export const AGRICULTURAL_PROVINCES = [
  {
    province: 'punjab',
    label: 'Punjab',
    shortLabel: 'Punjab',
    law: 'Punjab Agricultural Income Tax Act 1997, with rates set by the 2025 rules',
    authority: 'Punjab Board of Revenue',
    authorityUrl: 'https://www.punjab-zameen.gov.pk/',
    note: 'Charges a per-acre tax on farmed land as well as tax on farm income.',
  },
  {
    province: 'sindh',
    label: 'Sindh',
    shortLabel: 'Sindh',
    law: 'Sindh Agricultural Income Tax Act 2025',
    authority: 'Sindh Revenue Board',
    authorityUrl: 'https://www.srb.gos.pk/srb/sindh-agricultural-income-tax/',
    note: 'Farm income only — the old per-acre land tax was scrapped in 2025.',
  },
  {
    province: 'kp',
    label: 'Khyber Pakhtunkhwa',
    shortLabel: 'KP',
    law: 'Khyber Pakhtunkhwa Agricultural Income Tax Act 2025',
    authority: 'KP Board of Revenue',
    authorityUrl: 'https://revenue.kp.gov.pk/',
    note: 'You pay the higher of the tax on your income and the per-acre tax on your land.',
  },
  {
    province: 'balochistan',
    label: 'Balochistan',
    shortLabel: 'Balochistan',
    law: 'Balochistan Tax on Land and Agricultural Income Ordinance 2000, as amended in 2025',
    authority: 'Balochistan Board of Revenue',
    authorityUrl: 'https://balochistan.gov.pk/departments/board-of-revenue/',
    note: 'You pay the higher of the tax on your income and the per-acre tax on your land.',
  },
] as const satisfies readonly AgriculturalProvinceConfig[];

export const AGRICULTURAL_PROVINCE_OPTIONS = toLabelledOptions(
  AGRICULTURAL_PROVINCES,
  (entry) => entry.province,
);

export function getAgriculturalProvince(province: AgriculturalProvince) {
  return (
    AGRICULTURAL_PROVINCES.find((config) => config.province === province) ??
    AGRICULTURAL_PROVINCES[0]
  );
}

/**
 * Punjab's rate notifications were ruled void by the Punjab Assembly, so a
 * Punjab result carries a warning. Kept as a predicate rather than a flag on
 * the config so it reads as the exception it is.
 */
export function hasDisputedRates(province: AgriculturalProvince): boolean {
  return province === 'punjab';
}
