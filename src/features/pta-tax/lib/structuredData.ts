import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  PTA_FAQ_ITEMS,
  PTA_PAGE_COPY,
  PTA_REVIEW_COPY,
  PTA_ROUTE,
  PTA_VALUE_BASIS_NOTE,
} from '@/features/pta-tax/lib/content';

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
      'Customs duty, regulatory duty, sales tax, section 148 and the mobile handset levy, itemised',
      'Official per-model C&F customs values from FBR valuation rulings',
      'Brand, model and storage picker covering 1,087 handsets across 23 brands',
      'Passport and CNIC registration routes compared side by side',
      'Full rate tables by C&F band for both tax years',
      'Tax years 2025-2026 and 2026-2027',
    ],
  };
}

/**
 * The four steps already printed in the value-basis section, declared so the
 * "how is PTA tax calculated" query has something to match. Each step points at
 * the card that states it, so the markup and the page never diverge.
 */
function buildPtaHowToLd(): JsonLd {
  const url = absoluteUrl(PTA_ROUTE);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#how-to`,
    name: 'How to work out PTA mobile registration tax in Pakistan',
    description: PTA_VALUE_BASIS_NOTE.body,
    url: `${url}#pta-how-it-is-worked-out`,
    inLanguage: 'en-PK',
    totalTime: 'PT2M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'PKR', value: '0' },
    step: PTA_VALUE_BASIS_NOTE.steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.body,
      url: `${url}#pta-step-${step.id}`,
    })),
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
  buildPtaHowToLd(),
  buildPtaFaqLd(),
];
