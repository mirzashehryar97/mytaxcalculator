import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  FREELANCER_FAQS,
  FREELANCER_GUIDE_COPY,
  FREELANCER_PAGE_COPY,
} from '@/features/freelancer-tax/lib/content';

export const FREELANCER_TAX_ROUTE = '/freelancer-tax-calculator';
const FREELANCER_TAX_URL = absoluteUrl(FREELANCER_TAX_ROUTE);
const FREELANCER_TAX_IMAGE = absoluteUrl(`${FREELANCER_TAX_ROUTE}/opengraph-image`);

export const freelancerTaxApplicationLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${FREELANCER_TAX_URL}#application`,
  name: FREELANCER_PAGE_COPY.title,
  url: FREELANCER_TAX_URL,
  description: FREELANCER_PAGE_COPY.subtitle,
  image: FREELANCER_TAX_IMAGE,
  mainEntityOfPage: { '@type': 'WebPage', '@id': FREELANCER_TAX_URL },
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript and a modern web browser',
  inLanguage: 'en-PK',
  dateModified: FREELANCER_GUIDE_COPY.reviewedDateTime,
  isAccessibleForFree: true,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/main-logo.png'),
  },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
  featureList: [
    'PSEB filer and non-filer rate eligibility',
    'USD to PKR conversion',
    'Monthly export receipt input with monthly and annual tax estimates',
    'Fiscal years 2021-2022 through 2026-2027',
  ],
};

export const freelancerTaxFaqLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FREELANCER_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const FREELANCER_TAX_STRUCTURED_DATA = [
  ...routeStructuredData(FREELANCER_TAX_ROUTE),
  freelancerTaxApplicationLd,
  freelancerTaxFaqLd,
];
