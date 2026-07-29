export const PLAN_NEXT_SALARY_COPY = {
  title: 'Plan Your Next Salary',
  description: 'Smart tools to help you make better salary decisions.',
} as const;

export type PlanNextSalaryToolId = 'salary-increment' | 'job-offer' | 'reverse-salary';

export interface PlanNextSalaryTool {
  id: PlanNextSalaryToolId;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

export const PLAN_NEXT_SALARY_TOOLS = [
  {
    id: 'salary-increment',
    title: 'Salary Increment Calculator',
    description: 'See how much of a raise reaches your take-home pay after salary income tax.',
    ctaLabel: 'Calculate Your Raise',
    href: '/salary-increment-calculator',
  },
  {
    id: 'job-offer',
    title: 'Job Offer Comparison Calculator',
    description:
      'Compare your current role with a new offer by salary, bonus, tax, deductions and take-home pay.',
    ctaLabel: 'Compare Job Offers',
    href: '/job-offer-comparison-calculator',
  },
  {
    id: 'reverse-salary',
    title: 'Reverse Salary Calculator',
    description: 'Enter your desired take-home pay and find the gross salary you need before tax.',
    ctaLabel: 'Reverse Calculate',
    href: '/reverse-salary-calculator',
  },
] as const satisfies readonly PlanNextSalaryTool[];

export const SALARY_GUIDE_COPY = {
  reviewedLabel: 'Last reviewed 26 July 2026',
  reviewedDateTime: '2026-07-26',
} as const;
