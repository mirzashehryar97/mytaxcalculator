import type { SourceLink } from '@/components/calculator/SourcesCard';

import type { ReverseSalaryFaqItem } from '@/features/reverse-salary/types';

export const REVERSE_SALARY_ROUTE = '/reverse-salary-calculator';

export const REVERSE_SALARY_PAGE_COPY = {
  eyebrow: 'Net-to-gross planning · FY 2026-27',
  title: 'Reverse Salary Calculator Pakistan 2026-27',
  subtitle: 'Enter your desired take-home pay and find the gross salary required before tax.',
} as const;

export const REVERSE_SALARY_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · FBR salary slabs',
  title: 'Reverse Salary Calculator Pakistan',
  subtitle: 'Find gross salary from your target take-home',
  features: 'Free · Monthly & annual · Fiscal years 2014–2027',
  brand: 'My Tax Calculator',
} as const;

export const REVERSE_SALARY_FORM_COPY = {
  fiscalYearLabel: 'Fiscal year',
  desiredLabel: 'Desired Monthly Take-Home Pay',
  desiredPlaceholder: '300000',
  quickPicksLabel: 'Quick picks:',
  invalidMessage: 'Enter the monthly take-home pay you want after tax.',
} as const;

export const REVERSE_SALARY_RESULT_COPY = {
  headlineLead: 'To receive',
  headlineMiddle: 'per month after tax, you need approximately',
  headlineTrail: 'gross monthly salary.',
  monthlyBreakdownTitle: 'Monthly Breakdown',
  annualBreakdownTitle: 'Annual Breakdown',
  grossRowLabel: 'Required Gross',
  taxRowLabel: 'Tax',
  netRowLabel: 'Net (Take-Home)',
  effectiveRateLabel: 'Effective Tax Rate',
  howItWorksTitle: 'How this works',
  howItWorksBody:
    'We work backwards from your desired take-home pay to the gross salary required, applying the FBR salary tax slabs for the selected fiscal year.',
} as const;

export const REVERSE_SALARY_CROSS_LINK = {
  title: 'Comparing a new job offer?',
  description:
    'Compare your current role with a new offer by salary, tax, deductions and real take-home.',
  cta: 'Compare Job Offers',
  href: '/job-offer-comparison-calculator',
} as const;

export const REVERSE_SALARY_GUIDE_COPY = {
  sourcesTitle: 'Sources used',
  sourcesDescription: 'Rates were checked against the official FBR Finance Act 2026.',
  reviewedLabel: 'Last reviewed 26 July 2026',
  reviewedDateTime: '2026-07-26',
  faqEyebrow: 'Got questions?',
  faqTitle: 'Reverse salary calculator FAQs',
  faqDescription: 'How we turn a target take-home into the gross salary you need to negotiate for.',
  estimateDisclaimer:
    'This calculator provides an estimate, not tax or financial advice. Your actual gross requirement also depends on other income, allowances, and deductions specific to your employer.',
} as const;

export const REVERSE_SALARY_METHODOLOGY_COPY = {
  eyebrow: 'Calculation method',
  title: 'How to calculate gross salary from take-home pay in Pakistan',
  description:
    'The calculator solves the usual salary-tax calculation in reverse while keeping the selected fiscal year’s progressive FBR slabs intact.',
  items: [
    {
      title: 'Set your net target',
      description:
        'Start with the monthly amount you want to receive after salary income tax, before employer-specific deductions.',
    },
    {
      title: 'Work backwards through tax',
      description:
        'The calculator searches for the smallest gross salary whose annualized after-tax income reaches your target.',
    },
    {
      title: 'Review gross and tax',
      description:
        'Use the monthly and annual breakdown to see the required gross pay, estimated tax and effective tax rate.',
    },
  ],
} as const;

export const REVERSE_SALARY_SOURCE_LINKS = [
  {
    href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
    label: 'Finance Act 2026 (FBR)',
  },
] as const satisfies readonly SourceLink[];

export const REVERSE_SALARY_FAQS = [
  {
    id: 'what-is-reverse',
    question: 'What does the reverse salary calculator do?',
    answer:
      'It works in reverse: instead of taking a gross salary and finding the tax, you enter the monthly take-home you want after tax, and it finds the gross salary you would need to earn to be left with that amount.',
  },
  {
    id: 'how-calculated',
    question: 'How is the required gross salary calculated?',
    answer:
      'We search for the gross salary whose after-tax income matches your target, applying the progressive FBR salary tax slabs for the fiscal year you select. The result is the smallest gross salary that leaves you with your desired take-home.',
  },
  {
    id: 'why-gross-higher',
    question: 'Why is the required gross so much higher than my target?',
    answer:
      'Higher salaries fall into higher tax slabs, so as your target take-home rises, a larger share of each extra rupee is lost to tax. That widening gap is why the required gross grows faster than the take-home you asked for.',
  },
  {
    id: 'deductions-allowances',
    question: 'Does this include allowances or other deductions?',
    answer:
      'No. The estimate treats your entire salary as taxable and applies only income tax. Tax-exempt allowances, provident fund, or other employer-specific deductions would change the exact gross you need.',
  },
  {
    id: 'which-years',
    question: 'Can I use an earlier fiscal year?',
    answer:
      'Yes. Choose any fiscal year from 2014-2015 through 2026-2027 and the required gross is recalculated using that year’s FBR salary slabs.',
  },
] as const satisfies readonly ReverseSalaryFaqItem[];
