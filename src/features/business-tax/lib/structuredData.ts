import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  BUSINESS_FAQS,
  BUSINESS_GUIDE_COPY,
  BUSINESS_PAGE_COPY,
} from '@/features/business-tax/lib/content';

export const BUSINESS_TAX_ROUTE = '/business-tax-calculator';
const BUSINESS_TAX_URL = absoluteUrl(BUSINESS_TAX_ROUTE);
const BUSINESS_TAX_IMAGE = absoluteUrl(`${BUSINESS_TAX_ROUTE}/opengraph-image`);

export const businessTaxApplicationLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${BUSINESS_TAX_URL}#application`,
  name: BUSINESS_PAGE_COPY.title,
  url: BUSINESS_TAX_URL,
  description: BUSINESS_PAGE_COPY.subtitle,
  image: BUSINESS_TAX_IMAGE,
  mainEntityOfPage: { '@type': 'WebPage', '@id': BUSINESS_TAX_URL },
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript and a modern web browser',
  inLanguage: 'en-PK',
  dateModified: BUSINESS_GUIDE_COPY.reviewedDateTime,
  isAccessibleForFree: true,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/main-logo.png'),
  },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
  featureList: [
    'Non-salaried individual, AOP and professional-firm rates',
    'Enter profit directly or from income and expenses',
    'Surcharge and effective tax rate estimates',
    'Tax years 2021-2022 through 2026-2027',
  ],
};

export const businessTaxFaqLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: BUSINESS_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const BUSINESS_TAX_STRUCTURED_DATA = [
  ...routeStructuredData(BUSINESS_TAX_ROUTE),
  businessTaxApplicationLd,
  businessTaxFaqLd,
];
