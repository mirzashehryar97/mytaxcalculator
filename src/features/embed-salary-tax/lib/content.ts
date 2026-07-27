import { SITE_URL } from '@/lib/seo';

export const EMBED_SALARY_TAX_ROUTE = '/embed/salary-tax';

export const EMBED_SALARY_TAX_COPY = {
  brand: 'MyTaxCalculator.pk',
  fiscalYearBadge: 'FY 2026–27',
  title: 'Pakistan Salary Tax Calculator',
  description: 'Estimate your monthly and annual tax and take-home salary.',
  formTitle: 'Salary details',
  salaryLabel: 'Monthly gross salary',
  fiscalYearLabel: 'Fiscal year',
  resultTitle: 'Your estimated result',
  monthlyResultsTitle: 'Monthly values',
  annualResultsTitle: 'Annual values',
  grossLabel: 'Gross salary',
  taxLabel: 'Estimated tax',
  takeHomeLabel: 'Take-home',
  effectiveRateLabel: 'Effective tax rate',
  emptyResult: 'Enter a monthly salary above PKR 0 to calculate your estimated tax.',
  privacyLabel: 'Calculated privately in your browser',
  poweredBy: 'Powered by',
  fullCalculatorLink: 'View full calculator',
  embedButton: 'Embed this calculator',
  copiedButton: 'Embed code copied',
} as const;

export const EMBED_SALARY_TAX_DISCOVERY_COPY = {
  calculatorHeaderLink: 'Embed calculator',
  publisherEyebrow: 'For publishers & website owners',
  publisherTitle: 'Add our salary tax calculator to your website',
  publisherDescription:
    'Give your visitors instant Pakistan salary tax estimates with a free, privacy-friendly calculator.',
  publisherPrimaryLink: 'Get embed code',
  publisherSecondaryLink: 'View live widget',
} as const;

export const EMBED_SALARY_TAX_PUBLISHER_BENEFITS = [
  'Free to use',
  'No signup required',
  'Updates automatically',
] as const;

export const EMBED_SALARY_TAX_SNIPPET = `<iframe
  src="${SITE_URL}${EMBED_SALARY_TAX_ROUTE}"
  title="Pakistan Salary Tax Calculator"
  width="100%"
  height="760"
  loading="lazy"
  style="border:0;border-radius:16px"
></iframe>`;
