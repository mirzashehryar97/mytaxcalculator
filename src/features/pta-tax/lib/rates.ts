import type {
  PtaAmountBand,
  PtaFiscalYear,
  PtaIncomeTax148Bands,
  PtaYearRates,
} from '@/features/pta-tax/types';

/**
 * Sales tax steps once, at US$ 500, and it is a cliff — at US$ 500.01 the whole
 * customs value is taxed at 25%, not just the part above the threshold.
 */
export const PTA_SALES_TAX_CLIFF_USD = 500;

/**
 * Rupees per US dollar the page opens with. The site is stateless and calls no
 * exchange-rate API, so this is a starting figure the
 * visitor is expected to replace with the rate their own assessment used —
 * never a rate we can claim is current.
 */
export const PTA_DEFAULT_EXCHANGE_RATE = 280;

/**
 * Regulatory duty and the handset levy band on C&F value in US dollars, and the
 * levy's bands have holes in them: the Finance Act 2022 wrote serial 2 ending at
 * 100 and serial 3 starting "Above 101", so the whole interval above 100 and up
 * to 101 falls in no band — US$ 100.50 and **US$ 101 itself**, which three
 * handsets in the catalogue are valued at. The same defect repeats at 200/201,
 * 350/351, 500/501 and 700/701, and no Finance Act since has corrected it.
 * `findAmountBand` fills a gap downward, which is the reading that does not
 * charge tax the statute never imposed.
 */
const HANDSET_LEVY_2026: readonly PtaAmountBand[] = [
  { minUsd: 0, maxUsd: 30, amountPkr: 100 },
  { minUsd: 30, maxUsd: 100, amountPkr: 200 },
  { minUsd: 101, maxUsd: 200, amountPkr: 200 },
  { minUsd: 201, maxUsd: 350, amountPkr: 1800 },
  { minUsd: 351, maxUsd: 500, amountPkr: 4000 },
  { minUsd: 501, maxUsd: 700, amountPkr: 8000 },
  { minUsd: 701, maxUsd: null, amountPkr: 16_000 },
];

/** Identical but for serial 3, which the Finance Act 2026 cut from 600 to 200. */
const HANDSET_LEVY_2025: readonly PtaAmountBand[] = HANDSET_LEVY_2026.map((band) =>
  band.minUsd === 101 ? { ...band, amountPkr: 600 } : band,
);

const REGULATORY_DUTY_2026: readonly PtaAmountBand[] = [
  { minUsd: 0, maxUsd: 30, amountPkr: 240 },
  { minUsd: 30, maxUsd: 100, amountPkr: 2400 },
  { minUsd: 100, maxUsd: 200, amountPkr: 6000 },
  { minUsd: 200, maxUsd: 350, amountPkr: 8800 },
  { minUsd: 350, maxUsd: 500, amountPkr: 12_000 },
  { minUsd: 500, maxUsd: null, amountPkr: 17_600 },
];

const REGULATORY_DUTY_2025: readonly PtaAmountBand[] = [
  { minUsd: 0, maxUsd: 30, amountPkr: 300 },
  { minUsd: 30, maxUsd: 100, amountPkr: 3000 },
  { minUsd: 100, maxUsd: 200, amountPkr: 7500 },
  { minUsd: 200, maxUsd: 350, amountPkr: 11_000 },
  { minUsd: 350, maxUsd: 500, amountPkr: 15_000 },
  { minUsd: 500, maxUsd: null, amountPkr: 22_000 },
];

/**
 * Section 148, First Schedule Part II. The Ordinance still writes these against
 * the pre-HS-2022 codes 8517.1219/8517.1211; the bands are stated in dollars, so
 * the stale code changes nothing.
 *
 * Serial 1 is "Up to 30 **except smart phones**" at Rs 70 and serial 2 is
 * "Above 30 – 100, **and smart phones up to 100**" at Rs 100, so the two lowest
 * rows are one band at Rs 100 for a smartphone and two bands for a basic phone.
 * Everything from US$ 100 up is common to both.
 */
const INCOME_TAX_148_UPPER_2026: readonly PtaAmountBand[] = [
  { minUsd: 100, maxUsd: 200, amountPkr: 100 },
  { minUsd: 200, maxUsd: 350, amountPkr: 970 },
  { minUsd: 350, maxUsd: 500, amountPkr: 5000 },
  { minUsd: 500, maxUsd: null, amountPkr: 11_500 },
];

/** Serial 3 stood at Rs 930 until the Finance Act 2026 substituted Rs 100. */
const INCOME_TAX_148_UPPER_2025: readonly PtaAmountBand[] = INCOME_TAX_148_UPPER_2026.map((band) =>
  band.minUsd === 100 ? { ...band, amountPkr: 930 } : band,
);

function toIncomeTax148(upper: readonly PtaAmountBand[]): PtaIncomeTax148Bands {
  return {
    smartphone: [{ minUsd: 0, maxUsd: 100, amountPkr: 100 }, ...upper],
    featurePhone: [
      { minUsd: 0, maxUsd: 30, amountPkr: 70 },
      { minUsd: 30, maxUsd: 100, amountPkr: 100 },
      ...upper,
    ],
  };
}

const INCOME_TAX_148_2026 = toIncomeTax148(INCOME_TAX_148_UPPER_2026);
const INCOME_TAX_148_2025 = toIncomeTax148(INCOME_TAX_148_UPPER_2025);

/**
 * A smartphone imported as a complete unit is free of customs duty — Fifth
 * Schedule to the Customs Act 1969, Part-III serial 99, condition "Nil". The
 * Customs Tariff's own Rs 250 per set still bites on 8517.1419, an ordinary
 * cellular phone, because the Fifth Schedule does not reach it.
 */
const FEATURE_PHONE_CUSTOMS_DUTY = 250;

export const PTA_RATES: Record<PtaFiscalYear, PtaYearRates> = {
  '2026-2027': {
    regulatoryDuty: REGULATORY_DUTY_2026,
    salesTax: [
      { minUsd: 0, maxUsd: PTA_SALES_TAX_CLIFF_USD, percent: 18 },
      { minUsd: PTA_SALES_TAX_CLIFF_USD, maxUsd: null, percent: 25 },
    ],
    incomeTax148: INCOME_TAX_148_2026,
    handsetLevy: HANDSET_LEVY_2026,
    featurePhoneCustomsDutyPkr: FEATURE_PHONE_CUSTOMS_DUTY,
    sources: {
      regulatoryDuty: 'SRO 1064(I)/2026',
      additionalCustomsDuty: 'SRO 1063(I)/2026',
      incomeTax148: 'Income Tax Ordinance 2001, First Schedule Part II (Finance Act 2026)',
      handsetLevy: 'Finance Act 2018, s.10 as amended to 2026',
    },
  },
  '2025-2026': {
    regulatoryDuty: REGULATORY_DUTY_2025,
    salesTax: [
      { minUsd: 0, maxUsd: PTA_SALES_TAX_CLIFF_USD, percent: 18 },
      { minUsd: PTA_SALES_TAX_CLIFF_USD, maxUsd: null, percent: 25 },
    ],
    incomeTax148: INCOME_TAX_148_2025,
    handsetLevy: HANDSET_LEVY_2025,
    featurePhoneCustomsDutyPkr: FEATURE_PHONE_CUSTOMS_DUTY,
    sources: {
      regulatoryDuty: 'SRO 1152(I)/2025',
      additionalCustomsDuty: 'SRO 1151(I)/2025',
      incomeTax148: 'Income Tax Ordinance 2001, First Schedule Part II (before Finance Act 2026)',
      handsetLevy: 'Finance Act 2018, s.10 as amended to 2022',
    },
  },
};

export const PTA_FISCAL_YEARS = Object.keys(PTA_RATES) as PtaFiscalYear[];
export const DEFAULT_PTA_FISCAL_YEAR: PtaFiscalYear = '2026-2027';

export function resolvePtaFiscalYear(value: string): PtaFiscalYear {
  return PTA_FISCAL_YEARS.includes(value as PtaFiscalYear)
    ? (value as PtaFiscalYear)
    : DEFAULT_PTA_FISCAL_YEAR;
}

export function getPtaRates(fiscalYear: PtaFiscalYear): PtaYearRates {
  return PTA_RATES[fiscalYear];
}
