import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import { CORPORATE_GUIDE_COPY } from '@/features/corporate-tax/lib/content';
import { CORPORATE_FAQS, CORPORATE_PAGE_COPY } from '@/features/corporate-tax/lib/modeContent';
import { CORPORATE_MODES, getCorporateMode } from '@/features/corporate-tax/lib/modes';
import type { CorporateMode } from '@/features/corporate-tax/types';

const FEATURE_LISTS: Record<CorporateMode, string[]> = {
  'company-tax': [
    'Company income tax on yearly taxable profit',
    'Normal company, small company and banking rates',
    'Credit for advance tax already paid',
    'Tax years 2022-2023 through 2026-2027',
  ],
  'minimum-tax': [
    'Section 113 minimum tax worked out from yearly turnover',
    'Compares the minimum tax with the normal tax on profit',
    'Reduced Division IX rates by trade',
    'Shows the excess carried forward to later years',
  ],
  'super-tax': [
    'Section 4C super tax on high income',
    'Separate rules for banks, oil and gas exploration and fertilizer',
    'Export exemption above 80% of turnover from 2026-27',
    'Tax years 2022-2023 through 2026-2027',
  ],
};

function buildApplicationLd(mode: CorporateMode): JsonLd {
  const { href } = getCorporateMode(mode);
  const copy = CORPORATE_PAGE_COPY[mode];
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
    dateModified: CORPORATE_GUIDE_COPY.reviewedDateTime,
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

function buildCorporateFaqLd(mode: CorporateMode): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CORPORATE_FAQS[mode].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * Advertises the sibling corporate calculators from every corporate page, so
 * the three routes read as one tool split across the three taxes a company
 * faces rather than three unrelated pages.
 */
function buildSiblingListLd(mode: CorporateMode): JsonLd {
  const url = absoluteUrl(getCorporateMode(mode).href);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#corporate-calculators`,
    name: 'Pakistan corporate tax calculators',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: CORPORATE_MODES.length,
    itemListElement: CORPORATE_MODES.map((config, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: CORPORATE_PAGE_COPY[config.mode].title,
      url: absoluteUrl(config.href),
    })),
  };
}

export function buildCorporateStructuredData(mode: CorporateMode): JsonLd[] {
  return [
    ...routeStructuredData(getCorporateMode(mode).href),
    buildApplicationLd(mode),
    buildCorporateFaqLd(mode),
    buildSiblingListLd(mode),
  ];
}
