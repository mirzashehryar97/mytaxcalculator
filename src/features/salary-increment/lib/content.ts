import type {
  IncrementInputType,
  SalaryComparisonMode,
  SalaryIncrementFaqItem,
  SalaryIncrementOption,
} from '@/features/salary-increment/types';

export const SALARY_INCREMENT_ROUTE = '/salary-increment-calculator';
export const JOB_OFFER_COMPARISON_ROUTE = '/job-offer-comparison-calculator';

export const SALARY_INCREMENT_PAGE_COPY = {
  eyebrow: 'After-tax raise planning · FY 2026-27',
  title: 'Salary Increment Calculator Pakistan 2026-27',
  subtitle:
    'Calculate how much of your raise you keep after tax by comparing your current and new take-home pay.',
} as const;

export const JOB_OFFER_COMPARISON_PAGE_COPY = {
  eyebrow: 'After-tax offer comparison · FY 2026-27',
  title: 'Job Offer Comparison Calculator Pakistan 2026-27',
  subtitle:
    'Compare your current job with a new offer by salary, bonus, deductions, tax and real take-home pay.',
} as const;

export const SALARY_INCREMENT_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · FBR salary slabs',
  title: 'Salary Increment Calculator Pakistan',
  subtitle: 'See how much of your raise you keep after tax',
  features: 'Free · Gross & net · Monthly and annual comparison',
  brand: 'My Tax Calculator',
} as const;

export const JOB_OFFER_COMPARISON_SOCIAL_IMAGE_COPY = {
  eyebrow: 'FY 2026-27 · After-tax comparison',
  title: 'Job Offer Comparison Calculator',
  subtitle: 'Compare two roles by real take-home pay',
  features: 'Salary · Bonus · Deductions · FBR income tax',
  brand: 'My Tax Calculator',
} as const;

export const SALARY_COMPARISON_MODE_OPTIONS = [
  { value: 'increment', label: 'Salary Increment', href: SALARY_INCREMENT_ROUTE },
  { value: 'job-offer', label: 'Compare Job Offers', href: JOB_OFFER_COMPARISON_ROUTE },
] as const satisfies readonly SalaryIncrementOption<SalaryComparisonMode>[];

export const SALARY_INCREMENT_TYPE_OPTIONS = [
  { value: 'percent', label: '% Percentage' },
  { value: 'amount', label: 'Rs. Amount' },
] as const satisfies readonly SalaryIncrementOption<IncrementInputType>[];

export const SALARY_COMPARISON_FORM_COPY = {
  fiscalYearLabel: 'Fiscal year',
  inputsHeading: 'Inputs',
  currentSalaryLabel: 'Current Monthly Salary',
  incrementLabel: 'Increment',
  incrementSuffix: '%',
  incrementAmountPlaceholder: '40000',
  incrementHelpSuffix: 'monthly increase',
  offeredSalaryLabel: 'New Offered Salary',
  bonusLabel: 'Additional Monthly Bonus (Optional)',
  deductionsLabel: 'Monthly Deductions (Optional)',
  currentBonusLabel: 'Current Monthly Bonus (Optional)',
  newBonusLabel: 'New Monthly Bonus (Optional)',
  currentDeductionsLabel: 'Current Monthly Deductions (Optional)',
  newDeductionsLabel: 'New Monthly Deductions (Optional)',
  optionalFieldsLabel: 'Additional optional fields',
  deductionsHelp:
    'Post-tax amounts taken from your salary, such as loan repayments or insurance. They lower your take-home but not your taxable income.',
  invalidIncrement: 'Enter your current monthly salary to compare take-home pay.',
  invalidJobOffer: 'Enter your current salary and the new offered salary to compare.',
} as const;

export const SALARY_COMPARISON_RESULT_COPY = {
  heading: 'Results Comparison',
  currentIncrementTitle: 'Current Salary',
  newIncrementTitle: 'New Salary (After Increment)',
  currentJobTitle: 'Current Job',
  newJobTitle: 'New Job Offer',
  grossLabel: 'Gross Monthly Salary',
  monthlyTaxLabel: 'Monthly Tax',
  netLabel: 'Net Monthly Salary',
  annualNetLabel: 'Annual Net Income',
  improvementTitle: 'Your take-home improvement',
  incrementLead: 'Your salary increased by',
  jobOfferLead: 'This offer increases your gross salary by',
  takeHomeConnector: 'and your take-home increased by',
  afterTax: 'after tax.',
  insightsHeading: 'Additional Insights',
  extraMonthlyTakeHome: 'Extra Monthly Take-Home',
  extraAnnualTakeHome: 'Extra Annual Take-Home',
  extraMonthlyTax: 'Extra Monthly Tax',
  extraAnnualTax: 'Extra Annual Tax',
  effectiveRateIncrement: 'Effective Tax Rate (New Salary)',
  effectiveRateJob: 'Effective Tax Rate (New Offer)',
  bonusChipPrefix: 'Bonus:',
  bonusChipSuffix: '/ month',
  lowerTakeHomeNote:
    'This change lowers your monthly take-home pay. Check the salary, bonus, and deduction amounts you entered.',
} as const;

export const SALARY_COMPARISON_CROSS_LINK = {
  incrementTitle: 'Weighing a new job?',
  incrementDescription: 'Compare two roles side by side using salary, tax and take-home pay.',
  incrementCta: 'Compare Job Offers',
  incrementHref: JOB_OFFER_COMPARISON_ROUTE,
  jobOfferTitle: 'Want to negotiate smarter?',
  jobOfferDescription:
    'Use the Reverse Salary Calculator to find the gross salary you need for a target take-home.',
  jobOfferCta: 'Reverse Salary Calculator',
  jobOfferHref: '/reverse-salary-calculator',
} as const;

export const SALARY_INCREMENT_GUIDE_COPY = {
  reviewedLabel: 'Last reviewed 26 July 2026',
  reviewedDateTime: '2026-07-26',
  faqEyebrow: 'Got questions?',
  faqTitle: 'Salary increment calculator FAQs',
  faqDescription: 'How this tool turns a gross raise into your real after-tax take-home gain.',
  estimateDisclaimer:
    'This calculator provides an estimate, not tax or financial advice. Your actual take-home also depends on other income, allowances, and deductions specific to your employer.',
} as const;

export const JOB_OFFER_COMPARISON_GUIDE_COPY = {
  reviewedLabel: 'Last reviewed 26 July 2026',
  reviewedDateTime: '2026-07-26',
  faqEyebrow: 'Got questions?',
  faqTitle: 'Job offer comparison calculator FAQs',
  faqDescription: 'How to compare two salary packages by the after-tax amount you actually keep.',
  estimateDisclaimer:
    'This calculator provides an estimate, not tax or financial advice. Compare non-cash benefits, working conditions and employer-specific payroll treatment before accepting an offer.',
} as const;

export const SALARY_INCREMENT_METHODOLOGY_COPY = {
  eyebrow: 'Calculation method',
  title: 'How salary increments affect take-home pay',
  description:
    'A gross raise is not the same as the amount added to your bank account. The calculator compares both salaries under the same fiscal-year rules.',
  items: [
    {
      title: 'Annualize taxable salary',
      description:
        'Your monthly base salary and recurring bonus are combined and multiplied by 12 before tax is calculated.',
    },
    {
      title: 'Apply FBR salary slabs',
      description:
        'The selected fiscal year’s progressive salary slabs are applied separately to your current and increased pay.',
    },
    {
      title: 'Compare the net raise',
      description:
        'Monthly tax and any post-tax deductions are subtracted, showing the extra monthly and annual take-home you keep.',
    },
  ],
} as const;

export const JOB_OFFER_COMPARISON_METHODOLOGY_COPY = {
  eyebrow: 'Offer comparison method',
  title: 'How to compare two job offers after tax',
  description:
    'Compare like with like: enter recurring pay and payroll deductions for each role, then judge the offers by monthly and annual take-home.',
  items: [
    {
      title: 'Enter recurring pay',
      description:
        'Add the monthly base salary and any regular taxable bonus for your current job and the new offer.',
    },
    {
      title: 'Include deductions',
      description:
        'Enter comparable post-tax deductions, such as insurance or loan repayments, for each role instead of comparing gross pay alone.',
    },
    {
      title: 'Compare real take-home',
      description:
        'The calculator applies the same FBR fiscal-year slabs to both jobs and shows the monthly and annual net difference.',
    },
  ],
} as const;

export const SALARY_INCREMENT_FAQS = [
  {
    id: 'how-take-home-compared',
    question: 'How is my after-tax salary increment calculated?',
    answer:
      'For each salary we take your gross monthly income (base salary plus any bonus), apply the FBR salary tax slabs for the fiscal year you pick, and subtract the monthly tax. Any monthly deductions you enter are then removed to give your net take-home pay.',
  },
  {
    id: 'is-bonus-taxed',
    question: 'Is my monthly bonus taxed?',
    answer:
      'Yes. A regular monthly bonus is part of your taxable salary, so it is added to your gross income before the slab rates are applied. That is why a higher bonus can push you into a higher slab.',
  },
  {
    id: 'what-are-deductions',
    question: 'What should I enter under monthly deductions?',
    answer:
      'Use monthly deductions for after-tax amounts taken from your pay, such as loan repayments, insurance, or society dues. They reduce your take-home pay but do not lower the income your tax is calculated on.',
  },
  {
    id: 'why-take-home-less-than-raise',
    question: 'Why is my take-home increase smaller than my raise?',
    answer:
      'Pakistan uses progressive tax slabs, so part of a raise can be taxed at a higher rate than your existing salary. The extra tax on the increased amount is why your net gain is smaller than the gross raise.',
  },
  {
    id: 'which-years',
    question: 'Can I calculate an increment for an earlier fiscal year?',
    answer:
      'Yes. Pick any fiscal year from 2014-2015 through 2026-2027 in the dropdown and both salaries are recalculated using that year’s FBR salary slabs.',
  },
] as const satisfies readonly SalaryIncrementFaqItem[];

export const JOB_OFFER_COMPARISON_FAQS = [
  {
    id: 'how-offers-compared',
    question: 'How does the calculator compare two job offers?',
    answer:
      'It calculates each job’s taxable monthly pay, applies the selected fiscal year’s FBR salary slabs, subtracts monthly income tax and then removes any post-tax deductions you enter. The results show both packages side by side and highlight the monthly and annual take-home difference.',
  },
  {
    id: 'bonus-treatment',
    question: 'Should I include bonuses when comparing offers?',
    answer:
      'Include a bonus when it is a regular monthly part of the package. The calculator treats that recurring bonus as taxable salary. A discretionary annual bonus is not directly modelled, so compare it separately unless you can convert it into a realistic monthly amount.',
  },
  {
    id: 'deductions-and-benefits',
    question: 'How should I compare deductions and employee benefits?',
    answer:
      'Enter recurring post-tax payroll deductions for each job, such as loan repayments or insurance. Non-cash benefits such as medical cover, transport, equity, leave and remote-work flexibility are not assigned a rupee value, so review them separately before deciding.',
  },
  {
    id: 'higher-gross-lower-net',
    question: 'Can a higher salary offer leave me with less take-home pay?',
    answer:
      'A higher gross salary normally increases take-home pay because Pakistan’s tax slabs are progressive, but larger deductions or a weaker bonus package can make the overall offer less valuable. The side-by-side result makes those differences visible.',
  },
  {
    id: 'job-offer-years',
    question: 'Can I compare job offers for an earlier fiscal year?',
    answer:
      'Yes. Choose any fiscal year from 2014-2015 through 2026-2027 and both salary packages are recalculated using that year’s FBR salary slabs.',
  },
] as const satisfies readonly SalaryIncrementFaqItem[];
