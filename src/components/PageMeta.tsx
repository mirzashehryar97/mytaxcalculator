import { useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

const SITE_URL = 'https://www.mytaxcalculator.pk';

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Pakistan Income Tax Calculator 2026-27 | FBR Tax Slabs FY 2026-2027',
    description:
      'Free Pakistan income tax calculator with latest FBR tax slabs for FY 2026-2027. Calculate salary tax for 2026-27 or compare across fiscal years 2014 to 2027.',
  },
  '/about': {
    title: 'About My Tax Calculator | Pakistan Income Tax Tool',
    description:
      'Learn about My Tax Calculator — a free, privacy-focused Pakistan income tax calculator updated with FBR tax slabs through FY 2026-2027.',
  },
  '/tax-guides': {
    title: 'Pakistan Tax Guides & Resources | FBR Filing Help',
    description:
      'Pakistani tax guides covering income tax slabs, deductions, credits, and how to file your return with FBR. Updated for FY 2026-2027.',
  },
  '/tax-guides/understanding-tax-system': {
    title: 'Pakistan Income Tax Slabs FY 2026-2027 | Tax System Guide',
    description:
      'Complete guide to Pakistan\'s income tax system with current FBR tax slabs for FY 2026-2027, filing requirements, and important deadlines.',
  },
  '/tax-guides/deductions-credits': {
    title: 'Pakistan Tax Deductions & Credits | Reduce Your Tax',
    description:
      'Learn about tax deductions and credits available to Pakistani taxpayers to reduce your income tax liability.',
  },
  '/tax-guides/filing-tax-return': {
    title: 'How to File Income Tax Return in Pakistan | FBR IRIS Guide',
    description:
      'Step-by-step guide to filing your income tax return in Pakistan through the FBR IRIS portal.',
  },
};

export default function PageMeta() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] ?? pageMeta['/'];
  const url = pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;

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
    </Head>
  );
}
