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
  'salary increment after tax Pakistan',
  'job offer comparison calculator Pakistan',
  'reverse salary calculator Pakistan',
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
  'freelancer tax calculator Pakistan',
  'PSEB freelancer tax calculator',
  'Section 154A tax calculator',
  'IT export tax Pakistan',
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
  /** Route-specific keyword list; falls back to the site-wide keywords when omitted. */
  keywords?: string[];
  /**
   * When false, the document `<title>` uses `title` verbatim instead of appending
   * `| ${SITE_NAME}`. Use for routes whose title is already long enough that the brand
   * suffix would push it past the SERP truncation limit.
   */
  appendSiteName?: boolean;
  /** Treated as an article/guide for Article structured data. */
  isArticle?: boolean;
  /** Visible article headline when it differs from the search-focused document title. */
  articleHeadline?: string;
  /** Topical section used by Article structured data. */
  articleSection?: string;
  /** Date the content was first published (ISO). */
  datePublished?: string;
  /** Date the content was last reviewed/updated (ISO). */
  dateModified?: string;
  /** Route-specific Open Graph/Twitter image path. */
  socialImage?: string;
  /** Accessible description for the route-specific social image. */
  socialImageAlt?: string;
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
  /** Canonical route when this page is a utility or alternate presentation. */
  canonicalPath?: string;
  /** Set false for utility routes that should not appear in search results. */
  indexable?: boolean;
  /** Set false for routes that should be omitted from the generated sitemap. */
  includeInSitemap?: boolean;
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Pakistan Income Tax Calculator 2026-27 | Salary & FBR Tax Slabs',
    description:
      'Free Pakistan income tax calculator with the latest FBR tax slabs for FY 2026-2027. Calculate your salary tax and take-home pay, or compare fiscal years 2014 to 2027.',
    breadcrumb: 'Home',
    dateModified: '2026-07-26',
    sitemapPriority: 1.0,
    sitemapChangeFrequency: 'weekly',
  },
  '/freelancer-tax-calculator': {
    title: 'Freelancer Tax Calculator Pakistan 2026-27 | PSEB & IT Export',
    description:
      'Calculate Pakistan freelancer and IT export tax for FY 2026-27. Compare PSEB filer (0.25%), general filer (1%) and non-filer rates under Section 154A.',
    breadcrumb: 'Freelancer Tax Calculator',
    appendSiteName: false,
    keywords: [
      'freelancer tax calculator Pakistan',
      'IT export tax calculator Pakistan',
      'Section 154A tax calculator',
      'PSEB tax calculator Pakistan',
      'IT exporter tax Pakistan 2026-27',
      'freelance income tax Pakistan',
      'Upwork Fiverr tax Pakistan',
      'remote worker tax calculator Pakistan',
      '0.25% IT export final tax Pakistan',
      'foreign income tax calculator Pakistan',
    ],
    datePublished: '2026-07-24',
    dateModified: '2026-07-26',
    socialImage: '/freelancer-tax-calculator/opengraph-image',
    socialImageAlt: 'Pakistan Freelancer Tax Calculator 2026-27 — PSEB and Section 154A rates',
    sitemapPriority: 0.9,
    sitemapChangeFrequency: 'weekly',
  },
  '/business-tax-calculator': {
    title: 'Business Tax Calculator Pakistan 2026-27 | AOP & Self-Employed',
    description:
      'Calculate Pakistan business, self-employed & AOP income tax for FY 2026-27. Non-salaried slabs, 10% surcharge & effective rate, tax years 2021-22 to 2026-27.',
    breadcrumb: 'Business Tax Calculator',
    appendSiteName: false,
    keywords: [
      'business tax calculator Pakistan',
      'AOP tax calculator Pakistan',
      'self-employed tax calculator Pakistan',
      'non-salaried income tax calculator Pakistan',
      'sole proprietor tax calculator Pakistan',
      'partnership tax calculator Pakistan',
      'business income tax calculator 2026-27',
      'AOP tax rates 2026-2027',
      'FBR non-salaried tax slabs 2026-2027',
      'professional firm tax Pakistan',
    ],
    datePublished: '2026-07-25',
    dateModified: '2026-07-26',
    socialImage: '/business-tax-calculator/opengraph-image',
    socialImageAlt: 'Pakistan Business Tax Calculator 2026-27 — non-salaried and AOP slab rates',
    sitemapPriority: 0.9,
    sitemapChangeFrequency: 'weekly',
  },
  '/salary-increment-calculator': {
    title: 'Salary Increment Calculator Pakistan 2026-27 | After Tax',
    description:
      'Calculate how much of your salary raise you keep after tax. Compare gross and take-home pay using Pakistan FBR salary slabs for FY 2026-27.',
    breadcrumb: 'Salary Increment Calculator',
    appendSiteName: false,
    keywords: [
      'salary increment calculator Pakistan',
      'salary raise calculator Pakistan',
      'salary increment after tax Pakistan',
      'salary raise take-home calculator Pakistan',
      'increment take home pay Pakistan',
      'after tax salary increase Pakistan',
      'net salary increment calculator 2026-27',
      'pay raise calculator Pakistan',
      'salary hike calculator Pakistan',
      'salary increment percentage calculator Pakistan',
    ],
    datePublished: '2026-07-26',
    dateModified: '2026-07-26',
    socialImage: '/salary-increment-calculator/opengraph-image',
    socialImageAlt:
      'Salary Increment Calculator Pakistan 2026-27 — after-tax raise and take-home comparison',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/job-offer-comparison-calculator': {
    title: 'Job Offer Comparison Calculator Pakistan 2026-27 | After Tax',
    description:
      'Compare your current job with a new offer after tax. See monthly and annual gross pay, tax and take-home differences using FY 2026-27 FBR salary slabs.',
    breadcrumb: 'Job Offer Comparison Calculator',
    appendSiteName: false,
    keywords: [
      'job offer comparison calculator Pakistan',
      'compare job offers Pakistan',
      'after tax job offer calculator Pakistan',
      'job offer salary comparison Pakistan',
      'current salary vs new offer Pakistan',
      'net salary job offer calculator Pakistan',
      'salary package comparison Pakistan',
      'compare job offers salary Pakistan',
      'salary negotiation calculator Pakistan',
    ],
    datePublished: '2026-07-26',
    dateModified: '2026-07-26',
    socialImage: '/job-offer-comparison-calculator/opengraph-image',
    socialImageAlt:
      'Job Offer Comparison Calculator Pakistan 2026-27 — compare salary, tax and take-home pay',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/reverse-salary-calculator': {
    title: 'Reverse Salary Calculator Pakistan 2026-27 | Gross from Net',
    description:
      'Enter your desired monthly take-home pay to find the gross salary needed before tax using FBR salary slabs for FY 2026-27. Free, private and instant.',
    breadcrumb: 'Reverse Salary Calculator',
    appendSiteName: false,
    keywords: [
      'reverse salary calculator Pakistan',
      'gross salary from take home Pakistan',
      'net to gross salary calculator Pakistan',
      'required gross salary calculator Pakistan',
      'take home to gross salary Pakistan',
      'reverse income tax calculator Pakistan 2026-27',
      'desired take home pay calculator Pakistan',
      'salary before tax calculator Pakistan',
    ],
    datePublished: '2026-07-26',
    dateModified: '2026-07-26',
    socialImage: '/reverse-salary-calculator/opengraph-image',
    socialImageAlt:
      'Reverse Salary Calculator Pakistan 2026-27 — gross salary from target take-home pay',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/embed/salary-tax': {
    title: 'Embeddable Pakistan Salary Tax Calculator',
    description:
      'A compact Pakistan salary tax calculator widget using the latest FBR salary slabs.',
    breadcrumb: 'Embeddable Salary Tax Calculator',
    appendSiteName: false,
    canonicalPath: '/',
    indexable: false,
    includeInSitemap: false,
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
    title: 'Pakistan Tax Guides 2026-27 | FBR Filing & Tax Help',
    description:
      'Practical Pakistan tax guides for FY 2026-27: understand FBR salary slabs, deductions and credits, filing duties, ATL and how to file in IRIS.',
    breadcrumb: 'Tax Guides',
    appendSiteName: false,
    keywords: [
      'Pakistan tax guide 2026-27',
      'FBR tax guide Pakistan',
      'income tax Pakistan',
      'how to file tax return Pakistan',
      'tax deductions Pakistan',
    ],
    dateModified: '2026-07-28',
    socialImage: '/tax-guides/opengraph-image',
    socialImageAlt: 'Pakistan tax guides for FY 2026-27 covering FBR filing, tax slabs and reliefs',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-guides/understanding-tax-system': {
    title: 'Pakistan Income Tax Slabs 2026-27 | Complete FBR Guide',
    description:
      "Understand Pakistan's income tax system for FY 2026-27: eight salary tax slabs, tax year and residency rules, income heads, filing duties and records.",
    breadcrumb: "Understanding Pakistan's Tax System",
    appendSiteName: false,
    keywords: [
      'Pakistan income tax slabs 2026-27',
      'FBR salary tax slabs',
      'Pakistan income tax system',
      'tax year 2027 Pakistan',
      'who must file tax return Pakistan',
    ],
    isArticle: true,
    articleHeadline: 'Pakistan Income Tax System & Salary Tax Slabs',
    articleSection: 'Pakistan income tax fundamentals',
    datePublished: LAST_UPDATED,
    dateModified: '2026-07-28',
    socialImage: '/tax-guides/understanding-tax-system/opengraph-image',
    socialImageAlt: 'Pakistan income tax system and salary tax slabs for fiscal year 2026-27',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-guides/deductions-credits': {
    title: 'Tax Deductions & Credits in Pakistan | 2026-27 Guide',
    description:
      'Learn how Pakistan tax deductions and credits work for FY 2026-27, including Zakat, donations, pension contributions, education relief and records.',
    breadcrumb: 'Tax Deductions & Credits',
    appendSiteName: false,
    keywords: [
      'tax deductions Pakistan',
      'tax credits Pakistan',
      'Zakat deduction Pakistan income tax',
      'donation tax credit Pakistan',
      'pension tax credit Pakistan',
    ],
    isArticle: true,
    articleHeadline: 'Tax Deductions & Credits in Pakistan',
    articleSection: 'Pakistan tax deductions and credits',
    datePublished: LAST_UPDATED,
    dateModified: '2026-07-28',
    socialImage: '/tax-guides/deductions-credits/opengraph-image',
    socialImageAlt: 'Tax deductions and credits in Pakistan for fiscal year 2026-27',
    sitemapPriority: 0.7,
    sitemapChangeFrequency: 'monthly',
  },
  '/tax-guides/filing-tax-return': {
    title: 'How to File Income Tax Return in Pakistan | FBR IRIS Guide',
    description:
      'Follow the FBR IRIS process to file an income tax return in Pakistan: deadlines, documents, seven filing steps, wealth reconciliation, payment and ATL.',
    breadcrumb: 'Filing Your Tax Return',
    appendSiteName: false,
    keywords: [
      'how to file income tax return Pakistan',
      'FBR IRIS filing guide',
      'income tax return deadline Pakistan',
      'wealth statement IRIS',
      'ATL status Pakistan',
    ],
    isArticle: true,
    articleHeadline: 'How to File an Income Tax Return in Pakistan',
    articleSection: 'Pakistan income tax return filing',
    datePublished: LAST_UPDATED,
    dateModified: '2026-07-28',
    socialImage: '/tax-guides/filing-tax-return/opengraph-image',
    socialImageAlt: 'How to file an income tax return in Pakistan through FBR IRIS',
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

function getPageTitle(pathname: string, meta: RouteMeta): string {
  const { title } = meta;
  if (pathname === '/') {
    return title;
  }
  if (meta.appendSiteName === false || title.includes(SITE_NAME)) {
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
  const canonicalUrl = absoluteUrl(meta.canonicalPath ?? pathname);
  const socialImage = meta.socialImage ? absoluteUrl(meta.socialImage) : OG_IMAGE;
  const socialImageAlt = meta.socialImageAlt ?? `${meta.title} — ${SITE_NAME}`;
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
        url: socialImage,
        width: 1200,
        height: 630,
        alt: socialImageAlt,
      },
    ],
    ...(meta.isArticle && published && modified
      ? { publishedTime: published, modifiedTime: modified }
      : {}),
  };

  return {
    title: {
      absolute: getPageTitle(pathname, meta),
    },
    description: meta.description,
    ...(meta.keywords ? { keywords: meta.keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    ...(meta.indexable === false ? { robots: { index: false, follow: true } } : {}),
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [{ url: socialImage, alt: socialImageAlt, width: 1200, height: 630 }],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD)                                          */
/* ------------------------------------------------------------------ */

export const organizationLd: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
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
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: 'Pakistan Income Tax Calculator',
  url: `${SITE_URL}/`,
  inLanguage: 'en-PK',
  publisher: { '@id': `${SITE_URL}/#organization` },
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
      'Yes for PSEB-registered IT exporters: the 0.25% Final Tax Regime is extended to 30 June 2029. Other qualifying IT and IT-enabled export receipts use the 1% general filer rate under Section 154A, while local or non-qualifying income follows the applicable business-income rules.',
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
  '@id': `${SITE_URL}/tax-guides/filing-tax-return#how-to`,
  name: 'How to File Your Income Tax Return in Pakistan (FBR IRIS)',
  description:
    'Step-by-step guide to e-filing your income tax return in Pakistan through the FBR IRIS portal.',
  url: `${SITE_URL}/tax-guides/filing-tax-return`,
  inLanguage: 'en-PK',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Sign in and choose the tax year',
      text: 'Log in to IRIS, choose the correct tax year and verify your personal details.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step1`,
    },
    {
      '@type': 'HowToStep',
      name: 'Open the income tax return',
      text: 'Select the applicable return for your taxpayer type and start a new return.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step2`,
    },
    {
      '@type': 'HowToStep',
      name: 'Report every source of income',
      text: 'Declare salary, business, property, capital gains and other income that applies.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step3`,
    },
    {
      '@type': 'HowToStep',
      name: 'Enter deductions, credits and tax withheld',
      text: 'Claim eligible relief and reconcile each withholding entry with your evidence.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step4`,
    },
    {
      '@type': 'HowToStep',
      name: 'Complete assets, liabilities and wealth reconciliation',
      text: 'Complete the wealth statement and explain the movement in your closing wealth.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step5`,
    },
    {
      '@type': 'HowToStep',
      name: 'Review tax payable and create payment if needed',
      text: 'Review IRIS calculations and create the required payment before submission.',
      url: `${SITE_URL}/tax-guides/filing-tax-return#step6`,
    },
    {
      '@type': 'HowToStep',
      name: 'Submit and save the acknowledgements',
      text: 'Submit the return and wealth statement, then download proof of completion.',
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
  const socialImage = absoluteUrl(meta.socialImage ?? '/og-image.png');
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteUrl(pathname)}#article`,
    url: absoluteUrl(pathname),
    headline: meta.articleHeadline ?? meta.title,
    description: meta.description,
    inLanguage: 'en-PK',
    image: socialImage,
    thumbnailUrl: socialImage,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(pathname) },
    datePublished,
    dateModified: meta.dateModified,
    ...(meta.articleSection ? { articleSection: meta.articleSection } : {}),
    ...(meta.keywords ? { keywords: meta.keywords.join(', ') } : {}),
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/main-logo.png` },
    },
  };
}

export function buildTaxGuidesCollection(): JsonLd {
  const pathname = '/tax-guides';
  const meta = routeMeta[pathname];
  const guidePaths = [
    '/tax-guides/understanding-tax-system',
    '/tax-guides/deductions-credits',
    '/tax-guides/filing-tax-return',
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(pathname)}#collection`,
    url: absoluteUrl(pathname),
    name: meta.title,
    description: meta.description,
    inLanguage: 'en-PK',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guidePaths.length,
      itemListElement: guidePaths.map((path, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: routeMeta[path].articleHeadline ?? routeMeta[path].title,
        url: absoluteUrl(path),
      })),
    },
  };
}

/** Builds sitemap entries from the central route table. */
export function getSitemapEntries(): Array<{
  path: string;
  lastModified: string;
  changeFrequency: NonNullable<RouteMeta['sitemapChangeFrequency']>;
  priority: number;
}> {
  return Object.entries(routeMeta)
    .filter(([, meta]) => meta.includeInSitemap !== false)
    .map(([path, meta]) => ({
      path,
      lastModified: meta.dateModified ?? LAST_UPDATED,
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
  if (pathname === '/tax-guides') blocks.push(buildTaxGuidesCollection());
  if (meta.isArticle) blocks.push(buildArticle(pathname));
  return blocks;
}
