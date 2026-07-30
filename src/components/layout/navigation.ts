import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Building2,
  CalendarClock,
  Car,
  Handshake,
  Home,
  KeyRound,
  Laptop,
  LineChart,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';

export const BUDGET_PATH = '/budget-2025-26-vs-2026-27';
export const NEW_NAV_BADGE_LABEL = 'New';
export const NEW_CALCULATOR_MOBILE_NOTICE = 'New salary-planning calculators now available';

export const STANDARD_NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/tax-guides', label: 'Tax Guides' },
] as const;

export const RELATED_CALCULATORS_COPY = {
  eyebrow: 'Trusted. Accurate. Updated.',
  title: 'More Pakistan tax calculators',
  description:
    'Pick the calculator for your income or salary decision — each one uses current FBR rates.',
} as const;

export interface CalculatorNavLink {
  href: string;
  label: string;
  description: string;
  isNew: boolean;
  /** Card icon shown in the "More Pakistan tax calculators" grid. */
  icon: LucideIcon;
}

export const CALCULATOR_NAV_LINKS: readonly CalculatorNavLink[] = [
  {
    href: '/',
    label: 'Salary Tax Calculator',
    description: 'Salary tax and take-home pay',
    isNew: false,
    icon: Wallet,
  },
  {
    href: '/freelancer-tax-calculator',
    label: 'Freelancer Tax Calculator',
    description: 'IT export tax under Section 154A',
    isNew: true,
    icon: Laptop,
  },
  {
    href: '/business-tax-calculator',
    label: 'Business Tax Calculator',
    description: 'Business, self-employed & AOP tax',
    isNew: true,
    icon: Building2,
  },
  {
    href: '/rental-income-tax-calculator',
    label: 'Rental Income Tax Calculator',
    description: 'Tax on rent under Section 155',
    isNew: true,
    icon: Home,
  },
  {
    href: '/property-purchase-tax-calculator',
    label: 'Property Purchase Tax Calculator',
    description: 'Buyer advance tax under Section 236K',
    isNew: true,
    icon: KeyRound,
  },
  {
    href: '/property-sale-tax-calculator',
    label: 'Property Sale Tax Calculator',
    description: 'Seller advance tax under Section 236C',
    isNew: true,
    icon: Handshake,
  },
  {
    href: '/property-capital-gains-tax-calculator',
    label: 'Property Capital Gains Tax',
    description: 'Tax on the profit from a property sale',
    isNew: true,
    icon: LineChart,
  },
  {
    href: '/vehicle-tax-calculator',
    label: 'Vehicle Tax Calculator',
    description: 'Registration & transfer tax under Section 231B',
    isNew: true,
    icon: Car,
  },
  {
    href: '/vehicle-token-tax-calculator',
    label: 'Vehicle Token Tax Calculator',
    description: 'Yearly token tax, province by province',
    isNew: true,
    icon: CalendarClock,
  },
  {
    href: '/salary-increment-calculator',
    label: 'Salary Increment Calculator',
    description: 'See how much of your raise you keep',
    isNew: true,
    icon: TrendingUp,
  },
  {
    href: '/job-offer-comparison-calculator',
    label: 'Job Offer Comparison',
    description: 'Compare two roles by take-home pay',
    isNew: true,
    icon: Briefcase,
  },
  {
    href: '/reverse-salary-calculator',
    label: 'Reverse Salary Calculator',
    description: 'Gross salary from your target take-home',
    isNew: true,
    icon: Target,
  },
];

export function getNavLinkClass(active: boolean, mobile: boolean): string {
  const base = mobile
    ? 'block rounded-xl px-4 py-3 font-semibold text-base transition-colors'
    : 'rounded-full px-2 py-2 font-semibold text-xs transition-all duration-200 lg:text-sm xl:px-3';

  if (active) {
    return `${base} text-emerald-700 underline decoration-2 decoration-emerald-600 underline-offset-8`;
  }
  if (mobile) {
    return `${base} text-gray-600 hover:bg-emerald-50 hover:text-emerald-800`;
  }
  return `${base} text-gray-600 hover:bg-emerald-50 hover:text-emerald-700`;
}

export function getCalculatorTriggerClass(active: boolean, mobile: boolean): string {
  const base = mobile
    ? 'flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-base transition-colors'
    : 'inline-flex items-center gap-1 rounded-full px-2 py-2 font-semibold text-xs transition-all duration-200 lg:text-sm xl:px-3';

  if (active) {
    return `${base} animate-calculator-pulse text-emerald-700 hover:bg-emerald-50`;
  }
  return mobile
    ? `${base} animate-calculator-pulse bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 ring-1 ring-emerald-300/80 hover:from-emerald-100 hover:to-teal-100`
    : `${base} animate-calculator-pulse bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 ring-1 ring-emerald-300/80 hover:from-emerald-100 hover:to-teal-100 hover:ring-emerald-400`;
}
