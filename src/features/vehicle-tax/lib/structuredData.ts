import { absoluteUrl, type JsonLd, routeStructuredData, SITE_NAME } from '@/lib/seo';

import {
  VEHICLE_GUIDE_COPY,
  VEHICLE_REGISTRATION_FAQS,
  VEHICLE_REGISTRATION_PAGE_COPY,
  VEHICLE_TOKEN_FAQS,
  VEHICLE_TOKEN_PAGE_COPY,
} from '@/features/vehicle-tax/lib/content';
import {
  VEHICLE_MODES,
  VEHICLE_REGISTRATION_ROUTE,
  VEHICLE_TOKEN_ROUTE,
} from '@/features/vehicle-tax/lib/modes';

const VEHICLE_PAGE_NAMES: Record<string, string> = {
  [VEHICLE_REGISTRATION_ROUTE]: VEHICLE_REGISTRATION_PAGE_COPY.title,
  [VEHICLE_TOKEN_ROUTE]: VEHICLE_TOKEN_PAGE_COPY.title,
};

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/main-logo.png'),
} as const;

function buildVehicleApplicationLd(
  route: string,
  name: string,
  description: string,
  featureList: readonly string[],
): JsonLd {
  const url = absoluteUrl(route);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#application`,
    name,
    url,
    description,
    image: absoluteUrl(`${route}/opengraph-image`),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and a modern web browser',
    inLanguage: 'en-PK',
    dateModified: VEHICLE_GUIDE_COPY.reviewedDateTime,
    isAccessibleForFree: true,
    publisher,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
    featureList: [...featureList],
  };
}

function buildVehicleFaqLd(faqs: readonly { question: string; answer: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/**
 * Advertises both vehicle calculators from either page, so the pair reads as one
 * tool split across buying a vehicle and keeping it on the road rather than two
 * unrelated pages. Mirrors what the property routes do.
 */
function buildVehicleSiblingListLd(route: string): JsonLd {
  const url = absoluteUrl(route);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#vehicle-calculators`,
    name: 'Pakistan vehicle tax calculators',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: VEHICLE_MODES.length,
    itemListElement: VEHICLE_MODES.map((config, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: VEHICLE_PAGE_NAMES[config.href] ?? config.shortLabel,
      url: absoluteUrl(config.href),
    })),
  };
}

export const VEHICLE_REGISTRATION_STRUCTURED_DATA = [
  ...routeStructuredData(VEHICLE_REGISTRATION_ROUTE),
  buildVehicleApplicationLd(
    VEHICLE_REGISTRATION_ROUTE,
    VEHICLE_REGISTRATION_PAGE_COPY.title,
    VEHICLE_REGISTRATION_PAGE_COPY.subtitle,
    [
      'Section 231B advance tax on registering a vehicle',
      'Advance tax on transferring a used vehicle, with the reduction for age',
      'Filer and non-filer comparison on the same vehicle',
      'Electric vehicles charged on value instead of engine size',
      'Tax years 2023-2024 through 2026-2027',
    ],
  ),
  buildVehicleFaqLd(VEHICLE_REGISTRATION_FAQS),
  buildVehicleSiblingListLd(VEHICLE_REGISTRATION_ROUTE),
];

export const VEHICLE_TOKEN_STRUCTURED_DATA = [
  ...routeStructuredData(VEHICLE_TOKEN_ROUTE),
  buildVehicleApplicationLd(
    VEHICLE_TOKEN_ROUTE,
    VEHICLE_TOKEN_PAGE_COPY.title,
    VEHICLE_TOKEN_PAGE_COPY.subtitle,
    [
      'Provincial token tax for all five provinces and territories',
      'Early-payment discount on the yearly token',
      'Federal Section 234 tax collected with the token',
      'Filer and non-filer comparison on the federal part',
      'Tax years 2025-2026 and 2026-2027',
    ],
  ),
  buildVehicleFaqLd(VEHICLE_TOKEN_FAQS),
  buildVehicleSiblingListLd(VEHICLE_TOKEN_ROUTE),
];
