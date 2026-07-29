import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  RENTAL_FAQS,
  RENTAL_GUIDE_COPY,
  RENTAL_PAGE_COPY,
} from '@/features/rental-income-tax/lib/content';

export const RENTAL_TAX_ROUTE = '/rental-income-tax-calculator';
const RENTAL_TAX_URL = absoluteUrl(RENTAL_TAX_ROUTE);
const RENTAL_TAX_IMAGE = absoluteUrl(`${RENTAL_TAX_ROUTE}/opengraph-image`);

export const rentalTaxApplicationLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${RENTAL_TAX_URL}#application`,
  name: RENTAL_PAGE_COPY.title,
  url: RENTAL_TAX_URL,
  description: RENTAL_PAGE_COPY.subtitle,
  image: RENTAL_TAX_IMAGE,
  mainEntityOfPage: { '@type': 'WebPage', '@id': RENTAL_TAX_URL },
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript and a modern web browser',
  inLanguage: 'en-PK',
  dateModified: RENTAL_GUIDE_COPY.reviewedDateTime,
  isAccessibleForFree: true,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/main-logo.png'),
  },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
  featureList: [
    'Section 155 rent rates for owners, partners and companies',
    'Monthly or yearly rent input',
    'Filer and non-filer comparison on the same rent',
    'Tax years 2021-2022 through 2026-2027',
  ],
};

export const rentalTaxFaqLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: RENTAL_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const RENTAL_TAX_STRUCTURED_DATA = [
  ...routeStructuredData(RENTAL_TAX_ROUTE),
  rentalTaxApplicationLd,
  rentalTaxFaqLd,
];
