import type { FreelancerTaxInputs, FreelancerTaxResult } from '@/features/freelancer-tax/types';

import { getFreelancerRate, resolveFreelancerFiscalYear } from './rates';

const MONTHS_IN_YEAR = 12;
const PERCENT_DIVISOR = 100;

function toNonNegativeFinite(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function safeProduct(left: number, right: number): number {
  return toNonNegativeFinite(left * right);
}

export function annualizeFreelancerIncome(monthlyAmount: number): number {
  return safeProduct(toNonNegativeFinite(monthlyAmount), MONTHS_IN_YEAR);
}

export function calculateAnnualGrossPkr(inputs: FreelancerTaxInputs): number {
  const annualAmount = annualizeFreelancerIncome(inputs.amount);

  if (inputs.currency === 'PKR') {
    return annualAmount;
  }

  if (inputs.currency === 'USD') {
    return safeProduct(annualAmount, toNonNegativeFinite(inputs.exchangeRate));
  }

  return 0;
}

function calculateTaxAtRate(grossPkr: number, ratePercent: number): number {
  return safeProduct(grossPkr, toNonNegativeFinite(ratePercent) / PERCENT_DIVISOR);
}

/**
 * Calculates Section 154A tax using annual gross receipts. Values remain at full
 * precision; presentation code should round only when formatting them.
 */
export function calcFreelancerTax(
  inputs: FreelancerTaxInputs,
  fiscalYear: string,
): FreelancerTaxResult {
  const resolvedFiscalYear = resolveFreelancerFiscalYear(fiscalYear);
  const rates = getFreelancerRate(resolvedFiscalYear);
  const grossPkr = calculateAnnualGrossPkr(inputs);
  const eligibleForPsebRate = inputs.psebRegistered && inputs.atl;
  let rate: number;
  if (inputs.psebRegistered) {
    rate = inputs.atl ? rates.psebAtl : rates.psebNonAtl;
  } else {
    rate = inputs.atl ? rates.standardAtl : rates.standardNonAtl;
  }
  const tax = calculateTaxAtRate(grossPkr, rate);
  const concessionTax = calculateTaxAtRate(grossPkr, rates.psebAtl);
  const standardTax = calculateTaxAtRate(grossPkr, rates.standardAtl);
  const potentialTaxSavings = Math.max(0, standardTax - concessionTax);
  const taxSavings = eligibleForPsebRate ? potentialTaxSavings : 0;
  const net = Math.max(0, grossPkr - tax);

  return {
    fiscalYear: resolvedFiscalYear,
    grossPkr,
    monthlyGrossPkr: grossPkr / MONTHS_IN_YEAR,
    tax,
    monthlyTax: tax / MONTHS_IN_YEAR,
    net,
    monthlyNet: net / MONTHS_IN_YEAR,
    rate,
    eligibleForPsebRate,
    atlRateApplied: inputs.atl,
    concessionTax,
    standardTax,
    taxSavings,
    monthlyTaxSavings: taxSavings / MONTHS_IN_YEAR,
    potentialTaxSavings,
  };
}
