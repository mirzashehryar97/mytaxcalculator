import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  PROPERTY_FAQS,
  PROPERTY_GUIDE_COPY,
  PROPERTY_PAGE_COPY,
} from '@/features/property-tax/lib/content';
import { getPropertyMode, PROPERTY_MODES } from '@/features/property-tax/lib/modes';
import type { PropertyMode } from '@/features/property-tax/types';

const FEATURE_LISTS: Record<PropertyMode, string[]> = {
  purchase: [
    'Section 236K advance tax on a property purchase',
    'Filer, late-filer and non-filer rates side by side',
    'Tax charged on the higher of declared price and FBR value',
    'Tax years 2022-2023 through 2026-2027',
  ],
  sale: [
    'Section 236C advance tax on a property sale',
    'Filer, late-filer and non-filer rates side by side',
    'Tax charged on the higher of declared price and FBR value',
    'Tax years 2022-2023 through 2026-2027',
  ],
  'capital-gains': [
    'Capital gains tax on the profit from a property sale',
    'Flat 15% for property acquired on or after 1 July 2024',
    'Holding-period scale by property type for earlier purchases',
    'Section 236C credited against the gain tax',
  ],
};

function buildApplicationLd(mode: PropertyMode): JsonLd {
  const { href } = getPropertyMode(mode);
  const copy = PROPERTY_PAGE_COPY[mode];
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
    dateModified: PROPERTY_GUIDE_COPY.reviewedDateTime,
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

function buildFaqLd(mode: PropertyMode): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PROPERTY_FAQS[mode].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * Advertises the sibling property calculators from every property page, so the
 * three routes read as one tool split across three steps of the same journey
 * rather than three unrelated pages.
 */
function buildSiblingListLd(mode: PropertyMode): JsonLd {
  const url = absoluteUrl(getPropertyMode(mode).href);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#property-calculators`,
    name: 'Pakistan property tax calculators',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: PROPERTY_MODES.length,
    itemListElement: PROPERTY_MODES.map((config, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: PROPERTY_PAGE_COPY[config.mode].title,
      url: absoluteUrl(config.href),
    })),
  };
}

export function buildPropertyStructuredData(mode: PropertyMode): JsonLd[] {
  return [
    ...routeStructuredData(getPropertyMode(mode).href),
    buildApplicationLd(mode),
    buildFaqLd(mode),
    buildSiblingListLd(mode),
  ];
}
