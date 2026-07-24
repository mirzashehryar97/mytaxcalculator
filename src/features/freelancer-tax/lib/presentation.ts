import {
  FREELANCER_PAGE_COPY,
  FREELANCER_RESULT_COPY,
} from '@/features/freelancer-tax/lib/content';
import type { FreelancerTaxResult } from '@/features/freelancer-tax/types';

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
