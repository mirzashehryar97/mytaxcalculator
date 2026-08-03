import { calcSlabTax, findTaxBracket, type TaxBracket } from '@/utils/slabEngine';

import { getBusinessSlabYear, resolveBusinessFiscalYear } from '@/features/business-tax/lib/rates';
import type {
  BusinessSlabYear,
  BusinessTaxInputs,
  BusinessTaxpayerType,
  BusinessTaxResult,
} from '@/features/business-tax/types';

const PERCENT = 100;

function toNonNegative(value: number): number {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/** Net taxable income from revenue and allowable expenses (never below zero). */
export function deriveNetIncome(revenue: number, expenses: number): number {
  return Math.max(0, toNonNegative(revenue) - toNonNegative(expenses));
}

function selectBrackets(year: BusinessSlabYear, taxpayerType: BusinessTaxpayerType): TaxBracket[] {
  return taxpayerType === 'professional-aop' ? year.professionalAop : year.standard;
}

/**
 * Estimates the annual income tax for a non-salaried individual, AOP, or
 * professional-firm AOP. Pure — values stay at full precision so presentation
 * code rounds only when formatting.
 */
export function calcBusinessTax(inputs: BusinessTaxInputs, fiscalYear: string): BusinessTaxResult {
  const resolvedFiscalYear = resolveBusinessFiscalYear(fiscalYear);
  const year = getBusinessSlabYear(resolvedFiscalYear);
  const brackets = selectBrackets(year, inputs.taxpayerType);

  const netIncome = toNonNegative(inputs.netIncome);
  const advanceTaxPaid = toNonNegative(inputs.advanceTaxPaid);

  const baseTax = calcSlabTax(netIncome, brackets);

  const surchargeRegime = year.surcharge;
  const hasSurchargeRegime = surchargeRegime !== null;
  const surchargeApplies = hasSurchargeRegime && netIncome > surchargeRegime.threshold;
  const surcharge = surchargeApplies ? baseTax * surchargeRegime.rate : 0;

  const totalTax = baseTax + surcharge;
  const effectiveRate = netIncome > 0 ? (totalTax / netIncome) * PERCENT : 0;
  const incomeAfterTax = Math.max(0, netIncome - totalTax);
  const remainingTax = Math.max(0, totalTax - advanceTaxPaid);

  const marginalBracket = findTaxBracket(brackets, netIncome);

  return {
    fiscalYear: resolvedFiscalYear,
    taxpayerType: inputs.taxpayerType,
    netIncome,
    baseTax,
    surcharge,
    hasSurchargeRegime,
    surchargeApplies,
    surchargeThreshold: surchargeRegime?.threshold ?? null,
    totalTax,
    effectiveRate,
    incomeAfterTax,
    advanceTaxPaid,
    remainingTax,
    marginalRate: marginalBracket.rate,
    marginalFixed: marginalBracket.fixed,
    marginalBandStart: marginalBracket.min,
    taxFree: marginalBracket.rate === 0,
  };
}
