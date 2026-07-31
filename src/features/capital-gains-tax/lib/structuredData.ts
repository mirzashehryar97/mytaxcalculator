import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  CAPITAL_GAINS_FAQS,
  CAPITAL_GAINS_GUIDE_COPY,
  CAPITAL_GAINS_PAGE_COPY,
} from '@/features/capital-gains-tax/lib/content';
import { CAPITAL_GAINS_MODES, getCapitalGainsMode } from '@/features/capital-gains-tax/lib/modes';
import type { CapitalGainsMode } from '@/features/capital-gains-tax/types';

const FEATURE_LISTS: Record<CapitalGainsMode, string[]> = {
  'listed-securities': [
    'Capital gains tax on Pakistan Stock Exchange shares under section 37A',
    '15% on shares bought on or after 1 July 2024',
    'Holding-period rates for shares bought 1 July 2022 to 30 June 2024',
    'Filer and non-filer rates side by side',
  ],
  'mutual-funds': [
    'Capital gains tax when mutual fund units are redeemed',
    '15% for a person on stock funds and other funds',
    '25% for a company on funds that are not stock funds',
    'Six-year relief on units bought on or before 30 June 2024',
  ],
};

function buildApplicationLd(mode: CapitalGainsMode): JsonLd {
  const { href } = getCapitalGainsMode(mode);
  const copy = CAPITAL_GAINS_PAGE_COPY[mode];
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
    dateModified: CAPITAL_GAINS_GUIDE_COPY.reviewedDateTime,
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

function buildFaqLd(mode: CapitalGainsMode): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CAPITAL_GAINS_FAQS[mode].map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * Advertises the sibling calculator from every page, so the two routes read as
 * one tool split across the two markets rather than two unrelated pages.
 */
function buildSiblingListLd(mode: CapitalGainsMode): JsonLd {
  const url = absoluteUrl(getCapitalGainsMode(mode).href);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#capital-gains-calculators`,
    name: 'Pakistan investment capital gains tax calculators',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: CAPITAL_GAINS_MODES.length,
    itemListElement: CAPITAL_GAINS_MODES.map((config, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: CAPITAL_GAINS_PAGE_COPY[config.mode].title,
      url: absoluteUrl(config.href),
    })),
  };
}

export function buildCapitalGainsStructuredData(mode: CapitalGainsMode): JsonLd[] {
  return [
    ...routeStructuredData(getCapitalGainsMode(mode).href),
    buildApplicationLd(mode),
    buildFaqLd(mode),
    buildSiblingListLd(mode),
  ];
}
