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
  '/rental-income-tax-calculator': {
    title: 'Rental Income Tax Calculator Pakistan 2026-27 | Tax on Rent',
    description:
      'Calculate Pakistan rental income tax for FY 2026-27. See the Section 155 tax your tenant deducts from rent, filer vs non-filer rates and company rates.',
    breadcrumb: 'Rental Income Tax Calculator',
    appendSiteName: false,
    keywords: [
      'rental income tax calculator Pakistan',
      'tax on rental income Pakistan',
      'Section 155 tax calculator',
      'property rent tax calculator Pakistan',
      'rent withholding tax Pakistan 2026-27',
      'landlord tax calculator Pakistan',
      'rental income tax rates Pakistan 2026-2027',
      'FBR rent tax slabs',
      'non filer rent tax Pakistan',
      'commercial property rent tax Pakistan',
    ],
    datePublished: '2026-07-29',
    dateModified: '2026-07-29',
    socialImage: '/rental-income-tax-calculator/opengraph-image',
    socialImageAlt:
      'Pakistan Rental Income Tax Calculator 2026-27 — Section 155 rent rates for landlords',
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
      'Learn how My Tax Calculator turns official FBR rules into free, private calculators for salary, freelance, business and rental income in Pakistan.',
    breadcrumb: 'About Us',
    keywords: [
      'about My Tax Calculator',
      'Pakistan income tax calculator',
      'FBR tax calculator Pakistan',
      'free tax calculator Pakistan',
      'privacy-first tax calculator',
    ],
    dateModified: '2026-07-29',
    socialImage: '/about/opengraph-image',
    socialImageAlt:
      'About My Tax Calculator — free Pakistan tax calculators built on official FBR sources',
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
    title: 'Pakistan Income Tax 2026-27 | Simple FBR Guide',
    description:
      'A simple guide to Pakistan income tax for 2026-27: salary tax rates, how tax bands work, who may need to file and which records to keep.',
    breadcrumb: "Pakistan's Tax System, Explained",
    appendSiteName: false,
    keywords: [
      'Pakistan income tax slabs 2026-27',
      'FBR salary tax slabs',
      'Pakistan income tax system',
      'tax year 2027 Pakistan',
      'who must file tax return Pakistan',
    ],
    isArticle: true,
    articleHeadline: 'Pakistan Income Tax and Salary Rates, Explained Simply',
    articleSection: 'Pakistan income tax basics',
    datePublished: LAST_UPDATED,
    dateModified: '2026-07-28',
    socialImage: '/tax-guides/understanding-tax-system/opengraph-image',
    socialImageAlt: 'A simple guide to Pakistan income tax and salary rates for 2026-27',
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
    title: 'Pakistan Budget 2025-26 vs 2026-27 | Enacted Finance Act Comparison',
    description:
      'Verified FY 2025-26 vs 2026-27 Pakistan budget comparison covering enacted salary tax, freelancer, business, property, vehicle, solar and defence changes.',
    breadcrumb: 'Budget 2025-26 vs 2026-27',
    appendSiteName: false,
    keywords: [
      'Pakistan budget 2025-26 vs 2026-27',
      'Finance Act 2026 Pakistan',
      'Pakistan budget 2026-27 tax changes',
      'salary tax slabs FY 2026-27 Pakistan',
      'salaried surcharge abolished Pakistan',
      'Pakistan federal budget comparison',
      'FBR budget 2026-27 salient features',
      'Pakistan budget 2026-27 sector comparison',
      'budget 2026-27 property freelancer vehicle solar tax',
      'Pakistan defence budget 2026-27',
    ],
    isArticle: true,
    articleHeadline: 'Pakistan Budget 2025–26 vs 2026–27',
    articleSection: 'Pakistan Budget 2026–27 comparison',
    datePublished: LAST_UPDATED,
    dateModified: '2026-07-28',
    socialImage: '/budget-2025-26-vs-2026-27/opengraph-image',
    socialImageAlt:
      'Pakistan Budget 2025-26 vs 2026-27 comparison covering salary, freelancer, property, vehicle, solar and defence changes',
    sitemapPriority: 0.9,
    sitemapChangeFrequency: 'weekly',
  },
  '/budget-2025-26-vs-2026-27/freelancers-it': {
    title: 'Pakistan Freelancer & IT Tax Changes 2026-27 | Budget Comparison',
    description:
      'Compare enacted Pakistan freelancer and IT tax changes for FY 2026-27: PSEB 0.25%, Section 154A, foreign-card tax, creator WHT and export collection.',
    breadcrumb: 'Freelancers & IT',
    appendSiteName: false,
    keywords: [
      'Pakistan budget 2026-27 freelancer tax',
      'IT exporter tax Pakistan 2026-27',
      'PSEB 0.25% tax Tax Year 2029',
      'Section 154A rate Pakistan 2026',
      'Section 154B social media tax Pakistan',
      'foreign card advance tax Pakistan 0.5%',
      'freelancer tax changes Pakistan Finance Act 2026',
      'IT export tax FY 2025-26 vs 2026-27',
    ],
    isArticle: true,
    articleHeadline: 'Freelancers & IT: Pakistan Budget 2025–26 vs 2026–27',
    articleSection: 'Pakistan Budget 2026–27 sector comparison',
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    socialImage: '/budget-2025-26-vs-2026-27/freelancers-it/opengraph-image',
    socialImageAlt:
      'Pakistan freelancer and IT tax changes in Budget 2026-27, including PSEB and Section 154A rates',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/budget-2025-26-vs-2026-27/business-super-tax': {
    title: 'Pakistan Business & Super Tax Changes 2026-27 | Budget Comparison',
    description:
      'Compare enacted Pakistan business and super-tax changes for FY 2026-27: Section 4C relief up to PKR 500M, 8% above, company rates and distributor minimum tax.',
    breadcrumb: 'Business & Super Tax',
    appendSiteName: false,
    keywords: [
      'Pakistan budget 2026-27 business tax',
      'Pakistan super tax 2026-27',
      'Section 4C super tax Pakistan',
      'super tax PKR 500 million Pakistan',
      'company tax rate Pakistan 2026-27',
      'AOP tax rate Pakistan 2026-27',
      'distributor minimum tax Pakistan 0.5%',
      'Finance Act 2026 business tax changes',
    ],
    isArticle: true,
    articleHeadline: 'Business & Super Tax: Pakistan Budget 2025–26 vs 2026–27',
    articleSection: 'Pakistan Budget 2026–27 sector comparison',
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    socialImage: '/budget-2025-26-vs-2026-27/business-super-tax/opengraph-image',
    socialImageAlt:
      'Pakistan business and super-tax changes in Budget 2026-27, including Section 4C rates',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/budget-2025-26-vs-2026-27/property': {
    title: 'Pakistan Property Tax Changes 2026-27 | Budget Comparison',
    description:
      'Compare enacted Pakistan property tax changes for FY 2026-27: Section 7E omitted, ATL sale WHT 2.75%, purchase WHT 1.25%, non-ATL rates and CVT relief.',
    breadcrumb: 'Property',
    appendSiteName: false,
    keywords: [
      'Pakistan property tax changes 2026-27',
      'Section 7E abolished Pakistan',
      'Section 236C rate 2026-27',
      'Section 236K rate 2026-27',
      'property sale tax Pakistan 2.75%',
      'property purchase tax Pakistan 1.25%',
      'non filer property tax Pakistan 2026-27',
      'foreign asset CVT abolished Pakistan',
      'Finance Act 2026 property tax changes',
    ],
    isArticle: true,
    articleHeadline: 'Property: Pakistan Budget 2025–26 vs 2026–27',
    articleSection: 'Pakistan Budget 2026–27 sector comparison',
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    socialImage: '/budget-2025-26-vs-2026-27/property/opengraph-image',
    socialImageAlt:
      'Pakistan property tax changes in Budget 2026-27, including Sections 7E, 236C and 236K',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/budget-2025-26-vs-2026-27/vehicles': {
    title: 'Pakistan Vehicle Tax Changes 2026-27 | Budget Comparison',
    description:
      'Compare enacted Pakistan vehicle tax changes for FY 2026-27: imported EV FED bands, special excise duty, ICT motor tax, EV concessions and Section 231B.',
    breadcrumb: 'Vehicles',
    appendSiteName: false,
    keywords: [
      'Pakistan vehicle tax changes 2026-27',
      'Pakistan budget 2026-27 car tax',
      'electric vehicle FED Pakistan 2026',
      'imported EV tax Pakistan USD 75000',
      'special excise duty imported cars Pakistan',
      'ICT motor vehicle tax 2026-27',
      'Section 231B vehicle tax Pakistan 2026',
      'Finance Act 2026 vehicle tax changes',
    ],
    isArticle: true,
    articleHeadline: 'Vehicles: Pakistan Budget 2025–26 vs 2026–27',
    articleSection: 'Pakistan Budget 2026–27 sector comparison',
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    socialImage: '/budget-2025-26-vs-2026-27/vehicles/opengraph-image',
    socialImageAlt:
      'Pakistan vehicle tax changes in Budget 2026-27, including imported EV FED and ICT motor tax',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/budget-2025-26-vs-2026-27/solar': {
    title: 'Pakistan Solar Tax Changes 2026-27 | Budget Comparison',
    description:
      'Compare Pakistan solar tax treatment for FY 2026-27: the 10% sales-tax rate on solar panels and PV modules continues with no Finance Act 2026 increase.',
    breadcrumb: 'Solar',
    appendSiteName: false,
    keywords: [
      'Pakistan solar tax 2026-27',
      'solar panel sales tax Pakistan 10%',
      'Pakistan budget 2026-27 solar panels',
      'PV module tax Pakistan',
      'solar panel tax exemption Pakistan',
      'Finance Act 2026 solar tax',
      'solar sales tax FY 2025-26 vs 2026-27',
      'FBR solar panel tax rate',
    ],
    isArticle: true,
    articleHeadline: 'Solar: Pakistan Budget 2025–26 vs 2026–27',
    articleSection: 'Pakistan Budget 2026–27 sector comparison',
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    socialImage: '/budget-2025-26-vs-2026-27/solar/opengraph-image',
    socialImageAlt:
      'Pakistan solar-panel sales-tax treatment in Budget 2026-27, including the continuing 10 percent rate',
    sitemapPriority: 0.8,
    sitemapChangeFrequency: 'weekly',
  },
  '/budget-2025-26-vs-2026-27/defence': {
    title: 'Pakistan Defence Budget 2026-27 | Budget Comparison',
    description:
      'Compare Pakistan defence Budget Estimates for FY 2025-26 and 2026-27: PKR 3.0T defence services, expenditure heads and separately budgeted pensions.',
    breadcrumb: 'Defence',
    appendSiteName: false,
    keywords: [
      'Pakistan defence budget 2026-27',
      'Pakistan military budget 2026',
      'defence services PKR 3 trillion',
      'Pakistan military pensions 2026-27',
      'Pakistan defence expenditure breakdown',
      'Pakistan defence physical assets budget',
      'defence budget FY 2025-26 vs 2026-27',
      'Finance Division Pakistan defence budget',
    ],
    isArticle: true,
    articleHeadline: 'Defence: Pakistan Budget 2025–26 vs 2026–27',
    articleSection: 'Pakistan Budget 2026–27 sector comparison',
    datePublished: '2026-07-28',
    dateModified: '2026-07-28',
    socialImage: '/budget-2025-26-vs-2026-27/defence/opengraph-image',
    socialImageAlt:
      'Pakistan defence Budget Estimates for FY 2026-27, including defence services and military pensions',
    sitemapPriority: 0.8,
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
    question: 'When do these budget changes take effect?',
    answer:
      'The Finance Act 2026 received assent on 26 June 2026. Its income-tax and budget measures generally apply from 1 July 2026 for FY 2026-27, subject to the commencement wording of each provision.',
  },
  {
    question: 'Who should file an income tax return under the new rules?',
    answer:
      'The Finance Act changes rates and some treatments, but filing depends on the Income Tax Ordinance requirements for your income, assets, registration and other circumstances. Check current FBR rules or obtain professional advice for your filing position.',
  },
  {
    question: 'How do I calculate my salary tax under the new slabs?',
    answer:
      'Apply the FY 2026-27 progressive salaried rates to annual taxable salary: 0% up to PKR 600,000, then marginal rates of 1%, 11%, 20%, 25%, 29%, 32% and 35%. Use the salary calculator for an automatic annual and monthly estimate.',
  },
  {
    question: 'Where can I find the official budget documents?',
    answer:
      'Use the official Finance Act 2026 and Salient Features published by FBR, together with the Budget in Brief and Annual Budget Statement published by the Finance Division. The source links on this page go directly to those documents.',
  },
  {
    question: 'What are the main enacted changes in Budget 2026-27?',
    answer:
      'The enacted changes include lower middle-income salary rates and abolition of the salaried surcharge, repeal of Section 7E, lower property transfer withholding, extension of the 0.25% PSEB export rate, super-tax relief for most persons up to PKR 500 million, new social-media withholding, revised vehicle levies and a PKR 3 trillion defence-services allocation.',
  },
  {
    question: 'Do freelancers and IT exporters get tax relief?',
    answer:
      'The 0.25% rate for qualifying PSEB-registered IT and IT-enabled services exporters is extended through Tax Year 2029. The general ATL collection rate under Section 154A remains 1%, while non-ATL rates remain higher.',
  },
  {
    question: 'What property tax changes were enacted?',
    answer:
      'Section 7E was omitted. For ATL persons, advance tax on property sales under Section 236C is 2.75% and advance tax on purchases under Section 236K is 1.25%. The late-filer property category was also removed.',
  },
  {
    question: "What is Pakistan's defence budget for FY 2026-27?",
    answer:
      'The FY 2026-27 budget estimates allocate PKR 3 trillion to defence services, up from PKR 2.55 trillion. Military pensions are budgeted separately at PKR 822 billion and are not included in the PKR 3 trillion figure.',
  },
] as const;

/**
 * Builds FAQPage structured data. Only pass questions that are actually rendered
 * on the page — Google requires the schema to mirror visible content.
 */
export function buildFaqLd(faqs: readonly { question: string; answer: string }[]): JsonLd {
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

export const budgetComparisonFaqLd: JsonLd = buildFaqLd(BUDGET_COMPARISON_FAQS);

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

/**
 * `AboutPage` node for /about. Naming the site Organization as the page's main
 * entity is what lets search engines attribute every calculator and guide (whose
 * Article schema already points its author at /about) to a publisher.
 */
export function buildAboutPage(): JsonLd {
  const pathname = '/about';
  const meta = routeMeta[pathname];

  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absoluteUrl(pathname)}#webpage`,
    url: absoluteUrl(pathname),
    name: meta.title,
    description: meta.description,
    inLanguage: 'en-PK',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    primaryImageOfPage: absoluteUrl(meta.socialImage ?? '/og-image.png'),
    ...(meta.dateModified ? { dateModified: meta.dateModified } : {}),
    mainEntity: { '@id': `${SITE_URL}/#organization` },
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

/** Sector deep-dives linked from the budget comparison hub. */
const BUDGET_SECTOR_PATHS = [
  '/budget-2025-26-vs-2026-27/freelancers-it',
  '/budget-2025-26-vs-2026-27/business-super-tax',
  '/budget-2025-26-vs-2026-27/property',
  '/budget-2025-26-vs-2026-27/vehicles',
  '/budget-2025-26-vs-2026-27/solar',
  '/budget-2025-26-vs-2026-27/defence',
];

/** Advertises the sector deep-dives that the budget hub links to. */
export function buildBudgetSectorList(): JsonLd {
  const pathname = '/budget-2025-26-vs-2026-27';

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(pathname)}#sectors`,
    name: 'Pakistan Budget 2025–26 vs 2026–27 sector comparisons',
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: BUDGET_SECTOR_PATHS.length,
    itemListElement: BUDGET_SECTOR_PATHS.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: routeMeta[path].articleHeadline ?? routeMeta[path].title,
      url: absoluteUrl(path),
    })),
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
  if (pathname === '/about') blocks.push(buildAboutPage());
  if (pathname === '/tax-guides') blocks.push(buildTaxGuidesCollection());
  if (pathname === '/budget-2025-26-vs-2026-27') blocks.push(buildBudgetSectorList());
  if (meta.isArticle) blocks.push(buildArticle(pathname));
  return blocks;
}
