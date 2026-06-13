import type { Metadata } from 'next';

export const SITE_URL = 'https://www.mytaxcalculator.pk';
export const SITE_NAME = 'My Tax Calculator';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const LAST_UPDATED = '2026-06-12';

/** High-intent keywords from Budget 2026-27 / FY 2026-27 search trends (Dawn, SAMAA, Tribune, FBR). */
export const SITE_KEYWORDS = [
  'tax calculator Pakistan',
  'budget 2026-27 income tax calculator',
  'Pakistan income tax calculator 2026-27',
  'salary tax calculator Pakistan',
  'monthly income tax calculator Pakistan',
  'take home salary calculator Pakistan',
  'FBR tax slabs 2026-2027',
  'revised tax slabs Pakistan 2026',
  'Finance Bill 2026 tax calculator',
  'calculate tax on salary Pakistan',
  'net salary after tax Pakistan',
  'salaried income tax calculator Pakistan',
  'FBR salary tax estimator',
  'monthly tax deduction calculator Pakistan',
  'income tax slabs FY 2026-2027',
  'Pakistan budget tax relief salaried',
  'budget 2025-26 vs 2026-27 tax comparison',
  'FY 2025-26 vs 2026-27 income tax slabs',
  'Pakistan salary tax changes 2026',
  'Finance Bill 2026 vs Finance Act 2025',
  'Pakistan budget 2026-27 freelancers IT tax',
  'Pakistan budget solar panels tax 2026',
  'Pakistan budget car EV tax 2026-27',
  'Pakistan defence budget 2026-27',
  'Pakistan property tax budget 2026 Section 7E',
  'tax free salary limit Pakistan 600000',
  'how much tax on my salary Pakistan',
  'multi-year tax calculator Pakistan',
  'FBR tax calculator',
  'historical tax calculator Pakistan',
];

export interface HomeFaqItem {
  question: string;
  answer?: string;
  /** When true, the on-page answer renders the interactive slabs table. */
  slabs?: boolean;
  /** Plain-text answer for FAQ JSON-LD (required for every item). */
  schemaAnswer: string;
}

export const HOME_FAQS: HomeFaqItem[] = [
  {
    question: 'What are the income tax slabs in Pakistan for FY 2026-2027?',
    slabs: true,
    schemaAnswer:
      "For FY 2026-2027, Pakistan's salaried income tax slabs are: 0% up to PKR 600,000; 1% on PKR 600,001–1,200,000; 11% on PKR 1,200,001–2,200,000; 20% on PKR 2,200,001–3,200,000; 25% on PKR 3,200,001–4,100,000; 29% on PKR 4,100,001–5,600,000; 32% on PKR 5,600,001–7,000,000; and 35% above PKR 7,000,001.",
  },
  {
    question: 'How do I calculate income tax on my salary in Pakistan?',
    answer:
      'Enter your monthly or annual salary, select the fiscal year (e.g. FY 2026-2027), and the calculator applies the progressive FBR tax slabs to compute your total tax liability, monthly tax, and take-home salary.',
    schemaAnswer:
      'Enter your monthly or annual salary, select the fiscal year (e.g. FY 2026-2027), and the calculator applies the progressive FBR tax slabs to compute your total tax liability, monthly tax, and take-home salary.',
  },
  {
    question: 'How much tax will I pay on my salary in Pakistan?',
    answer:
      'Your salary tax depends on your annual income and the FBR slab it falls into. For FY 2026-2027, income up to PKR 600,000 is tax-free, then progressive rates from 1% up to 35% apply. Enter your monthly salary above to see exactly how much income tax you will pay each month and per year.',
    schemaAnswer:
      'Your salary tax depends on your annual income and the FBR slab it falls into. For FY 2026-2027, income up to PKR 600,000 is tax-free, then progressive rates from 1% up to 35% apply. Enter your monthly salary to see exactly how much income tax you will pay each month and per year.',
  },
  {
    question: 'What will my take-home salary be after tax?',
    answer:
      'Your take-home (net) salary is your gross salary minus income tax. The calculator instantly shows your monthly and yearly take-home pay after applying the latest FBR tax slabs, so you know exactly what lands in your account.',
    schemaAnswer:
      'Your take-home (net) salary is your gross salary minus income tax. The calculator instantly shows your monthly and yearly take-home pay after applying the latest FBR tax slabs, so you know exactly what lands in your account.',
  },
  {
    question: 'Can I compare tax across multiple years in Pakistan?',
    answer:
      'Yes. My Tax Calculator supports multi-year calculations from FY 2014-2015 through FY 2026-2027, with automatic fiscal year detection for job changes and partial employment periods.',
    schemaAnswer:
      'Yes. My Tax Calculator supports multi-year calculations from FY 2014-2015 through FY 2026-2027, with automatic fiscal year detection for job changes and partial employment periods.',
  },
];

export type JsonLd = Record<string, unknown>;

export interface RouteMeta {
  title: string;
  description: string;
  /** Human-readable label used to build the breadcrumb trail. */
  breadcrumb: string;
  /** Treated as an article/guide for Article structured data. */
  isArticle?: boolean;
  /** Date the content was first published (ISO). */
  datePublished?: string;
  /** Date the content was last reviewed/updated (ISO). */
  dateModified?: string;
  /** Sitemap priority (0.0–1.0). */
  sitemapPriority?: number;
  /** Sitemap change frequency. */
  sitemapChangeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Pakistan Income Tax Calculator 2026-27 | Salary & FBR Tax Slabs',
    description:
      'Free Pakistan income tax calculator with the latest FBR tax slabs for FY 2026-2027. Calculate your salary tax and take-home pay, or compare fiscal years 2014 to 2027.',
    breadcrumb: 'Home',
    sitemapPriority: 1.0,
    sitemapChangeFrequency: 'weekly',
  },
  '/about': {
    title: 'About My Tax Calculator | Pakistan Income Tax Tool',
    description:
      'Learn about My Tax Calculator — a free, privacy-focused Pakistan income tax calculator updated with FBR tax slabs through FY 2026-2027.',
    breadcrumb: 'About',
    sitemapPriority: 0.7,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-guides': {
    title: 'Pakistan Tax Guides & Resources | FBR Filing Help',
    description:
      'Pakistani tax guides covering income tax slabs, deductions, credits, and how to file your return with FBR. Updated for FY 2026-2027.',
    breadcrumb: 'Tax Guides',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-guides/understanding-tax-system': {
    title: 'Pakistan Income Tax Slabs FY 2026-2027 | Tax System Guide',
    description:
      "Complete guide to Pakistan's income tax system with current FBR tax slabs for FY 2026-2027, filing requirements, and important deadlines.",
    breadcrumb: "Understanding Pakistan's Tax System",
    isArticle: true,
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-guides/deductions-credits': {
    title: 'Pakistan Tax Deductions & Credits | Reduce Your Tax',
    description:
      'Learn about tax deductions and credits available to Pakistani taxpayers to reduce your income tax liability.',
    breadcrumb: 'Tax Deductions & Credits',
    isArticle: true,
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    sitemapPriority: 0.7,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-guides/filing-tax-return': {
    title: 'How to File Income Tax Return in Pakistan | FBR IRIS Guide',
    description:
      'Step-by-step guide to filing your income tax return in Pakistan through the FBR IRIS portal.',
    breadcrumb: 'Filing Your Tax Return',
    isArticle: true,
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    sitemapPriority: 0.7,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-news': {
    title: 'Pakistan Tax News & Updates 2026-2027 | FBR Announcements',
    description:
      'Latest Pakistan tax news and updates: FBR income tax slabs for FY 2026-2027, filing deadlines, deductions and tax planning tips.',
    breadcrumb: 'Tax News',
    sitemapPriority: 0.6,
    sitemapChangeFrequency: 'weekly',
  },
  '/budget-2025-26-vs-2026-27': {
    title: 'Budget 2025-26 vs 2026-27 | Complete Pakistan Federal Budget Comparison',
    description:
      'Full FY 2025-26 vs 2026-27 budget comparison: salaried tax, freelancers, IT, property, cars, solar, defence, retail, super tax and Finance Bill 2026 changes explained.',
    breadcrumb: 'Budget 2025-26 vs 2026-27',
    isArticle: true,
    datePublished: LAST_UPDATED,
    dateModified: LAST_UPDATED,
    sitemapPriority: 0.9,
    sitemapChangeFrequency: 'weekly',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | My Tax Calculator',
    description:
      'Read the privacy policy for My Tax Calculator. All tax calculations run locally in your browser — we do not store your salary or personal data.',
    breadcrumb: 'Privacy Policy',
    sitemapPriority: 0.3,
    sitemapChangeFrequency: 'yearly',
  },
  '/terms-of-service': {
    title: 'Terms of Service | My Tax Calculator',
    description:
      'The terms of service for using My Tax Calculator, a free Pakistan income tax calculator and guide. For estimation purposes only — not professional tax advice.',
    breadcrumb: 'Terms of Service',
    sitemapPriority: 0.3,
    sitemapChangeFrequency: 'yearly',
  },
};

export function absoluteUrl(pathname: string): string {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

function getPageTitle(pathname: string, title: string): string {
  if (pathname === '/') {
    return title;
  }
  if (title.includes(SITE_NAME)) {
    return title;
  }
  return `${title} | ${SITE_NAME}`;
}

/**
 * Builds the per-route Next.js Metadata object (title, description, canonical,
 * Open Graph and Twitter) from the central route table.
 */
export function getMetadata(pathname: string): Metadata {
  const meta = routeMeta[pathname] ?? routeMeta['/'];
  const url = absoluteUrl(pathname);
  const published = meta.datePublished ?? meta.dateModified;
  const modified = meta.dateModified;

  const openGraph: Metadata['openGraph'] = {
    type: meta.isArticle ? 'article' : 'website',
    title: meta.title,
    description: meta.description,
    url,
    siteName: SITE_NAME,
    locale: 'en_PK',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${meta.title} — ${SITE_NAME}`,
      },
    ],
    ...(meta.isArticle && published && modified
      ? { publishedTime: published, modifiedTime: modified }
      : {}),
  };

  return {
    title: {
      absolute: getPageTitle(pathname, meta.title),
    },
    description: meta.description,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGE],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                          */
/* ------------------------------------------------------------------ */

export const organizationLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/main-logo.png`,
  description:
    'Free Pakistan income tax calculator with the latest FBR tax slabs for FY 2026-2027, plus guides on filing, deductions and the tax system.',
  areaServed: { '@type': 'Country', name: 'Pakistan' },
};

export const websiteLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: 'Pakistan Income Tax Calculator',
  url: `${SITE_URL}/`,
  inLanguage: 'en-PK',
  publisher: { '@type': 'Organization', name: SITE_NAME },
};

export const webApplicationLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pakistan Income Tax Calculator',
  url: `${SITE_URL}/`,
  description:
    'Calculate income tax in Pakistan using latest FBR tax slabs for FY 2026-2027. Supports single-year and multi-year tax calculations from FY 2014-2015 to FY 2026-2027.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' },
  featureList: [
    'FY 2026-2027 FBR tax slabs',
    'Single year tax calculator',
    'Multi-year tax calculator',
    'Historical tax comparison 2014-2027',
  ],
};

export const faqLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.schemaAnswer,
    },
  })),
};

export const BUDGET_COMPARISON_FAQS = [
  {
    question: 'What are the main changes in Pakistan Budget 2026-27 vs 2025-26?',
    answer:
      'Budget 2026-27 proposes salaried tax relief (restructured slabs, surcharge abolished), property sector cuts (Section 7E and CVT abolished, lower transfer taxes), extended 0.25% IT/freelancer FTR to 2029, super tax abolished for companies up to Rs. 500M, fixed 1% tax for small retailers, stable solar taxes, higher defence allocation (Rs. 3T), and new taxes on luxury imported EVs and social media earnings.',
  },
  {
    question:
      'What changed in Pakistan income tax from FY 2025-26 to FY 2026-27 for salaried workers?',
    answer:
      'Salaried tax slabs expand from 6 to 8 bands. Rates fall for incomes between Rs. 2.2M and Rs. 7M, the 35% top rate now starts above Rs. 7M, and the 9% surcharge above Rs. 10M is proposed abolished. Federal employees get 7% salary and pension increases; minimum wage rises 10%.',
  },
  {
    question: 'Do freelancers get tax relief in Budget 2026-27?',
    answer:
      'Yes for PSEB-registered IT exporters: the 0.25% Final Tax Regime is extended to 30 June 2029, export tax drops from 2% to 1.25%, and international card withholding falls from 5% to 0.5%. Non-PSEB freelancers still face non-salaried slabs. A new 5% withholding tax on social media earnings is proposed.',
  },
  {
    question: 'Is there new tax on solar panels in Budget 2026-27?',
    answer:
      'No. Despite proposals to raise GST to 18%, the government maintained the existing solar tax structure. FBR confirmed no fresh taxes on solar panels or photovoltaic cells in Finance Bill 2026.',
  },
  {
    question: 'How does Budget 2026-27 affect cars and electric vehicles?',
    answer:
      'Local EV/HEV concessions are extended to June 2027. Imported CBU EVs face tiered FED: 0% up to Rs. 20M, 30% for Rs. 20–30M, 40% above Rs. 30M. New FED applies to imported 2000cc–3000cc petrol vehicles. Islamabad token taxes increase, with value-based tax above 1000cc.',
  },
  {
    question: "What is Pakistan's defence budget for FY 2026-27?",
    answer:
      'Rs. 3 trillion is proposed for defence services (+17.65%), with Rs. 926 billion for physical assets/procurement (+39.6%). Military pensions are separate at Rs. 822 billion (+10.8%), not included in the Rs. 3T defence total.',
  },
  {
    question: 'What property tax changes are in Finance Bill 2026?',
    answer:
      'Section 7E deemed income tax on property is abolished. CVT on foreign assets is removed. Property sale WHT for filers drops to flat 2.75% and purchase WHT to 1.25%, roughly halving combined transaction costs.',
  },
  {
    question: 'When do Budget 2026-27 tax changes take effect?',
    answer:
      'Proposed measures apply from 1 July 2026 once the Finance Bill 2026 is passed by the National Assembly and notified by FBR. Until then, FY 2025-26 rates under the Finance Act 2025 remain in force.',
  },
] as const;

export const budgetComparisonFaqLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: BUDGET_COMPARISON_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const filingHowToLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to File Your Income Tax Return in Pakistan (FBR IRIS)',
  description:
    'Step-by-step guide to e-filing your income tax return in Pakistan through the FBR IRIS portal.',
  totalTime: 'PT30M',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Register on the IRIS portal',
      text: 'Visit the FBR IRIS portal, register a new account with your CNIC and complete email/SMS verification.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step1`,
    },
    {
      '@type': 'HowToStep',
      name: 'Log in and access the return form',
      text: 'Log in to IRIS, choose "File Income Tax Return", select the tax year and the correct return form for your status.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step2`,
    },
    {
      '@type': 'HowToStep',
      name: 'Fill in personal information',
      text: 'Complete all mandatory personal, contact, employment and business details.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step3`,
    },
    {
      '@type': 'HowToStep',
      name: 'Enter income details',
      text: 'Report salary, business income and other income sources along with tax already withheld.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step4`,
    },
    {
      '@type': 'HowToStep',
      name: 'Claim deductions and tax credits',
      text: 'Enter all eligible deductions and tax credits such as Zakat, donations and pension contributions.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step5`,
    },
    {
      '@type': 'HowToStep',
      name: 'Declare assets and liabilities',
      text: 'Provide complete details of your assets and liabilities to match your declared income.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step6`,
    },
    {
      '@type': 'HowToStep',
      name: 'Review, verify and submit',
      text: 'Review all entries, calculate your tax, pay any balance due and submit your return.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step7`,
    },
  ],
};

/** Builds a BreadcrumbList trail from "/" down to the current route. */
export function buildBreadcrumb(pathname: string): JsonLd {
  const segments = pathname.split('/').filter(Boolean);
  const items: JsonLd[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
  ];

  let cumulative = '';
  segments.forEach((segment, index) => {
    cumulative += `/${segment}`;
    const meta = routeMeta[cumulative];
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: meta?.breadcrumb ?? segment,
      item: absoluteUrl(cumulative),
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function buildArticle(pathname: string): JsonLd {
  const meta = routeMeta[pathname] ?? routeMeta['/'];
  const datePublished = meta.datePublished ?? meta.dateModified;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    inLanguage: 'en-PK',
    image: OG_IMAGE,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(pathname) },
    datePublished,
    dateModified: meta.dateModified,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/main-logo.png` },
    },
  };
}

/** Builds sitemap entries from the central route table. */
export function getSitemapEntries(): Array<{
  path: string;
  changeFrequency: NonNullable<RouteMeta['sitemapChangeFrequency']>;
  priority: number;
}> {
  return Object.entries(routeMeta).map(([path, meta]) => ({
    path,
    changeFrequency: meta.sitemapChangeFrequency ?? 'monthly',
    priority: meta.sitemapPriority ?? 0.5,
  }));
}

/**
 * Convenience helper that returns the JSON-LD blocks for a given route:
 * the breadcrumb trail plus an Article block for guide pages.
 */
export function routeStructuredData(pathname: string): JsonLd[] {
  const meta = routeMeta[pathname] ?? routeMeta['/'];
  const blocks: JsonLd[] = [buildBreadcrumb(pathname)];
  if (meta.isArticle) blocks.push(buildArticle(pathname));
  return blocks;
}
