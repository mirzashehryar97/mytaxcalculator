import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  REVERSE_SALARY_FAQS,
  REVERSE_SALARY_GUIDE_COPY,
  REVERSE_SALARY_PAGE_COPY,
  REVERSE_SALARY_ROUTE,
} from '@/features/reverse-salary/lib/content';

const REVERSE_SALARY_URL = absoluteUrl(REVERSE_SALARY_ROUTE);
const REVERSE_SALARY_IMAGE = absoluteUrl(`${REVERSE_SALARY_ROUTE}/opengraph-image`);

export const reverseSalaryApplicationLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${REVERSE_SALARY_URL}#application`,
  name: REVERSE_SALARY_PAGE_COPY.title,
  url: REVERSE_SALARY_URL,
  description: REVERSE_SALARY_PAGE_COPY.subtitle,
  image: REVERSE_SALARY_IMAGE,
  mainEntityOfPage: { '@type': 'WebPage', '@id': REVERSE_SALARY_URL },
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript and a modern web browser',
  inLanguage: 'en-PK',
  dateModified: REVERSE_SALARY_GUIDE_COPY.reviewedDateTime,
  isAccessibleForFree: true,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/main-logo.png'),
  },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
  featureList: [
    'Gross salary required for a target take-home',
    'Monthly and annual tax estimates',
    'Effective tax rate on the required gross',
    'FBR salary slabs for fiscal years 2014-2015 through 2026-2027',
  ],
};

export const reverseSalaryFaqLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: REVERSE_SALARY_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const REVERSE_SALARY_STRUCTURED_DATA = [
  ...routeStructuredData(REVERSE_SALARY_ROUTE),
  reverseSalaryApplicationLd,
  reverseSalaryFaqLd,
];
