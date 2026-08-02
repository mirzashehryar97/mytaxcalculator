import {
  FREELANCER_FORM_COPY,
  FREELANCER_PAGE_COPY,
  FREELANCER_RESULT_COPY,
} from '@/features/freelancer-tax/lib/content';
import { formatFreelancerRate } from '@/features/freelancer-tax/lib/formatting';
import { hasFreelancerPsebRate } from '@/features/freelancer-tax/lib/rates';
import type { FreelancerTaxResult } from '@/features/freelancer-tax/types';

export function getFreelancerConcessionLabel(result: FreelancerTaxResult): string {
  return `${FREELANCER_RESULT_COPY.concessionLabel} (${formatFreelancerRate(result.psebRatePercent)})`;
}

export function getFreelancerStandardLabel(result: FreelancerTaxResult): string {
  return `${FREELANCER_RESULT_COPY.standardLabel} (${formatFreelancerRate(result.standardRatePercent)})`;
}

export function getFreelancerPsebHelpText(fiscalYear: string): string {
  return hasFreelancerPsebRate(fiscalYear)
    ? FREELANCER_FORM_COPY.psebDescription
    : FREELANCER_FORM_COPY.psebUnavailableDescription;
}

export function getFreelancerRateBadge(result: FreelancerTaxResult): string {
  if (result.eligibleForPsebRate) {
    return FREELANCER_RESULT_COPY.eligibleBadge;
  }
  return result.atlRateApplied
    ? FREELANCER_RESULT_COPY.standardBadge
    : FREELANCER_RESULT_COPY.nonAtlBadge;
}

export function getFreelancerTaxCaveat(result: FreelancerTaxResult): string {
  return result.atlRateApplied
    ? FREELANCER_PAGE_COPY.finalTaxCaveat
    : FREELANCER_PAGE_COPY.nonAtlTaxCaveat;
}
