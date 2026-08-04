import {
  BadgePercent,
  Banknote,
  BarChart3,
  Briefcase,
  Building,
  Building2,
  CalendarDays,
  Car,
  Coins,
  Gift,
  Home,
  Laptop,
  LineChart,
  Monitor,
  Scale,
  ShieldCheck,
  Sprout,
  TrendingUp,
  User,
  WalletCards,
} from 'lucide-react';

import { FBR_LOGO, IRIS_LOGO } from '@/lib/officialSources';

import GuideDeductionsIcon from '@/features/tax-guides/components/icons/GuideDeductionsIcon';
import GuideFilingIcon from '@/features/tax-guides/components/icons/GuideFilingIcon';
import GuideUnderstandingIcon from '@/features/tax-guides/components/icons/GuideUnderstandingIcon';
import type {
  TaxGuideCardContent,
  TaxGuideFaqItem,
  TaxGuideResource,
  TaxGuideSearchEntry,
  TaxGuideTopic,
  TaxGuideTrustItem,
  TaxYearFact,
} from '@/features/tax-guides/types';

export const TAX_GUIDES_PAGE_COPY = {
  eyebrow: 'FBR-based · Reviewed 28 July 2026',
  title: 'Pakistan Tax Guides',
  description:
    'Practical, plain-English guidance for understanding, planning and filing taxes in Pakistan.',
  searchLabel: 'Search tax guides',
  searchPlaceholder: 'Search guides, topics or questions…',
  searchHint: 'Press Enter to open the first matching result.',
  searchNoResults: 'No matching guide found. Try “salary”, “ATL”, “IRIS” or “deductions”.',
  startTitle: 'Start here',
  startDescription: 'Three essential guides for every Pakistani taxpayer.',
  topicsTitle: 'Browse by topic',
  topicsStatus: 'Coming soon',
  snapshotTitle: 'FY 2026–27 at a glance',
  snapshotLinkLabel: 'See all eight salary tax slabs',
  questionsTitle: 'Popular questions',
  resourcesTitle: 'Official resources',
  disclaimer:
    'Educational guidance only — verify deadlines and your personal tax treatment with FBR or a qualified adviser.',
} as const;

export const TAX_GUIDES_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Pakistan tax guides · FY 2026-27',
  title: 'Understand, plan and file your Pakistan taxes',
  subtitle: 'Salary slabs · Deductions · IRIS filing',
  features: 'Official FBR sources · Plain-English guidance · Free',
  brand: 'My Tax Calculator',
} as const;

export const TAX_GUIDES_TRUST_ITEMS = [
  { id: 'finance-act', label: 'Finance Act 2026', icon: Scale },
  { id: 'official-sources', label: 'Official FBR sources', icon: ShieldCheck },
  { id: 'free', label: 'Free to use', icon: Gift },
] as const satisfies readonly TaxGuideTrustItem[];

export const ESSENTIAL_TAX_GUIDES = [
  {
    id: 'tax-system',
    title: 'Understanding Pakistan’s Tax System',
    description: 'Income heads, residency, current salary slabs and filing obligations.',
    href: '/tax-guides/understanding-tax-system',
    readingTime: '12 min read',
    icon: GuideUnderstandingIcon,
    featured: true,
  },
  {
    id: 'deductions-credits',
    title: 'Tax Deductions & Credits',
    description: 'What can reduce taxable income or tax payable, and which records to keep.',
    href: '/tax-guides/deductions-credits',
    readingTime: '10 min read',
    icon: GuideDeductionsIcon,
    featured: false,
  },
  {
    id: 'filing-return',
    title: 'Filing Your Tax Return',
    description: 'A practical IRIS walkthrough, document checklist and common mistakes.',
    href: '/tax-guides/filing-tax-return',
    readingTime: '15 min read',
    icon: GuideFilingIcon,
    featured: false,
  },
] as const satisfies readonly TaxGuideCardContent[];

export const TAX_GUIDE_TOPICS = [
  { id: 'salary', label: 'Salary', href: '/', icon: User },
  {
    id: 'filing',
    label: 'Filing & IRIS',
    href: '/tax-guides/filing-tax-return',
    icon: Monitor,
  },
  {
    id: 'reliefs',
    label: 'Tax reliefs',
    href: '/tax-guides/deductions-credits',
    icon: BadgePercent,
  },
  {
    id: 'freelancers',
    label: 'Freelancers',
    href: '/freelancer-tax-calculator',
    icon: Laptop,
  },
  {
    id: 'business',
    label: 'Business & AOP',
    href: '/business-tax-calculator',
    icon: Briefcase,
  },
  {
    id: 'companies',
    label: 'Companies',
    href: '/corporate-tax-calculator',
    icon: Building,
  },
  {
    id: 'rental',
    label: 'Rental income',
    href: '/rental-income-tax-calculator',
    icon: Building2,
  },
  {
    id: 'property',
    label: 'Buying & selling property',
    href: '/property-purchase-tax-calculator',
    icon: Home,
  },
  {
    id: 'capital-gains',
    label: 'Property capital gains',
    href: '/property-capital-gains-tax-calculator',
    icon: LineChart,
  },
  {
    id: 'investments',
    label: 'Shares & investments',
    href: '/capital-gains-tax-calculator',
    icon: Coins,
  },
  {
    id: 'vehicles',
    label: 'Vehicles',
    href: '/vehicle-tax-calculator',
    icon: Car,
  },
  {
    id: 'farming',
    label: 'Farm income',
    href: '/agricultural-income-tax-calculator',
    icon: Sprout,
  },
  {
    id: 'everyday-deductions',
    label: 'Everyday deductions',
    href: '/cash-withdrawal-tax-calculator',
    icon: Banknote,
  },
  {
    id: 'budget',
    label: 'Budget 2026',
    href: '/budget-2025-26-vs-2026-27',
    icon: BarChart3,
  },
] as const satisfies readonly TaxGuideTopic[];

export const TAX_YEAR_FACTS = [
  {
    id: 'tax-year',
    label: 'Tax year',
    value: '1 July 2026 – 30 June 2027',
    icon: CalendarDays,
  },
  {
    id: 'zero-rate-band',
    label: 'Salaried zero-rate band',
    value: 'First PKR 600,000',
    icon: WalletCards,
  },
  {
    id: 'top-rate',
    label: 'Top salaried marginal rate',
    value: '35%',
    icon: TrendingUp,
  },
] as const satisfies readonly TaxYearFact[];

export const TAX_GUIDES_FAQS = [
  {
    id: 'need-to-file',
    question: 'Do I need to file a tax return?',
    href: '/tax-guides/filing-tax-return',
    answer:
      'It depends on the filing tests in section 114, which consider more than tax payable. Income level, certain assets, business status and other conditions can create a filing obligation, so having no tax due does not automatically mean no return is required.',
    linkLabel: 'Check the filing guide',
  },
  {
    id: 'atl',
    question: 'What is ATL and why does it matter?',
    href: '/tax-guides/filing-tax-return',
    answer:
      'The Active Taxpayer List is FBR’s record of online income-tax return filers for the relevant tax year. ATL status commonly gives access to lower withholding-tax rates; late filers may need to pay the applicable surcharge for inclusion.',
    linkLabel: 'Learn about filing and ATL',
  },
  {
    id: 'documents',
    question: 'Which documents should I keep?',
    href: '/tax-guides/filing-tax-return',
    answer:
      'Keep income and salary certificates, bank and withholding records, evidence for deductions or credits, and details supporting your wealth statement, assets and liabilities. The exact records depend on your income sources and claims.',
    linkLabel: 'See the document checklist',
  },
  {
    id: 'everyday-deductions',
    question: 'Why is tax taken from my mobile load, electricity bill and bank cash?',
    href: '/mobile-internet-tax-calculator',
    answer:
      'These are advance income tax collected as you spend: 15% of a mobile load or internet bill under Section 236, 7.5% of a home electricity bill of PKR 25,000 or more for people off the Active Taxpayer List under Section 235, and 0.8% of a day’s bank cash once it passes PKR 50,000 for the same group under Section 231AB. All three count towards your income tax for the year and are claimed on your return.',
    linkLabel: 'Work out what you are paying',
  },
  {
    id: 'investment-profits',
    question: 'Do I pay tax on profit from shares or mutual funds?',
    href: '/capital-gains-tax-calculator',
    answer:
      'Yes, but only on the profit, and it is taxed on its own rather than added to your salary. Shares bought on or after 1 July 2024 are charged 15% however long you hold them, while older holdings can be lower or exempt. Mutual funds are 15% for a person. NCCPL or your fund company works it out and collects it, then issues a certificate you file with your return.',
    linkLabel: 'Work out tax on your investment profit',
  },
  {
    id: 'agricultural-income',
    question: 'Is income from farming taxed?',
    href: '/agricultural-income-tax-calculator',
    answer:
      'Not by FBR — agricultural income is exempt from federal income tax. Your province taxes it instead, and since 1 January 2025 Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan all use the same scale: nothing on the first PKR 600,000, then 15% rising in steps to 45% above PKR 5,600,000. Punjab, KP and Balochistan also charge a fixed amount per acre on land above 12½ acres.',
    linkLabel: 'Work out your provincial farm tax',
  },
  {
    id: 'salary-calculation',
    question: 'How is salary tax calculated?',
    href: '/tax-guides/understanding-tax-system',
    answer:
      'Annual taxable salary is applied to progressive bands. For FY 2026–27, the first PKR 600,000 is at 0% and the top marginal band is 35%; the annual result is commonly spread across payroll withholding during the year.',
    linkLabel: 'See all salary tax slabs',
  },
] as const satisfies readonly TaxGuideFaqItem[];

export const OFFICIAL_TAX_RESOURCES: readonly TaxGuideResource[] = [
  {
    id: 'fbr',
    title: 'Federal Board of Revenue',
    description: 'Official Pakistan tax authority',
    href: 'https://www.fbr.gov.pk/',
    image: FBR_LOGO,
  },
  {
    id: 'iris',
    title: 'IRIS e-filing portal',
    description: 'Official online return-filing system',
    href: 'https://iris.fbr.gov.pk/',
    image: IRIS_LOGO,
  },
  {
    id: 'ordinance',
    title: 'Income Tax Ordinance 2001',
    description: 'Current and historical official versions',
    href: 'https://fbr.gov.pk/Categ/Income-Tax-Ordinance/326',
    image: FBR_LOGO,
  },
];

export const FINANCE_ACT_2026_SOURCE = {
  href: 'https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf',
  label: 'Source: Finance Act 2026 (FBR)',
} as const;

export const TAX_GUIDE_SEARCH_ENTRIES = [
  ...ESSENTIAL_TAX_GUIDES.map((guide) => ({
    id: guide.id,
    title: guide.title,
    description: guide.description,
    href: guide.href,
    keywords: [guide.title, guide.description],
  })),
  {
    id: 'salary-calculator',
    title: 'Salary tax calculator',
    description: 'Calculate salary tax and take-home pay using FY 2026–27 rates.',
    href: '/',
    keywords: ['salary', 'tax slabs', 'take home', 'payroll', 'calculator'],
  },
  {
    id: 'reverse-salary-calculator',
    title: 'Reverse salary calculator',
    description: 'Work backwards from the take-home pay you want to the gross salary it needs.',
    href: '/reverse-salary-calculator',
    keywords: ['reverse', 'take home', 'gross from net', 'net to gross', 'salary', 'in hand'],
  },
  {
    id: 'salary-increment-calculator',
    title: 'Salary increment calculator',
    description: 'See how much of a raise you actually keep once tax is taken off it.',
    href: '/salary-increment-calculator',
    keywords: ['increment', 'raise', 'pay rise', 'appraisal', 'salary increase', 'after tax'],
  },
  {
    id: 'job-offer-comparison-calculator',
    title: 'Job offer comparison calculator',
    description: 'Compare your current job with a new offer on take-home pay rather than gross.',
    href: '/job-offer-comparison-calculator',
    keywords: ['job offer', 'compare', 'new job', 'switch', 'take home', 'two offers'],
  },
  {
    id: 'freelancer-calculator',
    title: 'Freelancer tax calculator',
    description: 'Estimate tax on eligible IT and IT-enabled export income.',
    href: '/freelancer-tax-calculator',
    keywords: ['freelancer', 'PSEB', 'IT export', 'section 154A'],
  },
  {
    id: 'business-calculator',
    title: 'Business & AOP tax calculator',
    description: 'Estimate tax on business, professional or AOP net income.',
    href: '/business-tax-calculator',
    keywords: ['business', 'AOP', 'self employed', 'professional'],
  },
  {
    id: 'corporate-tax-calculator',
    title: 'Corporate tax calculator',
    description: 'Estimate the income tax a company owes on its yearly taxable profit.',
    href: '/corporate-tax-calculator',
    keywords: [
      'company',
      'corporate',
      'Pvt Ltd',
      'small company',
      'banking company',
      '29%',
      'division II',
    ],
  },
  {
    id: 'minimum-turnover-tax-calculator',
    title: 'Minimum turnover tax calculator',
    description: 'Check the Section 113 tax floor worked out from yearly sales instead of profit.',
    href: '/minimum-turnover-tax-calculator',
    keywords: ['minimum tax', 'turnover', 'section 113', 'loss', '1.25%', 'carry forward'],
  },
  {
    id: 'super-tax-calculator',
    title: 'Super tax calculator',
    description: 'Estimate the Section 4C extra tax charged on very high income.',
    href: '/super-tax-calculator',
    keywords: ['super tax', 'section 4C', 'high income', '500 million', 'banks', '8%'],
  },
  {
    id: 'rental-calculator',
    title: 'Rental income tax calculator',
    description: 'Estimate the tax your tenant deducts from rent under Section 155.',
    href: '/rental-income-tax-calculator',
    keywords: ['rent', 'rental income', 'property', 'landlord', 'section 155'],
  },
  {
    id: 'property-purchase-calculator',
    title: 'Property purchase tax calculator',
    description: 'Estimate the advance tax a buyer pays on a property under Section 236K.',
    href: '/property-purchase-tax-calculator',
    keywords: ['property', 'purchase', 'buy', 'plot', '236K', 'advance tax', 'FBR value'],
  },
  {
    id: 'property-sale-calculator',
    title: 'Property sale tax calculator',
    description: 'Estimate the advance tax deducted from a seller under Section 236C.',
    href: '/property-sale-tax-calculator',
    keywords: ['property', 'sale', 'sell', 'transfer', '236C', 'advance tax', 'seller'],
  },
  {
    id: 'property-cgt-calculator',
    title: 'Property capital gains tax calculator',
    description: 'Estimate capital gains tax on the profit from selling a property.',
    href: '/property-capital-gains-tax-calculator',
    keywords: ['capital gains', 'CGT', 'property', 'profit', 'holding period', 'section 37'],
  },
  {
    id: 'capital-gains-calculator',
    title: 'Capital gains tax calculator (shares)',
    description:
      'Estimate the tax on profit from selling shares on the Pakistan Stock Exchange under Section 37A.',
    href: '/capital-gains-tax-calculator',
    keywords: [
      'capital gains',
      'CGT',
      'shares',
      'stocks',
      'PSX',
      'stock exchange',
      'NCCPL',
      'section 37A',
      'investment',
    ],
  },
  {
    id: 'mutual-fund-calculator',
    title: 'Mutual fund tax calculator',
    description: 'Estimate the capital gains tax deducted when you cash in units of a mutual fund.',
    href: '/mutual-fund-tax-calculator',
    keywords: [
      'mutual fund',
      'units',
      'redemption',
      'stock fund',
      'other fund',
      'AMC',
      'investment',
    ],
  },
  {
    id: 'vehicle-tax-calculator',
    title: 'Vehicle tax calculator',
    description:
      'Estimate the advance tax on registering a vehicle or transferring a used one under Section 231B.',
    href: '/vehicle-tax-calculator',
    keywords: ['vehicle', 'car', 'registration', 'transfer', '231B', 'engine capacity', 'imported'],
  },
  {
    id: 'vehicle-token-tax-calculator',
    title: 'Vehicle token tax calculator',
    description:
      'Estimate the yearly token tax in your province plus the federal Section 234 charge collected with it.',
    href: '/vehicle-token-tax-calculator',
    keywords: ['token tax', 'vehicle', 'car', 'Punjab', 'Islamabad', 'section 234', 'yearly'],
  },
  {
    id: 'cash-withdrawal-calculator',
    title: 'Cash withdrawal tax calculator',
    description:
      'Estimate what a bank deducts on cash withdrawals under Section 231AB, and what filing saves you.',
    href: '/cash-withdrawal-tax-calculator',
    keywords: ['cash', 'withdrawal', 'bank', 'ATM', '231AB', 'non filer', 'daily limit'],
  },
  {
    id: 'electricity-bill-calculator',
    title: 'Electricity bill tax calculator',
    description:
      'Estimate the income tax added to a home, shop or factory electricity bill under Section 235.',
    href: '/electricity-bill-tax-calculator',
    keywords: ['electricity', 'bill', 'utility', '235', 'domestic', 'commercial', 'industrial'],
  },
  {
    id: 'agricultural-income-calculator',
    title: 'Agricultural income tax calculator',
    description:
      'Work out the tax your province charges on farm income, and the per-acre tax on farmed land.',
    href: '/agricultural-income-tax-calculator',
    keywords: [
      'agriculture',
      'farm',
      'farming',
      'land',
      'crops',
      'per acre',
      'Punjab',
      'Sindh',
      'provincial',
    ],
  },
  {
    id: 'mobile-internet-calculator',
    title: 'Mobile & internet tax calculator',
    description:
      'Estimate the tax inside a mobile load, internet bill or landline bill under Section 236.',
    href: '/mobile-internet-tax-calculator',
    keywords: ['mobile', 'load', 'internet', 'telephone', 'landline', '236', 'prepaid', 'balance'],
  },
  {
    id: 'pta-tax-calculator',
    title: 'PTA mobile registration tax calculator',
    description:
      'Work out the FBR duties and taxes on registering an imported phone through PTA DIRBS.',
    href: '/pta-tax-calculator',
    keywords: [
      'PTA',
      'DIRBS',
      'mobile registration',
      'IMEI',
      'imported phone',
      'iPhone',
      'passport',
      'CNIC',
      'handset levy',
      'customs value',
    ],
  },
  ...TAX_GUIDES_FAQS.map((faq) => ({
    id: `faq-${faq.id}`,
    title: faq.question,
    description: faq.answer,
    href: faq.href,
    keywords: [faq.question, faq.answer],
  })),
] as const satisfies readonly TaxGuideSearchEntry[];
