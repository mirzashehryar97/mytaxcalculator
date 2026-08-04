import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  PTA_FAQ_ITEMS,
  PTA_PAGE_COPY,
  PTA_REVIEW_COPY,
  PTA_ROUTE,
} from '@/features/pta-tax/lib/content';
import { PTA_NEW_PHONES, PTA_PHONE_BRANDS } from '@/features/pta-tax/lib/phoneCatalogue';

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/main-logo.png'),
} as const;

function buildPtaApplicationLd(): JsonLd {
  const url = absoluteUrl(PTA_ROUTE);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#application`,
    name: PTA_PAGE_COPY.title,
    url,
    description: PTA_PAGE_COPY.subtitle,
    image: absoluteUrl(`${PTA_ROUTE}/opengraph-image`),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    inLanguage: 'en-PK',
    dateModified: PTA_REVIEW_COPY.reviewedDateTime,
    isAccessibleForFree: true,
    publisher,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
    featureList: [
      'Customs duty, additional customs duty, regulatory duty, sales tax, section 148 and the mobile handset levy, itemised',
      'Official per-model C&F customs values from FBR valuation rulings',
      /**
       * Counted rather than typed, and stated as values across models because
       * the two differ: most models are priced once per storage tier, so the
       * larger number is rows in the rulings, not distinct handsets. Structured
       * data has to describe what the page visibly does.
       */
      `Brand, model and storage picker covering ${PTA_NEW_PHONES.length.toLocaleString('en-PK')} published values across ${PTA_PHONE_BRANDS.length} brands`,
      'Passport and CNIC registration routes compared side by side',
      'Full rate tables by C&F band for both tax years',
      'Tax years 2025-2026 and 2026-2027',
    ],
  };
}

function buildPtaFaqLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PTA_FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export const PTA_STRUCTURED_DATA = [
  ...routeStructuredData(PTA_ROUTE),
  buildPtaApplicationLd(),
  buildPtaFaqLd(),
];
