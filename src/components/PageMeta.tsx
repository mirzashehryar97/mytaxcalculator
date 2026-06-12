import { useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

const SITE_URL = 'https://www.mytaxcalculator.pk';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type JsonLd = Record<string, unknown>;

interface RouteMeta {
  title: string;
  description: string;
  /** Human-readable label used to build the breadcrumb trail. */
  breadcrumb: string;
  /** Treated as an article/guide for Article structured data. */
  isArticle?: boolean;
  /** Date the content was last reviewed/updated (ISO). */
  dateModified?: string;
  /** Extra page-specific JSON-LD blocks (FAQ, HowTo, WebApplication, ...). */
  structuredData?: JsonLd[];
}

const LAST_UPDATED = '2026-06-12';

const homeStructuredData: JsonLd[] = [
  {
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
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the income tax slabs in Pakistan for FY 2026-2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "For FY 2026-2027, Pakistan's salaried income tax slabs are: 0% up to PKR 600,000; 1% on PKR 600,001–1,200,000; 11% on PKR 1,200,001–2,200,000; 20% on PKR 2,200,001–3,200,000; 25% on PKR 3,200,001–4,100,000; 29% on PKR 4,100,001–5,600,000; 32% on PKR 5,600,001–7,000,000; and 35% above PKR 7,000,001.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate income tax on my salary in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enter your monthly or annual salary, select the fiscal year (e.g. FY 2026-2027), and the calculator applies the progressive FBR tax slabs to compute your total tax liability, monthly tax, and take-home salary.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much tax will I pay on my salary in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your salary tax depends on your annual income and the FBR slab it falls into. For FY 2026-2027, income up to PKR 600,000 is tax-free, then progressive rates from 1% up to 35% apply. Enter your monthly salary to see exactly how much income tax you will pay each month and per year.',
        },
      },
      {
        '@type': 'Question',
        name: 'What will my take-home salary be after tax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your take-home (net) salary is your gross salary minus income tax. The calculator instantly shows your monthly and yearly take-home pay after applying the latest FBR tax slabs, so you know exactly what lands in your account.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I compare tax across multiple years in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. My Tax Calculator supports multi-year calculations from FY 2014-2015 through FY 2026-2027, with automatic fiscal year detection for job changes and partial employment periods.',
        },
      },
    ],
  },
];

const filingHowTo: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to File Your Income Tax Return in Pakistan (FBR IRIS)',
  description:
    'Step-by-step guide to e-filing your income tax return in Pakistan through the FBR IRIS portal.',
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', name: 'Register on the IRIS portal', text: 'Visit the FBR IRIS portal, register a new account with your CNIC and complete email/SMS verification.', url: `${SITE_URL}/tax-guides/filing-tax-return#step1` },
    { '@type': 'HowToStep', name: 'Log in and access the return form', text: 'Log in to IRIS, choose "File Income Tax Return", select the tax year and the correct return form for your status.', url: `${SITE_URL}/tax-guides/filing-tax-return#step2` },
    { '@type': 'HowToStep', name: 'Fill in personal information', text: 'Complete all mandatory personal, contact, employment and business details.', url: `${SITE_URL}/tax-guides/filing-tax-return#step3` },
    { '@type': 'HowToStep', name: 'Enter income details', text: 'Report salary, business income and other income sources along with tax already withheld.', url: `${SITE_URL}/tax-guides/filing-tax-return#step4` },
    { '@type': 'HowToStep', name: 'Claim deductions and tax credits', text: 'Enter all eligible deductions and tax credits such as Zakat, donations and pension contributions.', url: `${SITE_URL}/tax-guides/filing-tax-return#step5` },
    { '@type': 'HowToStep', name: 'Declare assets and liabilities', text: 'Provide complete details of your assets and liabilities to match your declared income.', url: `${SITE_URL}/tax-guides/filing-tax-return#step6` },
    { '@type': 'HowToStep', name: 'Review, verify and submit', text: 'Review all entries, calculate your tax, pay any balance due and submit your return.', url: `${SITE_URL}/tax-guides/filing-tax-return#step7` },
  ],
};

const pageMeta: Record<string, RouteMeta> = {
  '/': {
    title: 'Pakistan Income Tax Calculator 2026-27 | Salary & FBR Tax Slabs',
    description:
      'Free Pakistan income tax calculator with the latest FBR tax slabs for FY 2026-2027. Calculate your salary tax and take-home pay, or compare fiscal years 2014 to 2027.',
    breadcrumb: 'Home',
    structuredData: homeStructuredData,
  },
  '/about': {
    title: 'About My Tax Calculator | Pakistan Income Tax Tool',
    description:
      'Learn about My Tax Calculator — a free, privacy-focused Pakistan income tax calculator updated with FBR tax slabs through FY 2026-2027.',
    breadcrumb: 'About',
  },
  '/tax-guides': {
    title: 'Pakistan Tax Guides & Resources | FBR Filing Help',
    description:
      'Pakistani tax guides covering income tax slabs, deductions, credits, and how to file your return with FBR. Updated for FY 2026-2027.',
    breadcrumb: 'Tax Guides',
  },
  '/tax-guides/understanding-tax-system': {
    title: 'Pakistan Income Tax Slabs FY 2026-2027 | Tax System Guide',
    description:
      "Complete guide to Pakistan's income tax system with current FBR tax slabs for FY 2026-2027, filing requirements, and important deadlines.",
    breadcrumb: "Understanding Pakistan's Tax System",
    isArticle: true,
    dateModified: LAST_UPDATED,
  },
  '/tax-guides/deductions-credits': {
    title: 'Pakistan Tax Deductions & Credits | Reduce Your Tax',
    description:
      'Learn about tax deductions and credits available to Pakistani taxpayers to reduce your income tax liability.',
    breadcrumb: 'Tax Deductions & Credits',
    isArticle: true,
    dateModified: LAST_UPDATED,
  },
  '/tax-guides/filing-tax-return': {
    title: 'How to File Income Tax Return in Pakistan | FBR IRIS Guide',
    description:
      'Step-by-step guide to filing your income tax return in Pakistan through the FBR IRIS portal.',
    breadcrumb: 'Filing Your Tax Return',
    isArticle: true,
    dateModified: LAST_UPDATED,
    structuredData: [filingHowTo],
  },
  '/tax-news': {
    title: 'Pakistan Tax News & Updates 2026-2027 | FBR Announcements',
    description:
      'Latest Pakistan tax news and updates: FBR income tax slabs for FY 2026-2027, filing deadlines, deductions and tax planning tips.',
    breadcrumb: 'Tax News',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | My Tax Calculator',
    description:
      'Read the privacy policy for My Tax Calculator. All tax calculations run locally in your browser — we do not store your salary or personal data.',
    breadcrumb: 'Privacy Policy',
  },
  '/terms-of-service': {
    title: 'Terms of Service | My Tax Calculator',
    description:
      'The terms of service for using My Tax Calculator, a free Pakistan income tax calculator and guide. For estimation purposes only — not professional tax advice.',
    breadcrumb: 'Terms of Service',
  },
};

function absoluteUrl(pathname: string) {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
}

/** Builds a BreadcrumbList trail from "/" down to the current route. */
function buildBreadcrumb(pathname: string): JsonLd {
  const segments = pathname.split('/').filter(Boolean);
  const items: JsonLd[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
  ];

  let cumulative = '';
  segments.forEach((segment, index) => {
    cumulative += `/${segment}`;
    const meta = pageMeta[cumulative];
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

function buildArticle(meta: RouteMeta, url: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.breadcrumb,
    description: meta.description,
    inLanguage: 'en-PK',
    image: OG_IMAGE,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    dateModified: meta.dateModified,
    author: { '@type': 'Organization', name: 'My Tax Calculator' },
    publisher: {
      '@type': 'Organization',
      name: 'My Tax Calculator',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/main-logo.png` },
    },
  };
}

/** Escapes JSON so it can be safely embedded inside a <script> tag. */
function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function PageMeta() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] ?? pageMeta['/'];
  const url = absoluteUrl(pathname);

  const jsonLdBlocks: JsonLd[] = [buildBreadcrumb(pathname)];
  if (meta.isArticle) jsonLdBlocks.push(buildArticle(meta, url));
  if (meta.structuredData) jsonLdBlocks.push(...meta.structuredData);

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:url" content={url} />
      <link rel="canonical" href={url} />
      {jsonLdBlocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {serializeJsonLd(block)}
        </script>
      ))}
    </Head>
  );
}
