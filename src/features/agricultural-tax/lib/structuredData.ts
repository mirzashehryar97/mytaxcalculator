import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  AGRICULTURAL_FAQS,
  AGRICULTURAL_GUIDE_COPY,
  AGRICULTURAL_PAGE_COPY,
} from '@/features/agricultural-tax/lib/content';
import {
  AGRICULTURAL_PROVINCES,
  AGRICULTURAL_TAX_ROUTE,
} from '@/features/agricultural-tax/lib/provinces';

const FEATURE_LIST = [
  'Provincial tax on farm income for Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan',
  'Rs 600,000 tax-free allowance and the 15% to 45% slab scale',
  'Flat 20% and 29% rates for companies that farm',
  'Per-acre land tax on holdings above 12½ acres, and on mature orchards from the first acre',
  'Super tax on farm income above Rs 150 million',
  'Tax years 2025-2026 and 2026-2027',
];

function buildApplicationLd(): JsonLd {
  const url = absoluteUrl(AGRICULTURAL_TAX_ROUTE);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#application`,
    name: AGRICULTURAL_PAGE_COPY.title,
    url,
    description: AGRICULTURAL_PAGE_COPY.subtitle,
    image: absoluteUrl(`${AGRICULTURAL_TAX_ROUTE}/opengraph-image`),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    inLanguage: 'en-PK',
    dateModified: AGRICULTURAL_GUIDE_COPY.reviewedDateTime,
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
      logo: absoluteUrl('/main-logo.png'),
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
    featureList: FEATURE_LIST,
  };
}

function buildFaqLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: AGRICULTURAL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * Names the four provinces the page covers as one list, so a search engine can
 * see the page answers "agricultural income tax in <province>" for each of
 * them rather than for the country in general.
 */
function buildProvinceListLd(): JsonLd {
  const url = absoluteUrl(AGRICULTURAL_TAX_ROUTE);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#provinces`,
    name: 'Pakistan agricultural income tax by province',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: AGRICULTURAL_PROVINCES.length,
    itemListElement: AGRICULTURAL_PROVINCES.map((config, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `Agricultural income tax in ${config.label}`,
      description: config.law,
      url: `${url}#province-${config.province}`,
    })),
  };
}

export function buildAgriculturalStructuredData(): JsonLd[] {
  return [
    ...routeStructuredData(AGRICULTURAL_TAX_ROUTE),
    buildApplicationLd(),
    buildFaqLd(),
    buildProvinceListLd(),
  ];
}
