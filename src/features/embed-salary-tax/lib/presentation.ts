import { EMBED_SALARY_TAX_COPY } from '@/features/embed-salary-tax/lib/content';
import { formatEmbedPercent, formatEmbedPkr } from '@/features/embed-salary-tax/lib/formatting';
import type {
  EmbedSalaryTaxResult,
  EmbedSalaryTaxResultPresentation,
} from '@/features/embed-salary-tax/types';

export function buildEmbedSalaryTaxResultPresentation(
  result: EmbedSalaryTaxResult,
): EmbedSalaryTaxResultPresentation {
  return {
    monthly: {
      title: EMBED_SALARY_TAX_COPY.monthlyResultsTitle,
      grossLabel: EMBED_SALARY_TAX_COPY.grossLabel,
      grossValue: formatEmbedPkr(result.monthlyGross),
      taxLabel: EMBED_SALARY_TAX_COPY.taxLabel,
      taxValue: formatEmbedPkr(result.monthlyTax),
      takeHomeLabel: EMBED_SALARY_TAX_COPY.takeHomeLabel,
      takeHomeValue: formatEmbedPkr(result.monthlyTakeHome),
    },
    annual: {
      title: EMBED_SALARY_TAX_COPY.annualResultsTitle,
      grossLabel: EMBED_SALARY_TAX_COPY.grossLabel,
      grossValue: formatEmbedPkr(result.annualGross),
      taxLabel: EMBED_SALARY_TAX_COPY.taxLabel,
      taxValue: formatEmbedPkr(result.annualTax),
      takeHomeLabel: EMBED_SALARY_TAX_COPY.takeHomeLabel,
      takeHomeValue: formatEmbedPkr(result.annualTakeHome),
    },
    effectiveRateLabel: EMBED_SALARY_TAX_COPY.effectiveRateLabel,
    effectiveRateValue: formatEmbedPercent(result.effectiveRate),
  };
}
