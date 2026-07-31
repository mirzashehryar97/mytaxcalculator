import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  WITHHOLDING_FAQS,
  WITHHOLDING_GUIDE_COPY,
  WITHHOLDING_PAGE_COPY,
} from '@/features/withholding-tax/lib/content';
import { getWithholdingMode, WITHHOLDING_MODES } from '@/features/withholding-tax/lib/modes';
import type { WithholdingMode } from '@/features/withholding-tax/types';

const FEATURE_LISTS: Record<WithholdingMode, string[]> = {
  'cash-withdrawal': [
    'Section 231AB advance tax on bank cash withdrawals',
    '0.8% for non-filers, nil for filers',
    'Rs. 50,000 daily total before any deduction starts',
    'Tax years 2023-2024 through 2026-2027',
  ],
  electricity: [
    'Section 235 advance tax on electricity bills',
    '7.5% on home meters from Rs. 25,000 a month for non-filers',
    'Commercial and industrial bill bands side by side',
    'Tax years 2023-2024 through 2026-2027',
  ],
  'phone-internet': [
    'Section 236 advance tax on phone and internet',
    '15% on mobile, internet and prepaid loads',
    '10% on the part of a landline bill above Rs. 1,000',
    'Balance left after tax on a prepaid load',
  ],
};

function buildApplicationLd(mode: WithholdingMode): JsonLd {
  const { href } = getWithholdingMode(mode);
  const copy = WITHHOLDING_PAGE_COPY[mode];
  const url = absoluteUrl(href);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#application`,
    name: copy.title,
    url,
    description: copy.subtitle,
    image: absoluteUrl(`${href}/opengraph-image`),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    inLanguage: 'en-PK',
    dateModified: WITHHOLDING_GUIDE_COPY.reviewedDateTime,
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
      logo: absoluteUrl('/main-logo.png'),
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
    featureList: FEATURE_LISTS[mode],
  };
}

function buildFaqLd(mode: WithholdingMode): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: WITHHOLDING_FAQS[mode].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * Advertises the sibling calculators from every page, so the three routes read
 * as one tool split across the three deductions rather than three unrelated
 * pages.
 */
function buildSiblingListLd(mode: WithholdingMode): JsonLd {
  const url = absoluteUrl(getWithholdingMode(mode).href);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#withholding-calculators`,
    name: 'Pakistan everyday withholding tax calculators',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: WITHHOLDING_MODES.length,
    itemListElement: WITHHOLDING_MODES.map((config, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: WITHHOLDING_PAGE_COPY[config.mode].title,
      url: absoluteUrl(config.href),
    })),
  };
}

export function buildWithholdingStructuredData(mode: WithholdingMode): JsonLd[] {
  return [
    ...routeStructuredData(getWithholdingMode(mode).href),
    buildApplicationLd(mode),
    buildFaqLd(mode),
    buildSiblingListLd(mode),
  ];
}
