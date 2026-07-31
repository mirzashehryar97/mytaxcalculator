import type { OfficialSource } from '@/components/calculator/OfficialSourcesGrid';
import type { SocialCardCopy } from '@/components/ui/SocialCard';

import {
  COMPANY_TAX_FAQS,
  COMPANY_TAX_OFFICIAL_SOURCES,
  COMPANY_TAX_PAGE_COPY,
  COMPANY_TAX_RATE_ROWS,
  COMPANY_TAX_SECTION_COPY,
  COMPANY_TAX_SOCIAL_IMAGE_COPY,
} from '@/features/corporate-tax/lib/companyTaxContent';
import {
  MINIMUM_TAX_FAQS,
  MINIMUM_TAX_OFFICIAL_SOURCES,
  MINIMUM_TAX_PAGE_COPY,
  MINIMUM_TAX_RATE_ROWS,
  MINIMUM_TAX_SECTION_COPY,
  MINIMUM_TAX_SOCIAL_IMAGE_COPY,
} from '@/features/corporate-tax/lib/minimumTaxContent';
import {
  SUPER_TAX_FAQS,
  SUPER_TAX_OFFICIAL_SOURCES,
  SUPER_TAX_PAGE_COPY,
  SUPER_TAX_RATE_ROWS,
  SUPER_TAX_SECTION_COPY,
  SUPER_TAX_SOCIAL_IMAGE_COPY,
} from '@/features/corporate-tax/lib/superTaxContent';
import type {
  CorporateFaqItem,
  CorporateMode,
  CorporateRateRow,
} from '@/features/corporate-tax/types';

interface CorporatePageCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  badges: readonly string[];
  formTitle: string;
  resultTitle: string;
  assessedNote: string;
  bottomDisclaimer: string;
}

interface CorporateSectionCopy {
  faqEyebrow: string;
  faqTitle: string;
  faqDescription: string;
  rateTitle: string;
  rateDescription: string;
  rateNote: string;
}

/**
 * The per-mode lookups the shared corporate components read from, so a hero,
 * FAQ block or sources grid can be written once and pointed at a mode.
 */
export const CORPORATE_PAGE_COPY: Record<CorporateMode, CorporatePageCopy> = {
  'company-tax': COMPANY_TAX_PAGE_COPY,
  'minimum-tax': MINIMUM_TAX_PAGE_COPY,
  'super-tax': SUPER_TAX_PAGE_COPY,
};

export const CORPORATE_SECTION_COPY: Record<CorporateMode, CorporateSectionCopy> = {
  'company-tax': COMPANY_TAX_SECTION_COPY,
  'minimum-tax': MINIMUM_TAX_SECTION_COPY,
  'super-tax': SUPER_TAX_SECTION_COPY,
};

export const CORPORATE_RATE_ROWS: Record<CorporateMode, readonly CorporateRateRow[]> = {
  'company-tax': COMPANY_TAX_RATE_ROWS,
  'minimum-tax': MINIMUM_TAX_RATE_ROWS,
  'super-tax': SUPER_TAX_RATE_ROWS,
};

export const CORPORATE_FAQS: Record<CorporateMode, readonly CorporateFaqItem[]> = {
  'company-tax': COMPANY_TAX_FAQS,
  'minimum-tax': MINIMUM_TAX_FAQS,
  'super-tax': SUPER_TAX_FAQS,
};

export const CORPORATE_OFFICIAL_SOURCES: Record<CorporateMode, readonly OfficialSource[]> = {
  'company-tax': COMPANY_TAX_OFFICIAL_SOURCES,
  'minimum-tax': MINIMUM_TAX_OFFICIAL_SOURCES,
  'super-tax': SUPER_TAX_OFFICIAL_SOURCES,
};

export const CORPORATE_SOCIAL_IMAGE_COPY: Record<CorporateMode, SocialCardCopy> = {
  'company-tax': COMPANY_TAX_SOCIAL_IMAGE_COPY,
  'minimum-tax': MINIMUM_TAX_SOCIAL_IMAGE_COPY,
  'super-tax': SUPER_TAX_SOCIAL_IMAGE_COPY,
};
