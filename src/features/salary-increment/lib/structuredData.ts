import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  JOB_OFFER_COMPARISON_FAQS,
  JOB_OFFER_COMPARISON_GUIDE_COPY,
  JOB_OFFER_COMPARISON_PAGE_COPY,
  JOB_OFFER_COMPARISON_ROUTE,
  SALARY_INCREMENT_FAQS,
  SALARY_INCREMENT_GUIDE_COPY,
  SALARY_INCREMENT_PAGE_COPY,
  SALARY_INCREMENT_ROUTE,
} from '@/features/salary-increment/lib/content';

interface SalaryComparisonPageCopy {
  title: string;
  subtitle: string;
}

interface SalaryComparisonFaq {
  question: string;
  answer: string;
}

function buildApplicationLd(
  route: string,
  pageCopy: SalaryComparisonPageCopy,
  dateModified: string,
  featureList: readonly string[],
): JsonLd {
  const url = absoluteUrl(route);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#application`,
    name: pageCopy.title,
    url,
    description: pageCopy.subtitle,
    image: absoluteUrl(`${route}/opengraph-image`),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    inLanguage: 'en-PK',
    dateModified,
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: absoluteUrl('/'),
      logo: absoluteUrl('/main-logo.png'),
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
    featureList,
  };
}

function buildFaqLd(faqs: readonly SalaryComparisonFaq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export const salaryIncrementApplicationLd = buildApplicationLd(
  SALARY_INCREMENT_ROUTE,
  SALARY_INCREMENT_PAGE_COPY,
  SALARY_INCREMENT_GUIDE_COPY.reviewedDateTime,
  [
    'Salary increment take-home comparison',
    'Percentage or fixed-amount raise input',
    'After-tax monthly and annual take-home pay',
    'FBR salary slabs for fiscal years 2014-2015 through 2026-2027',
  ],
);

export const salaryIncrementFaqLd = buildFaqLd(SALARY_INCREMENT_FAQS);

export const SALARY_INCREMENT_STRUCTURED_DATA = [
  ...routeStructuredData(SALARY_INCREMENT_ROUTE),
  salaryIncrementApplicationLd,
  salaryIncrementFaqLd,
];

export const jobOfferComparisonApplicationLd = buildApplicationLd(
  JOB_OFFER_COMPARISON_ROUTE,
  JOB_OFFER_COMPARISON_PAGE_COPY,
  JOB_OFFER_COMPARISON_GUIDE_COPY.reviewedDateTime,
  [
    'Side-by-side job offer comparison',
    'Salary, recurring bonus and post-tax deduction inputs',
    'After-tax monthly and annual take-home difference',
    'FBR salary slabs for fiscal years 2014-2015 through 2026-2027',
  ],
);

export const jobOfferComparisonFaqLd = buildFaqLd(JOB_OFFER_COMPARISON_FAQS);

export const JOB_OFFER_COMPARISON_STRUCTURED_DATA = [
  ...routeStructuredData(JOB_OFFER_COMPARISON_ROUTE),
  jobOfferComparisonApplicationLd,
  jobOfferComparisonFaqLd,
];
